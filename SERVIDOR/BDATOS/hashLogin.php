<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario = $_POST["usuario"];
    $contraseña = $_POST["contraseña"];
    $err = "";

    if (empty($usuario)) {
        $err = "Usuario vacío";
    } elseif (empty($contraseña)) {
        $err = "Contraseña vacía";
    } else {
        try {
            // Conexión a la base de datos
            $db = new PDO('mysql:host=localhost;dbname=prueba1', 'prueba1', 'prueba1');
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Consulta segura con prepared statements
            $query = $db->prepare("SELECT * FROM usuarios WHERE usuario = :usuario");
            $query->bindParam(':usuario', $usuario);
            $query->execute();

            
            if ($query->rowCount() > 0) {
                $usuarioDB = $query->fetch(PDO::FETCH_ASSOC);
                // Verificar contraseña
                if (password_verify($contraseña, $usuarioDB['contraseña'])) {
                    header("Location: bienvenido.php");
                    exit;
                } else {
                    $err = "Usuario o contraseña incorrectos";
                }
            } else {
                $err = "Usuario o contraseña incorrectos";
            }
        } catch (PDOException $e) {
            $err = "Error con la base de datos: " . $e->getMessage();
        }
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Formulario de login</title>		
    <meta charset="UTF-8">
</head>
<body>
    <?php if (!empty($err)) {
        echo "<p style='color: red;'>$err</p>";
    } ?>
    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="POST">
        <label for="usuario">Usuario</label>
        <input value="<?php echo isset($usuario) ? htmlspecialchars($usuario) : ''; ?>" id="usuario" name="usuario" type="text">
        
        <label for="contraseña">Contraseña</label>
        <input id="contraseña" name="contraseña" type="password">
        
        <input type="submit" value="Iniciar sesión">
    </form>
</body>
</html>
