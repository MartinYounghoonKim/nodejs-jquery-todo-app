define([
    'jquery'
    ,'ApiTodo'
], function(
    $
    ,ApiTodo
){
    var checkCompleted = (function(){
        const completedTodo = (todoTarget, primaryKey) =>{
            const completedTarget = todoTarget;
            const completedTargetPrimaryKey = primaryKey;
            const isTodoCompleted = completedTarget.hasClass("completed");
            let completedBoolean;
            
            isTodoCompleted === true ? completedTarget.removeClass("completed") : completedTarget.addClass("completed");
            isTodoCompleted === true ? completedBoolean = 0 : completedBoolean =1;
            ApiTodo.completed({
                primaryKey : completedTargetPrimaryKey,
                isCompleted : completedBoolean
            })
        }
        const isCompletedAllTodos = (inputElement)=> new Promise((resolve)=>{
            const completedCount = $(inputElement).size();

            ApiTodo.isCompletedAll(completedCount)
            .then( function(data){
                resolve(data);
            });
        });

        const completedAllTodos = (options) =>{
            let isCompletedAllTodos = options.isCompletedAllTodo;
            let completeAllCheckBox = options.completeAllCheckBox;
            let completeCheckBox = options.completeCheckBox;
            let todoList = options.todoList;

            isCompletedAllTodos === true ? isCompletedAllTodos = 1 : isCompletedAllTodos= 0;
            if(isCompletedAllTodos){
                completeAllCheckBox.prop("checked","checked");
                completeCheckBox.prop("checked","checked");
                todoList.addClass("completed");
            } else {
                completeAllCheckBox.removeProp("checked");
                completeCheckBox.removeProp("checked")
                todoList.removeClass("completed");
            }

            ApiTodo.completTodoAll(isCompletedAllTodos)
        }

        return {
            completedTodo : completedTodo,
            isCompletedAllTodos :isCompletedAllTodos,
            completedAllTodos : completedAllTodos
        }
    }())
    return checkCompleted;
})
