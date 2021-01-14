<?php
$nombre = $_POST['name'];
$email = $_POST['email'];
$mensaje = $_POST['message'];
$para = 'c.espinoza.ordenes@gmail.com';
$titulo = 'FROM COLOREATE';
$header = 'From: ' . $email;
$msjCorreo = "Nombre: $nombre\n E-Mail: $email\n Mensaje:\n $mensaje";
  
if ($_POST['submit']) {
if (mail($para, $titulo, $msjCorreo, $header)) {
echo "<script language='javascript'>
alert('Mensaje enviado, muchas gracias.');
window.location.href = 'http://www.nuevacumbre.cl/coloreate.cl/';
</script>";
} else {
echo 'Falló el envio';
}
}
?>