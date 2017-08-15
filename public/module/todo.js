define([
    'jquery'
    ,'ApiTodo'
    ,'handlebars'
    ,'addTodos'
    ,'renderingTodos'
    ,'deleteTodo'
    ,'checkCompleted'
], function(
    $
    ,ApiTodo
    ,Handlebars
    ,addTodos
    ,renderingTodos
    ,deleteTodo
    ,checkCompleted
){
    (function(){}())
    var todo = (function(){
        var obj, selector;
        function initialize(dom){
            setSelector(dom);
            bindEvents();
            ApiTodo.render({
                templeteDom : obj.todoDom.html(),
                bindingTarget : obj.todoListWrapper
            });
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
            obj.userTextingArea.on("keydown", function(e){
                addTodos({
                    text : e,
                    templeteDom : obj.todoDom.html(),
                    bindingTarget : obj.todoListWrapper
                })
            });
            $(document).on("click", obj.deleteTodoButton, function(){ deleteTodoList($(this))} );
            $(document).on("click", obj.completeCheckBox, function(){ toggleCompleted($(this)) } );
        }

        function deleteTodoList($buttonElement){
            const primaryKey =  getParentElement($buttonElement).primaryKey;
            deleteTodo({
                primaryKey : primaryKey,
                templeteDom :obj.todoDom.html(),
                bindingTarget :obj.todoListWrapper
            });
        }

        function getParentElement(obj){
            return {
                parentElement : obj.closest("li"),
                primaryKey : obj.closest("li").data("primary-key")
            }
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
