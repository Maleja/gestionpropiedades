//------------------------------------------------------
function action_save(new_record,method) {
	description = document.getElementById("description").value;
	flag_error = 0;
	//------------------------------------------------------
  	if (description == "") {
    	add_style("#description", bug_style);
	} else {
		check_length(description, 2, 255, "#description");
		check_regexp(description, chain_num_charac_sim, "#description");
	}

	if(flag_error == 0){
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
                        save_successful(url, message);
                    } //if
                    else {
                        save_successful(null, message);
                    } //else
                } //if
                else {
                    notification_error(message);
                } //else
            }, //success
            error: function(jqXhr, textStatus, errorThrown) {
				console.log(textStatus + " = " + errorThrown);
			} //error
        }); //ajax
	}
}
//------------------------------------------------------