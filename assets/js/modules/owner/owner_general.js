document.getElementById("name").focus();
//------------------------------------------------------
function action_save(new_record,method) {
	name_o         = document.getElementById("name").value;
    telephone      = document.getElementById("telephone").value;
    email          = document.getElementById("email").value;
    address        = document.getElementById("address").value;
    identification = document.getElementById("identification").value;
	error_flag     = 0;
    duplicate_flag = 0;
	//------------------------------------------------------
  	if (name_o == "") {
    	add_style("#name", bug_style);
	} else {
		check_length(name_o, 2, 70, "#name");
		check_regexp(name_o, chain_characters, "#name");
	}
    if (telephone == "") {
    	add_style("#telephone", bug_style);
	} else {
		check_length(telephone, 2, 50, "#telephone");
		check_regexp(telephone, chain_telephone, "#telephone");
	}
    if (email == "") {
    	add_style("#email", bug_style);
	} else {
		check_length(email, 2, 70, "#email");
		check_regexp(email, chain_email, "#email");
	}
    if (identification == "") {
    	add_style("#identification", bug_style);
	} else {
		check_length(identification, 1, 50, "#identification");
		check_regexp(identification, chain_num_charac, "#identification");
	}
    if (address != "") {
    	check_length(address, 2, 255, "#address");
		check_regexp(address, chain_num_charac_sim, "#address");
	}
    

    if (new_record == true) {
        duplicate_flag = new_duplicate_record('Owner','IdentificationNumber', identification, '#identification');
        if(duplicate_flag == 0){
            duplicate_flag = new_duplicate_record('Owner','Email', email, '#email');
        }
        if(duplicate_flag == 0){
            duplicate_flag = new_duplicate_record('Owner','Name', name_o, '#name');
        }
    }
    else{
        duplicate_flag = duplicate_record('Owner','IdentificationNumber', identification, '#identification', current);
        if(duplicate_flag == 0){
            duplicate_flag = duplicate_record('Owner','Email', email, '#email', current);
        }
        if(duplicate_flag == 0){
            duplicate_flag = duplicate_record('Owner','Name', name_o, '#name', current);
        }
    }

	if(error_flag == 0 && duplicate_flag == 0 ){
		var formData = $("#general_form").serialize();
        $.ajax({
            url: baseurl + "Owner_c/" + method,
            type: 'POST',
            data: formData,
            beforeSend: function() {
                loading();
            },
            success: function(data) {
                message = data.message;
                if (data.success == 1) {
                    if (new_record == true) {
                        url = baseurl + 'owner/edit/' + data.data;
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