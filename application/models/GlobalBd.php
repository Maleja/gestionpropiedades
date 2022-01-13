<?php
Class GlobalBd extends CI_Model
{
    //-------------------------------------------------
    function __construct() {
       // parent::__construct();
    }
    //-------------------------------------------------
    // Save the record in the indicated table. The data must come in an array 
    //-------------------------------------------------
    function saveRecord($table,$data){
        $error     = ERROR_GENERAL;
        $success   = MESSAGE_REGISTER_SUCCESSFUL;
        $no_record = MESSAGE_REGISTER_ERROR;
        $error_bd  = '';

        $result  = array('success' => -1, 'message' => $error);
        $this->db->trans_start();  
        $this->db->db_debug = FALSE; 
        $result = @$this->db->insert($table, $data); 

        if($this->db->error()){
            $error_bd = $this->db->error();
            $error_bd = $error_bd['message'];
        }//if
        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $result  = array('success' => 0, 'message' => $no_record,'bd' => $error_bd);
            $this->db->db_debug = TRUE; 
        }
        else{
            $query = $this->db->query('SELECT LAST_INSERT_ID() insert_id');
            $row  = $query->row_array();
            $insert_id = $row['insert_id'];
            $this->db->trans_commit();
            $result  = array('success' => 1, 'message' => $success, 'data' => $insert_id);
        }
        
        return $result;
    }//function
    //-------------------------------------------------  
    function consultCountRecords($table,$filter = null){
        $result = array('success' => -1, 'message' => ERROR_CONSULT);
        $where = "";
        //-------------------------------------------------
        if($filter != null){
            $where = "WHERE ".$filter;
        }
        //-------------------------------------------------
        $sql = "SELECT 
                    count(*) total
                FROM 
                    $table
                    $where";
        //-------------------------------------------------
        $query = @$this->db->query($sql);
        //-------------------------------------------------        
        if ($query->num_rows() >= 0){
            $data = $query->row()->total;
            $result = array('success' => 1, 'message' => MESSAGE_CONSULT_SUCCESSFUL,'result' => $data);
        }//if   
        
        $query->free_result();
        return($result);
    }//function
    //-------------------------------------------------
    function editRegistry($table,$data,$field,$value_field){    
        $result = array('success' => -1, 'message' => MESSAGE_REGISTER_ERROR);  

        $this->db->trans_start();
        $this->db->where($field, $value_field);
        $this->db->update($table, $data);    
        $this->db->trans_complete();
        //-------------------------------------------------
        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $result  = array('success' => 0, 'message' => MESSAGE_REGISTER_ERROR);
        } //if
        else {
            $this->db->trans_commit();
            $result  = array('success' => 1, 'message' => MESSAGE_REGISTER_SUCCESSFUL);
        }//else
        //-------------------------------------------------
        return $result;
    }//function 
    //-------------------------------------------------  
    //  Return
    //      0: no duplicated
    //      1: duplicated
    //      -1: error
    //-------------------------------------------------  
    function checkDuplicateNewRecord(){
        $table = $this->input->post('table');
		$value = $this->input->post('value');
        $field = $this->input->post('field');
        
        $where  = "";
        $result = array('success' => -1, 'message' => ERROR_CONSULT);
        //-------------------------------------------------
        $sql = "SELECT 
                    *
                FROM 
                    $table
                WHERE
                    $field = '$value'";
        //-------------------------------------------------
        $query = @$this->db->query($sql);    
        //-------------------------------------------------
        if ($query->num_rows() == 0){
            $result = array('success' => 0, 'message' => MESSAGE_CONSULT_SUCCESSFUL);
        }//if   
        elseif ($query->num_rows() > 0){
            $result = array('success' => 1, 'message' => MESSAGE_RECORD_DUPLICATED);
        }//if      
        //-------------------------------------------------
        $query->free_result();        
        return($result);  
    }//function
    //-------------------------------------------------    
    //  Return
    //      0: no duplicated
    //      1: duplicated
    //      -1: error
    //-------------------------------------------------  
    function checkDuplicateRecord(){
        $table = $this->input->post('table');
		$value = $this->input->post('value');
		$field = $this->input->post('field');
        $id    = $this->input->post('id');
        
        $where  = "";
        $result = array('success' => -1, 'message' => ERROR_CONSULT);
        //-------------------------------------------------
        $sql = "SELECT 
                    *
                FROM 
                    $table
                WHERE
                    $field = '$value'
                    AND id <> $id";
        //-------------------------------------------------
        $query = @$this->db->query($sql);         
        //-------------------------------------------------
        if ($query->num_rows() == 0){
            $result = array('success' => 0, 'message' => MESSAGE_CONSULT_SUCCESSFUL);
        }//if   
        elseif ($query->num_rows() > 0){
            $result = array('success' => 1, 'message' => MESSAGE_RECORD_DUPLICATED);
        }//if      
        //-------------------------------------------------
        $query->free_result();        
        return($result);  
    }//function
    //-------------------------------------------------
}//class
?>