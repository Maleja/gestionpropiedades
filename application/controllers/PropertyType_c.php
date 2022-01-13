<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PropertyType_c extends CI_Controller {
	function __construct(){
		parent::__construct();	
		$this->load->model('GlobalBd');
		$this->load->model('PropertyType');
		$this->load->helper('general');
	}	
	//---------------------------------------------------------------------- 
	public function index()
	{
		$title = array('title' => "Property Type", 'action' => "Consult");
		h_view_loader('PropertyType/property_type_consult', $title);
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
		$title = array('title' => "Property Type", 'action' => "Add");
		h_view_loader('PropertyType/property_type_add', $title);
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
		$id = $this->uri->segment(3);
		h_validateExistsRecord('PropertyType',$id,'property_type');
		$title = array('title' => "Property Type", 'action' => "Edit");
		$vars['record'] = $this->PropertyType->consultRecord($id);

		h_view_loader('PropertyType/property_type_edit', $title,$vars);
	}//function
	// -----------------------------------------
	public function editRecord($id){
		$result = $this->PropertyType->editRecord($id);
			 
		header('Content-Type: application/json');
		echo json_encode($result);
	}
	// -----------------------------------------
	public function delete($id){
		$result = $this->PropertyType->deleteRecord($id);
			 
		header('Content-Type: application/json');
		echo json_encode($result);
	}
	// -----------------------------------------
	
}
