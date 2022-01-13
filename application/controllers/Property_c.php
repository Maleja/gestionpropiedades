<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Property_c extends CI_Controller {
	function __construct(){
		parent::__construct();	
		$this->load->model('GlobalBd');
		$this->load->helper('general');
		$this->load->model('Property');
	}	
	// -----------------------------------------
	public function index()
	{
		$title = array('title' => "Property", 'action' => "Consult");
		h_view_loader('Property/property_consult', $title);
	}
	// -----------------------------------------
	public function consult()
	{
		$result = $this->Property->consult();
		header('Content-Type: application/json');
		echo json_encode($result);		
	}
	// -----------------------------------------
	public function add()
	{
		$ownerList        = $this->GlobalBd->consultRecordsFormatSelect('Owner','Name');
		$propertytypeList = $this->GlobalBd->consultRecordsFormatSelect('PropertyType','Description');
		$vars['ownerList'] = $ownerList['result'];
		$vars['propertytypeList'] = $propertytypeList['result'];

		$title = array('title' => "Property", 'action' => "Add");
		h_view_loader('Property/property_add', $title,$vars);
	}
	// -----------------------------------------
	public function save()
	{
		$result = $this->Property->save();
		header('Content-Type: application/json');
		echo json_encode($result);
	}
	// -----------------------------------------
	public function edit(){    
		$id = $this->uri->segment(3);
		h_validateExistsRecord("Property",$id,'property');
		$title = array('title' => "Property", 'action' => "Edit");
		$vars['record'] = $this->Property->consultRecord($id);
		$ownerList        = $this->GlobalBd->consultRecordsFormatSelect('Owner','Name');
		$propertytypeList = $this->GlobalBd->consultRecordsFormatSelect('PropertyType','Description');
		$vars['ownerList'] = $ownerList['result'];
		$vars['propertytypeList'] = $propertytypeList['result'];


		h_view_loader('Property/property_edit', $title,$vars);
	}//function
	// -----------------------------------------
	public function editRecord($id){
		$result = $this->Property->editRecord($id);
			 
		header('Content-Type: application/json');
		echo json_encode($result);
	}
	// -----------------------------------------
	public function delete($id){
		$result = $this->Property->deleteRecord($id);
			 
		header('Content-Type: application/json');
		echo json_encode($result);
	}
	// -----------------------------------------
}
