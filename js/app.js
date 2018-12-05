(function(){
    
	"use strict";
	
	building_layout();

})();

/**
 * Building Layout
 */
function building_layout(){
	
	// icontainer
	create_dom('body','div',[['class','icontainer']]);
	// irow
	create_dom('.icontainer','div',[['class','irow']]);
	// icol--12
	create_dom('.irow','div',[['class','icol--12']]);
	// page--title--wrapper
	create_dom('.icol--12','div',[['class','page--title--wrapper']]);
	// page--title
	create_dom('.page--title--wrapper','h1',[['class','page--title']]).innerHTML = 'ToDo Vanilla Javascript';


}

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

	console.log(parent[0]);

	return parent[0].appendChild(element);

}


/**
 * Select Dom by selector
 */
function dom(node) {
	
	return document.querySelectorAll(node);

}