define(['jquery'], function($){
    var getData = function(type, url, dataType, callback ){
        var result;
        $.ajax({
            type:type,
            url:url,
            dataType:dataType,
            success : function(data){
                callback(data);
                if(!data){
                    return false;
                }
                result=data;
            },
            error : function(xhr, status, error) {
                console.log(xhr, + "\n" + status,+ "\n" + error)
                alert("에러가 발생했습니다.");
            }
        });
    }
    return getData;
});
