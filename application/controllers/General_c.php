<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class General_c extends CI_Controller {
	function __construct(){
		parent::__construct();	
		$this->load->model('GlobalBd');
		$this->load->helper('general');
	}	
	// -----------------------------------------
	public function newDuplicateRecord()
	{
		$consult = $this->GlobalBd->checkDuplicateNewRecord();        
     	echo json_encode($consult);
	}
	// -----------------------------------------
	public function duplicateRecord(){
		$consult = $this->GlobalBd->checkDuplicateRecord();
		echo json_encode($consult);
	}//function	
	// -----------------------------------------
}