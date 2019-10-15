$(function(){
	$("#mainMenu").hide();
	$("#menu").hide();
	$(".optionItem")
		.hover(function() {
			$(this).animate({marginLeft: "15px"}, 300);
		},
		function() {
			$(this).animate({marginLeft: "0px"}, 300);
		});
	$("#menuwrapper")
		.mouseenter(function() {
			var typeArrow = "";
			$("#menu").show("blind", "slow");
			if($("#menu").is(":visible")) {
				typeArrow = "arrowDown.png";
			} else {
				typeArrow = "arrowUp.png";
			}
			$("#arrow").attr('src', "/sidiweb/imagenes/" + typeArrow);
		})
		.mouseleave(function() {
			$("#menu").hide("blind", "slow");
		});
	$("#menuContainer").append($("#menuwrapper"));
	$("#estatusContainer").append($("#estatusWrapper"));
	$("#options a.insidecontent").bind("click", function() {
		var url = $(this).attr("href");
		$("#menu").hide();
		$("#innercontent").load(url);
		return false;
	});
});