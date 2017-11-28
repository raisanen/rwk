export class PrismicDocument {
	protected data:any;
	protected tags:string[];
	protected id:string;

	constructor(dataObj:any={}) {
		this.data = dataObj.data || dataObj;
		this.tags = dataObj.tags || [];
		this.id   = dataObj.id || '';
	}

	static FromPrismicResult(res:any):PrismicDocument {
		return new PrismicDocument(res);
	}
	static FromResults(res:any[]):PrismicDocument[] {
		return res.map(PrismicDocument.FromPrismicResult);
	}

	protected findObject(key:string):any[] {
		return this.data[key] || [];
	}

	get Id():string {
		return this.id;
	}

	get Tags():string[] {
		return this.tags;
	}

	getText(key:string):string {
		return this.findObject(key).map(obj => {
			let res:string = null;
			switch (obj.type) {
				case 'heading1':
				case 'heading2':
				case 'heading3':
				case 'heading4':
					res = obj.text;
					break;
				case 'paragraph':
					res = `<p>${obj.text}</p>`;
					break;
			}
			return res;
		}).join('');
	}

	getLink(key:string):PrismicDocument {
		return null;
	}

	getGroup(key:string):PrismicDocument[] {
		return [];
	}

	getArray(key:string):any[] {
		var result:any[] = null;
		if (this.data && this.data[key]) {
			result = [];
			var textArr = this.data[key];
			for (var i = 0; i < textArr.length; i++) {
				result.push(textArr[i]);
			}
		}

		return result;
	}

	get Date():Date {
		return new Date(this.data.date || '');
	}

	get Title():string {
		return this.getText('title') || this.getText('name');
	}

	get Description():string {
		return this.getText('description');
	}
	get Content():string {
		return this.getText('content');
	}

	get Links():PrismicLink[] {
		return (this.getArray('links') || []).map(l => {
			return new PrismicLink(l.name, l.link.type, l.link.url);
		});
	}

	get Files():PrismicFile[] {
		return (this.getArray('files') || []).map(f => {
			return new PrismicFile(f.name, f.link_type, f.url, f);
		});
	}
}

export class PrismicLink {
	Name:string;
	Type:string;
	Url:string;

	constructor(name:string, type:string, url:string) {
		this.Name = name;
		this.Type = type;
		this.Url = url;
	}
}

export class PrismicFile extends PrismicLink {
	Meta:any;

	constructor(name:string, type:string, url:string, meta:any){
		super(name, type, url);
		this.Meta
	}
}