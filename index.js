const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const path = require("path");
const app = express();
const httpserver = http.Server(app);
const io = socketio(httpserver);

const gamedirectory = path.join(__dirname, "html");

app.use(express.static(gamedirectory));

var rooms = [];
var usernames = [];

// Connection haute dispo
try {
  httpserver.listen(3000);
  console.log("Listening port 3000");
} catch (error) {
  console.log("Listening error !");
}

// Connection à MariaDB
const mariadb = require('mariadb');
const ClientBDD = mariadb.createPool({
     host: '127.0.0.1', //Datacenter1 : 10.0.1.2 //Datacenter2 : 10.0.2.2
     user:'Admin', 
     password: '6d4mWbM8sB#Srx!',
     database: 'la_folle_discussion',
     port : '3306',
     connectionLimit: 5,
});

function BDD_save_message(Table,User_ID,Message){
  var QUERY = "INSERT INTO " + Table +" (`DateTime`, `Text`, ID_users, ID_rooms) VALUES (current_timestamp(),'"+Message+"', '"+User_ID+"',1)";
  ClientBDD.query(QUERY);
}

io.on('connection', function(socket){
  // Message de connexion au socket
  console.log('connected !');

  /* Réception de l'événement 'chat-message' et réémission vers tous les utilisateurs */
  socket.on('chat-message', function (message) {
    message.username = "Jordan";
    console.log(message.username + " : " + message.text);
    io.emit('chat-message', message);
    BDD_save_message("messages",1,message.text);
  });
});