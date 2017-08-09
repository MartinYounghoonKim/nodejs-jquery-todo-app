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
            bindEvents();
        }
        function setSelector(dom){
            obj = {
                todoListWrapper : $(dom.todoListWrapper),
                todoDom : $(dom.todoDom),
                userTextingArea : $(dom.userTextingArea),
                deleteTodoButton : dom.deleteTodoButton
            }
        }
        function bindEvents(){
            obj.userTextingArea.on("keydown", function(e){ addTodoList(e) });
            $(document).on("click", obj.deleteTodoButton, function(){ deleteTodoList($(this))} );
        }
        function renderTodoList(){
            ApiTodo('GET','/api/Todos','JSON','', processApi);
            function processApi(result){
                var todoDom = obj.todoDom.html();
                var templete = Handlebars.compile(todoDom);
                var data = { "Todos" : result };
                var preparedDom = templete(data);
                obj.todoListWrapper.append(preparedDom);
            }
        }

        function addTodoList(evt){
            var userText = evt.target.value;
            if(!userText || evt.keyCode !== 13){
                return false;
            }
            ApiTodo('POST','/api/Todos','Text',{text:userText});
            initializeTodoList();
            renderTodoList();
            evt.target.value="";
        }

        function initializeTodoList(){
            obj.todoListWrapper.children('li').remove();
        }

        function deleteTodoList(me){
            var idx = me.closest("li").data("primary-key");
            ApiTodo('POST','/api/DeleteTodo','Text',{idx:idx});
            initializeTodoList();
            renderTodoList();
        }
        return {
            initialize :initialize
        }
    }());
    return todo;
})
