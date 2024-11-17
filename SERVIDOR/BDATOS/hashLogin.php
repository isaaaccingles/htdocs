<?php
// Conexión a la base de datos
try {
    $db = new PDO('mysql:host=localhost;dbname=prueba1', 'prueba1', 'prueba1');
} catch (PDOException $e) {
    echo "Error con la base de datos: " . $e->getMessage();
    exit;
}

// Si el formulario es enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $usuario = $_POST["usuario"];
    $contraseña = $_POST["contraseña"];

    // Validación de campos vacíos
    if(empty($usuario)){
        echo "Usuario vacío";
    } else if(empty($contraseña)){
        echo "Contraseña vacía";
    } else {
        // Consulta para obtener el hash de la contraseña
        $query = "SELECT * FROM usuarios WHERE usuario = :usuario";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':usuario', $usuario);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            // Verificamos si la contraseña ingresada coincide con el hash almacenado
            $usuarioData = $stmt->fetch(PDO::FETCH_ASSOC);
            if (password_verify($contraseña, $usuarioData['contraseña'])) {
                // Contraseña correcta
                header("Location: bienvenido.php");
                exit;
            } else {
                echo "Usuario o contraseña incorrectos";
            }
        } else {
            echo "Usuario no encontrado";
        }
    }
}


try {
    $hash = password_hash("rasmuslerdorf", PASSWORD_DEFAULT);
    $query = "INSERT INTO usuarios (usuario, contraseña) VALUES ('isaacingles', :hash)";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':hash', $hash);
    $stmt->execute();

    $query = "INSERT INTO usuarios (usuario, contraseña) VALUES ('paulalopez', :hash)";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':hash', $hash);
    $stmt->execute();

} catch (PDOException $e) {
    echo "Error con la base de datos al insertar: " . $e->getMessage();
}

?>

<!DOCTYPE html>
<html>
    <head>
        <title>Formulario de login</title>		
        <meta charset="UTF-8">
    </head>
    <body>			
        <?php if(isset($err)) { 
            echo "<p> Revise usuario y contraseña</p>"; 
        } ?>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="POST">
            <label for="usuario">Usuario</label> 
            <input value="<?php if(isset($usuario)) echo $usuario;?>" id="usuario" name="usuario" type="text">				
            
            <label for="contraseña">Clave</label> 
            <input id="contraseña" name="contraseña" type="password">			
			
            <input type="submit">
        </form>
    </body>
</html>
