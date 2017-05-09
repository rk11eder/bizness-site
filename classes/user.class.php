<?php

spl_autoload_register(function ($class) {
    include $class . '.class.php';
});

class user extends database{

	/*CONTRUCTOR*/
	function __construct() {
   	parent::__construct();

   	/*definir a zona horaria*/
   	date_default_timezone_set('GMT');
   }


   function return_user_email_conta($email,$id_conta)
   {
		

   	$mysql_query = "SELECT id,user_create, nivel, last_login, nome FROM ".$this->array_tables[1]." WHERE email=? AND id_conta=? AND activo=1";	
   	$result = $this->query_simple_prepare($mysql_query,array($email,$id_conta),'si');

   	return $result;
   }

   function return_user_email($email)
   {
   	$mysql_query = "SELECT id,user_create FROM ".$this->array_tables[1]." WHERE email=? AND activo=1";	
   	$result = $this->query_simple_prepare($mysql_query,array($email),'s');

   	return $result;
   }

 

	/*LOGIN NO CASO DE SER EMAIL E PASS
   */
	function login_email($email, $pass)
	{
		$res_user = $this->return_user_email($email);

		if ( count($res_user) >= 1 ) {
			$flag_user_account = 0;
			

			$array_contas = array();
			foreach ($res_user as $key => $value) {
				$pass_encript = md5($email.$pass.$value['user_create']);

				$mysql_query = "SELECT id,nome,email,nivel,last_login,id_conta FROM ".$this->array_tables[1]." WHERE email=? AND key_pass=? AND activo=1";
				$result = $this->query_simple_prepare($mysql_query,array($email,$pass_encript),'ss');
				
				if (count($result) == 1) {
					$flag_user_account++;


					$user_data = $result[0];
					$user_data_return = array();
					$user_data_return['id'] = $user_data['id'];
					$user_data_return['nome'] = $user_data['nome'];
					$user_data_return['email'] = $user_data['email'];
					$user_data_return['nivel'] = $user_data['nivel'];
					$user_data_return['id_conta'] = $user_data['id_conta'];
					$user_data_return['last_login'] = $user_data['last_login'];

					$array_contas[] = $user_data_return;

				}
				
			}


			if ($flag_user_account == 0) {
				return false;
			}
			else{
				return $array_contas;
			}


			


		}
		else{
			return false;
		}

	}

	function return_accounts($email_user){

		$mysql_query = "SELECT ".$this->array_tables[1].".id_conta as id_conta, ".$this->array_tables[2].".nome as nome FROM ".$this->array_tables[1].",".$this->array_tables[2]." WHERE ".$this->array_tables[1].".email=? AND ".$this->array_tables[1].".activo=1 AND ".$this->array_tables[2].".id = ".$this->array_tables[1].".id_conta AND ".$this->array_tables[2].".activo = 1";	
   	$result = $this->query_simple_prepare($mysql_query,array($email_user),'s');

   	return $result;
	}


	function generate_pass($total = 8)
	{
		$new_pass = '';
		$arrayNumbers = array(48,57);
		$arrayMin = array(65,90);
		$arrayCaps = array(97,122);
		$arrayInterval = array($arrayNumbers,$arrayMin,$arrayCaps);
		for ($i=0; $i < $total; $i++) {
			$codeLength = rand(0,2); 
			$code = rand( $arrayInterval[$codeLength][0] , $arrayInterval[$codeLength][1] );
			$char = chr($code);	
			$new_pass .= $char; 
		}
		return $new_pass;
	}


	/*REGISTO UTILIZADOR DE UMA CONTA DE CMS*/
   function registo_user_conta($id_conta,$nome,$email,$password,$nivel)
	{
		$data_create = date('Y-m-d H:i:s');
		$pass_encript = md5($email.$password.$data_create);

		$res_user = $this->return_user_email_conta($email,$id_conta);

		if ( count($res_user) == 0 ) {
			$array_valores = array($id_conta,$nivel,$nome,$email,$pass_encript,$data_create );
			$res = $this->query_simple_prepare("INSERT INTO ".$this->array_tables[1]."(id_conta,nivel,nome,email,key_pass,user_create) VALUES(?,?,?,?,?,?)",$array_valores,"iissss");	
		}
		else{
			$res = $this->flag_error;
		}
		
		

		

		/*PARTE ENVIAR EMAIL*/
		/*$body_email = "Foi feito um registo no Backoffice ".$this->clienturl." em nome de ".$nome.' '.$apelido.", username - '".$username."'.<br /> A password gerada para esta conta foi: ".$gen_pass."<br />
		Poderá alterar a password em qualquer altura, na área de utilizador, em www.projectotasashop.com.<br /><br /><br />
		Para activar a sua conta clique <a href='".$this->clienturl."activaConta.php?user=".$username."'>aqui.</a>";
		
		$this->send_email($email,$this->email_smtp,$this->clienturl,$this->email_smtp,utf8_decode($body_email),"Registo de utilizador - ".$this->clienturl,$this->clienturl,2);*/


		
		return $res;


	}
	function update_user_conta($id_conta,$nome,$email,$password,$nivel,$id){
		$res_user = $this->query_simple_prepare("SELECT user_create FROM users_cms WHERE id=?",array($id),"i");
		if (count($res_user) == 1) {
			$create_data = $res_user[0]['user_create'];

			$res_user = $this->query_simple_prepare("SELECT id,id_conta FROM users_cms WHERE email=?",array($email),"s");
			
			if (count($res_user) == 0) {

				if ($password != '') {
					$pass_encript = md5($email.$password.$create_data);
					$array_valores = array($nivel,$nome,$email,$pass_encript,$id);
					$res = $this->query_simple_prepare("UPDATE users_cms SET nivel=?, nome=?, email=?, key_pass=? WHERE id=?",$array_valores,"isssi");	
					

				}
				else{
					$res = $this->flag_error;
				}
			}
			else{
				$erro_email =0;
				foreach ($res_user as $key => $value) {
					if ($value['id'] != $id && $value['id_conta'] == $id_conta) {
						$erro_email =1;
					}
				}
				if ($erro_email == 0) {
					if ($password != '') {
						$pass_encript = md5($email.$password.$create_data);
						$array_valores = array($nivel,$nome,$email,$pass_encript,$id);
						$res = $this->query_simple_prepare("UPDATE users_cms SET nivel=?, nome=?, email=?, key_pass=? WHERE id=?",$array_valores,"isssi");	
						

					}
					else{
						$res = $this->flag_error;
					}
				}
				else{
					$res = $this->flag_error;
				}
			}
			
		}
		else{
			$res = $this->flag_error;
		}

		return $res;
	}

	

	function recuperarPass($email){
   	$query = "SELECT id FROM users_cms WHERE email='".$email."' AND activo=1";
		$result = $this->query_totalrows($query);

		if($result == 1){
			$query = "SELECT email,user,id,nome FROM users_cms WHERE email='".$email."'";
			$result = $this->query_simple($query);
			$array_rows = $result->fetch_assoc();	
			$emailBD = $array_rows['email'];
			$usernameBD = $array_rows['user'];
			$nomeBD = $array_rows['nome'];
			$idBD = $array_rows['id'];

			$gen_pass = $this->generate_pass();
			$password = md5($usernameBD.$emailBD.$gen_pass);

			$array_valores = array('nome' => $nomeBD, 'user' => $usernameBD, 'password' => $password, 'email' => $emailBD , 'id' => $idBD );
			$res = $this->global_db_update(1,$array_valores);
			
			if($res == $this->flag_success){
				$body_email = "Foi feito um pedido de nova password para a conta ligada a este email. <br />
				A nova password é: ".$gen_pass."<br />
				E o username é: ".$usernameBD."<br /><br />
				Se não fez nenhum pedido peço que descarte este email.";

				$this->send_email($email,$this->email_smtp,$this->clienturl,$this->email_smtp,utf8_decode($body_email),"Nova password - ".$this->clienturl,$this->clienturl,2);	
			}
			

			return $res;

		}
		else{
			return $this->flag_error;
		}
   }
}

?>