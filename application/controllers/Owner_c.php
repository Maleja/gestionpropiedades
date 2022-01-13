<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Owner_c extends CI_Controller {
	function __construct(){
		parent::__construct();	
		$this->load->model('GlobalBd');
		$this->load->helper('general');
	}	
	//---------------------------------------------------------------------- 
	public function index()
	{
		$title = array('title' => "Owner", 'action' => "Consult");
		h_view_loader('Owner/owner_consult', $title);
	}
}
