(function(){
    
	"use strict";

	building_layout();
	add_listener();


})();

/**
 * Building Layout
 */
function building_layout(){
	
	page_title_container();

	page_content_container();

	form_container();

	filter_container();

	render_list();
}

/*
*	Page Content Container
*/
function page_content_container(){
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
}


/*
*	Page Title Container
*/
function page_title_container(){
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
}



/*
*	Form Container
*/
function form_container(){
	// itodo--form--inner--wrapper
	create_dom('.itodo--form--wrapper','div',[['class','itodo--form--inner--wrapper']]);
	// iform--control itask--name
	create_dom('.itodo--form--wrapper .itodo--form--inner--wrapper','input',[['type','text'],['class','iform--control itask--name']]);
	// iform--control itask--button
	create_dom('.itodo--form--wrapper .itodo--form--inner--wrapper','button',[['type','button'],['class','iform--control itask--button']]).innerHTML = 'Add New Task';
}

/*
*	Filter Container
*/
function filter_container(){
	// itodo--list--inner--wrapper
	create_dom('.itodo--list--wrapper','div',[['class','itodo--list--inner--wrapper']]);
	// list-unstyled
	create_dom('.itodo--list--wrapper .itodo--list--inner--wrapper','ul',[['class','ifilter--wrapper list--unstyled text-center']]);
	// li
	create_dom('.itodo--list--wrapper .itodo--list--inner--wrapper .ifilter--wrapper','li',[['class','all--tasks active']]).innerHTML = 'All';
	// li
	create_dom('.itodo--list--wrapper .itodo--list--inner--wrapper .ifilter--wrapper','li',[['class','completed--tasks']]).innerHTML = 'Completed';
	// li
	create_dom('.itodo--list--wrapper .itodo--list--inner--wrapper .ifilter--wrapper','li',[['class','active--tasks']]).innerHTML = 'Active';
}


/**
 * Get Current Filter 
 */
function get_current_filter() {
	let filters = dom('.ifilter--wrapper li');
	filters.forEach(function(element, key){
		if(element.classList.contains('active') == true){
			return element.innerHTML;
		}
	});
}

/**
* Add Listener
*/
function add_listener(){
	
	let itask_btn = dom('.itask--button')[0];

	itask_btn.addEventListener('click',add_data);
	
	let itask_name = dom('.itask--name')[0];

	itask_name.addEventListener('keyup',function(event){
		if (event.keyCode == 13) {
			itask_btn.click();
		}
	});

	let filters = dom('.ifilter--wrapper li');
	
	filters.forEach(function(element, key){
		element.addEventListener('click',filter_lists);
	});

}

/*
	Store TodoList
*/
function set_data(todoList){
	localStorage.setItem('md_istiaq_hossain_todolist_sunday',JSON.stringify(todoList));
}

/**
* Sync Data
*/
function sync_data(task,status){
	let todoList = get_data();

	if(status == 'Add New Task'){
		todoList.push(task);
	}

	set_data(todoList);
}

/**
* Add Data
*/
function add_data(){
	
	let request_status = this.innerHTML;
	let request_data = dom('.itask--name')[0].value;
	let currentState = 'All';

	let filters = dom('.ifilter--wrapper li');
	filters.forEach(function(element, key){
		if(element.classList.contains('active') == true){
			currentState = element.innerHTML;
		}
	});

	if(validateInputs() == false){
		
		return false;

	}

	if(request_status == 'Add New Task'){

		let task = {
			ID : generateID(),
			task : request_data,
			status : 'active',
		};
		
		sync_data(task,request_status);
		

	}else if(request_status == 'Save'){

		let todoList = get_data();

		let key = dom('.itask--name')[0].dataset.key;

		todoList[key].task = request_data;

		if (confirm('Are you sure?')) {

			set_data(todoList);

		}

	}

	reset_inputs();
	reset_list();
	render_list(currentState);
}


/**
 * Render List
 */
function render_list(filter_active = 'All'){

	let todoList = get_data();

	if(todoList.length == 0 ){
		// itodo--no--todos
		create_dom('.itodo--list--wrapper .itodo--list--inner--wrapper','div',[['class','itodo--no--todos text-center']]);
		// no--todos--content
		create_dom('.itodo--list--wrapper .itodo--list--inner--wrapper .itodo--no--todos','p',[['class','no--todos--content']]).innerHTML = 'There is no todos';
	}else{
		// list-unstyled
		create_dom('.itodo--list--wrapper .itodo--list--inner--wrapper','ul',[['class','itodo--list--container list--unstyled']]);

		todoList.forEach( function(element, key) {
			
			if( (filter_active == 'Completed') && (element.status !== 'completed') ){
				return false;
			}else if( (filter_active == 'Active') && (element.status !== 'active') ){
				return false;
			}
			
			let btn = create_element('button',[['onclick','update_status('+key+')']]);
			
			let icon = '<i class="far fa-circle"></i>';

			if(element.status == 'completed'){
				icon = '<i class="far fa-check-circle"></i>';				
			}
			
			btn.innerHTML = icon;

			let text = document.createTextNode(element.task); 

			// li
			create_dom('.itodo--list--container','li',[['class','itodo--item--'+element.ID]]);

			dom('.itodo--item--'+element.ID)[0].appendChild(btn);
			dom('.itodo--item--'+element.ID)[0].appendChild(text);

			// action--container
			create_dom('.itodo--list--container li.itodo--item--'+element.ID,'div',[['class','action--container']]);

			let span = create_element('span',[['','']]);

			span.innerHTML = '<i class="fas fa-ellipsis-v"></i><i class="fas fa-ellipsis-v"></i>';

			dom('.itodo--list--container li.itodo--item--'+element.ID+' .action--container')[0].appendChild(span);

			// ul action--list
			create_dom('.itodo--list--container li.itodo--item--'+element.ID+' .action--container','ul',[['class','action--list']]);

			// li
			create_dom('.itodo--list--container li.itodo--item--'+element.ID+' .action--container .action--list','li',[['onclick','edit_list('+key+')']]).innerHTML = '<i class="fas fa-pen"></i> Edit';
			// li
			create_dom('.itodo--list--container li.itodo--item--'+element.ID+' .action--container .action--list','li',[['onclick','delete_list('+key+')']]).innerHTML = '<i class="fas fa-trash"></i> Delete';

		});
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

	todoList.sort(alpha_sort);

	return todoList;
}

/**
*	Alpha Sort
*/
function alpha_sort(a, b){
	if(a.task < b.task) { return -1; }
    if(a.task > b.task) { return 1; }
    return 0;
}



/**
 * Create Dom 
 */
function create_dom(parent, tag, attr = '') {
	
	let element = document.createElement(tag);
	
	parent = dom(parent);

	if (Array.isArray(attr) && Array.isArray(attr[0])){
		attr.forEach(function(el){
			if(el[0] && el[1]){
				element.setAttribute(el[0], el[1]);
			}
		});
	}

	return parent[0].appendChild(element);

}

/**
 * Create Element 
 */
function create_element(tag, attr = '') {
	
	let element = document.createElement(tag);
	
	if (Array.isArray(attr) && Array.isArray(attr[0])){
		attr.forEach(function(el){
			if(el[0] && el[1]){
				element.setAttribute(el[0], el[1]);
			}
		});
	}

	return element;

}


/**
 * Select Dom by selector
 */
function dom(node) {
	
	return document.querySelectorAll(node);

}

/*
	Validate Inputs
*/
function validateInputs(){
	
	let flag = true;
	
	let task = dom('.itask--name')[0];

	if(task.value.trim().length == 0){
		
		flag = false;
		task.classList.add('field-error');
		alert('Please enter valid task.');

	}else{
		
		task.classList.remove('field-error');

	}


	return flag;
}

/*
	GENERATE ID
*/
function generateID(){
	
	return new Date().getTime();

}

/*
*	Reset Inputs
*/
function reset_inputs(){
	let task = dom('.itask--name')[0];

	task.value = '';

	task.removeAttribute('data-key');

	let btn = dom('.itask--button')[0];

	btn.innerHTML = 'Add New Task';
}

/*
*	Reset List Wrapper
*/
function reset_list(){
	let no_todos = dom('.itodo--no--todos')[0];
	let itodos_container = dom('.itodo--list--container')[0];

	if(no_todos){
		no_todos.remove();	
	}

	if(itodos_container){
		itodos_container.remove();
	}
	
}

/*
*	Capital First Letter
*/
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/*
*	Update Status of Item
*/
function update_status(key){
	
	let todoList = get_data();
	let currentState = 'All';

	let filters = dom('.ifilter--wrapper li');
	filters.forEach(function(element, key){
		if(element.classList.contains('active') == true){
			currentState = element.innerHTML;
		}
	});


	if(todoList[key].status == 'active'){
		todoList[key].status = 'completed';
	}else{
		todoList[key].status = 'active';
	}

	set_data(todoList);
	reset_inputs();
	reset_list();
	render_list(currentState);

}

/**
 * Filter Lists
 */
function filter_lists(){
	let filters = dom('.ifilter--wrapper li');
	let currentState = capitalizeFirstLetter('all');

	if(this.innerHTML == 'Completed'){
		currentState = 'Completed';		
	}else if(this.innerHTML == 'Active'){
		currentState = 'Active';		
	}
	
	filters.forEach(function(element, key){
		if(element.classList.contains('active') == true){
			element.classList.remove('active');
		}
	});

	this.classList.add('active');

	reset_inputs();
	reset_list();
	render_list(currentState);
}

/**
 * Delete List
 */
function delete_list(key){

	if (confirm('Are you sure?')) {

		let todoList = get_data();

		let currentState = capitalizeFirstLetter(todoList[key].status);

		todoList.splice(key,1);

		set_data(todoList);
		reset_inputs();
		reset_list();
		render_list(currentState);
	}

}

/**
 * Edit List
 */
function edit_list(key){

	let todoList = get_data();

	dom('.itask--name')[0].value = todoList[key].task;

	dom('.itask--name')[0].setAttribute('data-key',key);

	dom('.itask--button')[0].innerHTML = 'Save';

	
}
