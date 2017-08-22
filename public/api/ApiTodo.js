define([
    'jquery'
    ,'ApiCore'
], function($, ApiCore){
    const renderingApiUrl = {
        all : '/api/Todos/all',
        active : '/api/Todos/active',
        completed : '/api/Todos/completed'
    }
    const getData = {
        render:(filter)=> new Promise((resolve)=>{
            ApiCore('GET',renderingApiUrl[filter],'JSON','')
            .then(function(data){
                resolve(data)
            });
        }),
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
        },
        editTodo:(options)=> new Promise((resolve)=>{
            const primaryKey = options.primaryKey;
            const editedText = options.editedText;

            ApiCore('POST','/api/EditTodo','Text', { idx : primaryKey, todo :editedText })
            .then(()=>{
                resolve("test");
            });
        })
    }

    const removeTodoList = (removeTarget)=>{
		removeTarget.remove();
	}

    return getData;
});
