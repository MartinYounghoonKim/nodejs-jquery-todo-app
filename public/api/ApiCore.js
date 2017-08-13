define([
	'jquery'
], function($){
    const getData =(type, url, dataType,dataInfo)=>new Promise((resolve)=>{
		$.ajax({
			type:type,
			url:url,
			dataType:dataType,
			data:dataInfo,
			success:function(data){
				resolve({
					Todos :data
				})
			}
		})
	});
    return getData;
});
