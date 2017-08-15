define([
	'jquery'
	,'ApiTodo'
], function($,ApiTodo){
	const deleteTodo = (options)=>{
		const primaryKey = options.primaryKey;
		const templeteDom = options.templeteDom;
		const bindingTarget = options.bindingTarget;
		ApiTodo.deleteTodo({
			primaryKey :primaryKey
		});
	}
	return deleteTodo;
})
