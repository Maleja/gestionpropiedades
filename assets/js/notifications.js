// ---------------------------------------------------------
function loading_time(position_loading = 'top-end') {
  const Toast = Swal.mixin({
    toast: true,
    position: position_loading,
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'info',
    title: 'Loading'
  })
}
// ---------------------------------------------------------
function loading(position_loading = 'top-end') {
  const Toast = Swal.mixin({
    toast: true,
    position: position_loading,
    showConfirmButton: false,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'info',
    title: 'Loading'
  })
}
// ---------------------------------------------------------
function closeMessage() {
  swal.close();
}
// ---------------------------------------------------------
function error_notification(message, detail = null) {
  if (detail == null) {
      detail = 'Check the data, try again';
  } //if

  Swal.fire({
    icon: 'error',
    title: message,
    text: detail,
    confirmButtonColor: '#3B80BE',
  })
}
// ---------------------------------------------------------
function general_notification(message, option = 1, detail = null) {
    icon = 'success';
    if(option == 2){
        icon = 'info';
    }
    else if(option == 3){
        icon = 'warning';
    }
  
    Swal.fire({
      icon: icon,
      title: message,
      text: detail,
      confirmButtonColor: '#3B80BE',
    })
  }
// ------------------------------------------------------------------------------
function save_successfully(path = null, message = null) {
  	if (message == null) {
      	message = 'The data has been saved successfully';
  	} //if

	Swal.fire({
		title: 'Success',
		text: message,
		icon: 'success',
		allowOutsideClick: false,
		allowEscapeKey: false,
		confirmButtonText: 'OK',
        confirmButtonColor: '#3B80BE',
	}).then((result) => {
		if (result.value) {
			//------------------------
			if (path != null) {
				window.location.href = path;
			} else {
				format_disabled('#b_save');
			} //else
			//------------------------
		} //if
	})
}
//---------------------------------
function record_discard() {
    module_opt = window.location.pathname.split('/');
    if (typeof module_opt[2] === 'undefined') {
        mod = module_opt[1];
    } //if
    else {
        mod = module_opt[2];
    } //else
    path = baseurl + mod;
    //-------------------------------------------
    if ($("#b_save").prop('disabled') === false) {
        Swal.fire({
            title: 'Do you want to discard the changes?',
            text: "This action can not be undone",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3B80BE',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Accept',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.value) {
                window.open(path, "_parent");
            } //if
        })
    } //if
    else {
        window.open(path, "_parent");
    } //else
}
// ------------------------------------------------------------------------------
function delete_record(params, table, file, registry = null) {
    message = '';
    //---------------------------------------
    if (registry != null) {
        message = registry;
    }
    //---------------------------------------
    Swal.fire({
        title: 'Do you want to delete the record ' + message + '?',
        text: "This action can not be undone",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3B80BE',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Accept',
        cancelButtonText: 'Cancel',
        allowOutsideClick: false,
        allowEscapeKey: false
    }).then((result) => {
        //---------------------------------------
        if (result.value) {
            $.ajax({
                type: 'POST',
                url: baseurl + params,
                dataType: 'json',
                beforeSend: function() {
                    loading();
                },
                success: function(data) {
                    message = data['message'];

                    if (data['success'] == "1") {
                        table.row(file).remove().draw();
                        general_notification(message);
                    } else if (data['success'] == "0") {
                        general_notification(message,2);
                    } else {
                        error_notification(message);
                    }
                }, //success
                error: function(jqXhr, textStatus, errorThrown) {
                        console.log(textStatus + " = " + errorThrown);
                    } //error
            }); //ajax 
        } //if
    });
}
//------------------------