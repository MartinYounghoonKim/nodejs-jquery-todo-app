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
            /*ApiTodo.render({
                templeteDom : obj.todoDom.html(),
                bindingTarget : obj.todoListWrapper,
                checkCompletedAllFunction : checkedCompletedAll
            });*/
            renderingTodoList();

        }
        function setSelector(dom){
            obj = {
                todoListWrapper : $(dom.todoListWrapper),
                todoDom : $(dom.todoDom),
                userTextingArea : $(dom.userTextingArea),
                deleteTodoButton : dom.deleteTodoButton,
                completeCheckBox : dom.completeCheckBox,
                completeAllCheckBox : $(dom.completeAllCheckBox)
            }
        }
        function bindEvents(){
            obj.userTextingArea.on("keydown", function(e){
                addTodo(e);
            });
            $(document).on("click", obj.deleteTodoButton, function(){ deleteTodoList($(this))} );
            $(document).on("click", obj.completeCheckBox, function(){ toggleCompleted($(this)) } );
        }

        function renderingTodoList(){
            renderingTodos({
                templeteDom : obj.todoDom.html(),
                bindingTarget : obj.todoListWrapper,
                checkCompletedAllFunction : checkedCompletedAll
            });
        }

        function addTodo(evt){
            addTodos({
                text : evt,
                templeteDom : obj.todoDom.html(),
                bindingTarget : obj.todoListWrapper
            });
            renderingTodoList();
        }

        function deleteTodoList($buttonElement){
            const primaryKey =  getParentElement($buttonElement).primaryKey;
            deleteTodo({
                primaryKey : primaryKey,
                templeteDom :obj.todoDom.html(),
                bindingTarget :obj.todoListWrapper
            });
            renderingTodoList();
        }

        function getParentElement(obj){
            return {
                parentElement : obj.closest("li"),
                primaryKey : obj.closest("li").data("primary-key")
            }
        }

        function toggleCompleted($checkboxElement){
            const primaryKey = getParentElement($checkboxElement).primaryKey;
            const todoList = getParentElement($checkboxElement).parentElement;

            checkCompleted.completedTodo(todoList, primaryKey);
            checkedCompletedAll();
        }

        function checkedCompletedAll(){
            checkCompleted.isCompletedAllTodos(obj.completeCheckBox, obj.completeAllCheckBox);
        }
        return {
            initialize :initialize
        }
    }());
    return todo;
})
