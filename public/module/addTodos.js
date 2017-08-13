define([
	'jquery'
	,'ApiTodo'
	,'ApiTodo'
], function($, ApiTodo, ApiTodo){
	const keyCode_enter = 13;
	const addTodoList = (options) =>{
		const textElement = options.text;
		const userText = textElement.target.value;
		const templeteDom = options.templeteDom;
		const bindingTarget = options.bindingTarget;

		if(!isTextEmpty(textElement) || !pressEnter(textElement)){
			return false;
		}
		ApiTodo.add({ text : userText });
		ApiTodo.render({
			templeteDom : templeteDom,
			bindingTarget : bindingTarget
		});
		textElement.target.value="";
	};
	
	const isTextEmpty = (evt)=>{
		let userText = evt.target.value;
		if(userText){
			return true
		} else {
			return false;
		}
	}
	const pressEnter = (evt)=>{
		let pressedUserKeyCode = evt.keyCode;
		if(pressedUserKeyCode === 13){
			return true;
		} else {
			return false;
		}
	}
	return addTodoList;
})
