define([
    'jquery'
    ,'handlebars'
    ,'addTodos'
    ,'renderingTodos'
    ,'deleteTodo'
    ,'checkCompleted'
], function(
    $
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
            obj.completeAllCheckBox.on("click",function(){ checkCompleteAll($(this)) })
        }

        const renderingTodoList =()=>{
            renderingTodos({
                templeteDom : obj.todoDom.html(),
                bindingTarget : obj.todoListWrapper,
                checkCompletedAllFunction : autoCheckedCompletedAll
            });
        }
        const renderingFooter = ()=>{
            // TODO: 하단 Footer 영역 랜더링 추가
        }
        const addTodo = (evt) =>{
            addTodos({
                text : evt,
                templeteDom : obj.todoDom.html(),
                bindingTarget : obj.todoListWrapper
            })
            .then( (data)=>{
                renderingTodoList();
            })
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
            autoCheckedCompletedAll();
        }

        const autoCheckedCompletedAll = () =>{
            checkCompleted.isCompletedAllTodos(obj.completeCheckBox)
            .then((isCompletedAll)=>{
                if(isCompletedAll) {
                    obj.completeAllCheckBox.prop("checked","checked");
                } else {
                    obj.completeAllCheckBox.removeProp("checked");
                }
            });
        };

        const checkCompleteAll=()=>{
            const $checkBoxElement = $(obj.completeCheckBox);
            const todoList = getParentElement($checkBoxElement).parentElement;

            checkCompleted.isCompletedAllTodos(obj.completeCheckBox)
            .then((isCompletedAll)=>{
                let isCompletedAllTodo = !isCompletedAll;

                checkCompleted.completedAllTodos({
                    completeAllCheckBox :obj.completeAllCheckBox,
                    completeCheckBox : $(obj.completeCheckBox),
                    isCompletedAllTodo : isCompletedAllTodo,
                    todoList : todoList
                });
            });
        }

        return {
            initialize :initialize
        }
    }());
    return todo;
})
