<?php
global $conn,$msg_object;
require('./tools/allowOrigin.php');
require('./tools/connectDB.php');
require('./tools/msgObj.php');
if($request!==null){
    $type = $request->type;
    
    #region Check empty
    if($type==""&&$type!==0){
        $msg_object['message'] = "Please fill in the type.";
    }
    #endregion 
    else if($type=='complete'){
        $uid= $request->uid;
        $urStyle= $request->urStyle;
        #region Check empty
        if($uid==""&&$uid!==0){
            $msg_object['message'] = "Empty uid";
        }else if($urStyle==""&&$urStyle!==0){
            $msg_object['message'] = "Empty urStyle";
        }
        #endregion
        #region Check length Check space
        else if((strlen($uid))>16 ||preg_match('/[\s]/', $uid)
        ||preg_match('/[^A-z0-9]/', $uid)){
            $msg_object['message'] = "Invalid uid";
        }else if((strlen($urStyle))>16 ||preg_match('/[\s]/', $urStyle)
        ||preg_match('/[^A-z]/', $urStyle)){
            $msg_object['message'] = "Invalid urStyle";
        }
        #endregion
        #region Special
        #endregion
        else{
            /* connect to database */
            require('./tools/connectDB.php');
            /* select check */
            $check = "UPDATE user SET `game_status` = 'true', `game_result`= ? , `updated_at`= NOW() WHERE `uid`=? AND `game_status` != 'true'";
            $stmt = $conn->prepare($check);
            $stmt->bind_param('ss',$urStyle,$uid);
            if($stmt->execute()){
                if($stmt->affected_rows==1){
                    $msg_object['status'] = "success";
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