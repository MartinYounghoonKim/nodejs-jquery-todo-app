define([
    'jquery'
    ,'director'
    ,'handlebars'
    ,'addTodos'
    ,'renderingTodos'
    ,'deleteTodo'
    ,'checkCompleted'
    ,'editTodo'
], function(
    $
    ,director
    ,Handlebars
    ,addTodos
    ,renderingTodos
    ,deleteTodo
    ,checkCompleted
    ,editTodo
){

    var todo = (function(){
        let obj, selector, todoFilter;
        const initialize = (dom) =>{
            setSelector(dom);
            bindEvents();
            filteringRouter();
        }

        const filteringRouter = ()=>{
            new Router({
				'/:filter': function (filter) {
                    todoFilter =filter;
					renderingTodoList();
                    activeFilterButton();
				}
			}).init('/all');
        }

        const setSelector = (dom) =>{
            obj = {
                todoListWrapper : $(dom.todoListWrapper),
                todoDom : $(dom.todoDom),
                userTextingArea : $(dom.userTextingArea),
                deleteTodoButton : dom.deleteTodoButton,
                completeCheckBox : dom.completeCheckBox,
                completeAllCheckBox : $(dom.completeAllCheckBox),
                filterButton : $(dom.filterButton),
                todoContents : dom.todoContents,
                todoEditText : dom.todoEditText
            }
        }

        const bindEvents =()=>{
            obj.userTextingArea.on("keydown", function(e){
                addTodo(e);
            });
            $(document).on("click", obj.deleteTodoButton, function(){ deleteTodoList($(this), this)} );
            $(document).on("click", obj.completeCheckBox, function(){ toggleCompleted($(this)) } );
            obj.completeAllCheckBox.on("click",function(){ checkCompleteAll($(this)) });
            obj.todoListWrapper
                .on("dblclick", obj.todoContents, function(){ startEditing( $(this) ) })
                .on("focusout", obj.todoEditText, finishEditing )
                .on("keyup", obj.todoEditText, isEditCompleted );
        }

        const renderingTodoList =()=>{
            renderingTodos({
                templeteDom : obj.todoDom.html(),
                bindingTarget : obj.todoListWrapper,
                checkCompletedAllFunction : autoCheckedCompletedAll,
                filter : todoFilter
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
                renderingTodoList("active");
            })
        }

        const deleteTodoList = ($buttonElement, me) =>{
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
            renderingTodoList();
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

        const activeFilterButton = ()=>{
            obj.filterButton.removeClass("selected");
            obj.filterButton.each(function(){
                if($(this).data('filter') === todoFilter){
                    $(this).addClass("selected")
                }
            })
        }

        const startEditing = ($labelElement)=>{
            const textValue = $labelElement.text();
            const todoList = getParentElement($labelElement).parentElement;
            const textBox = todoList.children(".edit");

            todoList.addClass("editing");
            textBox.val(textValue).focus();
        }

        const finishEditing = (e) =>{
            const editedTextElement = e.target;
            const editedText = editedTextElement.value;
            const todoList = $(editedTextElement.parentNode);
            const primaryKey = todoList.data("primary-key");

            editTodo({
                editedText : editedText,
                todoList : todoList,
                primaryKey : primaryKey
            });
            renderingTodoList();
        }
        const isEditCompleted = (e)=>{
            const enterKeyCode = 13;

            if(e.keyCode !== enterKeyCode) {
                return false;
            }
            finishEditing(e);
        }

        return {
            initialize :initialize
        }
    }());
    return todo;
})
