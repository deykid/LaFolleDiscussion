const mariadb = require('mariadb');
var pool = mariadb.createPool({
     host: '127.0.0.1', 
     user:'Admin',
     password: '6d4mWbM8sB#Srx!',
	 database : 'la_folle_discussion',
	 port : 3306,
     connectionLimit: 5
});
function login ()
{
    var log = document.getElementById('user').value;
    var pass = document.getElementById('pass').value;
	if ((log == 'admin' && pass == 'admin')||(log == 'toto' && pass == 'toto'))
    {
    	alert ('Connection');
    }
	else
	{
        alert ('Echec');
    }
}