<?php
Class PropertyType extends CI_Model
{
    //----------------------------------------------------------------------
    function __construct() {
        parent::__construct();
		$this->load->model('GlobalBd');
    }
    //---------------------------------------------
    function consult(){     
      	//--------------------------------
      	$sql = "SELECT
					pt.*
				FROM
					PropertyType pt"; 

		$query  = @$this->db->query($sql);
		$result = $query->result();
		
		return $result;  
  	}
	//---------------------------------------------
    function save(){
        $description = $this->input->post('description');
        //--------------------------
        $data = array(
                    'description'=> $description,
                );
        $result = $this->GlobalBd->saveRecord('PropertyType',$data);
        return $result;
        
    }//function
	//---------------------------------------------
}//class
?>