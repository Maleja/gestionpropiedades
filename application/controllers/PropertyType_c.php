<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PropertyType_c extends CI_Controller {
	function __construct(){
		parent::__construct();	
		$this->load->model('GlobalBd');
		$this->load->model('PropertyType');
		$this->load->library('../controllers/General_c');
	}	
	//---------------------------------------------------------------------- 
	public function index()
	{
		$title['title']  = "Property Type";
		$title['action'] = "Consult";
		//$this->general_c->LoadAdmin('PropertyType/property_type_consult','Property Type');
		$this->load->view('Template/header');
		$this->load->view('Template/menu',$title);
		$this->load->view('PropertyType/property_type_consult');
		$this->load->view('Template/footer');
		
	}
	//---------------------------------------------------------------------- 
	public function consult()
	{
		$result = $this->PropertyType->consult();
		header('Content-Type: application/json');
		echo json_encode($result);		
	}
	//---------------------------------------------------------------------- 
	public function add()
	{
		$title['title']  = "Property Type";
		$title['action'] = "Add";
		$this->load->view('Template/header');
		$this->load->view('Template/menu',$title);
		$this->load->view('PropertyType/property_type_add');
		$this->load->view('Template/footer');
	}
	//---------------------------------------------------------------------- 
	public function save()
	{
		$result = $this->PropertyType->save();
		header('Content-Type: application/json');
		echo json_encode($result);
	}
	// -----------------------------------------
	public function edit(){    
		$id   = $this->uri->segment(3);
		$this->general_c->validateExistsRecord('PropertyType',$id,'property_type');
		
		$title['title']  = "Property Type";
		$title['action'] = "Edit";
		$this->load->view('Template/header');
		$this->load->view('Template/menu',$title);
		$this->load->view('PropertyType/property_type_edit');
		$this->load->view('Template/footer');
}//function
// -----------------------------------------
/*public function editRecord($id){    
		$gpri = $this->gdata['principal'];
		// ------- 
		$result = $this->$gpri->edit($id);
			 
		header('Content-Type: application/json');
		echo json_encode($result);
}*/
	
}
