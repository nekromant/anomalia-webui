<?php
$data = file_get_contents("/proc/meminfo");
$data=explode("\n",$data);
//$data = str_replace("\n","<br>", $data);
for ($i=0;$i<4;$i++)
	echo $data[$i]."<br>";
?>