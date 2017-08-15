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
            const checkCompletedAllFunction = options.checkCompletedAllFunction;

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
        isCompletedAll:(completedCount, $allInputElement)=>{
            const completeAllCheckBox = $allInputElement;
            ApiCore('GET','/api/CheckTodoAll','JSON','')
            .then(function(data){
                const isAllCompleted = data.Todos.length == completedCount;
                console.log(completedCount)
                if(isAllCompleted){
                    completeAllCheckBox.prop("checked","checked");
                } else {
                    completeAllCheckBox.removeProp("checked");
                }
            })
        }
    }

    const removeTodoList = (removeTarget)=>{
		removeTarget.remove();
	}

    return getData;
});
