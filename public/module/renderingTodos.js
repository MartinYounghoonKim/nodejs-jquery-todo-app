define([
	'jquery'
	,'ApiTodo'
	,'handlebars'
], function($, ApiTodo, Handlebars){
	const renderingTodos = (options)=>{
		const bindingTarget = options.bindingTarget;
		const checkCompletedAllFunction = options.checkCompletedAllFunction;
		const filter = options.filter;

		ApiTodo.render(filter)
		.then(function(data){
			const templeteDom = options.templeteDom;
			const templete = Handlebars.compile(templeteDom);
			const preparedDom = templete(data);
			bindingTarget.html(preparedDom);
			checkCompletedAllFunction();
		});
	}
	return renderingTodos;
})
