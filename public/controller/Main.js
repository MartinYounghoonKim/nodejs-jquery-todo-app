define([], function(){
    requirejs([
        'todo'
    ], function(todo) {
        todo.initialize({
            'todoListWrapper' : '#todo-list',
            'todoDom' : '#todo-dom'
        })
    });
})
