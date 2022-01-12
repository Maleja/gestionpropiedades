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
		url: baseurl + 'PropertyType_c' + "/consult",
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
					{ title: "Description", data: "Description" },
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
          	$($.fn.dataTable.tables(true)).DataTable().columns.adjust();
      	}, //success
      	error: function(jqXhr, textStatus, errorThrown) {
            console.log(textStatus + " = " + errorThrown);
        } //error
  	}); //ajax
}
//------------------------------------------------------