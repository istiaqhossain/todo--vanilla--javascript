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
	// icol--5 itodo--form--wrapper
	create_dom('.page--content--container .icontainer .irow','div',[['class','icol--5 itodo--form--wrapper']]);
	// icol--2
	create_dom('.page--content--container .icontainer .irow','div',[['class','icol--2']]);
	// icol--5 itodo--list--wrapper
	create_dom('.page--content--container .icontainer .irow','div',[['class','icol--5 itodo--list--wrapper']]);

	// itodo--form--inner--wrapper
	create_dom('.itodo--form--wrapper','div',[['class','itodo--form--inner--wrapper']]);
	// iform--control itask--name
	create_dom('.itodo--form--wrapper .itodo--form--inner--wrapper','input',[['type','text'],['class','iform--control itask--name']]);
	// iform--control itask--button
	create_dom('.itodo--form--wrapper .itodo--form--inner--wrapper','button',[['type','button'],['class','iform--control itask--button']]).innerHTML = 'Add New Task';

	// itodo--list--inner--wrapper
	create_dom('.itodo--list--wrapper','div',[['class','itodo--list--inner--wrapper']]);
	// list-unstyled
	create_dom('.itodo--list--wrapper .itodo--list--inner--wrapper','ul',[['class','ifilter--wrapper list--unstyled text-center']]);
	// li
	create_dom('.itodo--list--wrapper .itodo--list--inner--wrapper .ifilter--wrapper','li',[['class','all--tasks']]).innerHTML = 'All';
	// li
	create_dom('.itodo--list--wrapper .itodo--list--inner--wrapper .ifilter--wrapper','li',[['class','completed--tasks']]).innerHTML = 'Completed';
	// li
	create_dom('.itodo--list--wrapper .itodo--list--inner--wrapper .ifilter--wrapper','li',[['class','active--tasks']]).innerHTML = 'Active';

	render_list();
}

/**
 * Render List
 */
function render_list(){
	let todoList = get_data();

	if(todoList.length == 0 ){
		// itodo--no--todos
		create_dom('.itodo--list--wrapper .itodo--list--inner--wrapper','div',[['class','itodo--no--todos text-center']]);
		// no--todos--content
		create_dom('.itodo--list--wrapper .itodo--list--inner--wrapper .itodo--no--todos','p',[['class','no--todos--content']]).innerHTML = 'There is no todos';
	}
}

/**
 * Get Data 
 */
function get_data(){

	var todoList = [];
	var storage = localStorage.getItem('md_istiaq_hossain_todolist_sunday');

	if(storage !== null){
		todoList = JSON.parse(storage);
	}

	return todoList;
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

	return parent[0].appendChild(element);

}


/**
 * Select Dom by selector
 */
function dom(node) {
	
	return document.querySelectorAll(node);

}