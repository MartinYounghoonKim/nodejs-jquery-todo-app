requirejs.config({
    baseUrl: './',
    paths:{
        'jquery': 'lib/jquery-1.9.1.min',

        //Controller
        'Main' : 'controller/Main'
    },
    shim:{
        'jquery':{
            exports:'$'
        },
		'jqueryUI':{
			deps: ['jquery'],
			exports :'jqueryUI'
		},
		'jqueryEasing':{
			deps: ['jquery'],
			exports :'jqueryEasing'
		}
    }
});

define([],function () {
    var BODY = document.body || document.documentElement;
    var TEMP = BODY.getAttribute("data-reference");
    require([TEMP]);
});
