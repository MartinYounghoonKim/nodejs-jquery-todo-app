define([
	'jquery'
	,'ApiTodo'
], function($,ApiTodo){
	const deleteTodo = (options)=>{
		const primaryKey = options.primaryKey;
		ApiTodo.deleteTodo({
			primaryKey :primaryKey,
			templeteDom : templeteDom,
			bindingTarget : bindingTarget
		});
	}
})
