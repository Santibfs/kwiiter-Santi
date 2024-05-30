var firebaseConfig = {
  apiKey: "AIzaSyBhJQILlWYvin5mHmiXfys38-iJKIBf_K0",
  authDomain: "kwitter-santi.firebaseapp.com",
  databaseURL: "https://kwitter-santi-default-rtdb.firebaseio.com",
  projectId: "kwitter-santi",
  storageBucket: "kwitter-santi.appspot.com",
  messagingSenderId: "776057646441",
  appId: "1:776057646441:web:8763033c221140c108e1f8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  user_name = localStorage.getItem("user_name");
  room_name = localStorage.getItem("room_name");

  document.getElementById("sala").innerHTML = "¡Hola " + user_name + "!" + " Bienvenido a la sala: " + room_name;


  function send(){
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name:user_name,
        message: msg,
        like:0
    });

    document.getElementById("msg").value = "";
  }

  function getData(){
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot){
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose"){
                firebase_message_id = childKey;
                message_data = childData;

                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                name_with_tag ="<h4> "+ name + "<img class='user_tick' src='tick.png'></h4>";
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>like: " + like + "</span></button><hr>"; 

                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
          } 
        });
    });
  }

  getData();

  function updateLike(message_id){
    console.log("clickeo el boton like -" + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    update_likes = Number(likes) + 1;
    console.log(update_likes);
    
    firebase.database().ref(room_name).child(message_id).update({
        like: update_likes
    });
  }

  function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("index.html");
  }

  function roomChange(){
    localStorage.removeItem("room_name");
    window.location.replace("kwitter_room.html");
  }