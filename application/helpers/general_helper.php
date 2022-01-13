<?php
function h_view_loader($view, $title, $vars = null){
	$CI = &get_instance();
	$CI->load->view('Template/header');
	$CI->load->view('Template/menu',$title);
	$CI->load->view($view,$vars);
	$CI->load->view('Template/footer');

	return $CI;
}
// ------------------------------------------------------
function h_validateExistsRecord($table,$id,$module)
{
	$result = 1;
    $CI = get_instance();
  	$CI->load->model('GlobalBd');
	$record = $CI->GlobalBd->consultCountRecords($table,"id = $id");

	$total  = $record['result'];	
	if($total == 0){
		$result = 0;
		redirect($module, 'refresh');
	}//if

	return $result;
}
// ------------------------------------------------------
/*
// ------------------------------------------------------
function h_order_listing_select($data,$first_option = null)
{
    $i      = 0;
    $combo  = '';
    $select = '';
    if ($data != null) {
        if (count($data) > 0){
            if($first_option == null){
                $combo = "<option value=''>SELECT</option>";
            }
            else{
                $combo = "<option value=''>ALL</option>";   
            }
        } //if
        else if(count($data) == 1){
            $select = "selected = 'selected'";
        }//else
        // se agrega opciones al combo
        while ($i < count($data)) {
            $combo .= "<option value='" . $data[$i]['id'] ."'".$select.">" . $data[$i]["value"] . "</option>";
            $select = '';
            $i++;
        } //while
        return $combo;
    } else {
        return -1;
    } //else
} //funcion
// ------------------------------------------------------
function h_empty_listing()
{
    $combo = "<option value=''>SELECT</option>";      
    return $combo;
} //funcion
// ------------------------------------------------------
function h_generateRandomString($length = 10) {
    return substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length/strlen($x)) )),1,$length);
}
// ------------------------------------------------------
function h_order_date_bd($date_format)
{
    if(strpos($date_format,'/') !== false){
        $date_format = explode("/", $date_format);
        
        $date_format = $date_format[2].'-'.$date_format[0].'-'.$date_format[1];
    }//if

    return $date_format;
}
// ------------------------------------------------------
*/