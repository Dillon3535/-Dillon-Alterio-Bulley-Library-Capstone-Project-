const urlPrefix="http://" + location.host + "/"; // client path

// global varibles 
let user = document.getElementById("uName");
let password = document.getElementById("uPassword");

// button listener 
document.getElementById("sub").addEventListener("click",save);

if (sessionStorage.getItem("token"))
{
	window.location.replace(urlPrefix + "html/dashboard.html?sessionID=" + sessionStorage.getItem("token"));
}

function save(){
    
    //  function varibles 
    let AJAX = new XMLHttpRequest();

    let user = document.getElementById("uName").value;
    let password = document.getElementById("uPassword").value;

    // Debug
    console.log("user name submitted: "+ user);
    console.log("Password submiited: "+ password);

    // error 
    AJAX.onerror = function(){
        console.log("AJAX error");
    }

    // send user to dashboard once logged in  
    AJAX.onload = function(){
	    console.log(AJAX.response);
	    sessionStorage.setItem("token", AJAX.response);
	    window.location.replace(urlPrefix + "html/dashboard.html?sessionID=" + sessionStorage.getItem("token"));
    }

    //setup the connection parameters
    AJAX.open("GET",urlPrefix+"saveForm?username="+user+"&password="+password, true);
    AJAX.send();
}
