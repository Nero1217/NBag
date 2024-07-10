<?php
global $conn,$msg_object;
// 通常2個或以上db才會用rollback
require('./tools/allowOrigin.php');
require('./tools/msgObj.php');
if($request!==null){
    $fname = $request->fname;
    if($fname=='' && $fname!==0){
        $msg_object['message'] = "Empty fname.";
    }
    else if (preg_match("/[\s]/",$fname) || strlen($fname)<1|| strlen($fname)>16){
        $msg_object['message'] = "Invalid fname.";
    }
    else{
        $uid = md5($fname);
        require("./tools/connectDB.php"); 
        $connTransaction = $conn -> begin_transaction();
        $conn->autocommit(false);
        $conn -> commit();
        // INSERT  
        $sql = "INSERT INTO member (fname,uid) VALUES 
        (?,?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ss',$fname,$uid);
        if($stmt->execute()){
            $sql = "INSERT INTO car (uid) VALUES 
            (?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('s',$uid);
            if($stmt->execute()){
                $conn -> commit();
                $msg_object['status'] = "success";
            }else{
                $msg_object['status'] = "step2";
                $msg_object['message'] = "fail message";
                require('./tools/rollbackErrorHandle.php');
            }
        }else{
            $msg_object['message'] = "fail message";
            require('./tools/rollbackErrorHandle.php');
        }  
    }
    require('./tools/closeConn.php');
    echo json_encode($msg_object);
}else{
    echo("Nothing sent to server yet");
}
   
?>