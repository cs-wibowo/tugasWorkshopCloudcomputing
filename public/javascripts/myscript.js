// JavaScript Document

$(document).ready(function() {
	var socket = io.connect('http://localhost');

	$('#list').fadeIn('slow');
			
	$('#create').click(function() {
		$('#fID').val('');
		$('#fName').val('');
		$('#fDepartment').val('');
		$('#fSalary').val('');
				
		$('#save').text("Save");
		$('#selectedID').val("");
		$('#titleForm').text("Create new employee data");
		openForm();
	});

	$('.edit').click(function() { editItem($(this).attr('id')) });

	$('.delete').click(function() { removeItem($(this).attr('id')); });
			
	$('#save').click(function() {
		//var msg = "";

		if($(this).text()=="Save"){ //CREATE
	      	socket.emit('create', { id : $('#fID').val(), name : $('#fName').val(), department : $('#fDepartment').val(), salary : $('#fSalary').val() });
	    	socket.on('REScreate', function (data) {
	    		//if (data.msg == "success"){
	    			var j = parseInt($('#grid').attr('jumlah'))+1; $('#grid').attr('jumlah',j);
					$('#grid').append("<tr id='row"+j+"'><td id='id"+j+"'  align='center'>"+$('#fID').val()+"</td><td id='name"+j+"'>"+$('#fName').val()+"</td><td id='department"+j+"'  align='center'>"+$('#fDepartment').val()+"</td><td id='salary"+j+"'  align='right'>"+$('#fSalary').val()+"</td> <td align='center'><span id='"+j+"' class='edit span-btn' onclick=\"editItem(this.getAttribute('id'))\">Edit</span><span id='"+j+"' class='delete span-btn' onclick=\"removeItem(this.getAttribute('id'))\">Remove</span></td></tr>");
	    			closeForm();
	    		//} else {
	    		//	alert("Failed");
	    		//}
	    	});
			
		} else { //UPDATE
			socket.emit('update', { oldid: $('#id'+ $('#selectedID').val()).text() ,id : $('#fID').val(), name : $('#fName').val(), department : $('#fDepartment').val(), salary : $('#fSalary').val() });
	    	socket.on('RESupdate', function (data) {
	    		//if (data.msg == "success"){
	    			$('#id'+ $('#selectedID').val()).text($('#fID').val());
					$('#name'+ $('#selectedID').val()).text($('#fName').val());
					$('#department'+ $('#selectedID').val()).text($('#fDepartment').val());
					$('#salary'+ $('#selectedID').val()).text($('#fSalary').val());
	    			closeForm();
	    		//} else {
	    		//	alert("Failed");
	    		//}
	    	});
			
		}	
	});
	$('#cancel').click(function() {closeForm();});
	

}); //END OF $(document).ready()


function openForm() {$('#list').hide(); $('#form').fadeIn('slow');};
function closeForm() {$('#form').hide(); $('#list').fadeIn('slow');};
		
function editItem(own) {
	$('#fID').val($('#id'+ own).text());
	$('#fName').val($('#name'+ own).text());
	$('#fDepartment').val($('#department'+ own).text());
	$('#fSalary').val($('#salary'+ own).text());
			
	$('#save').text("Update");
	$('#selectedID').val(own);
	$('#titleForm').text("Edit "+$('#name'+ own).text()+"'s data");
	openForm();
}

function removeItem(own) {
	var dlt=confirm("Remove employee : "+$('#name'+ own).text());
	if (dlt==true){
		var socket = io.connect('http://localhost'); //alert( $('#id'+own).text());
		socket.emit('remove', { id : $('#id'+own).text() });
	    socket.on('RESremove', function (data) {
	    	//if (data.msg == "success"){
	    		$('#row'+own).remove();
	    	//} else {
	    	//	alert("Failed");
	    	//}
	   	});
	}
}
