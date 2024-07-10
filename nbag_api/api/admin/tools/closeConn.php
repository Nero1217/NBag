<?php
if(!$conn->close()){
    $msg_object['message'] = "conn close error.";
}
//  stmt is in for sql injection
// if(isset($stmt)){
//     if(!$stmt->close()){
//         $msg_object['message'] = "stmt close error.";
//     }
// }
?>