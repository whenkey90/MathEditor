var App = {
	init : function(){
		App.manageKeys();
		App.manageDeleteEquation();
	},
	
	manageKeys : function(){
		var selector = $(".char-btn");
		selector.each(function(){
			var self = $(this);
			self.click(function(){
				var data = self.attr("data-char");
				$("#main-text").val($("#main-text").val() + data);
			});
		});
		
		$("#submit-btn").click(function(){
			alert("Expression : "+ $("#main-text").val());
			console.log("Expression : "+ $("#main-text").val());
		});
	},
	
	
	
	manageDeleteEquation : function(){
		$("#delete-btn").click(function(){
			var str = $("#main-text").val();
			$("#main-text").val(str.substring(0, str.length-1));
			console.log("Expression : "+ $("#main-text").val());
		});
	},		
}