define([
    'jquery'
    ,'ApiCore'
    ,'handlebars'
], function($, ApiCore, Handlebars){
    const getData = {
        render:(options)=>{
            const todoDom = options.templeteDom;
            const templete = Handlebars.compile(todoDom);
            const bindingTarget = options.bindingTarget;
            removeTodoList( bindingTarget.children("li") );
            ApiCore('GET','/api/Todos','JSON','')
            .then(function(data){
                const preparedDom = templete(data);
    			bindingTarget.append(preparedDom);
            });
        },
        add:(options)=>{
            const userText =options.text;
            ApiCore('POST','/api/Todos','Text',{text:userText})
            .then(function(data){
                console.log(data)
            });
        },
        deleteTodo:(options)=>{
            const primaryKey = options.primaryKey;
            ApiCore('POST','/api/DeleteTodo','Text',{ idx:primaryKey })
            .then(function(data){
                
            })

        }
    }

    const removeTodoList = (removeTarget)=>{
		removeTarget.remove();
	}

    return getData;
});
