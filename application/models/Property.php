<?php
Class Property extends CI_Model
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
					pr.*,
                    (SELECT Name FROM Owner WHERE id = pr.OwnerId)Owner
				FROM
					Property pr"; 

		$query  = @$this->db->query($sql);
		$result = $query->result();
		
		return $result;  
  	}
	//---------------------------------------------
    function save(){
        $propertytypeid = $this->input->post('propertytypeid');
        $ownerid        = $this->input->post('ownerid');
        $number         = $this->input->post('number');
        $address        = $this->input->post('address');
        $area           = $this->input->post('area');
        $construction   = $this->input->post('construction');
        //--------------------------
        $data = array(
                    'Number'           => $number,
                    'Address'          => $address,
                    'Area'             => $area,
                    'ConstructionArea' => $construction,
                );
        if($ownerid != ''){
            $data['OwnerId'] = $ownerid;
        }
        if($propertytypeid != ''){
            $data['PropertyTypeId'] = $propertytypeid;
        }

        $result = $this->GlobalBd->saveRecord('Property',$data);
        return $result;
        
    }//function
    //---------------------------------------------
    function consultRecord($id){
        $sql = "SELECT
                    pr.*
                FROM
                    Property pr
                WHERE
					pr.Id = $id"; 

      $query  = @$this->db->query($sql);
      $result = $query->result()[0];
      
      return $result;  
    }
    //---------------------------------------------
    function editRecord($id){
		$propertytypeid = $this->input->post('propertytypeid');
        $ownerid        = $this->input->post('ownerid');
        $number         = $this->input->post('number');
        $address        = $this->input->post('address');
        $area           = $this->input->post('area');
        $construction   = $this->input->post('construction');
        //--------------------------
        $data = array(
                    'PropertyTypeId'   => null,
                    'OwnerId'          => null,
                    'Number'           => $number,
                    'Address'          => $address,
                    'Area'             => $area,
                    'ConstructionArea' => $construction,
                );

        if($ownerid != ''){
            $data['OwnerId'] = $ownerid;
        }
        if($propertytypeid != ''){
            $data['PropertyTypeId'] = $propertytypeid;
        }
        $result = $this->GlobalBd->editRegistry('Property',$data,'id',$id);
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
        $this->db->trans_start();

        $this->db->where('id',$id);
        $this->db->delete('Property');

        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $result  = array('success' => -1, 'message' => MESSAGE_ERROR_RECORD_DELETE);
        } //if
        else {
            $this->db->trans_commit();
            $result  = array('success' => 1, 'message' => MESSAGE_SUCCESS_RECORD_DELETE);
        }//

        return $result;
    }//function
	//---------------------------------------------
}//class
?>