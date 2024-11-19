<?php
$cadena_conexion = 'mysql:dbname=empresa;host=127.0.0.1';
$usuario = 'root';
$clave = '';
try {
    $db = new PDO('mysql:host=localhost;dbname=prueba1', 'prueba1', 'prueba1');
	echo "Conexión realizada con éxito<br>";		
	$sql = 'SELECT nombre, contraseña, rol FROM usuarios';
	$usuarios = $bd->query($sql);
	echo "Número de usuarios: " . $usuarios->rowCount() . "<br>";
	foreach ($usuarios as $usu) {
		print "Nombre : " . $usu['nombre'];
		print " Contraseña : " . $usu['contraseña'] . "<br>";
	}
	/* consulta preparada, parametros por orden */	
	$preparada = $bd->prepare("SELECT nombre FROM usuarios WHERE rol = ?");	
	$preparada->execute( array(0));
	echo "Usuarios con rol 0: " .  $preparada->rowCount() . "<br>";
	foreach ($preparada as $usu) {
		print "Nombre : " . $usu['nombre'] . "<br>";
	}
	/* consulta preparada, parametros por nombre */	
	$preparada_nombre = $bd->prepare("SELECT nombre FROM usuarios WHERE rol = :rol");
	$preparada_nombre->execute( array(':rol' => 0));
	echo "Usuarios con rol 0: " .  $preparada->rowCount() . "<br>";
	foreach ($preparada_nombre  as $usu) {
		print "Nombre : " . $usu['nombre'] . "<br>";
	}	
	} catch (PDOException $e) {
		echo 'Error con la base de datos: ' . $e->getMessage();
	}

