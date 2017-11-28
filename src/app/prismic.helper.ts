export class PrismicHelper {
	static GetArray(prismicObj:any, key:string):string[] {
		var result = [];
		if (prismicObj.data && prismicObj.data[key]) {
			var textArr = prismicObj.data[key];
			for (var i = 0; i < textArr.length; i++) {
				result.push(textArr[i]);
			}
		}

		return result;
	}
	
	static GetText(prismicObj:any, key:string):string {
		var result = '';
		if (prismicObj.data && prismicObj.data[key]) {
			var textArr = prismicObj.data[key];

			for (var i = 0; i < textArr.length; i++) {
				switch (textArr[i].type) {
					case 'heading1':
					case 'heading2':
					case 'heading3':
					case 'heading4':
						result += textArr[i].text;
						break;
					case 'paragraph':
						result += `<p>${textArr[i].text}</p>`;
						break;
				}	
			}
		}
		return result;
	}
}