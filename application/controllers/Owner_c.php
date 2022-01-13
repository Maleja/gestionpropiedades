<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Owner_c extends CI_Controller {
	function __construct(){
		parent::__construct();	
		$this->load->model('GlobalBd');
		$this->load->helper('general');
		$this->load->model('Owner');
	}	
	//---------------------------------------------------------------------- 
	public function index()
	{
		$title = array('title' => "Owner", 'action' => "Consult");
		h_view_loader('Owner/owner_consult', $title);
	}
	//---------------------------------------------------------------------- 
	public function consult()
	{
		$result = $this->Owner->consult();
		header('Content-Type: application/json');
		echo json_encode($result);		
	}
	//---------------------------------------------------------------------- 
	public function add()
	{
		$title = array('title' => "Owner", 'action' => "Add");
		h_view_loader('Owner/owner_add', $title);
	}
	//---------------------------------------------------------------------- 
	public function save()
	{
		$result = $this->Owner->save();
		header('Content-Type: application/json');
		echo json_encode($result);
	}
	// -----------------------------------------
	public function edit(){    
		$id = $this->uri->segment(3);
		h_validateExistsRecord('Owner',$id,'owner');
		$title = array('title' => "Owner", 'action' => "Edit");
		$vars['record'] = $this->Owner->consultRecord($id);

		h_view_loader('Owner/owner_edit', $title,$vars);
	}//function
	// -----------------------------------------
	public function editRecord($id){
		$result = $this->Owner->editRecord($id);
			 
		header('Content-Type: application/json');
		echo json_encode($result);
	}
	// -----------------------------------------
	public function delete($id){
		$result = $this->Owner->deleteRecord($id);
			 
		header('Content-Type: application/json');
		echo json_encode($result);
	}
	// -----------------------------------------
}
