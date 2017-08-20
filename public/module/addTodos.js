define([
	'jquery'
	,'ApiTodo'
], function(
	$
	,ApiTodo
){
	const keyCode_enter = 13;
	const addTodoList = (options) => {
		const textElement = options.text;
		const userText = textElement.target.value;
		const templeteDom = options.templeteDom;
		const bindingTarget = options.bindingTarget;

		return new Promise( (resolve, reject) =>{
			if(!isTextEmpty(textElement) || !pressEnter(textElement)){
				return false;
			}

			ApiTodo.add({ text : userText });
			textElement.target.value="";
			resolve("Data connection Success");
		});
	}

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
