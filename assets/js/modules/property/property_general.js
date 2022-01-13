document.getElementById("number").focus();
//------------------------------------------------------
function action_save(new_record,method) {
	number         = document.getElementById("number").value;
    area           = document.getElementById("area").value;
    construction   = document.getElementById("construction").value;
    address        = document.getElementById("address").value;
    ownerid        = document.getElementById("ownerid").value;
    propertytypeid = document.getElementById("propertytypeid").value;
	error_flag     = 0;
    duplicate_flag = 0;
	//------------------------------------------------------
  	if (number == "") {
    	add_style("#number", bug_style);
	} else {
		check_length(number, 2, 70, "#number");
		check_regexp(number, chain_num_charac, "#number");
	}
    if (area == "") {
    	add_style("#area", bug_style);
	} else {
		check_length(area, 1, 50, "#area");
		check_regexp(area, chain_size_decimal, "#area");
	}
    if (construction == "") {
    	add_style("#construction", bug_style);
	} else {
		check_length(construction, 1, 50, "#construction");
		check_regexp(construction, chain_size_decimal, "#construction");
	}
    if (address != "") {
    	check_length(address, 2, 255, "#address");
		check_regexp(address, chain_num_charac_sim, "#address");
	}
    

    if (new_record == true) {
        duplicate_flag = new_duplicate_record('Property','Number', number, '#number');
    }
    else{
        duplicate_flag = duplicate_record('Property','Number', number, '#number', current);
    }

	if(error_flag == 0 && duplicate_flag == 0 ){
		var formData = $("#general_form").serialize();
        $.ajax({
            url: baseurl + "Property_c/" + method,
            type: 'POST',
            data: formData,
            beforeSend: function() {
                loading();
            },
            success: function(data) {
                message = data.message;
                if (data.success == 1) {
                    if (new_record == true) {
                        url = baseurl + 'property/edit/' + data.data;
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