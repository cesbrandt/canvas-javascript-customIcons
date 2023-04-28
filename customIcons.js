////////////////
//            //
//   CONFIG   //
//            //
////////////////
let iconPairs = [
	// Format: ['css selector to apply the new icon to', 'the icon name from the official CSS', '(optional) comment']
	['.context_module_item.context_external_tool .icon-link:before', 'external-link', 'Window w/ Arrow Out (externallink)'],
	['.icon-quiz:before, .icon-quiz.icon-Solid:before', 'rubric-dark', 'Clipboard (rubricdark)']
];

//////////////////////
//                  //
//   DO NOT TOUCH   //
//                  //
//////////////////////
let getSheetIcons = async url => {
	var timestamp = (new Date()).getTime();

	return await fetch(url + '?ts=' + timestamp).then(response => response.text()).then(cssText => {
		var sheet = new CSSStyleSheet();
		sheet.replaceSync(cssText);

		return getIconValues(sheet);
	});
};

let getIconValues = parent => {
	var rules = new Object();
	if(!(parent instanceof CSSStyleSheet)) {
		Object.assign(rules, getIconValues(parent));
	} else {
		for(var j = 0; j < parent.cssRules.length; j++) {
			var rule = parent.cssRules[j];
			if(rule instanceof CSSStyleRule) {
				var icon = rule.selectorText.match(/^\.icon-([^:\s\.]+):+before$/);
				if(icon != null) {
					rules[icon[1]] = rule.style.content.replace(/\"/g, '').codePointAt(0).toString(16);
				}
			}
		}
	}

	return rules;
};

let getIcons = async () => {
	var promises = [];
	for(var i = 0; i < document.styleSheets.length; i++) {
		var sheet = document.styleSheets[i];
		if(sheet.href != null) {
			promises.push(getSheetIcons(sheet.href));
		} else {
			promises.push(getIconValues(sheet));
		}
	}
	var results = await Promise.all(promises);

	return Object.assign({}, ...results);
};

let loadCustomIcons = async () => {
	var icons = await getIcons();

	var css = document.createElement('style');
	document.head.appendChild(css);
	var sheet = css.sheet;
	iconPairs.forEach(iconToReplace => {
		sheet.insertRule(iconToReplace[0] + ' { content: "\\' + icons[iconToReplace[1]] + '"; ' + (iconToReplace[2] != undefined ? '/* ' + iconToReplace[2] + ' */' : ''));
	});

	return;
};

window.addEventListener('load', loadCustomIcons);
