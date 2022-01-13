<section class="wrapper">
	<!-- ---------------------------------------------------------- -->
	<div class="row">
		<div class="col-12 text-end">
			<button id="b_save" name="b_save" type="button" class="btn btn-sm btn-primary" disabled>Edit</button>
			<button id="b_back" name="b_back" type="button" class="btn btn-sm btn-outline-info ms-1">Back</button>
		</div>
	</div>
	<div class="row pt-3">
		<form id="general_form">
			<div class="mb-3 row">
				<label for="description" class="col-form-label">Description
					<span class="text-danger fs-5 strong ps-1">*</span>
				</label>
				<div class="col-12">
				<textarea class="form-control" id="description" name="description" rows="3" maxlength="255"><?php echo $record->Description ?></textarea>
				<small class="text-secondary">allowed special characters .:;@*,%+_<>#=¿?¡!(&)</small><br>
				<small class="text-secondary">Max. 255 characters</small>
				</div>
			</div>
		</form>	
	</div>    
	<div class="row">
		<div class="col-12">Required field <span class="text-danger fs-5 strong ps-1">*</span></div>
	</div>
	<!-- ---------------------------------------------------------- -->	
</section>
<script>
	const current = <?php echo $record->Id ?>;
</script>
<script type="text/javascript" src="<?php echo  base_url("assets/js/modules/property_type/property_type_edit.js"); ?>"></script>
<script type="text/javascript" src="<?php echo  base_url("assets/js/modules/property_type/property_type_general.js"); ?>"></script>