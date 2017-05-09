<?php

spl_autoload_register(function ($class) {
    include $class . '.class.php';
});

class database extends globalstuff{

	
	private $database_name;
	private $database_user;
	private $database_pass;
	private $database_host;
	private $mysqli;

	public $array_tables;


	/*CONTRUCTOR*/
	function __construct() {
   	parent::__construct();

   	/*definir a zona horaria*/
   	date_default_timezone_set('GMT');

   	include "config/database_config.php";

	$this->database_name = $database_name;
   	$this->database_user = $database_user;
   	$this->database_pass = $database_pass;
   	$this->database_host = $database_host;

   	$this->array_tables = $array_tables;

   }

   /*CONECTAR A BASE DE DADOS*/
   private function connect($database = null, $user = null, $pass = null, $host = null)
	{
		if ($database && $user && $pass && $host) {
			$this->mysqli = new mysqli($host, $user, $pass, $database);
		}
		else{
			$this->mysqli = new mysqli($this->database_host, $this->database_user, $this->database_pass, $this->database_name);
		}
		
		if ($this->mysqli->connect_errno) {
			$this->error_report("Failed to connect to MySQL: (" . $this->mysqli->connect_errno . ") " . $this->mysqli->connect_error);
			$result = $this->flag_error;
		}
		else{
			$result = $this->flag_success;
		}

		return $result;
	}

	/*DESCONECTAR DA BASE DE DADOS*/
	private function disconnect()
   {
    	$this->mysqli->close(); 
   }


   /*QUERY SIMPLES
		$qry -> string sql
   */
   function query_simple($qry)
	{

		$flag = $this->connect();

		if ($flag == $this->flag_success) {

			if(!$result = $this->mysqli->query($qry)){

				$this->error_report("MySQL error: (" . $this->mysqli->errno . ") " . $this->mysqli->error);
				$result = $this->flag_error;

			}	

			$this->disconnect();
		}
		else{
			$result = $this->flag_error;
		}
		
		return $result;
	}

	/*
	* QUERY de todo o tipo, inserts, updates, selects, deletes 
	* com paramatros inseridos pelo utilizador
	*/

	function query_simple_prepare($qry, $array_vars, $string_var_type, $id_conta = null){
		if ($id_conta) {
			$res_dados_bd = $this->query_simple_prepare("SELECT user_db, pass_db, name_db, host_db FROM ".$this->array_tables[2]." WHERE id=?",array($id_conta),'i');
			$flag = $this->connect($res_dados_bd[0]['name_db'],$res_dados_bd[0]['user_db'],$res_dados_bd[0]['pass_db'],$res_dados_bd[0]['host_db']);
		}
		else{
			$flag = $this->connect();	
		}
		

		if ($flag == $this->flag_success) {
			$stmt = $this->mysqli->stmt_init();
			
			if (!($stmt->prepare($qry))) { 
			   $this->error_report("Prepare failed: (" . $this->mysqli->errno . ") " . $this->mysqli->error);
			   $result = $this->flag_error;
			}
			else{
				
				$a_params[] = & $string_var_type;
				$n = count($array_vars);
				for($i = 0; $i < $n; $i++) {
				  $a_params[] = & $array_vars[$i];
				}



				call_user_func_array(array($stmt, 'bind_param'), $a_params);

		    	
				if (!$stmt->execute()) {
					$this->error_report("Execute failed: (" . $stmt->errno . ") " . $stmt->error);
					$result = $this->flag_error;
				}
				else{
					$stmt->store_result();


					$result = array();
					while($assoc_array = $this->fetchAssocStatement($stmt))
				   {
				   	$result[] = $assoc_array;
				   }
					
				}
			}
		}

		return $result;

	}

	/*FUNÇÃO PARA TRATAR OS RESULTADOS DE UM PREPARED STATMENT*/
	function fetchAssocStatement($stmt)
	{
	    if($stmt->num_rows>0)
	    {
	        $result = array();
	        $md = $stmt->result_metadata();
	        $params = array();
	        while($field = $md->fetch_field()) {
	            $params[] = &$result[$field->name];
	        }
	        call_user_func_array(array($stmt, 'bind_result'), $params);
	        if($stmt->fetch())
	            return $result;
	    }

	    return null;
	}

	function return_id_lang($lang){
		$result = $this->query_simple_prepare("SELECT id FROM ".$this->array_tables[2]." WHERE sigla=?",array($lang),'s');
		if (count($result) == 1) {
			return $result[0]['id'];
		}
		else{
			$result = $this->query_simple_prepare("SELECT id, sigla FROM ".$this->array_tables[2]." WHERE principal=1",array(),'');	
			return array($this->flag_error,$result[0]['id'],$result[0]['sigla']);
		}
	}


	function global_activar($table,$id){
		$result = $this->query_simple("UPDATE ".$table." SET activo = !activo WHERE id=".$id);
		if ($result != $this->flag_error) {
			$result = $this->flag_success;
		}
		return $result;
	}


	function return_max_ordem($table, $database = NULL)
	{
		if ($database) {
			$database_query = $database;
		}
		else{
			$database_query = $this->database_name;	
		}

		$res=$this->query_simple("SELECT COLUMN_NAME,DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '".$database_query."' AND TABLE_NAME='".$table."' AND COLUMN_NAME='ordem'");

	   if ($res->num_rows == 1 ) {
	      $result = $this->query_simple("SELECT MAX(ordem) as max FROM ".$table);
			if ($result !== $this->flag_error) {
				$max = $result->fetch_assoc()['max'];
				$result = $max;
				if (!$result) {
					$result = 1;
				}
			}
	   }   
	   else{
	   	$result = $this->flag_error;
	   }
		
		return $result;
	}



}

?>