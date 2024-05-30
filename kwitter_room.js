//Añade los enlaces de Firebase
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

document.getElementById("user_name").innerHTML = "¡Hola " + user_name + "!";

function addRoom()
{
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose : "adding room name"
  });

    localStorage.setItem("room_name", room_name);
    
    window.location = "kwitter_page.html";
}

function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
       Room_names = childKey;
       console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
    window.location = "index.html";
}