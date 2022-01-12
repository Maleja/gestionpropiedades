<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class General_c extends CI_Controller {
	function __construct(){
		$this->load->model('GlobalBd');
	}	
	//----------------------------------------------------------------------
  public function index(){}
	//----------------------------------------------------------------------
	public function LoadAdmin($page,$title,$data_page = null)
	{
		/*$this->load->view('Template/header');
		$this->load->view('Template/menu',$title);
		$this->load->view($page,$data_page);
		$this->load->view('Template/footer');*/
	}   
	//----------------------------------------------------------------------
	public function validateExistsRecord($table,$id,$module)
	{   
		
		$result = 1;
		$record = $this->GlobalBd->consultCountRecords($table,"id = $id");
		$total  = $record['result'];	

		if($total == 0){
			$result = 0;
			redirect($module, 'refresh');
		}//if

		return $result;
	}
}


