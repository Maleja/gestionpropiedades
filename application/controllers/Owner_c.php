<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Owner_c extends CI_Controller {
	function __construct(){
		parent::__construct();	
		$this->load->model('GlobalBd');
		$this->load->library('../controllers/General_c');
	}	
	//---------------------------------------------------------------------- 
	public function index()
	{
		$this->load->view('Template/header');
		$this->load->view('Template/menu');
		$this->load->view('Owner/owner_consult');
		$this->load->view('Template/footer');
	}
}
