(function(){
    
	"use strict";
	
	building_layout();

})();

/**
 * Building Layout
 */
function building_layout(){
	
	// page--title--container
	create_dom('body','div',[['class','page--title--container']]);
	// icontainer
	create_dom('.page--title--container','div',[['class','icontainer']]);
	// irow
	create_dom('.page--title--container .icontainer','div',[['class','irow']]);
	// icol--12
	create_dom('.page--title--container .icontainer .irow','div',[['class','icol--12']]);
	// page--title--wrapper
	create_dom('.page--title--container .icontainer .irow .icol--12','div',[['class','page--title--wrapper']]);
	// page--title
	create_dom('.page--title--wrapper','h1',[['class','page--title']]).innerHTML = 'ToDo Vanilla Javascript';

	// page--content--container
	create_dom('body','div',[['class','page--content--container']]);
	// icontainer
	create_dom('.page--content--container','div',[['class','icontainer']]);
	// irow
	create_dom('.page--content--container .icontainer','div',[['class','irow']]);
	// icol--6 itodo--form--wrapper
	create_dom('.page--content--container .icontainer .irow','div',[['class','icol--5 itodo--form--wrapper']]);
	// icol--6 itodo--list--wrapper
	create_dom('.page--content--container .icontainer .irow','div',[['class','icol--7 itodo--list--wrapper']]);

	// itodo--list--inner--wrapper
	create_dom('.itodo--form--wrapper','div',[['class','itodo--list--inner--wrapper']]);
	// iform--control itask--name
	create_dom('.itodo--form--wrapper .itodo--list--inner--wrapper','input',[['type','text'],['class','iform--control itask--name']]);
	// iform--control itask--button
	create_dom('.itodo--form--wrapper .itodo--list--inner--wrapper','button',[['type','button'],['class','iform--control itask--button']]).innerHTML = 'Add New Task';
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