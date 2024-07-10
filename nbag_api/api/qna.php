<?php
global $conn,$msg_object,$email,$lang;
require('./tools/allowOrigin.php');
require('./tools/connectDB.php');
require('./tools/msgObj.php');
if($request!==null){
    $type = $request->type;
    
    #region Check empty
    if($type==""&&$type!==0){
        $msg_object['message'] = "Empty type";
    }
    #endregion 
    else if($type=='complete'){
        $uid= $request->uid;
        $qna= $request->qna;
        $lang= $request->lang;
        #region Check empty
        if($uid==""&&$uid!==0){
            $msg_object['message'] = "Empty uid";
        }else if($qna==""&&$qna!==0){
            $msg_object['message'] = "Empty qna";
        }else if($lang==""&&$lang!==0){
            $msg_object['message'] = "Empty lang";
        }
        #endregion
        #region Check length Check space
        else if((strlen($uid))>16 ||preg_match('/[\s]/', $uid)
        ||preg_match('/[^A-z0-9]/', $uid)){
            $msg_object['message'] = "Invalid uid";
        }else if((strlen($qna))>250
        ||preg_match('/[^A-z0-9,.。\p{Han}\s]/u', $qna)){
            $msg_object['message'] = "Invalid urStyle";
        }else if($lang!=='tc'&&$lang!=='en'){
            $msg_object['message'] = "Invalid lang";
        }
        #endregion
        #region Special
        #endregion
        else{
            /* connect to database */
            require('./tools/connectDB.php');
            /* select check */
            $check = "UPDATE user SET `qna` = ?, `updated_at`= NOW() WHERE `uid`=? ";
            $stmt = $conn->prepare($check);
            $stmt->bind_param('ss',$qna,$uid);
            if($stmt->execute()){
                if($stmt->affected_rows==1){
                    $getEmail = "SELECT email from user WHERE uid = ? ";
                    $stmt = $conn->prepare($getEmail);
                    $stmt->bind_param('s',$uid);
                    if($stmt->execute()){
                        $result = $stmt->get_result();
                        $msg_object['status'] = "success";
                        $data = array();
                        if ($result->num_rows > 0) {
                            while($row = $result->fetch_assoc()) {
                                $data[] = $row;
                            }
                        }
                        $email=$data[0]['email'];
                        require('./email.php');
                        
                    }else{
                        require("./tools/stmtErrorHandle.php"); 
                    }
                    
                }else{
                    require("./tools/stmtErrorHandle.php");
                }
            }else{
                require("./tools/stmtErrorHandle.php");
            } 
        }   
    }
    else{
        $msg_object['message'] = "Invalid type.";
    }
    echo json_encode($msg_object);

}else{
    echo("Nothing sent to server yet");
}


?>