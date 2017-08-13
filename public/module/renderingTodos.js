define([
	'jquery'
	,'ApiTodo'
], function($, ApiTodo){
	const renderingTodos = (options)=>{
		const templeteDom = options.templeteDom
		const bindingTarget = options.bindingTarget;
		bindingTarget.children("li").remove();
		ApiTodo.render({
			templeteDom : templeteDom,
			bindingTarget : bindingTarget
		});
	}
	return renderingTodos;
})
