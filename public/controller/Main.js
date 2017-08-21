define([], function(){
    requirejs([
        'todo'
    ], function(todo) {
        todo.initialize({
            'todoListWrapper' : '#todo-list',
            'todoDom' : '#todo-dom',
            'userTextingArea' : '#new-todo',
            'deleteTodoButton' : '.destroy',
            'completeCheckBox':'.view .toggle',
            'completeAllCheckBox' : "#toggle-all",
            'filterButton' : '[data-filter]',
            'todoContents' : '.view label'
        })
    });
})
