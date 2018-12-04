(function(){
    
	"use strict";

	todo_create_element('main','imain--container imain--wrapper');

	function todo_create_element(tag_name,class_name = false){
		
		class_name = class_name.split(" ");
		
		let new_dom = document.createElement(tag_name);
		
		if(class_name.length > 0){
			class_name.forEach(function(el) {
			  new_dom.classList.add(el);
			});
		}

		console.log(new_dom);
		return new_dom;
	}

})();