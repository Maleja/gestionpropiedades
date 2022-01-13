//------------------------------------------------------
// Global variables
//------------------------------------------------------
const bug_style = "alert alert-danger";
const chain_num_charac_sim = /^[0-9a-zñÑáéíóúÁÉÍÓÚ.:;@*,%+_<>#=¿?¡!(&)\-\/\s]+$/i;
const chain_email = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const chain_telephone = /^([0-9-_()\/+-/\s])+$/;
const chain_characters = /^[a-zñÑáéíóúÁÉÍÓÚ_\-.\s]+$/i;
const chain_num_charac = /^[0-9a-zñÑáéíóúÁÉÍÓÚ()\/+-/\s]+$/i;
const chain_size_decimal = /^[0-9x.\s]+$/i;
var error_flag = 0;
//------------------------------------------------------
// Functions
//------------------------------------------------------
function initialize_action_query(){
	$(document).ready(function() {
		const btn_add = document.getElementById("b_add");
		btn_add.addEventListener("click", function(){action_add()}, false);
	});
}
//------------------------------------------------------
function action_add() {
    module_opt = window.location.pathname.split('/');
    if (typeof module_opt[2] === 'undefined') {
        mod = module_opt[1];
    } //if
    else {
        mod = module_opt[2];
    } //else
    path = baseurl + mod + "/add";
	window.open(path, "_parent");
}
//------------------------------------------------------
// check the chain according to the regular expression:
//   objeto: content of the object to validate
//   regexp: regular phrase
//   name_object: add error in style
//------------------------------------------------------
function check_regexp(object, regexp, name_object) {
    if (!(regexp.test(object))) {
        $(name_object).addClass(bug_style);
        error_flag = 1;
        return true;
    } else {
        return false;
    }
}
//------------------------------------------------------
// Valid chain and indicates if there is an error
//   min: value minimo
//   max: value maximo
//------------------------------------------------------
function check_length(object, min, max, name_object = null) {
    if (object.length > max || object.length < min) {
        if (name_object != null) {
            $(name_object).addClass(bug_style);
        }
        error_flag = 1;
        return true;
    } else {
        return false;
    }
}
//------------------------------------------------------
function clean_style(object, class_style) {
    $(object).removeClass(class_style);	
}
//------------------------------------------------------
function add_style(object, style) {
    $(object).addClass(style);
    error_flag = 1;
}
//------------------------------------------------------
function format_disabled(object) {
    $(object).prop('disabled', true);
}
//------------------------------------------------------
function format_enabled(object) {
    $(object).prop('disabled', false);
}
//------------------------------------------------------
function initialize_action_add_edit(form_name = 'general_form') {
	$(document).ready(function() {
		//------------------------------------------------------
		// Remove the error style
		//------------------------------------------------------        
		$('#' + form_name).find('input, textarea, select, .select2-selection__rendered').click(function(e) {
			var field = e.target.id;
			clean_style("#" + field, bug_style);
		});
		$('#' + form_name).find('input, textarea, select, .select2-selection__rendered').focusin(function(e) {
			var field = e.target.id;
			clean_style("#" + field, bug_style);
		});
		//------------------------------------------------------        
		// Validate in the form when you press the enter key
		//------------------------------------------------------  
		$("#" + form_name).keypress(function(event) {
			var field = event.which;
			if (field == 13) {
				form_focus(this);
			} //if             
		});
		//------------------------------------------------------        
		// Validate if there is data in the fields of the form to activate / deactivate the save button 
		//------------------------------------------------------        
		$('#' + form_name).find('input, textarea, select, .select2-selection__rendered').keyup("c", function(e) {
			var field = e.which;
			//13=Enter   17=Ctrl   18=Alt   67=C    37=left   39=rigth   20=Mayuscula  144=Num Lock  6717=Ctrl+c   16=shift    9=tabulacion
			if ((field != 13) && (field != 17) && (field != 18) && (!e.ctrlKey) && (field != 37) && (field != 39) && (field != 20) && (field != 144) && (field != 16) && (field != 9)) {
				verify_form_data("b_save", form_name);
			}
		});
		$('#' + form_name).find('input, textarea, select, .select2-selection__rendered').change(function() {
			verify_form_data("b_save", form_name);
		});
		//------------------------------------------------------
		$("#b_back").click(function(e) {
			record_discard();
		});
		//------------------------------------------------------
	});
}
//------------------------------------------------------
function form_focus(formule) {
    value_id = $(document.activeElement).attr("id");
    focus = $(document.activeElement).attr("data-focus");
    if (focus != 'false') {
        //------------------------------------------------------
        for (i = 0; i < formule.elements.length; i++) {
            if (value_id == formule.elements[i].id) break;
        } //for
        //------------------------------------------------------
        for (j = i + 1; j < formule.elements.length; j++) {
            if (formule.elements[j].disabled == false) break;
        } //for
        //------------------------------------------------------
        if (j < formule.elements.length) {
            formule.elements[j].focus();
        } //if
        //------------------------------------------------------
    } //if
}
//------------------------------------------------------
// Verify in the form that there is at least one data completed in the form to activate the save button
//------------------------------------------------------
function verify_form_data(button, form_name) {
    var no_data = 0; //0 no data and 1 with data         
    var i;

    for (i = 0; i < document.getElementById(form_name).elements.length; i++) {
        form_id = document.getElementById(form_name).elements[i].id;
        form_value = document.getElementById(form_name).elements[i].value;
        form_type = document.getElementById(form_name).elements[i].type;

        if ((form_type == "text") && (form_value != "")) { //input type text
            no_data = 1;
            break;
        } else if ((form_type == "date") && (form_value != "")) { //input type date
            no_data = 1;
            break;
        } else if ((form_type == "select-one") && (form_value != "")) { //combo
            no_data = 1;
            break;
        } else if ((form_type == "textarea") && (form_value != "")) { //textarea
            no_data = 1;
            break;
        } else if (form_type == "checkbox") {
            if (($("#" + form_id).attr('checked') == "checked") && ($("#" + form_id).prop('checked') == false)) {
                no_data = 1;
                break;
            } //if
            else if (($("#" + form_id).attr('checked') != "checked") && ($("#" + form_id).prop('checked') == true)) {
                no_data = 1;
                break;
            } //if           
        } //else if 
        else if ((form_type == "email") && (form_value != "")) { //input type text
            no_data = 1;
            break;
        } // else if 
        else if ((form_type == "file") && (form_value != "")) { //input type text
            no_data = 1;
            break;
        } // else if
        else if ((form_type == "number") && (form_value != "")) { //input type text
            no_data = 1;
            break;
        } // else if
    } //for   

    if (no_data == 1) {
        format_enabled("#" + button);
    } else if (no_data == 0) {
        format_disabled("#" + button);
    }
}
//------------------------------------------------------
// Datatable data is retrieved
//------------------------------------------------------
function file_value_dataTable(table, object) {
    if (table.row(object).child.isShown()) {
        data = table.row(object).data();
    } else {
        data = table.row($(object).parents("tr")).data();
    } //if   

    return data;
}
//------------------------------------------------------
function record_position(table, object) {

    if (table.row(object).child.isShown()) {
        data = $(object);
    } else {
        data = $(object).parents("tr");
    } //if   

    return data;
}
//------------------------------------------------------
function new_duplicate_record(table, field, value, obj) {
    duplicated = 0;
    parameters = {
        'table': table,
        'field': field,
        'value': value,
    };

    $.ajax({
        type: 'POST',
        url: baseurl + 'General_c/newDuplicateRecord',
        data: parameters,
        async: false,
        dataType: 'json',
        success: function(data) {
            message = data['message'];
            if (data['success'] == 1) {
                general_notification(message,3);
                add_style(obj, bug_style);
                duplicated = 1;
            } else if (data['success'] == -1) {
                error_notification(message);
            }
            //-------------------------------
        }, //success
        error: function(jqXhr, textStatus, errorThrown) {
                console.log(textStatus + ' = ' + errorThrown);
            } //error
    }); //ajax    
    return duplicated;
} //function
//------------------------------------------------------
function duplicate_record(table, field, value, obj, id) {
    duplicated = 0;
    parameters = {
        'table': table,
        'field': field,
        'value': value,
        'id'   : id,
    };

    $.ajax({
        type: 'POST',
        url: baseurl + 'General_c/duplicateRecord',
        data: parameters,
        async: false,
        dataType: 'json',
        success: function(data) {
            message = data['message'];
            if (data['success'] == 1) {
                duplicated = 1;
                general_notification(message,3);
                add_style(obj, bug_style);
            } else if (data['success'] == -1) {
                notification_error(message);
            }
            //-------------------------------
        }, //success
        error: function(jqXhr, textStatus, errorThrown) {
                console.log(textStatus + ' = ' + errorThrown);
            } //error
    }); //ajax   

    return duplicated;
} //function
//------------------------------------------------------
