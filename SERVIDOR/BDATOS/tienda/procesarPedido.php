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
	$resul = true;
	foreach ($_SESSION['carrito'] as $cod => $unidades) {
		$producto = cargar_productos($cod);
		if ($producto === FALSE) {
			echo "Error al cargar información del producto $cod.<br>";
			$resul = false;
			continue;
		}
		$stock_disponible = $producto['Stock'];
		if ($unidades > $stock_disponible) {
			$_SESSION['carrito'][$cod] = $stock_disponible; // Ajustar al stock disponible
		}
	}
	
	$resul_pedido = insertar_pedido($_SESSION['carrito'], $_SESSION['usuario']['CodRes']);
	if($resul_pedido === FALSE || !$resul){
		echo "No se ha podido realizar el pedido<br>";            
	}else{
		$correo = $_SESSION['usuario']['Correo'];
		echo "Pedido realizado con éxito. Se enviará un correo de confirmación a: $correo ";                                                    
		//vaciar carrito    
		$_SESSION['carrito'] = [];

		}        
	?>        
	</body>
</html>