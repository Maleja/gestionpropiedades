$(document).ready(function() {
	const btn_save = document.getElementById("b_save");
	btn_save.addEventListener("click", function(){action_save(true,'save')}, false);

	initialize_action_add_edit();
});