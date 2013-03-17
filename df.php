<?php 

$fs = $_GET['fs'];
$data=shell_exec("df -h $fs");
$data = explode("\n",$data);
$data = preg_split ("/\s+/",$data[1]);
//print_r($data);
foreach ($data as $d) {
	echo "'$d',";
}

?>