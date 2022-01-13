//------------------------------------------------------
function action_save(new_record,method) {
	description = document.getElementById("description").value;
	error_flag = 0;
    duplicate_flag = 0;
	//------------------------------------------------------
  	if (description == "") {
    	add_style("#description", bug_style);
	} else {
		check_length(description, 2, 255, "#description");
		check_regexp(description, chain_num_charac_sim, "#description");
	}
    
    if (new_record == true) {
        duplicate_flag = new_duplicate_record('PropertyType','Description', description, '#description');
    }
    else{
        duplicate_flag = duplicate_record('PropertyType','Description', description, '#description', currrent);
    }

	if(error_flag == 0 && duplicate_flag == 0 ){
		var formData = $("#general_form").serialize();
        $.ajax({
            url: baseurl + "PropertyType_c/" + method,
            type: 'POST',
            data: formData,
            beforeSend: function() {
                loading();
            },
            success: function(data) {
                message = data.message;
                if (data.success == 1) {
                    if (new_record == true) {
                        url = baseurl + 'PropertyType_c/edit/' + data.data;
                        save_successfully(url, message);
                    } //if
                    else {
                        save_successfully(null, message);
                    } //else
                } //if
                else {
                    error_notification(message);
                } //else
            }, //success
            error: function(jqXhr, textStatus, errorThrown) {
				console.log(textStatus + " = " + errorThrown);
			} //error
        }); //ajax
	}
}
//------------------------------------------------------