<?php
global $email,$lang;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require './PHPMailer/src/Exception.php';
require './PHPMailer/src/PHPMailer.php';
require './PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);

try {
    //服務器配置
    $mail->CharSet ="UTF-8";                     //設定郵件編碼
    $mail->SMTPDebug = 0;                        // 調試模式輸出
    $mail->isSMTP();                             // 使用SMTP
    $mail->Host = 'smtp.gmail.com';               // SMTP服務器
    $mail->SMTPAuth = true;                      // 允許 SMTP 認證
    $mail->Username = 'daoyay77@gmail.com';     // SMTP 用戶名  即郵箱的用戶名
    $mail->Password = 'igic rkia svpa hbuf';             // SMTP 密碼  部分郵箱是授權碼
    $mail->SMTPSecure = 'ssl';                    // 允許 TLS 或者ssl協議
    $mail->Port = 465;                            // 服務器端口 25 或者465 具體要看郵箱服務器支持
    $mail->SMTPOptions = array(
        'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
        )
    );
    //Recipients
    $mail->setFrom('daoyay77@gmail.com', 'Nero');
    $mail->addAddress($email);     //Add a recipient
    //$mail->addAddress('ellen@example.com');  // 可添加多個收件人
    //$mail->addReplyTo('xxxx@163.com', 'info'); //回覆的時候回覆給哪個郵箱 建議和發件人一致
    //$mail->addCC('cc@example.com');                    //抄送
    //$mail->addBCC('bcc@example.com');                    //密送

    //發送附件
    // $mail->addAttachment('../xy.zip');         // 添加附件
    // $mail->addAttachment('../thumb-1.jpg', 'new.jpg');    // 發送附件並且重命名

    //Content
    $mail->isHTML(true);                                  // 是否以HTML文檔格式發送  發送後客戶端可直接顯示對應HTML內容
    $mail->Subject = 'A PRESENT FOR YOU';

    $hyperlink = 'http://192.168.68.109/nbagWeb?lang='.$lang.'&p=re&uid='.$uid;
    $mail->Body    = '<html>
    <body style="padding:0px;margin:0px; width:100%; height:100%;">
        <div style="width:100%;height:100%;">
            <div style="width:100%;">
                <div style="width: 100%;display:block;max-width:500px;margin:auto;">
                    A Gift for you, show it to our staff: 
                </div>
                <div style="width: 100%;">
                    <a style="width:100%;display:block;max-width:500px;margin:auto;" href='.$hyperlink.' target="_blank">
                        Link
                    </a>  
                </div>
            </div>
        </div>
    </body>
    </html>';
    $mail->AltBody = 'Thank you for be a part in N-Bag event.';

    if($mail->send()){
        $msg_object["email_status"] = 'success';
    }else{
        $msg_object["email_status"] = 'fail';
    };
} catch (Exception $e) {
    $msg_object["email_status"] = 'fail';
}                           

?>