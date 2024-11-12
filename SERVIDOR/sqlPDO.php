<?php


try {
    $mbd = new PDO('mysql:host=localhost;dbname=prueba1', 'prueba1', 'prueba1');
    foreach($mbd ->query('SELECT * from alumno') as $fila) {
        print_r($fila);
    // Preparar
    $stmt = $mbd ->prepare("INSERT INTO alumno (Codalumno, nombre, localidad) VALUES (:Codalumno, :nombre, :localidad)");
    $stmt ->bindParam(':Codalumno', $Codalumno);
    $stmt ->bindParam(':nombre', $nombre);
    $stmt ->bindParam(':localidad', $localidad);
    // Establecer parámetros y ejecutar
    $Codalumno = 4;
    $nombre = "Jesus Villaverde";
    $localidad = "Pozuelo de Alarcón";
    $stmt ->execute();
    // Mensaje de éxito en la inserción
    echo "Se han creado las entradas exitosamente";
    $mbd = null;   
  

$stmt = $dbh->prepare("INSERT INTO Clientes (nombre, ciudad) VALUES (:nombre, :ciudad)");
if($stmt->execute((array) $cliente)){
    echo "Se ha creado un nuevo registro!";
};

    }

} catch (PDOException $e) {
    print "¡Error!: " . $e ->getMessage() . "<br/>";
}
