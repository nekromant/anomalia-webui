<?php
$data=shell_exec("uptime");
$data=str_replace(",  ","<br>",$data);
echo $data."<br>";
exec("ifconfig ap0",$apinfo,$apmode);
exec("ifconfig wlan0",$wlinfo,$wlmode);



function get_address($data)
{
	$ip=explode(" ",$data[1]);
	$ip=explode(":",$ip[11]);
	echo "IP: ".$ip[1]."<br>";
}

if ($wlmode==0) {
	echo "Wireless client mode<br>";
	get_address($wlinfo);
} else if ($apmode==0) {
	echo "Wireless AP mode<br>";
	get_address($apinfo);
} else {
	echo "Network mode unknown";
}


?>
