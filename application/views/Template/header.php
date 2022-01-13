<?php
	defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Property Management</title>
	<link rel="icon" href="<?php echo base_url("assets/img/cropped-querculogo-32x32.png")?>" sizes="32x32">
	<!-- Bootstrap -->
	<link rel="stylesheet" href="<?php echo base_url("assets/js/bootstrap/css/bootstrap.css")?>">
	<script type="text/javascript" src="<?php echo base_url("assets/js/bootstrap/js/bootstrap.min.js")?>"></script>
	<!-- DataTables -->
	<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/js/DataTables/datatables.min.css")?>"/> 
	<script type="text/javascript" src="<?php echo base_url("assets/js/DataTables/jquery-3.6.0.min.js")?>"></script>
	<script type="text/javascript" src="<?php echo base_url("assets/js/DataTables/datatables.min.js")?>"></script>
	<!-- sweetalert -->
	<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/js/sweetalert2/sweetalert2.min.css")?>"/> 
	<script type="text/javascript" src="<?php echo base_url("assets/js/sweetalert2/sweetalert2.min.js")?>"></script>
  	<!-- Site -->
	<script language="javascript" type="text/javascript">
    	var baseurl = "<?php print base_url(); ?>"; 
  	</script>
  	<script type="text/javascript" src="<?php echo base_url("assets/js/global.js")?>"></script>
	<script type="text/javascript" src="<?php echo base_url("assets/js/notifications.js")?>"></script>
  	<link rel="stylesheet" href="<?php echo base_url("assets/css/dashboard.css")?>">
	<link rel="stylesheet" href="<?php echo base_url("assets/css/style.css")?>">
</head>
<body>
<header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
	<a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>
	<button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
	<div class="navbar-nav">
		<div class="nav-item text-nowrap">
			<a class="nav-link px-3" href="#">Sign out</a>
		</div>
	</div>
</header>
<div class="container-fluid">
	<div class="row">