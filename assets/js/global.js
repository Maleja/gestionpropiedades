//------------------------------------------------------
// Global variables
//------------------------------------------------------
const bug_style = "alert alert-danger";
const chain_num_charac_sim = /^[0-9a-zñÑáéíóúÁÉÍÓÚ.:;@*,%+_<>#=¿?¡!(&)\-\/\s]+$/i;


const chain_email = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const chain_telephone = /^([0-9-_\/+-/\s])+$/;
const chain_characters = /^[a-zñÑáéíóúÁÉÍÓÚ_\-.\s]+$/i;
const chain_date = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))*$/;
const chain_number = /^[0-9]+$/;
const chain_decimal = /^[0-9.\s]+$/i;
const chain_blank_space = /\s+/g;
const chain_number_charac = /^[0-9a-zñÑáéíóúÁÉÍÓÚ_\-.\s]+$/i;
const chain_validate_email = /^[0-9a-zñÑáéíóúÁÉÍÓÚ#$&\-\/*+.\s]+$/i;
const chain_size_decimal = /^[0-9x.\s]+$/i;


let flag_error = 0;
//------------------------------------------------------
// Function
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
        flag_error = 1;
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
        flag_error = 1;
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
			//record_discard('b_back', option, clean);
		});
		//------------------------------------------------------
		/*$("#b_add").click(function(e) {
			registro_new();
		});*/
		const btn_add = document.getElementById("b_add");
		//btn_add.addEventListener("click", function(){action_add()}, false);
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
/*
//-------------------------------------------
	if(option == "consult"){
		
	}
	else{
		if (($('#b_save').length > 0) && ($("#b_save").prop('disabled') == false)) {
			//-------------------------------------------       
			swal({
				title: 'Do you want to discard the changes?',
				text: "This action can not be undone",
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#33AFD4',
				cancelButtonColor: '#DD6B55',
				confirmButtonText: 'Accept',
				cancelButtonText: 'Cancel'
			}).then((result) => {
				//---------------------------------------
				//Distinto a Cancelar
				if (typeof(result.value) != "undefined") {
					window.open(path, "_parent");
				} //if
			});
		}
	}
function initialize_event_form(form_name = '') {
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
              verify_form_data("b_save", form_name, 1);
          }
      });
      $('#' + form_name).find('input, textarea, select, .select2-selection__rendered').change(function() {
          verify_form_data("b_save", form_name, 1);
      });
      //------------------------------------------------------
      $("#b_clean").click(function(e) {
          if (typeof(option) == "undefined") {
              option = null; //array apply attributes 
          }
          //------------------------------------------------------
          if (typeof(clean) == "undefined") {
              clean = null; //array clean fields
          }
          //------------------------------------------------------
          if (typeof(table_consult) != "undefined") {
              table_consult
                  .clear()
                  .draw();
          }
          //------------------------------------------------------            
          action = e.target.id;
          record_discard('b_clean', option, clean);
      });
      //------------------------------------------------------
      $("#b_back").click(function(e) {
          if (typeof(option) == "undefined") {
              option = null; //array apply attributes 
          }
          //------------------------------------------------------
          if (typeof(clean) == "undefined") {
              clean = null; //array clean fields
          }
          //------------------------------------------------------
          if (typeof(table_consult) != "undefined") {
              table_consult
                  .clear()
                  .draw();
          }
          //------------------------------------------------------            
          record_discard('b_back', option, clean);
      });
      //------------------------------------------------------
      $("#b_add").click(function(e) {
          registro_new();
      });
      //------------------------------------------------------
  });
}*/