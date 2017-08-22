define([
    'jquery'
    ,'ApiTodo'
], function($,ApiTodo){
    const editTodo=(options)=>{
        const editedText = options.editedText;
        const todoList = options.todoList;
        const primaryKey = options.primaryKey;

        ApiTodo.editTodo({
            primaryKey : primaryKey,
            editedText : editedText
        })
        .then((data)=>{
            todoList.removeClass("editing");
        })
    }

    return editTodo;
})
