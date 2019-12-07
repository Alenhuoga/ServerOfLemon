$(function() {

    var baseUrl = location.protocol + '//' + location.host;
  
    $(".push-btn").click(function() {
        var name = $('.name').val();
        var description = $('.desc').val();
        var createTime = new Date().getTime();

    

        if(description == "") {
            alert('请输入留言');
            return;
        }


        var postData = {
            'name' : name,
            'description' : description,
            'createTime' : createTime
        }

        $.ajax({
	        url: baseUrl + "/api/push",
	        type: 'POST',
	        dataType: 'json',
	        data: postData
	      })
	      .done(function (res) {
            if(res.status == 200) {
                alert("评论发布成功");
                location.href = './';
            }else if(res.status == 201){
                alert(res.message);
                location.href = './login';
            }
	      })
	      .fail(function () {
	        console.log("error");
	      })
	      .always(function () {
	        console.log("complete");
          });
              
    });

    
    
});