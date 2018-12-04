(function(){
    
	"use strict";
	
	create_dom('body', 'div', [['class', 'iwrapper']]);
	

})();

/**
 * Create Dom 
 */
function create_dom(parent, tag, attr = '') {
	
	let element = document.createElement(tag);
	
	parent = dom(parent);

	if (Array.isArray(attr) && Array.isArray(attr[0])){
		attr.forEach(function(el){
			element.setAttribute(el[0], el[1]);
		});
	}

	return parent[0].appendChild(element);

}


/**
 * Select Dom by selector
 */
function dom(node) {
	
	return document.querySelectorAll(node);

}