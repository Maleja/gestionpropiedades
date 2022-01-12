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
function notification_error(message, detail = null) {
  if (detail == null) {
      detail = 'Check the data, try again';
  } //if

  Swal.fire({
    icon: 'error',
    title: message,
    text: detail,
  })
}
// ------------------------------------------------------------------------------
// Mensaje al guardar satisfacoriamente un registro
// Si ruta != null, al mostrar el mensaje carga la vista indicada en ruta, de lo contrario solo emite el mensaje
function save_successful(path = null, message = null) {
  	if (message == null) {
      	message = 'The data has been saved successfully';
  	} //if

	Swal.fire({
		title: 'Success',
		text: message,
		icon: 'success',
		allowOutsideClick: false,
		allowEscapeKey: false,
		confirmButtonText: 'OK!'
	}).then((result) => {
		if (result.value) {
			//------------------------
			if (path != null) {
				window.location.href = path;
			} else {
				format_disabled('#b_edit');
			} //else
			//------------------------
		} //if
	})
}
/*

// ---------------------------------------------------------
function notification_success(message) {

  Swal.fire(
      'Success',
      message,
      'success'
  );
}
// ---------------------------------------------------------
function notification(message_view, option = 1, time = 1) {
  message_view = "<h3 style='color:#3b80be' >" + message_view + "</h3>";
  type_message = 'success';

  if (option == 2) {
      type_message = 'error';
  } else if (option == 3) {
      type_message = 'warning';
  } else if (option == 4) {
      type_message = 'info';
  } else if (option == 5) {
      type_message = 'question';
  }

  if (time == 1) {
      Toast = Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 3000,
      });
  } //if
  else {
      Toast = Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: true,
      });
  }

  Toast.fire({
      type: type_message,
      title: message_view
  })
}
// ---------------------------------------------------------
function notification_information(message) {
  Swal.fire(
      message,
      'Check the data, try again',
      'info'
  );
}
// ---------------------------------------------------------
function notification_information_detail(message, detail) {
  Swal.fire(
      message,
      detail,
      'info'
  );
}
// ------------------------------------------------------------------------------
function error_save() {
  Swal.fire(
      'Sorry',
      'There were problems trying to save the data',
      'error'
  );
}
// ---------------------------------------------------------
function loading_web() {
  const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
  })

  Toast.fire({
      html: "<div class='loader-container'><div class='sbl-cirle-to-rhombus'></div></div>",
      timer: 2000,
      title: 'Loading...',
  })

}
// ---------------------------------------------------------
function loading_web_infinity(position_loading = 'center') {
  const Toast = Swal.mixin({
      toast: true,
      position: position_loading,
      showConfirmButton: false,
  })

  Toast.fire({
      html: "<div class='loader-container'><div class='sbl-cirle-to-rhombus'></div></div>",
      title: 'Loading...',
  })
}
// ---------------------------------------------------------
function loading_web_infinity_locked(title = null, option = null) {
  if (title == null) {
      title = 'Loading, please do not close the browser until the process is finished';
  }
  type_message = 'success';

  if (option == 2) {
      type_message = 'error';
  } else if (option == 3) {
      type_message = 'warning';
  } else if (option == 4) {
      type_message = 'info';
  } else if (option == 5) {
      type_message = 'question';
  }

  const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      customClass: { container: 'swal-wh' },
      backdrop: `
          rgba(0,0,0,0.4)
      `
  })

  Toast.fire({
      type: type_message,
      html: "<div class='loader-container'><div class='sbl-cirle-to-rhombus'></div></div>",
      title: title,
  })
}
// ---------------------------------------------------------
function closeMessage() {
  swal.close();
}
// ---------------------------------------------------------
// Indicates that the field to be registered is duplicated. Place the object with the value in red
//---------------------------------
function duplicate_record(field, value, object = null) {
  Swal.fire(
      field + " " + value + " is already registered",
      'Check the data, try again',
      'error'
  );

  if (object != null) {
      $(object).addClass(style_error);
  }
}
//---------------------------------
// Indicate if you want to discard the changes
// accion: id del objeto que ejecuta la accion. Valores: b_limpiar y b_regresar
// datos: array con objetos y propiedades asignar en caso de inicializar el formulario
// limpiar: array de objetos ocultos a limpiar en caso de inicializar el formulario
// formulario: si el nombre del formulario a aplicar los cambios es distinto de "formulario" se define el valor de lo contrario no
//---------------------------------
function record_discard(action, data = null, clean = null, formule = null) {
  option = "false"; //default
  module_access = window.location.pathname.split('/');
  path = baseurl + module_access[1];
  //-------------------------------------------
  if (action == "b_back") {
      option = "true";
  } //if
  //-------------------------------------------
  if ($("#b_save").prop('disabled') === false) {
      Swal.fire({
          title: 'Do you want to discard the changes?',
          text: "This action can not be undone",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3B80BE',
          cancelButtonColor: '#c82333',
          confirmButtonText: 'Accept',
          cancelButtonText: 'Cancel',
      }).then((result) => {
          if (result.value) {
              //------------------------
              if (option == "true") {
                  window.open(path, "_parent");
              } //if
              else {
                  initialize_formule(formule, data, clean);
              } //else
              //------------------------
          } //if
      })
  } //if
  else {
      if (option == "true") {
          window.open(path, "_parent");
      } //if 
      else {
          initialize_formule(formule, data, clean);
      } //else
  } //else
}
// ------------------------------------------------------------------------------
// Mensaje al guardar satisfacoriamente un registro
// Si ruta != null, al mostrar el mensaje carga la vista indicada en ruta, de lo contrario solo emite el mensaje
function success_save(path = null, message = null) {
  if (message == null) {
      message = 'The data has been saved successfully';
  } //if

  Swal.fire({
      title: 'Success',
      text: message,
      type: 'success',
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: 'OK!'
  }).then((result) => {
      if (result.value) {
          //------------------------
          if (path != null) {
              window.location.href = path;
          } else {
              //------------------------------------------------------    
              if ($('#b_save').length > 0) {
                  format_disabled_button('#b_save');
              } //if
              else if ($('#b_edit').length > 0) {
                  format_disabled_button('#b_edit');
              } //if
          } //else
          //------------------------
      } //if
  })
}
// ------------------------------------------------------------------------------
function registry_delete(params, table, file, registry = null) {
  message = '';
  //---------------------------------------
  if (registry != null) {
      message = registry;
  }
  //---------------------------------------
  Swal.fire({
      title: 'Do you want to delete the record ' + message + '?',
      text: "This action can not be undone",
      type: 'warning',
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
                  loading_web_infinity();
              },
              success: function(data) {
                  message = data['messages'];

                  if (data['success'] == "1") {
                      table.row(file).remove().draw();
                      notification_success(message);
                  } else if (data['success'] == "0") {
                      notification_information(message);
                  } else {
                      notification_error(message);
                  }
              }, //success
              error: function(jqXhr, textStatus, errorThrown) {
                      console.log(textStatus + " = " + errorThrown);
                  } //error
          }); //ajax 
      } //if
  });
}
//---------------------------------
// Reset and Send email the user
//---------------------------------
function send_email_user(user, email_user) {
  Swal.fire({
      title: 'An email will be sent to ' + user + ' to assign your password?',
      text: "Check email in inbox or spam",
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3B80BE',
      cancelButtonColor: '#c82333',
      confirmButtonText: 'Accept',
      cancelButtonText: 'Cancel'
  }).then((result) => {
      //---------------------------------------
      if (result.value) {
          send_email(email_user, 'u');
      } //if
  });
}
// ------------------------------------------------------------------------------
function session_exhaled(baseurl, min) {
  Swal.fire({
      title: "Your session expired",
      text: min + " minutes have passed without activity",
      type: 'warning',
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonColor: "#c82333",
      confirmButtonText: "Log in",
  }).then((result) => {
      if (result.value) {
          //------------------------
          top.location.href = baseurl + 'log_in';
          //------------------------
      } //if
  });
}
// ------------------------------------------------------------------------------
function paypal_order_complete(option = 'true', error = null) {
  details = "The purchase order will be sent to the mail";
  if (error != null) {
      details = error;
  } //if
  //---------------------------------------
  Swal.fire({
      title: 'Payment was made successfully',
      text: details,
      type: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3B80BE',
      confirmButtonText: 'Accept',
      allowOutsideClick: false,
      allowEscapeKey: false
  }).then((result) => {
      //---------------------------------------
      if (result.value) {
          window.location.href = baseurl + 'orders_complete';
      } //if
  });
}
//---------------------------------
function notification_question(message, method, details = null) {
  text = "This action can not be undone";
  if (details != null) {
      text = details;
  }
  //---------------------------------
  Swal.fire({
      title: message,
      text: text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3B80BE',
      cancelButtonColor: '#c82333',
      confirmButtonText: 'Accept',
      cancelButtonText: 'Cancel'
  }).then((result) => {
      //---------------------------------------
      if (result.value === true) {
          eval(method);
      } //if
  });
}
// ------------------------------------------------------------------------------
*/