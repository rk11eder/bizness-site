<?php
spl_autoload_register(function ($class) {
	include $class . '.class.php';
});



class mail{

	public $email_smtp;
	private $pass_email_smtp;
	public $clienturl;

	public $email_developer;

	/*CONTRUCTOR*/
	function __construct() {
       	include "config/mail_config.php";

       	$this->email_smtp = $smtp_email;
       	$this->pass_email_smtp = $smtp_email_pass;
       	$this->clienturl = $url_mail;

       	$this->email_developer = $email_developer;

        /*definir a zona horaria*/
        date_default_timezone_set('GMT');
    	
    }


	/*
		method = 1 -> smtp
		method = 2 -> mail
	*/
	function send_email($to,$from,$name_from,$replyto,$body,$subject,$method){
		if ($method == 1)
         {
            $smtpinfo["host"] = "localhost";
            $smtpinfo["port"] = "25";
            $smtpinfo["auth"] = true;
            $smtpinfo["username"] = $this->email_smtp;
            $smtpinfo["password"] = $this->pass_email_smtp;

            $mID = md5(uniqid(time()));

            $headers = array (
            	'MIME-Version'=> '1.0', 
            	'From' => $name_from.' <'.$from.'>', 
					'To' => $to, 
					'Subject' => $subject, 
					'Reply-To' => $replyto, 
					'Return-Path' => $replyto, 
					'Organization' => $this->clienturl, 
					'Content-type' => 'text/html; charset=iso-8859-1',
					'X-Sender' => $from ,
					'X-Mailer'=> 'PHP/'.phpversion(),
					"Message-ID" => $mID . "@".$this->clienturl,
					"date" => date("D, d M Y H:i:s"), 
					"X-Priority" => "1",
					"X-MSmail-Priority"=> "High", 
					"X-MimeOLE" => "Produced By ".$this->clienturl
				);

            $mail_object = Mail::factory("smtp", $smtpinfo);
            $mail = $mail_object->send($to, $headers, $body);

            if (PEAR::isError($mail)) {
                $res = "mail ERROR: ".$mail->getMessage();
            } else {
                $res = 0;
            }
        }
        else
        {
            $headers  = "From: ".$name_from." <".$from."> \n";
            $headers .= "Reply-To: ".$replyto." \n";
            $headers .= "MIME-Version: 1.0 \n";
            $headers .= "Return-Path: ".$replyto." \n";
            $headers .= "Organization: ".$this->clienturl." \n";
            $headers .= "X-Sender: <$from> \n";
            $headers .= "X-Sender-IP: ".$_SERVER['SERVER_ADDR']." \r\n";
            $headers .= "Message-ID: <" . md5(uniqid(time())) . "@".$this->clienturl."> \n";
            $headers .= "Sender: <".$from."> \n";
            $headers .= "Date:".date("D, d M Y H:i:s"). "\n";
            $headers .= "X-Priority: 1 ";
            $headers .= "X-MSmail-Priority: High \n";
            $headers .= "X-MimeOLE: Produced By ".$this->clienturl." \n";
            $headers .= "X-Mailer: PHP/" . phpversion()."\n";
            $headers .= "Content-type: text/html; charset=iso-8859-1 \n";
            $mailparams = "-f$from";
            if (mail($to, $subject, $body, $headers)) {
                $res=0;    
            }
            else{
                $res = 1;
            }
            
        }
        return $res;
	}
}
?>