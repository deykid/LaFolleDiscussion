var socket = io();

/* création d'un user */
$('#SignUp form').submit(function (e) {
    e.preventDefault(); // Préviens le rechargement de la page
    var Username = document.getElementById('user_up').value;
    var Email = document.getElementById('Email').value;
    var Password = document.getElementById('Up-pass').value;
    var Password2 = document.getElementById('Up-pass2').value;
    if(Password == Password2) {
        socket.emit('create_user', Username,Email,Password);
    }else{
        console.log("Error password !");
        document.getElementById('Up-pass').value = "";
        document.getElementById('Up-pass2').value = "";
    }
});