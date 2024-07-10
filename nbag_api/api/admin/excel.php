<?php
global $conn,$msg_object;
require('./tools/allowOrigin.php');
require('./tools/connectDB.php');
require('./tools/msgObj.php');
if($request!==null){ 
    $type = $request->type;
    $uid = $request->uid;

    if($type=='excel'){
        require('./login.php');
        require('./tools/connectDB.php');
        if($msg_object['status'] == "success"){
            // Excel file name for download 
            $fileName = "members-data_" . date('Y-m-d') . ".csv"; 
            // Column names 
            $fields = array("Title","First Name","Last Name",
            "Birthday","Phone","Email","TNC",
            "UTM Source","UTM Medium","UTM Campaign",
            "Game Status","Game Result","QNA",
            "Redemption Status","Redemption Code","Redemption Date",
            "Registration Date"); 
            // Display column names as first row 
            $excelData = implode(',',array_values($fields)). "\n"; 
            /* sql */
            $sql = "SELECT title AS `Title`,
            fname AS `First Name`,
            lname AS `Last Name`, 
            CONCAT(year,'-',month,'-',day)AS Birthday,
            CONCAT(region,' ',mobile) AS `Phone`,
            email AS `Email`,
            tnc AS `TNC`,
            `utm_source` AS `UTM Source`,
            `utm_medium` AS `UTM Medium`,
            `utm_campaign` AS `UTM Campaign`,
            `game_status` AS `Game Status`,
            `game_result` AS `Game Result`,
            qna AS `QNA`, 
            `redeem_status` AS `Redemption Status`,
            `redeem_code` AS `Redemption Code`,
            DATE_FORMAT(redeem_date,'%d %M %Y') AS `Redemption Date`, 
            DATE_FORMAT(created_at,'%d-%M-%Y') AS `Registration Date` FROM `user` ORDER BY `created_at` ASC;";
            // 改0/1to false/true: if(redemStatus=0,'FALSE','TRUE')
            if($conn->query($sql)){
                $query = $conn->query($sql);
                if($query->num_rows>0){
                    while($row = $query->fetch_assoc()){ 
                        /* array */
                        $lineData = 
                        array($row['Title'], $row['First Name'],$row['Last Name'], 
                        $row['Birthday'], $row['Phone'], $row['Email'], $row['TNC'],
                        $row['UTM Source'],$row['UTM Medium'],$row['UTM Campaign'],
                        $row['Game Status'],$row['Game Result'],$row['QNA'],
                        $row['Redemption Status'],$row['Redemption Code'],$row['Redemption Date'],$row['Registration Date']); 
                        /* array_walk($lineData, 'filterData');  */
                        /* $excelData .= implode(",", array_values($lineData)) . "\n";  */
        
                        /* 如果database有錯,如何改excel data
                        for ($x =0; $x<15;$x++) {
                            if($x == 11){
                                $lineData[$x] =  '"'.$lineData[$x].'"';
                            } 
                            if($x == 1){
                                if($lineData[$x] == "Mrs."){
                                    $lineData[$x] = "Ms.";
                                } else if($lineData[$x] == "Ms."){
                                    $lineData[$x] = "Mrs.";
                                }
                            }
                        }
                        */
                        
                        $excelData .= implode(",", array_values($lineData)) . "\n"; 
                        
                    } 
                }else{
                    $msg_object['status'] = "fail";
                    $msg_object['message'] = "Get data success, but no record is found.";
                    // $excelData .= 'Get data success, but no record is found...'. "\n"; 
                }
                // $data = $conn->query($sql)->fetch_all(MYSQLI_ASSOC);
                $msg_object['status']='success';
                // 傳回data
                $msg_object['excel'] = $excelData;
            }else{
                $msg_object['status'] = "fail";
                $msg_object['message'] = "Cannot get data.";
            }
            // Headers for download 
            /* header("Content-type: text/x-csv");
            header("Content-Disposition: attachment; filename=\"$fileName\""); 
            */
            // 傳回名字
            $msg_object['message']= $fileName; 
            //一共傳回了status, message(filename), excel (dataString)
        }else{
            $msg_object['status'] = "fail";
            $msg_object['message'] = "User is not found.";
        }
    }else{
        $msg_object['status'] = "fail";
        $msg_object['message'] = "Invalid type.";
    }
    
    require("./tools/closeConn.php");
    echo json_encode($msg_object);
}else{
    echo("Nothing sent to server yet");
}
/*
function filterData(&$str){ 
    $str = preg_replace("/\t/", "\\t", $str); 
    $str = preg_replace("/\r?\n/", "\\n", $str); 
    if(strstr($str, '"')) $str = '"' . str_replace('"', '""', $str) . '"'; 
} */

?>