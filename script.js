//default name generator
var guest = Math.random();
var guestName = guest.toString();
var guestNumber = guestName.substring(2, 6);

var nick = ("Guest" + guestNumber);
var post = [nick];

//socket emit new user connection
socket.emit('signin', nick);



//for key navigation

//array to correspond with element ids
var navActive = ["a","b","c","d","e","f","g","h"];

//first element is selected by default
var selection = navActive[0];
//identify selection value as element id
var selActive = document.getElementById(selection);
//change selected default element id to active
selActive.setAttribute("id", "active");



//for text strength
var strength = ["strength1","strength2","strength3","strength4","strength5"
				,"strength6","strength7","strength8","strength9","strength10"];

var strengthValue = strength[0];

//event listeners for special key commands
document.getElementById("userMessage").addEventListener('keyup',function(event){
	
	//for using enter to send messages
	if (event.keyCode === 13){
		//prevent null chat messages
		var preventNull = document.getElementById('userMessage').value;
		preventNull = preventNull.substring(0, preventNull.length - 1);
		document.getElementById('userMessage').value = preventNull;

		//run the msg function
		addMessage();
	}

	//for keystroke navigation for convo columns left
	if (event.shiftKey && event.keyCode == 39){
		//search array to find which is selected
		for (var i = 0; i < navActive.length; i++) {
			//to store the current value
			var checkLeft = navActive[i];

			//so that it does not run when it's at the left edge
			if (i < navActive.length -1) {
				
				//when the loop has found the active column
				if(checkLeft === selection) {
					//set active column back to original id
					selActive.setAttribute("id", selection);
				
					//new value to move to
					var stepLeft = i + 1;
					
					//set selection to new value	
					selection = navActive[stepLeft];
					//identify new value as element id
					selActive = document.getElementById(selection);
					//change the newly selected element id to active
					selActive.setAttribute("id", "active");
					//exit the loop
					{break}
					
				}
			}
		}
	}

	//for keystroke navigation through convo columns right
	if (event.shiftKey && event.keyCode == 37){
		//search array to find which is selected
		for (var i = 0; i < navActive.length; i++) {
			//to store the current value
			var checkRight = navActive[i];

			//so that it does run when it's at the right edge
			if (i > 0) {
				
				//when loop has found the active column
				if(checkRight === selection) {
					//set active column back to original id
					selActive.setAttribute("id", selection);
				
					//new value to move to
					var stepRight = i - 1;

					//set selection to new value
					selection = navActive[stepRight];
					//identify new value as element id
					selActive = document.getElementById(selection);
					//change the newly selected element id to active
					selActive.setAttribute("id", "active");
					//exit the loop
					{break}
					
				}
			}
		}
	}

	//for setting the strength value
	if (event.shiftKey && event.keyCode == 38) {
		for (var i = 0; i < strength.length; i++) {
			var checkUp = strength[i];
			console.log("check in" + i);
			if (i < strength.length -1) {
				if(checkUp === strengthValue) {
					var stepUp = i + 1;
					console.log("check out");
					strengthValue = strength[stepUp];
					{break}
				}
			}
		}
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
			//set it to the strength value
			chatPost.setAttribute("id", strengthValue);

			//appending both to the post element
			newPost.appendChild(namePost);
			newPost.appendChild(chatPost);
	
			//appending the post to the message area
			document.getElementById("messages").appendChild(newPost);

			//for autoscroll to the bottom
			var messageLog2 = document.getElementById("messages");
			messageLog2.scrollTop = messageLog2.scrollHeight;

			//reset strength value
			strengthValue = strength[0];

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