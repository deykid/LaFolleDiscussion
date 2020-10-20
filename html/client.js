var socket = io();
var i;

/* Envoi d'un message */
$('#input form').submit(function (e) {
  e.preventDefault(); // Préviens le rechargement de la page
  var message = { text : $('#m').val() }; // Sauvegarde le message
  $('#m').val(''); // Reset la valeur de l'input
  if (message.text.trim().length !== 0) { // Gestion message vide
    socket.emit('chat-message', message); // Emission du message
  }
  $('#m').focus(); // Focus sur le champ du message
});

/* Réception d'un message */
socket.on('chat-message', function (message) {
  $('#messages').append($('<li class="me">').html('<div class="name"><span class="">' + message.username + '</span></div><div class="message"><p> ' + message.text + '</p></div></li>'));
});