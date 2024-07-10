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
    else if($type=='game1'){
        $title= $request->title;
        $fname= $request->fname;
        $lname= $request->lname;
        $yy= $request->yy;
        $mm= $request->mm;
        $dd= $request->dd;
        $region= $request->region;
        $mobile= $request->mobile;
        $email= $request->email;
        $tnc= $request->tnc;
        // 讓frontend決定Language顯示error handle
        #region Check empty
        if($title==""&&$title!==0){
            $msg_object['message'] = "Empty title";
        }else if($fname==""&&$fname!==0){
            $msg_object['message'] = "Empty fname";
        }else if($lname==""&&$lname!==0){
            $msg_object['message'] = "Empty lname";
        }else if($yy==""&&$yy!==0){
            $msg_object['message'] = "Empty birthday";
        }else if($mm==""&&$mm!==0){
            $msg_object['message'] = "Empty birthday";
        }else if($dd==""&&$dd!==0){
            $msg_object['message'] = "Empty birthday";
        }else if($region==""&&$region!==0){
            $msg_object['message'] = "Empty region";
        }else if($mobile==""&&$mobile!==0){
            $msg_object['message'] = "Empty mobile";
        }else if($email==""&&$email!==0){
            $msg_object['message'] = "Empty email";
        }
        #endregion
        #region Check length Check space
        else if((strlen($fname))>16 ||preg_match('/[\s]/', $fname)
        ||preg_match('/[^A-z\p{Han}]+/u', $fname)){
            $msg_object['message'] = "Invalid fname";
        }else if((strlen($lname))>16 ||preg_match('/[\s]/', $lname)
        ||preg_match('/[^A-z\p{Han}]+/u', $lname)){
            $msg_object['message'] = "Invalid lname";
        }else if((strlen($yy))> 4 || preg_match('/[\s]/', $yy)
        ||preg_match('/[^0-9]/', $yy)){
            $msg_object['message'] = "Invalid birthday";
        }else if((strlen($mm))> 2 || preg_match('/[\s]/', $mm)
        ||preg_match('/[^0-9]/', $mm)){
            $msg_object['message'] = "Invalid birthday";
        }else if((strlen($dd))> 2 || preg_match('/[\s]/', $dd)
        ||preg_match('/[^0-9]/', $dd)){
            $msg_object['message'] = "Invalid birthday";
        }else if((strlen($region))>5 ||preg_match('/[\s]/', $region)
        ||!preg_match('/^[+]{1}[0-9]{1,4}$/', $region)){
            $msg_object['message'] = "Invalid region";
        }else if(preg_match('/[\s]/', $mobile)
        ||!preg_match('/[0-9]{6,16}/', $mobile)){
            $msg_object['message'] = "Invalid mobile";
        }else if((strlen($email))>26 ||preg_match('/[\s]/', $email)
        ||!filter_var($email, FILTER_VALIDATE_EMAIL)){
            $msg_object['message'] = "Invalid email";
        }
        #endregion
        #region Special
        else if($title!=="Mr."&&$title!=="Mrs."&&$title!=="Ms."){
            $msg_object['message'] = "Invalid title";
        }
        else if($tnc!==true){
            $msg_object['message'] = "Invalid tnc";
        }
        #endregion
        else{
            /* connect to database */
            require('./tools/connectDB.php');
            /* select check */
            $check = "SELECT * FROM user WHERE (region=? AND mobile = ?) OR email = ?";
            $stmt = $conn->prepare($check);
            $stmt->bind_param('sss',$region,$mobile,$email);
            if($stmt->execute()){
                $result = $stmt->get_result();
                if($result->num_rows==0){
                    $uid= substr(md5($email.rand()),0,16);
                    $tnc = 'true';
                    $game_status = 'false';
                    $redeem_status = 'false';
                    /* insert */ 
                    $sql = "INSERT INTO `user`( `title`, `fname`, `lname`, `year`, `month`, 
                    `day`, `region`, `mobile`, `email`, `tnc`, 
                    `game_status`,`redeem_status`, `uid`) 
                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
                    $stmt = $conn->prepare($sql);
                    $stmt->bind_param('sssssssssssss',$title,$fname,$lname,$yy,$mm,$dd,$region,$mobile,$email,$tnc,$game_status,$redeem_status,$uid);
                    if($stmt->execute()){
                        $msg_object['status'] ='success';
                        $msg_object['title'] = $title;
                        $msg_object['fname'] = $fname;
                        $msg_object['lname'] = $lname;
                        $msg_object['uid'] = $uid;
                    }else{
                        require("./tools/closeConn.php");
                        $msg_object['message'] = "Register failed.";
                    } 
                    
                }else{
                    require("./tools/closeConn.php");
                    $msg_object['status'] = "complete";
                    $msg_object['message'] = "exist";
                }
            }else{
                require("./tools/closeConn.php");
                $msg_object['message'] = "Invalid submit";
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