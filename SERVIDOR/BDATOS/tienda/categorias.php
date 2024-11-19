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
		<title>Lista de categorías</title>
	</head>
	<body>
		<?php require 'cabecera.php';?>
		<h1>Lista de categorías</h1>		
		<?php
		$categorias = cargar_categorias();
		if ($categorias === false) {
			echo "<p class='error'>Error al conectar con la base de datos</p>";
		} else {
			echo "<ul>"; // Abrir la lista
			foreach ($categorias as $cat) {
				// Generar URL para cada categoría
				$url = "productos.php?categoria=" . $cat['codCat'];
				echo "<li><a href='$url'>" . htmlspecialchars($cat['Nombre']) . "</a></li>";
			}
			echo "</ul>"; // Cerrar la lista
		}
		?>
	</body>
</html>
