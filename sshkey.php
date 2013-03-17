<?php
$f="/home/git/.ssh/authorized_keys";
$key=$_GET['key'];
$data=file_get_contents($f);

$data = $data."\n".$key;
if (FALSE === file_put_contents($f,$data))
	echo "failed ;(";
else
	echo "OK"

?>
