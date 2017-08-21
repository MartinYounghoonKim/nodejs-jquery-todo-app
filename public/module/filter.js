define([
    'jquery'
    ,'todo'
], function($, todo){
    const filteringTodo = (()=>{
        let obj;

        const initialize = (dom)=>{
            setSelector(dom);
            bindEvents();
        }

        const setSelector = (dom)=>{
            obj={
                todoListWrapper : $(dom.todoListWrapper),
                todoDom : $(dom.todoDom),
                filterButton : $(dom.filterButton)
            }
        }

        const bindEvents = ()=>{
            obj.filterButton.on("click", function(e){
                e.preventDefault();
                filtering( $(this) );
            });
        }

        const filtering = ($filterButtomelement)=>{
            const filteringFlag = $filterButtomelement.data("filter");


        }

        const renderingTodoList =()=>{
            renderingTodos({
                templeteDom : obj.todoDom.html(),
                bindingTarget : obj.todoListWrapper,
                checkCompletedAllFunction : autoCheckedCompletedAll
            });
        }

        return {
            initialize :initialize
        }
    })();
    return filteringTodo;
})
