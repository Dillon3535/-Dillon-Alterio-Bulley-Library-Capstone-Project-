// get IP of the virtual machine that the server is running on
const urlPrefix="http://" + location.host + "/";

// submit button from new account html
document.getElementById("subNA").addEventListener("click", submitForm);

function submitForm()
{
    let ajax = new XMLHttpRequest();

    // get values from form
    let firstName = document.getElementById("firstName").value;
	let lastName = document.getElementById("lastName").value;
    let username = document.getElementById("uName").value;
	let password = document.getElementById("uPassword").value;
	let email = document.getElementById("studentEmail").value;
	let scsuID = document.getElementById("studentID").value;
	let uClass = document.getElementById("classStatus").value;

	// alert user if problems
	ajax.onerror = function(){
		console.log("Error sending AJAX request");
    }

	// go back to login so user can log in
    ajax.onload = function(){
		window.location.replace(urlPrefix + "html/login.html");
		console.log("User Added");
    }

	// send info to database
    ajax.open("GET",urlPrefix+"createAccount?firstName=" + firstName + "&lastName=" + lastName + "&username=" + username + 
		"&password=" + password + "&email=" + email + "&scsuID=" + scsuID + "&uClass=" + uClass, true);
    ajax.send();
}
