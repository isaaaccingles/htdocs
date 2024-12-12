<?php

if ($SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['cerveza'])){
    echo "Has seleccionado las siguientes cervezas <br>";

    foreach($_POST['cerveza'] as $cerveza){
        echo $cerveza;
}
}else{
    echo "No has elccionado ninguna cerveza";

}


//EJERCICIO 1
// Hay coincidencia
// No hay coincidencia

// EJERCICIO 3
$hash() = password_verify("mi_contraseña_segura", PASSWORD_DEFAULT);



// RA6

//EJERCICIO 1 
//utilizar una capa de abstracción de base de datos basada en PDO
// PDO permite trabajar con múltiples SGBD utilizando una interfaz común
//PDO soporta Oracle, MySql y SQLite3


//EJERCICIO 2
 // Con un array de opciones
//  try {
//     $dsn = "mysql:host=localhost;dbname=$dbname";
//     $options = array(
//     PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
//     );
//     $dbh = new PDO($dsn, $user, $password);
//     } catch (PDOException $e){
//     echo $e->getMessage();
   
//  // Con un el método PDO::setAttribute
//  try {
//     $dsn = "mysql:host=localhost;dbname=$dbname";
//     $dbh = new PDO($dsn, $user, $password);
//     $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//     } catch (PDOException $e){
//     echo $e->getMessage();
//     }


//EJERCICIO 3
//el bindParam vinculada por referencia (mustra el primer cambio)
//el bindValue vincula por valor (muestra el ultimo cambio)


//EJERCICIO 4
//  class Clientes
//  {
//  public $nombre;
//  public $ciudad;
//  public $otros;
//  public function __construct($otros = ''){
//  $this->nombre = strtoupper($this->nombre);
//  $this->ciudad = mb_substr($this->ciudad, 0, 3);
//  $this->otros = $otros;
//  }
//  // ....Código de la clase....
//  }
//  $stmt = $dbh->prepare("SELECT * FROM Clientes");
//  $stmt->setFetchMode(PDO::FETCH_CLASS, 'Clientes');
//  $stmt->execute();
//  while ($objeto = $stmt->fetch()){
//  echo $objeto->nombre . "-> ";
//  echo $objeto->ciudad . "<br>";
//  }

//EJERCICIO 5
// $stmt = $dbh->prepare("INSERT INTO Clientes (nombre) VALUES (:nombre)");
// $nombre = "Angelina";
// $stmt->bindValue(':nombre', $nombre);
// $stmt->execute();
// echo $dbh->lastInsertId();

//EJERCICIO 6
//  try {
//  $dbh->beginTransaction();
//  $dbh->query("INSERT INTO Clientes (nombre, ciudad) VALUES ('Leila Birdsall',
//  'Madrid')");
//  $dbh->query("INSERT INTO Clientes (nombre, ciudad) VALUES ('Brice Osterberg',
//  'Teruel')");
//  $dbh->query("INSERT INTO Clientes (nombre, ciudad) VALUES ('Latrisha Wagar',
//  'Valencia')");
//  $dbh->query("INSERT INTO Clientes (nombre, ciudad) VALUES ('Hui Riojas',
//  'Madrid')");
//  $dbh->query("INSERT INTO Clientes (nombre, ciudad) VALUES ('Frank Scarpa',
//  'Barcelona')");
//  $dbh->commit();
//  echo "Se han introducido los nuevos clientes";
//  } catch (Exception $e){
//  echo "Ha habido algún error";
//  $dbh->rollback();
//  }