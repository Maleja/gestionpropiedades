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
		$title['title']  = "Welcome";
		$title['action'] = "Quercu";
		$this->load->view('Template/header');
		$this->load->view('Template/menu',$title);
		$this->load->view('start');
		$this->load->view('Template/footer');
	}
}
