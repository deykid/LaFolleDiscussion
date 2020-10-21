const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const path = require("path");
const body = require("body-parser");
const app = express();
const httpserver = http.Server(app);
const io = socketio(httpserver);

app.use(body.urlencoded({ extended: true }));

const gamedirectory = path.join(__dirname, "html");

app.use(express.static(gamedirectory));
app.post("/chat.html", function(req,res){
  var Username = req.body.user;
  var Password = req.body.PWd;
  var verified;
  ClientBDD.getConnection()
  .then(conn => {
  
    conn.query("SELECT ID, User_name, Email, Password, remember_token FROM la_folle_discussion.users")
      .then((rows) => {
        rows.forEach(function(row){
          if(Username == row.User_name && Password == row.Password)
          {
            verified = 1;
          }
        });
        
        if(verified==1){
          console.log("Log In");
          res.redirect("/chat.html");
        }else{
          console.log("not logged");
          res.redirect("/");
        }
      })
      .then((res) => {
        conn.end();
      })
      .catch(err => {
        //handle error
        console.log(err); 
        conn.end();
      })
      
  }).catch(err => {
    //not connected
  });
});

// Connection haute dispo
try {
  httpserver.listen(3000);
  console.log("Listening port 3000");
} catch (error) {
  console.log("Listening error !");
}

// Connection à MariaDB
const mariadb = require('mariadb');
const { parse } = require("path");
const ClientBDD = mariadb.createPool({
     host: '127.0.0.1', //Datacenter1 : 10.0.1.2 //Datacenter2 : 10.0.2.2
     user:'Admin', 
     password: '6d4mWbM8sB#Srx!',
     database: 'la_folle_discussion',
     port : '3306',
     connectionLimit: 5,
});

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
  
  /* Réception de l'événement 'create_user' */
  socket.on('create_user', function (Username,Email,Password) {
    var QUERY = "INSERT INTO la_folle_discussion.users (User_name, Email, Password, remember_token) VALUES('"+Username+"', '"+Email+"', '"+Password+"', '')";
    ClientBDD.query(QUERY);
  });

});