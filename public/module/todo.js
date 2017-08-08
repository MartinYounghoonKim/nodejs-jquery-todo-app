define([
    'jquery'
    ,'ApiTodo'
    ,'handlebars'
], function($, ApiTodo, Handlebars){
    (function(){}())
    var todo = (function(){
        var obj, selector;
        function initialize(dom){
            setSelector(dom);
            renderTodoList();
        }
        function setSelector(dom){
            obj = {
                todoListWrapper : $(dom.todoListWrapper),
                todoDom : $(dom.todoDom)
            }
        }
        function renderTodoList(){
            ApiTodo('GET','http://localhost:2403/todos','JSON', processApi);
            function processApi(result){
                var todoDom = obj.todoDom.html();
                var templete = Handlebars.compile(todoDom);
                var data = { "Todos" : result };
                var preparedDom = templete(data);
                obj.todoListWrapper.append(preparedDom);
            }
        }
        function bindEvents(){

        }
        return {
            initialize :initialize
        }
    }());
    return todo;
})
