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
        let obj, selector;
        const initialize = (dom) =>{
            setSelector(dom);
            bindEvents();
            renderingTodoList();
        }
        
        const setSelector = (dom) =>{
            obj = {
                todoListWrapper : $(dom.todoListWrapper),
                todoDom : $(dom.todoDom),
                userTextingArea : $(dom.userTextingArea),
                deleteTodoButton : dom.deleteTodoButton,
                completeCheckBox : dom.completeCheckBox,
                completeAllCheckBox : $(dom.completeAllCheckBox)
            }
        }

        const bindEvents =()=>{
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
        const addTodo = (evt) =>{
            addTodos({
                text : evt,
                templeteDom : obj.todoDom.html(),
                bindingTarget : obj.todoListWrapper
            });
            // TODO: 랜더링되는 부분
            //renderingTodoList();
        }

        const deleteTodoList = ($buttonElement) =>{
            const primaryKey =  getParentElement($buttonElement).primaryKey;
            deleteTodo({
                primaryKey : primaryKey,
                templeteDom :obj.todoDom.html(),
                bindingTarget :obj.todoListWrapper
            });
            renderingTodoList();
        }

        const getParentElement = (obj) => ({
            parentElement : obj.closest("li"),
            primaryKey : obj.closest("li").data("primary-key")
        });

        const toggleCompleted = ($checkboxElement)=>{
            const primaryKey = getParentElement($checkboxElement).primaryKey;
            const todoList = getParentElement($checkboxElement).parentElement;

            checkCompleted.completedTodo(todoList, primaryKey);
            checkedCompletedAll();
        }

        function checkedCompletedAll(){
            //checkCompleted.isCompletedAllTodos(obj.completeCheckBox, obj.completeAllCheckBox);
        }
        return {
            initialize :initialize
        }
    }());
    return todo;
})
