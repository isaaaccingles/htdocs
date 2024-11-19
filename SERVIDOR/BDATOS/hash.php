<?php



try{
    $db = new PDO('mysql:host=localhost;dbname=prueba1', 'prueba1', 'prueba1');
    
    $hash = password_hash("rasmuslerdorf", PASSWORD_DEFAULT);
    echo $hash;

    $query = "INSERT INTO usuarios(usuario, contraseña) VALUES ('paulalopez', '$hash')";
    $db ->query($query);

}catch(PDOException $e) {
    echo "Error con la base de datos: " . $e->getMessage();
}


 