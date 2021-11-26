let urlPrefix = "http://" + location.host + "/";

// button function for logout
function logout(){
    // user session token
    var token = sessionStorage.getItem('token');
    sessionStorage.clear();

    let ajax = new XMLHttpRequest();
    ajax.onload = function()
    {
        window.location.replace("http://" + location.host + "/");
    }

    // error handeler
    ajax.onerror = function()
    {
        console.log(error);
    }

    ajax.open("DELETE", "http://" + location.host + "/logout?sessionID=" + token);
    ajax.send();
}

// button function for addEvents
function showAddEvents(){
    // nav buttons
    var addButton = document.getElementById("addEventBtn");
    var joinButton = document.getElementById("joinGroupBtn");

    var infoButton = document.getElementById("showInfoBtn");
    var createButton = document.getElementById("createGroupBtn");
    // content pages
    var showAddEvent = document.getElementById("add");
    var main = document.getElementById("main");
    var createGroup = document.getElementById("group");
    var joinGroup = document.getElementById("joinGroup");
    var studentInfo = document.getElementById("studentInformation");

    // show/Hide 
    if (showAddEvent.style.display === "block") {
        showAddEvent.style.display = "none";
        createGroup.style.display = "none";
        joinGroup.style.display = "none";
        studentInfo.style.display = "none";
        main.style.display = "block";

        //button color
        addButton.style.backgroundColor ="#F5F5F5";
        addButton.style.color = "#000";

        infoButton.style.backgroundColor ="#F5F5F5";
        infoButton.style.color = "#000";

        joinButton.style.backgroundColor ="#F5F5F5";
        joinButton.style.color = "#000";

        createButton.style.backgroundColor ="#F5F5F5";
        createButton.style.color = "#000";
    }
    else {
        showAddEvent.style.display = "block";
        joinGroup.style.display = "none";
        studentInfo.style.display = "none";
        main.style.display = "none";
        createGroup.style.display = "none";

        // change button blue
        addButton.style.backgroundColor ="#003399";
        addButton.style.color = "#fff";

        //every other button
        infoButton.style.backgroundColor ="#F5F5F5";
        infoButton.style.color = "#000";

        joinButton.style.backgroundColor ="#F5F5F5";
        joinButton.style.color = "#000";

        createButton.style.backgroundColor ="#F5F5F5";
        createButton.style.color = "#000";
    }
}

// button function for create Group
function showCreateGroup(){
    // nav buttons
    var addButton = document.getElementById("addEventBtn");
    var joinButton = document.getElementById("joinGroupBtn");

    var infoButton = document.getElementById("showInfoBtn");
    var createButton = document.getElementById("createGroupBtn");

    // content pages
    var showCreateGroup = document.getElementById("group");
    var main = document.getElementById("main");
    var addEvent = document.getElementById("add");
    var joinGroup = document.getElementById("joinGroup");
    var studentInfo = document.getElementById("studentInformation");

    //show/Hide
    if (showCreateGroup.style.display === "block") {
        showCreateGroup.style.display = "none";
        addEvent.style.display = "none";
        joinGroup.style.display = "none";
        studentInfo.style.display = "none";
        main.style.display = "block";

        //button color
        addButton.style.backgroundColor ="#F5F5F5";
        addButton.style.color = "#000";

        infoButton.style.backgroundColor ="#F5F5F5";
        infoButton.style.color = "#000";

        joinButton.style.backgroundColor ="#F5F5F5";
        joinButton.style.color = "#000";

        createButton.style.backgroundColor ="#F5F5F5";
        createButton.style.color = "#000";
    } 
    else {
        showCreateGroup.style.display = "block";
        joinGroup.style.display = "none";
        studentInfo.style.display = "none";
        main.style.display = "none";
        addEvent.style.display = "none";

        // change button blue
        createButton.style.backgroundColor ="#003399";
        createButton.style.color = "#fff";

        //every other button
        infoButton.style.backgroundColor ="#F5F5F5";
        infoButton.style.color = "#000";

        joinButton.style.backgroundColor ="#F5F5F5";
        joinButton.style.color = "#000";

        addButton.style.backgroundColor ="#F5F5F5";
        addButton.style.color = "#000";
    }
}

// button function for join group
function showJoinGroup(){
    // nav buttons
    var addButton = document.getElementById("addEventBtn");
    var joinButton = document.getElementById("joinGroupBtn");

    var infoButton = document.getElementById("showInfoBtn");
    var createButton = document.getElementById("createGroupBtn");


    // show/hide varibles
    var createGroup = document.getElementById("group");
    var main = document.getElementById("main");
    var addEvent = document.getElementById("add");
    var joinGroup = document.getElementById("joinGroup");
    var studentInfo = document.getElementById("studentInformation");

    // show/Hide 
    if (joinGroup.style.display === "block") {
        joinGroup.style.display = "none";
        createGroup.style.display = "none";
        addEvent.style.display = "none";
        studentInfo.style.display = "none";
        main.style.display = "block";
         
        //button color
         addButton.style.backgroundColor ="#F5F5F5";
         addButton.style.color = "#000";
 
         infoButton.style.backgroundColor ="#F5F5F5";
         infoButton.style.color = "#000";
 
         joinButton.style.backgroundColor ="#F5F5F5";
         joinButton.style.color = "#000";
 
         createButton.style.backgroundColor ="#F5F5F5";
         createButton.style.color = "#000";

    } else {
        joinGroup.style.display = "block";
        createGroup.style.display = "none";
        studentInfo.style.display = "none";
        main.style.display = "none";
        addEvent.style.display = "none";

         // change button blue
         joinButton.style.backgroundColor ="#003399";
         joinButton.style.color = "#fff";

         //every other button
         infoButton.style.backgroundColor ="#F5F5F5";
         infoButton.style.color = "#000";

         createButton.style.backgroundColor ="#F5F5F5";
         createButton.style.color = "#000";

         addButton.style.backgroundColor ="#F5F5F5";
         addButton.style.color = "#000";
    }

    //AJAX request to get list of groups
    let ajax = new XMLHttpRequest();

    ajax.onerror = function(){
        console.log(error);
    }

    ajax.onload = function()
    {
        console.log(this.responseText); // debug

        let result = JSON.parse(this.responseText); //parse result
	    console.log(this.responseText);
        // use result and send info so user can see
    }

    ajax.open("GET", urlPrefix + "getGroups?sessionID=" + sessionStorage.getItem("token"));
    ajax.send();
}

//Button function for "submit" button on Join Group page

function groupSearch()
{
    var con = document.getElementById("content");

	var searchText = document.getElementById("searchInput").value;
	var category = document.getElementById("groupCategory").value;
	var accessibility = document.getElementById("groupAccess").value;

	alert(searchText + category + accessibility);

	let ajax = new XMLHttpRequest();

	ajax.onerror = function()
	{
        console.log(error);
	}

	ajax.onload = function()
	{
		console.log(this.responseText);
        con.style.display="block";
	}

	ajax.open("GET", urlPrefix + "getGroups?sessionID=" + sessionStorage.getItem("token") + "&search=" + searchText + "&category=" + category + "&access=" + accessibility);
	ajax.send();
}


// button function for student information
function showStudentInfo(){
   // nav buttons
   var addButton = document.getElementById("addEventBtn");
   var joinButton = document.getElementById("joinGroupBtn");

   var infoButton = document.getElementById("showInfoBtn");
   var createButton = document.getElementById("createGroupBtn");


   // show/hide varibles
   var createGroup = document.getElementById("group");
   var main = document.getElementById("main");
   var addEvent = document.getElementById("add");
   var joinGroup = document.getElementById("joinGroup");
   var studentInfo = document.getElementById("studentInformation");
    
    // show/Hide 
    if (studentInfo.style.display == "block"){
        joinGroup.style.display = "none";
        createGroup.style.display = "none";
        addEvent.style.display = "none";
        studentInfo.style.display = "none";
        main.style.display = "block";

         //button color
         addButton.style.backgroundColor ="#F5F5F5";
         addButton.style.color = "#000";
 
         infoButton.style.backgroundColor ="#F5F5F5";
         infoButton.style.color = "#000";
 
         joinButton.style.backgroundColor ="#F5F5F5";
         joinButton.style.color = "#000";
 
         createButton.style.backgroundColor ="#F5F5F5";
         createButton.style.color = "#000";
	return;
    }
        joinGroup.style.display = "none";
        createGroup.style.display = "none";
        studentInfo.style.display = "block";
        main.style.display = "none";
        addEvent.style.display = "none";

         // change button blue 
         infoButton.style.backgroundColor ="#003399";
         infoButton.style.color = "#fff";

         //every other button
         joinButton.style.backgroundColor ="#F5F5F5";
         joinButton.style.color = "#000";

         createButton.style.backgroundColor ="#F5F5F5";
         createButton.style.color = "#000";

         addButton.style.backgroundColor ="#F5F5F5";
         addButton.style.color = "#000";

    //varibles for update 
    var accessLevel = document.getElementById('ACL');
    var firstname = document.getElementById('fn');
    var lastname = document.getElementById('ln');
    var username = document.getElementById('un');
    var email = document.getElementById('em');
    var id = document.getElementById('id');
    var classStatus = document.getElementById('sc');

    //AJAX request to get student information
    let ajax = new XMLHttpRequest();

    ajax.onerror = function(){ // send error
	    alert('error');
    }

    ajax.onload = function()
    {
	console.log(this.responseText); // debug

        let result = JSON.parse(this.responseText); //parse result

        // update for user
        accessLevel.innerHTML = result[0].accessLevel;
        firstname.innerHTML = result[0].firstName;
        lastname.innerHTML = result[0].lastName;
        username.innerHTML = result[0].username;
        email.innerHTML = result[0].email;
        id.innerHTML = result[0].scsuID;
        classStatus.innerHTML = result[0].class;
    }

    ajax.open("GET", urlPrefix + "getUserInfo?sessionID=" + sessionStorage.getItem("token"));
    ajax.send();
}

//Button function for submitting create group form
function submitCreateGroup()
{
	var json =
	{
		"sessionID" : sessionStorage.getItem("token"),
		"name" : document.getElementById("GroupName").value,
		"category" : document.getElementById("Category").value,
		"description" : document.getElementById("description").value,
		"color" : document.getElementById("Color").value,
		"isPublic" : document.getElementById("isPublic")
	}

 	var request = "sessionID=" + sessionStorage.getItem("token") +
		      "&name=" + document.getElementById("GroupName").value +
		      "&category=" + document.getElementById("Category").value +
	              "&description=" + document.getElementById("description").value +
	              "&color=" + document.getElementById("Color").value +
              	      "&isPublic=" + document.getElementById("isPublic").value;

	console.log("Request: " + request);

	let ajax = new XMLHttpRequest();

	ajax.onerror = function()
	{
		console.log(error);
	}

	ajax.onload = function()
	{
		alert("Group added successfully");
	}
	ajax.open("POST", urlPrefix + "createGroup");
	ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	ajax.send(request);
}

