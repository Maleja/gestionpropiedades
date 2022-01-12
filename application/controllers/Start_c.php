<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Start_c extends CI_Controller {
	function __construct(){
		parent::__construct();	
		$this->load->model('GlobalBd');
		//$this->load->library('../controllers/General');
	}	
	//---------------------------------------------------------------------- 
	public function index()
	{
		$this->load->view('Template/header');
		$this->load->view('Template/menu');
		$this->load->view('start');
		$this->load->view('Template/footer');
	}
}
