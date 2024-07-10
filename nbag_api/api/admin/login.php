<?php
require('./tools/allowOrigin.php');
require('./tools/msgObj.php');
require('./tools/connectDB.php');
if($request!==null){
    $type = $request->type;
    if($type==''&&$type!==0){
        $msg_object['message']='Empty type.';
    }
    else if($type=='login'){
        $username = $request->username;
        $password = $request->password;
        if($username==''&&$username!==0){
            $msg_object['message']='Empty username.';
        }else if($password ==''&&$password !==0){
            $msg_object['message']='Empty password.';
        }else if((strlen($username))<1 || (strlen($username))>40||
        preg_match('/[\s]/', $username)||
        preg_match('/[^A-z0-9]/', $username)){
            $msg_object['message'] = "Please fill in a valid username.";
        }else if((strlen($password))<1 || (strlen($password))>32 ||
        preg_match('/[\s]/', $password)||
        preg_match('/[^A-z0-9]/', $password)){
            $msg_object['message'] = "Please fill in a valid password.";
        }else{
            $sql = "SELECT * from admin WHERE username=? AND password=?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('ss',$username,$password);
            if($stmt->execute()){
                $result = $stmt->get_result();
                if($result->num_rows > 0){
                    $result = $result->fetch_assoc();
                    $msg_object['status'] = "success";
                    $msg_object['uid'] = $result['uid'];
                }else{
                    $msg_object['message'] = "User not found.";
                }
            }else{
                $msg_object['message'] = "An error occurred while submitting the form. Please try again.";
            } 
        }
    }
    else if($type=='loginR'||$type=='excel'){
        $uid= $request->uid;
        if($uid==''&&$uid!==0){
            $msg_object['message']='Empty uid.';
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
    if($type=='login'||$type=='loginR'){
        echo json_encode($msg_object);
    }

}else{
    echo("Nothing sent to server yet");
}

?>