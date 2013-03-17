function getXmlHttp(){
  var xmlhttp;
  try {
    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xmlhttp = false;
    }
  }
  if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
    xmlhttp = new XMLHttpRequest();
  }
  return xmlhttp;
}



function get_ajax(path) 
{
    var xmlhttp = getXmlHttp()
    xmlhttp.open('GET', path, false);
    xmlhttp.send(null);
    if(xmlhttp.status == 200) {
	return xmlhttp.responseText;
    }
}


function get_sysfile(file)
{
    return get_ajax('/sysfs.php?file=' + file);
} 

function get_df(disk) {
    data = get_ajax("/df.php?fs=" + disk);
    data = "arr=[" + data + ",0 ];";
    eval(data)
    return arr[2] + " of " + arr[1] + " used ( " + arr[4] + " )";
}

function eset(e,d) {
    document.getElementById(e).innerHTML=d;
}

function disc_usage() {
    root = get_df("/");
    data = get_df("/mnt");
    eset("disc_root",root);
    eset("disc_data",data);
}

function mem_usage()
{
    data = get_ajax("/meminfo.php");
    eset("meminfo", data);
}

var lastRepoCmd="git clone"
function git_repos(cmd) {
    if (cmd != null)
	lastRepoCmd=cmd;
    data = get_ajax("/gitrepo.php?list=yes&prefix="+encodeURIComponent(lastRepoCmd));
    eset("git_urls", data);
}


function data_update()
{
    vmax = get_sysfile("devices/platform/mt6573-battery/Charger_TopOff_Value");
    bv = get_sysfile("devices/platform/mt6573-battery/power_supply/battery/batt_vol");
    status = get_sysfile("devices/platform/mt6573-battery/power_supply/battery/status");
    cv = get_sysfile("devices/platform/mt6573-battery/ADC_Charger_Voltage");
    bvoltage =  bv + "/ " + vmax + "mV";
    cvoltage = cv + "mV";
    eset("bvoltage",bvoltage);
    eset("cvoltage",cvoltage);
    eset("bstatus",status);
    disc_usage();
    mem_usage();

}

//Ugly hack to make the browser reload the image every time
function bust_cache()
{
    f = document.getElementById("front");
    f.setAttribute("href","http://anomalia:8888/front.jpg#"+Math.random());
    f = document.getElementById("back");
    f.setAttribute("href","http://anomalia:8888/back.jpg#"+Math.random());

}

function on_load_handler(){
    data_update();
    git_repos();
    get_cpuinfo(); 
    get_sysinfo();
    bust_cache();
    window.setInterval("data_update();",  2000);
    
}

function add_ssh_key() {
    key = window.prompt("Paste your key here","");
    if (key != null) {
	result = get_ajax("/sshkey.php?key=" + encodeURIComponent(key));
	alert(result);
    }
}

function add_git_repo() {
    name = window.prompt("Enter the repo name","");
    if (name == null)
	return;
    dsc = window.prompt("Enter the repo description","");
    if (dsc == null)
	return;
    result = get_ajax("/gitrepo.php?name=" + 
		      encodeURIComponent(name) + 
		      "&dsc=" + encodeURIComponent(dsc));
    alert(result);
    git_repos();
}

function clone_git_repo() 
{
    name = window.prompt("Enter the repo name","");
    if (name == null)
	return;
    dsc = window.prompt("Enter the repo description","");
    if (dsc == null)
	return;
    url = window.prompt("Fill in the repo url","");
    if (url == null)
	return;
    result = get_ajax("/gitrepo.php?name=" + 
		      encodeURIComponent(name) +
 		      "&clone=" + encodeURIComponent(url)+
		      "&dsc=" + encodeURIComponent(dsc));
    alert(result);
    git_repos();

}

function get_cpuinfo()
{
    data=get_ajax('/cpuinfo.php');
    eset("cpuinfo",data);
}


function get_sysinfo()
{
    data=get_ajax('/sysinfo.php');
    eset("sysinfo",data);
}

