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
    function consultRecord($id){
        $sql = "SELECT
                    pt.*
                FROM
                    PropertyType pt
                WHERE
                    pt.Id = $id"; 

      $query  = @$this->db->query($sql);
      $result = $query->result()[0];
      
      return $result;  
    }
    //---------------------------------------------
    function editRecord($id){
        $description = $this->input->post('description');
        //--------------------------
        $data = array(
                    'description'=> $description,
                );
        $result = $this->GlobalBd->editRegistry('PropertyType',$data,'id',$id);
        return $result;
    }
    //---------------------------------------------
    //Return
    //  1: delete
    //  0: can not be deleted has associated records
    //  -1: error when performing the query
    //---------------------------------------------
    function deleteRecord($id){
        $result = array('success' => -1, 'message' => MESSAGE_ERROR_RECORD_DELETE); 
        //---------------------------------------------       
        //Return true has associated records and false has no associated records
        $sql   = "SELECT
                    CASE WHEN (record.result = 'true')
                    THEN 'true' ELSE 'false' END result
                FROM
                    (SELECT CASE WHEN count(*) > 0 THEN 'true' ELSE 'false' END result FROM Property WHERE PropertyTypeId = $id) record";
        $query = @$this->db->query($sql);           
        //---------------------------------------------
        if ($query->num_rows() != 0){
            $row = $query->row(); 
            //---------------------------------------------
            if($row->result == "false"){
                
                $this->db->trans_start();

                $this->db->where('id',$id);
                $this->db->delete('PropertyType');

                $this->db->trans_complete();

                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    $result  = array('success' => -1, 'message' => MESSAGE_ERROR_RECORD_DELETE);
                } //if
                else {
                    $this->db->trans_commit();
                    $result  = array('success' => 1, 'message' => MESSAGE_SUCCESS_RECORD_DELETE);
                }//
            }
            else{
                $result  = array('success' => 0, 'message' => MESSAGE_ASSOCIATED_RECORD_DELETE);  
            }//else            
            //---------------------------------------------
        }//if   
        else {
            $result  = array('success' => -1, 'message' => MESSAGE_ERROR_RECORD_DELETE);
        }//else

        return $result;
    }//function
	//---------------------------------------------
}//class
?>