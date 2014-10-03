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


		var nameChangeInsert = document.createElement("DIV");

		var nameChange = document.createElement("DIV");
		nameChange.appendChild(document.createTextNode(text));
		nameChange.setAttribute("id", "changeId");

		nameChangeInsert.appendChild(nameChange);

		document.getElementById("messages").appendChild(nameChangeInsert);
		
		return;
	}
	
	//if nothing is typed
	if (text === "") {
		//do nothing
	}

	//for regular messages
	else {
		var newPost = document.createElement("DIV");

		var namePost = document.createElement("DIV");
		namePost.appendChild(document.createTextNode(nick + " says:"));
		namePost.setAttribute("id", "nameId");

		var chatPost = document.createElement("P");
		chatPost.appendChild(document.createTextNode(text));
		chatPost.setAttribute("id", "chatId");

		newPost.appendChild(namePost);
		newPost.appendChild(chatPost);

		document.getElementById("messages").appendChild(newPost);
	}

	//for autoscroll to the bottom
	var messageLog = document.getElementById("messages");
	messageLog.scrollTop = messageLog.scrollHeight;
}