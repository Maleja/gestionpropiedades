var table_consult;
$(document).ready(function() {
	initialize_action_query();
	consult_formule();
});
//-----------------------------
function consult_formule() { 
  //------------------------------------------------------
  	$.ajax({
		type: 'POST',
		url: baseurl + 'Owner_c' + "/consult",
		beforeSend: function() {
			loading_time();
		},
      	success: function(data) {
          	table_consult = $('#table_consult').DataTable({
				"scrollY": "600px",
				"paging": false, 
				"scrollCollapse": false,
				"bAutoWidth": false,
				"bDestroy": true,
				"responsive": true,
				data: data,
				order: [
					[1, "asc"]
				],
              	columns: [
					{ title: "id", data: "Id" },
					{ title: "Name", data: "Name" },
					{ title: "Telephone", data: "Telephone" },
					{ title: "Identification Number", data: "IdentificationNumber" },
					{ title: "Email", data: "Email" },
					{title: "Actions", "width": "100px" ,
                      	data: function(row, type, val, meta) {
							action = '';
							action += '<button data-toggle="tooltip" class="btn btn-sm btn-warning btn-edit" title = "Edit record">Edit</button>';
						
							action += '<button data-toggle="tooltip" class="btn btn-sm btn-danger btn-delete ms-1" title = "Delete entries">Delete</button>';
                            return action;
                        } //data
                  	}
              	],
              	columnDefs: [
                  	{ targets: [0], visible: false },
              	]
          	});
			//------------------------------------------------------
			  $("#table_consult tbody").on("click", ".btn-edit", function(e) {
				data = file_value_dataTable(table_consult, this);
				
				id = data.Id.trim();
				newPage = baseurl + "owner/edit/" + id;
				window.location.href = newPage;
			});
			//------------------------------------------------------
			$("#table_consult tbody").on("click", ".btn-delete", function(e) {
				e.preventDefault();
				data = file_value_dataTable(table_consult, this);

				id = data.Id.trim();
				field = data.IdentificationNumber.trim();
				record = record_position(table_consult, this);
				params = "Owner_c/delete/" + id;

				delete_record(params, table_consult, record, field);
				//---------------------------------------
			});
          	//------------------------------------------------------
          	$($.fn.dataTable.tables(true)).DataTable().columns.adjust();
      	}, //success
      	error: function(jqXhr, textStatus, errorThrown) {
            console.log(textStatus + " = " + errorThrown);
        } //error
  	}); //ajax
}
//------------------------------------------------------