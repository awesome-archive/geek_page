/**
 * blog
 */
function blogConfig(){
	
	var self=this;
	
	this.init=function(){
		
		$.post(HOST_URL+'/blog/getBloglabelList',{"userId":0},function(data){
			var result = data.data;
			var html="";
			$.each(result, function(index, itemobj) {
				var id=result[index].id;  
				var name=result[index].name;
				html = "<div class=\"mdui-col-xs-12 mdui-col-sm-6 system_type\"><i class=\"Hui-iconfont\">&#xe6c1;</i><a onclick=\"blog_config.selectBlog('"+id+"')\" href=\"javascript:void()\">"+name+"</a></div>";
				$("#blogType").append(html);
			});
		});
        
        
        self.initBlogData(0,true,0);
        self.initHotBlogList();
        self.initHotBlogUserList();
        
	}
	
	this.initBlogData=function(pageNum,flag,systemTypeId){
		
		$.post(HOST_URL+"/blog/getAllBlogList",{"page":pageNum,"rows":15,"systemTypeId":systemTypeId},function(data){
			
			var result = data.data;
			var html="";
			
			if(result.length>0){
				$.each(result, function(index, itemobj) {
					var id=result[index].id;  
					var browseCount=result[index].browseCount;
					var collectCount=result[index].collectCount;
					var headImgUrl=result[index].headImgUrl;
					var content=result[index].content;
					var subtitle=result[index].subtitle;
					var title=result[index].title;
					var userId=result[index].userId;
					var typeId=result[index].typeId;
					var typeName=result[index].typeName;
					var systemTypeName=result[index].systemTypeName;
					var systemTypeId=result[index].systemTypeId;
					var userName=result[index].userName;
					var labelName=result[index].labelName;
					var createTime=result[index].createTime;
					var commentCnt=result[index].commentCnt;
					createTime = createTime.replace(/ /,"T");
					
					html += "<li class=\"mdui-list-item mdui-ripple mdui-p-t-3 mdui-p-b-3\" onclick=\"blog_config.blogDetailed("+id+")\">";
								html += "<div class=\"mdui-img-circle\">";
									html += "<img src='"+IMAGE_URL+headImgUrl+"' width=\"70\" height=\"70\">";
									html += "<div class=\"mdui-text-center mdui-m-t-2\">";
										html += "<span style=\"font-weight: bold;color: #636363;\">"+userName+"</span>";
									html += "</div>";
								html += "</div>";
								html += "<div class=\"mdui-list-item-content mdui-m-l-1 mdui-p-l-1\" style=\"border-left: 1px solid ghostwhite;\">";
	      							html += "<div class=\"mdui-list-item-title\" style=\"font-weight: bold;font-size: 18px;\">"+title+"</div>";
	      							html += "<div class=\"mdui-list-item-text mdui-list-item-two-line mdui-m-t-2\">"+subtitle+"</div>";
		      						html += "<div class=\"mdui-card-actions mdui-m-t-2\">";
		      							html += "<span class=\"lable\" style=\"font-weight: bold;color: #636363;\">"+systemTypeName+"</span> • <span class=\"lable\" style=\"font-weight: bold;color: #636363;\">"+typeName+"</span> •";
		      							html += "<time class=\"timeago\" datetime="+createTime+" style=\"color: grey;\"></time>";
		      							html += "<div class=\"mdui-float-right\">";
		      								html += "<i class=\"Hui-iconfont\" style=\"color: #3F3F3F;font-size: 20px;\">&#xe725;</i><span style=\"font-size: 12px;color: grey;\">"+browseCount+"</span>&nbsp;&nbsp;&nbsp;";
		      								html += "<i class=\"Hui-iconfont\" style=\"color: #3F3F3F;font-size: 20px;\">&#xe69e;</i><span style=\"font-size: 12px;color: grey;\">"+collectCount+"</span>&nbsp;&nbsp;&nbsp;";
		      								html += "<i class=\"Hui-iconfont\" style=\"color: #3F3F3F;font-size: 20px;\">&#xe622;</i><span style=\"font-size: 12px;color: grey;\">"+commentCnt+"</span>";
		      							html += "</div>";
								  	html += "</div>";
    							html += "</div>";
							html += "</li>";
							html += "<div class=\"line\"></div>";
				
				});
			}else{
				var html="<button class=\"mdui-btn mdui-btn-block mdui-color-grey-100 mdui-ripple\">暂无数据！</button>";
			}
			
			$("#blogList").html(html);
	  
			if(flag){
				self.pageable(data.totalPageNumber,systemTypeId);
			}
			
			$(".timeago").timeago();
			
			//动态设置高度
			var m_Iframe = $(window.parent.document).find("#m_Iframe");
			m_Iframe.height($("#blogPage").height()+20);
		});
	}
	
	this.initHotBlogList=function(){
		
		$.post(HOST_URL+"/blog/getHotBlogList",{"page":0,"rows":10},function(data){
			
			var result = data.data;
			var html="";
			
			if(result.length>0){
				$.each(result, function(index, itemobj) {
					var id=result[index].id;  
					var browseCount=result[index].browseCount;
					var collectCount=result[index].collectCount;
					var headImgUrl=result[index].headImgUrl;
					var content=result[index].content;
					var subtitle=result[index].subtitle;
					var title=result[index].title;
					var userId=result[index].userId;
					var typeId=result[index].typeId;
					var typeName=result[index].typeName;
					var systemTypeName=result[index].systemTypeName;
					var systemTypeId=result[index].systemTypeId;
					var userName=result[index].userName;
					var labelName=result[index].labelName;
					var createTime=result[index].createTime;
					var commentCnt=result[index].commentCnt;
					createTime = createTime.replace(/ /,"T");
					
					html += "<li class=\"mdui-list-item mdui-ripple\" onclick=\"blog_config.blogDetailed("+id+")\">";
					html += "<div class=\"mdui-img-circle\"><img src='"+IMAGE_URL+headImgUrl+"' width=\"40\" height=\"40\"></div>";
					html += "<div class=\"mdui-list-item-content mdui-m-l-1\" style=\"font-size:15px;color:dimgray;\">"+title+"</div>";
					html += "</li>";
					html += "<div class=\"line\"></div>";
				
				});
			}else{
				var html="<button class=\"mdui-btn mdui-btn-block mdui-color-grey-100 mdui-ripple\">暂无数据！</button>";
			}
			
			$("#hotBlog").html(html);
			
		});
	}
	
	this.initHotBlogUserList=function(){
		
		$.post(HOST_URL+"/blog/getHotBlogUserList",{"page":0,"rows":8},function(data){
			
			var result = data.data;
			var html="";
			
			if(result.length>0){
				$.each(result, function(index, itemobj) {
					var headImgUrl=result[index].headImgUrl;
					var userId=result[index].userId;
					var userName=result[index].userName;
					var commentCnt=result[index].commentCnt;
					
					html += "<div class=\"mdui-col-xs-6 mdui-list-item mdui-center mdui-p-t-1 mdui-p-b-1\" style=\"border-right: 1px solid ghostwhite; border-bottom: 1px solid ghostwhite;cursor: pointer;\" onclick=\"blog_config.goToUser('"+userName+"')\">";
					html += "<div class=\"mdui-img-circle\">";
					html += "<img src='"+IMAGE_URL+headImgUrl+"' width=\"70\" height=\"70\" class=\"mdui-center\">";
					html += "<div class=\"mdui-text-center\">";
					html += "<span style=\"font-weight: bold;color: #636363;\">"+userName+"</span>";
					html += "</div></div></div>";
				
				});
			}else{
				var html="<button class=\"mdui-btn mdui-btn-block mdui-color-grey-100 mdui-ripple\">暂无数据！</button>";
			}
			
			$("#hotBlogUser").html(html);
			
		});
	}
	
	//分页
	this.pageable=function(totalPageNumber,systemTypeId){
		layui.use(['laypage', 'layer'], function(){
  			var laypage = layui.laypage;
  			layer = layui.layer;
		  	laypage({
		    	cont: 'paging',
		    	pages: totalPageNumber, //得到总页数
		    	jump: function(obj){
					self.initBlogData(obj.curr-1,false,systemTypeId);
		    	}
		  	});
  
		});
	}
	
	this.selectBlog=function(id){
		self.initBlogData(0,true,id);
	}
	
	/**
	 * 跳转到blog详情页
	 */
	this.blogDetailed=function(id){
		$(window.parent.document).find("#m_Iframe").attr("src","view/blogDetailPage.html?id="+id).attr("name","blogDetailPage");
	}
	
	/**
	 * 跳转到用户详情页
	 */
	this.goToUser=function(id){
		$(window.parent.document).find("#m_Iframe").attr("src","view/userPage.html?id="+id).attr("name","userPage");
	}
	
	self.init();
	
}
