<?php
$data=file_get_contents("/proc/cpuinfo");
$data=str_replace("\n","<br>",$data);
echo $data;
?>
