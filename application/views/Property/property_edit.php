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
					<label for="number" class="col-sm-6 col-form-label">Number
						<span class="text-danger fs-5 strong ps-1">*</span>
					</label>
					<div class="col-sm-10">
						<input type="text" id="number" name="number" class="form-control" maxlength="70" value="<?php echo $record->Number ?>">
						<small class="text-secondary">Max 70 characters</small>
					</div>
				</div>
			</div>
			<div class="mb-3 row">
				<div class="col-6">
					<label for="area" class="col-sm-6 col-form-label">Area
						<span class="text-danger fs-5 strong ps-1">*</span>
					</label>
					<div class="col-sm-10">
						<input type="number" id="area" name="area" class="form-control" onKeyPress="if(this.value.length==50) return false;" value="<?php echo $record->Area ?>">
						<small class="text-secondary">Max 50 Digits</small>
					</div>
				</div>
				<div class="col-6">
					<label for="construction" class="col-sm-6 col-form-label">Construction Area
						<span class="text-danger fs-5 strong ps-1">*</span>
					</label>
					<div class="col-sm-10">
						<input type="number" id="construction" name="construction" class="form-control" onKeyPress="if(this.value.length==50) return false;" value="<?php echo $record->ConstructionArea ?>">
						<small class="text-secondary">Max 50 digits</small>
					</div>
				</div>
			</div>
			<div class="mb-3 row">
				<div class="col-6">
					<label for="name" class="col-sm-6 col-form-label">Owner
					</label>
					<div class="col-sm-10">
					<select id="ownerid" name="ownerid" class="form-select" aria-label="Default select example">
						<option value=""></option>
						<?php 
							$data = '';
							$select = '';
							foreach ($ownerList as $reg){
								$select =  $reg['Id'] == $record->OwnerId ? 'Selected' : '';
								$data.= "<option value='".$reg['Id']."' $select>".$reg['Name']."</option>";
							}//foreach
							echo $data;
						 ?>
					</select>
					</div>
				</div>
				<div class="col-6">
					<label for="name" class="col-sm-6 col-form-label">Property Type
					</label>
					<div class="col-sm-10">
						<select id="propertytypeid" name="propertytypeid" class="form-select" aria-label="Default select example">
							<option value=""></option>
							<?php 
							$data = '';
							$select = '';
							foreach ($propertytypeList as $reg){
								$select =  $reg['Id'] == $record->PropertyTypeId ? 'Selected' : '';
								$data.= "<option value='".$reg['Id']."' $select>".$reg['Description']."</option>";
							}//foreach
							echo $data;
						 ?>
						</select>
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
<script type="text/javascript" src="<?php echo  base_url("assets/js/modules/property/property_edit.js"); ?>"></script>
<script type="text/javascript" src="<?php echo  base_url("assets/js/modules/property/property_general.js"); ?>"></script>