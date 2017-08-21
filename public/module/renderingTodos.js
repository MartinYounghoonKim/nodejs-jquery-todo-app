define([
	'jquery'
	,'ApiTodo'
	,'handlebars'
], function($, ApiTodo, Handlebars){
	const renderingTodos = (options)=>{
		const bindingTarget = options.bindingTarget;
		const checkCompletedAllFunction = options.checkCompletedAllFunction;
		ApiTodo.render()
		.then(function(data){
			console.log(data);
			const templeteDom = options.templeteDom;
			const templete = Handlebars.compile(templeteDom);
			const preparedDom = templete(data);
			bindingTarget.html(preparedDom);
			checkCompletedAllFunction();
		});
	}
	return renderingTodos;
})
