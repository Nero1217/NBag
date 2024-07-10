<?php
require('./tools/allowOrigin.php');
require('./tools/msgObj.php');
require('./tools/connectDB.php');
if($request!==null){
    $type = $request->type;
    if($type==''&&$type!==0){
        $msg_object['status'] = "not";
        $msg_object['message']='Empty type.';
    }
    else if($type=='data'){
        $uid = $request->uid;
        if($uid==''&&$uid!==0){
            $msg_object['status'] = "not";
            $msg_object['message']='Empty uid.';
        }else if((strlen($uid))!==16||
        preg_match('/[\s]/', $uid)||
        preg_match('/[^A-z0-9]/', $uid)){
            $msg_object['status'] = "not";
            $msg_object['message'] = "Fail login data, please login again.";
        }else{
            $sql = "SELECT uid from admin WHERE uid=?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('s',$uid);
            if($stmt->execute()){
                $result = $stmt->get_result();
                if($result->num_rows >0){
                    $sql = "SELECT COUNT(*) AS regNum, `game_status` AS gameStatus, `redeem_status` AS redeemStatus,DATE_FORMAT(`created_at`,'%d/%m/%Y') AS date from user GROUP BY date,gameStatus,redeemStatus ORDER BY date ASC;";
                    $stmt = $conn->prepare($sql);
                    if($stmt->execute()){
                        $result = $stmt->get_result();
                        if($result->num_rows > 0){
                            while($row = $result->fetch_assoc()) {
                                $data[] = $row;
                            }
                            $msg_object['status'] = "success";
                            $msg_object['data'] = $data;
                        }else{
                            $msg_object['message'] = "Data not found..";
                        }
                    }else{
                        $msg_object['message']='Cannot get data..';
                    }
                }else{
                    $msg_object['status'] = "not";
                    $msg_object['message']='User not found..';
                }
            }else{
                $msg_object['message'] = "An error occurred while submitting the form. Please try again.";
            } 
        }
    }
    else if($type=='loginR'){
        $uid= $request->uid;
        if($uid==''&&$uid!==0){
            $msg_object['message']='Empty username.';
        }else{
            $sql = "SELECT * from admin WHERE uid=?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('s',$uid);
            if($stmt->execute()){
                $result = $stmt->get_result();
                if($result->num_rows > 0){
                    $msg_object['status'] = "success";
                    $msg_object['message'] = "";
                }else{
                    $msg_object['message'] = "User not found.";
                }
            }else{
                $msg_object['message'] = "An error occurred while submitting the form. Please try again.";
            } 
        }
    }else{
        $msg_object['message']='Invalid type.';
    }
    require("./tools/closeConn.php");
    echo json_encode($msg_object);

}else{
    echo("Nothing sent to server yet");
}

?>