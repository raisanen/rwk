export class PrismicDocument {
	protected data: any;
	protected tags: string[];
	protected id: string;

	constructor(dataObj: any = {}) {
		this.data = dataObj.data || dataObj;
		this.tags = dataObj.tags || [];
		this.id = dataObj.id || '';
	}

	static FromPrismicResult(res: any): PrismicDocument {
		return new PrismicDocument(res);
	}
	static FromResults(res: any[]): PrismicDocument[] {
		return res.map(PrismicDocument.FromPrismicResult);
	}

	protected findObject(key: string): any[] {
		return this.data[key] || [];
	}

	get Id(): string {
		return this.id;
	}

	get Tags(): string[] {
		return (this.tags || []).sort();
	}

	getText(key: string): string {
		return this.findObject(key).map(obj => {
			let res: string = null, text = '';
			switch (obj.type) {
				case 'heading1':
				case 'heading2':
				case 'heading3':
				case 'heading4':
					res = obj.text;
					break;
				case 'preformatted':
					res = '<code>' + insertSpans(obj.text, obj.spans) + '</code>';
					break;
				case 'paragraph':
					res = '<p>' + insertSpans(obj.text, obj.spans) + '</p>';
					break;
			}
			return res;
		}).join('');
	}

	getLink(key: string): PrismicDocument {
		return null;
	}

	getGroup(key: string): PrismicDocument[] {
		return [];
	}

	getArray(key: string): any[] {
		var result: any[] = null;
		if (this.data && this.data[key]) {
			result = [];
			var textArr = this.data[key];
			for (var i = 0; i < textArr.length; i++) {
				result.push(textArr[i]);
			}
		}

		return result;
	}

	get Date(): Date {
		return new Date(this.data.date || '');
	}

	get Title(): string {
		return this.getText('title') || this.getText('name');
	}

	get Description(): string {
		return this.getText('description');
	}
	get Content(): string {
		return this.getText('content');
	}

	get Links(): PrismicLink[] {
		return (this.getArray('links') || []).map(l => {
			return new PrismicLink(l.name, l.link.type, l.link.url);
		});
	}

	get Files(): PrismicFile[] {
		return (this.getArray('files') || []).map(f => {
			return new PrismicFile(f.name, f.link_type, f.url, f);
		});
	}
}

export class PrismicLink {
	Name: string;
	Type: string;
	Url: string;

	constructor(name: string, type: string, url: string) {
		this.Name = name;
		this.Type = type;
		this.Url = url;
	}
}

export class PrismicFile extends PrismicLink {
	Meta: any;

	constructor(name: string, type: string, url: string, meta: any) {
		super(name, type, url);
		this.Meta = meta;
	}
}


/**
 * serialize + insertSpans -- from Prismic
 */

const serialize = (element, content) => {
	// Fall back to the default HTML output
	var TAG_NAMES = {
		"heading1": "h1",
		"heading2": "h2",
		"heading3": "h3",
		"heading4": "h4",
		"heading5": "h5",
		"heading6": "h6",
		"paragraph": "p",
		"preformatted": "pre",
		"list-item": "li",
		"o-list-item": "li",
		"group-list-item": "ul",
		"group-o-list-item": "ol",
		"strong": "strong",
		"em": "em"
	};

	if (TAG_NAMES[element.type]) {
		var name = TAG_NAMES[element.type];
		var classCode = element.label ? (' class="' + element.label + '"') : '';
		return '<' + name + classCode + '>' + content + '</' + name + '>';
	}

	if (element.type == "image") {
		var label = element.label ? (" " + element.label) : "";
		var imgTag = '<img src="' + element.url + '" alt="' + (element.alt || "") + '" copyright="' + (element.copyright || "") + '">';
		return '<p class="block-img' + label + '">' +
			(element.linkUrl ? ('<a href="' + element.linkUrl + '">' + imgTag + '</a>') : imgTag) +
			'</p>';
	}

	if (element.type == "embed") {
		return '<div data-oembed="' + element.embed_url +
			'" data-oembed-type="' + element.type +
			'" data-oembed-provider="' + element.provider_name +
			(element.label ? ('" class="' + element.label) : '') +
			'">' + element.oembed.html + "</div>";
	}

	if (element.type === 'hyperlink') {
		return '<a href="' + element.url + '">' + content + '</a>';
	}

	if (element.type === 'label') {
		return '<span class="' + element.data.label + '">' + content + '</span>';
	}

	return "<!-- Warning: " + element.type + " not implemented. Upgrade the Developer Kit. -->" + content;
}

const insertSpans = (text, spans) => {
	if (!spans || !spans.length) {
		return text;
	}

	let tagsStart = {};
	let tagsEnd = {};

	spans.forEach(function (span) {
		if (!tagsStart[span.start]) { tagsStart[span.start] = []; }
		if (!tagsEnd[span.end]) { tagsEnd[span.end] = []; }

		tagsStart[span.start].push(span);
		tagsEnd[span.end].unshift(span);
	});

	var c;
	var html = "";
	var stack = [];
	for (var pos = 0, len = text.length + 1; pos < len; pos++) { // Looping to length + 1 to catch closing tags
		if (tagsEnd[pos]) {
			tagsEnd[pos].forEach(function () {
				// Close a tag
				var tag = stack.pop();
				// Continue only if block contains content.
				if (typeof tag !== 'undefined') {
					var innerHtml = serialize(tag.span, tag.text);
					if (stack.length === 0) {
						// The tag was top level
						html += innerHtml;
					} else {
						// Add the content to the parent tag
						stack[stack.length - 1].text += innerHtml;
					}
				}
			});
		}
		if (tagsStart[pos]) {
			// Sort bigger tags first to ensure the right tag hierarchy
			tagsStart[pos].sort(function (a, b) {
				return (b.end - b.start) - (a.end - a.start);
			});
			tagsStart[pos].forEach(function (span) {
				// Open a tag
				var url = span.url;
				if (span.type == "hyperlink") {
					span.url = span.data.url;
				}
				var elt = {
					span: span,
					text: ""
				};
				stack.push(elt);
			});
		}
		if (pos < text.length) {
			c = text[pos];
			if (stack.length === 0) {
				// Top-level text
				html += c;
			} else {
				// Inner text of a span
				stack[stack.length - 1].text += c;
			}
		}
	}

	return html;
}