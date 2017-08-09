define(['jquery'], function($){
    var getData = function(type, url, dataType,dataInfo,callback){
        $.ajax({
            type:type,
            url:url,
            dataType:dataType,
            data:dataInfo,
            success : function(data){
                if(!data){
                    return false;
                }
                if(callback){
                    callback(data);
                }
            },
            error : function(xhr, status, error) {
                console.log(error)
                alert("에러가 발생했습니다.");
            }
        });
    }
    return getData;
});
