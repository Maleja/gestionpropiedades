<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Property_c extends CI_Controller {
	function __construct(){
		parent::__construct();	
		$this->load->model('GlobalBd');
		$this->load->helper('general');
	}	
	//---------------------------------------------------------------------- 
	public function index()
	{
		$title = array('title' => "Property", 'action' => "Consult");
		h_view_loader('Property/property_consult', $title);
	}
}
