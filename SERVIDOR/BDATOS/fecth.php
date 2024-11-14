<?php


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $usuario = $_POST["usuario"];
    $contraseña = $_POST["contraseña"];

    if(empty($usuario)){
        echo "Usuario vacio";
    }else if(empty($contraseña)){
        echo "Contraseña vacia";
    }else{

    try {

    $db = new PDO('mysql:host=localhost;dbname=prueba1', 'prueba1', 'prueba1');


    $query = "SELECT * from usuarios WHERE usuario = :usuario AND contraseña = :contraseña";
    $stmt = $db->prepare($query);
    
    $stmt->bindParam(':usuario', $usuario);
    $stmt->bindParam(':contraseña', $contraseña);
    $stmt->execute();


    if ($stmt->rowCount() > 0) {  
        header("Location: bienvenido.php");
        exit; 
    } else {
        echo "Usuario o contraseña incorrectos";
    }
    } catch (PDOException $e) {
        echo "Error con la base de datos: " . $e->getMessage();
    }
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
                <input value = "<?php if(isset($usuario))echo $usuario;?>"
                id = "usuario" name = "usuario" type = "text">				
                
                <label for = "contraseña">Clave</label> 
                <input id = "contraseña" name = "contraseña" type = "password">			
                
                <input type = "submit">
            </form>
        </body>
    </html>
    



