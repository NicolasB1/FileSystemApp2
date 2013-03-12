var nombre;
var mail;
var cant;
var filseSystem
$(function() {
  $("#btnIngresar").click(function(){validarUsuario($('#txtNombre').val(),$('#txtContrasena').val());});
	document.addEventListener('deviceready', function () {
		alert("se llama al  deviceready");
		
		
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 5*1024*1024, onSucces, errorHandler);
	}, false);
});

function onLoad(){
	//alert("se llama al  onload");
	
}

function onSucces(fs) {
	//alert("okeyy" + fs.root);
	alert("okeyy  " + fs.root.fullPath);
	fileSystem = fs;
	//fileSystem.root.getFile("120px-State-lib-sum.png", {create: true, exclusive: false}, function(fileEntry) {
	
	var ft = new FileTransfer();
	var URL = "http://data-gov.tw.rpi.edu/w/images/thumb/b/b1/State-lib-sum.png/120px-State-lib-sum.png";
	var uri = encodeURI(URL);
	ft.download(
    uri,
    fs.root.fullPath+"/120px-State-lib-summ.png",
    function(entry) {
        alert("download complete: " + entry.fullPath);
        $("#my_image").attr("src",entry.fullPath);
    },
    function(error) {
        alert("download error source " + error.source);
        alert("download error target " + error.target);
        alert("upload error code" + error.code);
    }
    
	);
}

function errorHandler(er){
	alert(er.code);
}





function onFail(message) {
    alert('Failed because: ' + message);
}
function validarUsuario(pNombre,pass){
	//window.requestFileSystem(LocalFileSystem.PERSISTENT, 5*1024*1024, onSucces, errorHandler);
	if(pNombre.length>0 && pass.length>4){
		$.ajax({
			url: 'KinderLogs.json',
			type: 'GET',
			success: function(data){
				nombre=data.Nombre;
				mail=data.Mail;
				cant=data.CantComents;
				window.location = "Coments.html?user="+nombre+"&mail=" + mail+"&cant="+cant;
			},
			error: function(){alert('error');}
		});
	}
	else {
		alert("Datos Incorrectos")
	}
}
