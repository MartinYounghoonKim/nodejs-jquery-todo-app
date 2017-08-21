define([
    'jquery'
    ,'ApiCore'
    ,'handlebars'
], function($, ApiCore, Handlebars){
    const renderingApiUrl = {
        all : '/api/Todos/All',
        active : '/api/Todos/Active',
        completed : '/api/Todos/Completed'
    }
    const getData = {
        render:(options)=>{
            const todoDom = options.templeteDom;
            const templete = Handlebars.compile(todoDom);
            const bindingTarget = options.bindingTarget;
            const checkCompletedAllFunction = options.checkCompletedAllFunction;
            //renderingApiUrl

            removeTodoList( bindingTarget.children("li") );
            ApiCore('GET','/api/Todos','JSON','')
            .then(function(data){
                const preparedDom = templete(data);
    			bindingTarget.append(preparedDom);
                checkCompletedAllFunction();
            });
        },
        add:(options)=>{
            const userText =options.text;
            ApiCore('POST','/api/Todos','Text',{text:userText});
        },
        deleteTodo:(options)=>{
            const primaryKey = options.primaryKey;
            ApiCore('POST','/api/DeleteTodo','Text',{ idx:primaryKey });
        },
        completed:(options)=>{
            const primaryKey = options.primaryKey;
            const isCompleted = options.isCompleted;
            ApiCore('POST','/api/CheckTodo','Text',{ idx:primaryKey, isCompleted : isCompleted });
        },
        isCompletedAll:(completedCount)=>{
            return new Promise( function(resolve, reject){
                ApiCore('GET','/api/CheckTodoAll','JSON','')
                .then( function(data){
                    const isAllCompleted = data.Todos.length == completedCount;

                    resolve(isAllCompleted);
                });
            });
        },
        checkTodo:(options)=>{
            const primaryKey = options.primaryKey;
            const isCompleted = options.isCompleted;
            ApiCore('POST','/api/CheckTodo','Text', { idx:primaryKey, isCompleted:isCompleted })
        },
        completTodoAll : (completeTodo) =>{
            const isCompleteAllTodo = completeTodo;

            ApiCore('POST','/api/CheckTodoAll','Text', { isCompleted:isCompleteAllTodo })
        }
    }

    const removeTodoList = (removeTarget)=>{
		removeTarget.remove();
	}

    return getData;
});
