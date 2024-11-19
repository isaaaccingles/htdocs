<?php
	/*comprueba que el usuario haya abierto sesión o redirige*/
	require 'sesiones.php';
	require_once 'bd_tienda.php';
	comprobar_sesion();
?>	
<!DOCTYPE html>
<html>
	<head>
		<meta charset = "UTF-8">
		<title>Pedidos</title>		
	</head>
	<body>
	<?php 
	require 'cabecera.php';			
	$resul = insertar_pedido($_SESSION['carrito'], $_SESSION['usuario']['CodRes']);
	if($resul === FALSE){
		echo "No se ha podido realizar el pedido<br>";			
	}else{
		$correo = $_SESSION['usuario']['correo'];
		echo "Pedido realizado con éxito. Se enviará un correo de confirmación a: $correo ";													
		//vaciar carrito	
		$_SESSION['carrito'] = [];

		}		
	?>		
	</body>
</html>
	
