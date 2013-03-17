<?php
$f=$_GET['file'];
$f=str_replace("..","",$f);
$f=str_replace("\/\/","",$f);
$a=file_get_contents("/sys/$f");
echo $a;
?>
