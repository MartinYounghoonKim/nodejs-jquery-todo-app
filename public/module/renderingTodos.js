define([
	'jquery'
	,'ApiTodo'
], function($, ApiTodo){
	const renderingTodos = (options)=>{
		const templeteDom = options.templeteDom
		const bindingTarget = options.bindingTarget;
		const checkCompletedAllFunction = options.checkCompletedAllFunction;
		bindingTarget.children("li").remove();
		ApiTodo.render({
			templeteDom : templeteDom,
			bindingTarget : bindingTarget,
			checkCompletedAllFunction : checkCompletedAllFunction
		});
	}
	return renderingTodos;
})
