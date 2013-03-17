<?php
$f="/home/git/";

if (isset($_GET['list']))
	$list=$_GET['list'];
$prefix=$_GET['prefix'];
if (isset($_GET['clone']))
	$clone=$_GET['clone'];


if (isset($list)) {
 if ($handle = opendir($f)) {
    while (false !== ($entry = readdir($handle))) {
	if ($entry[0] != ".") {
            echo "$prefix <b>git@anomalia:$entry</b><br>";
        }
    }
    closedir($handle);
    die();
 }
}

$name=$_GET['name'];
$dsc=$_GET['dsc'];


if (is_dir("$f$name"))
	die("repo $f$name already exists");

if (isset($clone)) {
	echo shell_exec("git clone --bare $clone $f$name");
} else
	echo shell_exec("git init --bare $f$name");

file_put_contents("$f/$name/description",$dsc);

?>
