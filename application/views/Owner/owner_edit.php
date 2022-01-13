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
				<div class="col-6">
					<label for="name" class="col-sm-6 col-form-label">Name
						<span class="text-danger fs-5 strong ps-1">*</span>
					</label>
					<div class="col-sm-10">
						<input type="text" id="name" name="name" class="form-control" maxlength="70" value="<?php echo $record->Name ?>">
						<small class="text-secondary">Max 70 characters</small>
					</div>
				</div>
				<div class="col-6">
					<label for="name" class="col-sm-6 col-form-label">Telephone
						<span class="text-danger fs-5 strong ps-1">*</span>
					</label>
					<div class="col-sm-10">
						<input type="text" id="telephone" name="telephone" class="form-control" maxlength="50" value="<?php echo $record->Telephone ?>">
						<small class="text-secondary">allowed special characters (-_+/)</small><br>
						<small class="text-secondary">Max 50 digits</small>
					</div>
				</div>
			</div>
			<div class="mb-3 row">
				<div class="col-6">
					<label for="name" class="col-sm-6 col-form-label">Email
						<span class="text-danger fs-5 strong ps-1">*</span>
					</label>
					<div class="col-sm-10">
						<input type="email" id="email" name="email" class="form-control" maxlength="70" value="<?php echo $record->Email ?>">
						<small class="text-secondary">Max 70 characters</small>
					</div>
				</div>
				<div class="col-6">
					<label for="name" class="col-sm-6 col-form-label">Identification Number
						<span class="text-danger fs-5 strong ps-1">*</span>
					</label>
					<div class="col-sm-10">
						<input type="text" id="identification" name="identification" class="form-control" maxlength="50" value="<?php echo $record->IdentificationNumber ?>">
						<small class="text-secondary">allowed special characters (-/)</small><br>
						<small class="text-secondary">Max 50 digits</small>
					</div>
				</div>
			</div>
			<div class="mb-3 row">
				<label for="address" class="col-form-label">Address
				</label>
				<div class="col-12">
					<textarea class="form-control" id="address" name="address" rows="3" maxlength="255"><?php echo $record->Address ?></textarea>
					<small class="text-secondary">allowed special characters .:;@*,%+_<>#=¿?¡!(&)</small>
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
<script type="text/javascript" src="<?php echo  base_url("assets/js/modules/owner/owner_edit.js"); ?>"></script>
<script type="text/javascript" src="<?php echo  base_url("assets/js/modules/owner/owner_general.js"); ?>"></script>