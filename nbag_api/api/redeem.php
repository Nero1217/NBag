<?php
global $conn,$msg_object;
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
        $redeem= $request->redeem;
        #region Check empty
        if($uid==""&&$uid!==0){
            $msg_object['message'] = "Empty uid";
        }else if($redeem==""&&$redeem!==0){
            $msg_object['message'] = "Empty redeem";
        }
        #endregion
        #region Check length Check space
        else if((strlen($uid))>16 ||preg_match('/[\s]/', $uid)
        ||preg_match('/[^A-z0-9]/', $uid)){
            $msg_object['message'] = "Invalid uid";
        }else if((strlen($redeem))>250
        ||preg_match('/[^A-z0-9]/', $redeem)){
            $msg_object['message'] = "Invalid redeem";
        }
        #endregion
        #region Special
        #endregion
        else{
            /* connect to database */
            require('./tools/connectDB.php');
            $connTransaction = $conn -> begin_transaction();
            $conn->autocommit(false);
            $conn -> commit();
            /* select check */
            $check = "UPDATE user SET `redeem_status`= 'true' , `redeem_code` = (SELECT code FROM redeemlist WHERE code= ? AND quota>0), `redeem_date`=NOW(),`updated_at`= NOW() WHERE `uid`=? AND `redeem_status`='false'";
            $stmt = $conn->prepare($check);
            $stmt->bind_param('ss',$redeem,$uid);
            if($stmt->execute()){
                if($stmt->affected_rows==1){
                    $check2 = "UPDATE redeemlist SET quota=quota-1 WHERE code= ? AND quota>0";
                    $stmt = $conn->prepare($check2);
                    $stmt->bind_param('s',$redeem);
                    if($stmt->execute()){
                        if($stmt->affected_rows==1){
                            $conn -> commit();
                            $msg_object['status'] = "success";
                            $msg_object['message'] = $stmt->affected_rows;
                        }else{
                            $msg_object['message'] = "fail";
                            require('./tools/rollbackErrorHandle.php');
                        } 
                    }
                }else{
                    $msg_object['message'] = "fail";
                    require('./tools/rollbackErrorHandle.php');
                }
            }else{
                require('./tools/rollbackErrorHandle.php');
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