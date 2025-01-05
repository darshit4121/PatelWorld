$(document).ready(function () {

	$("#btnLogin").on('click', function () {
		var valid = $("#frmAdminLogin").valid();
		if (valid) {
			CheckEmailExists();
		}
	});


	$("#frmAdminLogin").validate({
		errorElement: 'span',
		errorClass: 'Fild-Error',
		rules: {
			Email: {
				required: true,
				email: true 
			},
			Password: {
				required: true,
			}
		},
		messages: {
			Email: {
				required: 'Email/Username is required.',
				email: 'Please enter a valid email address.' 
			},
			Password: {
				required: 'Password is required.'
			}
		},
		highlight: function (element) {
			$(element).parent().addClass("Fild-box-Error");
		},
		unhighlight: function (element) {
			$(element).parent().removeClass("Fild-box-Error");
		}
	});




});





function CheckEmailExists() {
	$.ajax({
		url: "/Login/CheckAdminEmailExists",
		type: "POST",
		data: { EmailId: $("#Email").val() },
		success: function (data) {
			//StopLoading();
			if (data) {
				Login();
			}
			else {
				toastr.warning('This Email/Username does not exists.!!!', 'Warning');
			
				StopLoading();
			}
		},
		error: function (errormessage) {
			//StopLoading();
		
			toastr.error(errormessage.responseText.toString(), 'error');
		}
	});
}



function Login() {
	/*StartLoader($("#btnLogin")[0]);*/
	$.ajax({
		url: "/Login/Login",
		type: "POST",
		data: { email: $("#Email").val(), password: $("#Password").val() },
		success: function (data) {
			if (data != null && data != undefined) {
				if (data.data.isActive) {
					/*	StopLoader($("#btnLogin")[0]);*/
					toastr.success('Login Successfully...', 'Success');
					window.location.href = '/Home/Index?Email=' + encodeURIComponent($("#Email").val()) + '&Password=' + encodeURIComponent($("#Password").val());
				} else {
					toastr.warning('Your account not activated, Please contact administrator.', 'Warning');
			
				}
			} else {
				toastr.warning('Password does not match.!!', 'Warning');
	
			}
		},
		error: function (errormessage) {
	
			toastr.error(errormessage.responseText.toString(), 'error');
		}
	});
}