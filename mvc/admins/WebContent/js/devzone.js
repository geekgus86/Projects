
$(document).ready(function(){
$("#go").click(function(){
		var id=$("#nameid").val();
		var pass=$("#namepass").val();
		if(id=="sith" && pass=="gus"){
			$("#clean").html("Insert your Query! <br/><br/> <textarea id='foo'cols='60' rows='20' /> <br/><br/> <input type='button' id='queryexec' name='queryexec' value='Submit' onclick='bu()' /> <input type='button' id='return' name='return' value='Return' />" +
					"<input type='hidden' id='valrec' name='valrec' value='' />");
		}
		else{
			alertify.alert("Your information is incorrect, try again!");
		}
	});



$("#return").click(function(){
	window.location.href="admin_home.jsp";
});

});

function bu(){
	var queryfactory=document.getElementById("foo").value;
	 $.post("/admins/devZone", {queryfactory:queryfactory }, function() {

	   });
}