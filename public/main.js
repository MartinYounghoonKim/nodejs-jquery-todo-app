requirejs.config({
    baseUrl: './',
    paths:{
        'jquery': 'lib/jquery-1.9.1.min'
        ,'handlebars' : 'lib/handlebars-v4.0.5'

        //Controller
        ,'Main' : 'controller/Main'
        //api
        ,'ApiTodo' : 'api/ApiTodo'
        //Module
        ,'todo' : 'module/todo'
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
