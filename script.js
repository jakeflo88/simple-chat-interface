//default name generator
var guest = Math.random();
var guestName = guest.toString();
var guestNumber = guestName.substring(2, 6);

var nick = ("Guest" + guestNumber);
var post = [nick];

//socket emit new user connection
socket.emit('signin', nick);


//to make the enter button work
document.getElementById("userMessage").addEventListener('keyup',function(event){
	if (event.keyCode === 13){
		//prevent null chat messages
		var preventNull = document.getElementById('userMessage').value;
		preventNull = preventNull.substring(0, preventNull.length - 1);
		document.getElementById('userMessage').value = preventNull;

		//run the msg function
		addMessage();
	}
});

//function for posting messages
function addMessage() {
	
	//get the message and clear the textarea
	var text = document.getElementById("userMessage").value;

	//making an array to seperate name from message
	post.push(nick, text);

	//reset and focus on textarea
	document.getElementById("userMessage").value = "";
	document.getElementById("userMessage").focus();


	//check for nick command
	if (text.indexOf("/nick") > -1){
		//removing the /nick part of the message
		nick = text.substring(6);

		if (nick.match(/[a-z]/i)) {

		//text for the name change post
		text = (post[0] + " is now known as: '" + nick + "'");

		//updating array
		post[1] = nick;
		post[2] = text;

		socket.emit('chat message', post);
		}

	//prevent empty username
	else {
		alert("Please enter a valid username.");
	}
		return;
	}
	
	//if nothing is typed
	if (text === "") {
		//do nothing
		return;
	}

	//for regular messages
	else {
		//updating array
		post[0] = nick;
		post[1] = nick;
		post[2] = text;

		//taking the new post and sending to server
		socket.emit('chat message', post);
	}
}

	//listening for messages
	socket.on('chat message', function(post){
		//adding the messages to the page

		//for chat posts
		if(post[0] === post[1]){
			//creating an element to post
			var newPost = document.createElement("DIV");

			//creating the name element and giving ID
			var namePost = document.createElement("DIV");
			namePost.appendChild(document.createTextNode(post[1] + " says:"));
			namePost.setAttribute("id", "nameId");

			//creating the chat element and giving ID
			var chatPost = document.createElement("P");
			chatPost.appendChild(document.createTextNode(post[2]));
			chatPost.setAttribute("id", "chatId");

			//appending both to the post element
			newPost.appendChild(namePost);
			newPost.appendChild(chatPost);
	
			//appending the post to the message area
			document.getElementById("messages").appendChild(newPost);

			//for autoscroll to the bottom
			var messageLog2 = document.getElementById("messages");
			messageLog2.scrollTop = messageLog2.scrollHeight;

			return;
		}

		//creating element for name change posts
		var nameChangeInsert = document.createElement("DIV");

		//creating element for the text node and giving ID
		var nameChange = document.createElement("DIV");
		nameChange.appendChild(document.createTextNode(post[2]));
		nameChange.setAttribute("id", "changeId");

		//appending the name change to the name change post
		nameChangeInsert.appendChild(nameChange);

		//appending the name change post to the message area
		document.getElementById("messages").appendChild(nameChangeInsert);

		//for autoscroll to the bottom
		var messageLog3 = document.getElementById("messages");
		messageLog3.scrollTop = messageLog3.scrollHeight;
});

socket.on('signedin', function(nick){

	//for new users entering chat
	var newUserConnect = document.createElement("DIV");

	var newUser = document.createElement("DIV");
	newUser.appendChild(document.createTextNode(nick + " has joined the room."));
	newUser.setAttribute("id", "changeId");

	newUserConnect.appendChild(newUser);

	document.getElementById("messages").appendChild(newUserConnect);

	var messageLog1 = document.getElementById("messages");
	messageLog1.scrollTop = messageLog1.scrollHeight;
});