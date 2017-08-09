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
                deleteTodoButton : dom.deleteTodoButton,
                completeCheckBox : dom.completeCheckBox
            }
        }
        function bindEvents(){
            obj.userTextingArea.on("keydown", function(e){ addTodoList(e) });
            $(document).on("click", obj.deleteTodoButton, function(){ deleteTodoList($(this))} );
            $(document).on("click", obj.completeCheckBox, function(){ toggleCompleted($(this)) } );
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
            me.closest("li").remove();
            /*
                지울때, 깜빡임 이슈로 임시 제거
                initializeTodoList();
                renderTodoList();
            */
        }

        function toggleCompleted(me){
            var todoList = me.closest("li");
            var isTodoCompleted = !todoList.hasClass("completed");
            var idx = todoList.data("primary-key");

            if(!isTodoCompleted){
                todoList.removeClass("completed");
            }else {
                todoList.addClass("completed");
            }
            isTodoCompleted === true ? isTodoCompleted = 1 : isTodoCompleted =0;
            ApiTodo('POST','/api/CheckTodo','Text',{idx:idx, isCompleted:isTodoCompleted} );
        }
        return {
            initialize :initialize
        }
    }());
    return todo;
})
