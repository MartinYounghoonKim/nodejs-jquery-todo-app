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
        const isCompletedAllTodos = (inputElement, $allInputElement)=>{
            const completeAllCheckBox = $allInputElement;
            const completedCount = $(inputElement).size();

            ApiTodo.isCompletedAll(completedCount, completeAllCheckBox);
        }
        return {
            completedTodo : completedTodo,
            isCompletedAllTodos :isCompletedAllTodos
        }
    }())
    return checkCompleted;
})
