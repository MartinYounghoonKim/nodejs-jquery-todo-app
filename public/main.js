requirejs.config({
    baseUrl: '/',
    paths:{
        'jquery': 'lib/jquery-1.9.1.min'
        ,'handlebars' : 'lib/handlebars-v4.0.5'
        ,'director' :  'lib/director.min'

        //Controller
        ,'Main' : 'controller/Main'
        //api
        ,'ApiCore' : 'api/ApiCore'
        ,'ApiTodo' : 'api/ApiTodo'
        //Module
        ,'todo' : 'module/todo'
        ,'addTodos' : 'module/addTodos'
        ,'renderingTodos' : 'module/renderingTodos'
        ,'deleteTodo' : 'module/deleteTodo'
        ,'checkCompleted' : 'module/checkCompleted'
        ,'filter' : 'module/filter'
        ,'editTodo' : 'module/editTodo'
    },
    shim:{
        'jquery':{
            exports:'$'
        }
    }
});

define([],function () {
    var BODY = document.body || document.documentElement;
    var TEMP = BODY.getAttribute("data-reference");
    require([TEMP]);
});
