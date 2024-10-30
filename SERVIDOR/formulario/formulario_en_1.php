<?php
/* si va bien redirige a principal.php si va mal, mensaje de error */
if ($_SERVER["REQUEST_METHOD"] == "POST") {
$usuario = [
    ["isaac", "1234"],
    ["ivan", "2345"],
    ["khaled", "3456"],
    ["jesus", "4567"],
    ["neil", "5678"]
];

$usuarioRegistrado = $_POST['usuario'];
$contraseñaRegistrada = $_POST['clave'];
$usuarioEncontrado = false;

  	
	for( $i = 0; $i < count($usuario); $i++ && $usuarioEncontrado == false) {
       if($usuarioRegistrado === $usuario[$i][0] && $contraseñaRegistrada === $usuario[$i][1]){
            $usuarioEncontrado = true;
        }
     }
     if ($usuarioEncontrado) {
        header("Location: bienvenido.php");
    } else {
       $err = true;
    }
}
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Formulario de login</title>		
		<meta charset = "UTF-8">
	</head>
	<body>			
		<?php if(isset($err)){
			echo "<p> Revise usuario y contraseña</p>";
		}?>
		<form action = "<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method = "POST">
			<label for = "usuario">Usuario</label> 
			<input value = "<?php if(isset($usuarioRegistrado))echo $usuarioRegistrado;?>"
			id = "usuario" name = "usuario" type = "text">				
			
			<label for = "clave">Clave</label> 
			<input id = "clave" name = "clave" type = "password">			
			
			<input type = "submit">
		</form>
	</body>
</html>
