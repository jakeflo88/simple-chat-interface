//default name
var nick = "Anonymous";

//function for posting messages
function addMessage() {
	
	//get the message and clear the textarea
	var text = document.getElementById("userMessage").value;
	document.getElementById("userMessage").value = "";
	document.getElementById("userMessage").focus();

	//check for nick command
	if (text.indexOf("/nick") > -1){
		nick = text.substring(6);
		text = ("Name changed to: '" + nick + "'");

		var post = document.createElement("P");
		var content = document.createTextNode(text);
		post.appendChild(content);
		document.getElementById("messages").appendChild(post);
		return;
	}
	
	//if nothing is typed
	if (text === "") {
		//do nothing
	}

	//for regular messages
	else {
		var post2 = document.createElement("P");
		var content2 = document.createTextNode(nick + " says: " + text);
		post2.appendChild(content2);
		document.getElementById("messages").appendChild(post2);
	}

	//for autoscroll to the bottom
	var messageLog = document.getElementById("messages");
	messageLog.scrollTop = messageLog.scrollHeight;
}