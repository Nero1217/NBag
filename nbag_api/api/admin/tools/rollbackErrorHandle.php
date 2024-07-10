<?php
if(isset($connTransaction)){
    if($connTransaction){
        if(!$conn->rollback()){
            $msg_object['status'] = "rollbackF";
            $msg_object['message'] = "rollback failed";
        }
    }
}
?>