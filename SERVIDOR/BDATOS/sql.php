<?php
$mysqli = new mysqli("localhost", "prueba1", "prueba1", "prueba1");
if ($mysqli->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
echo $mysqli->host_info . "\n";

//MOSTRAR
$query = "SELECT * FROM alumno";
$resultado = $mysqli -> query($query) ; 
echo "<p>El número de clientes es: ",$resultado -> num_rows,".</p>";

while ($registro = $resultado->fetch_assoc()) {
    echo "<tr>";
    foreach ($registro as $campo){
    echo $campo.",";
    }
    echo "</br>";
}



//INSERTAR
$queryInsert = "INSERT INTO alumno VALUES (3, '09143893J','Isaac Ingles', 'C/de Falla', 'Boadilla del Monte')"; 
$resultadoInsert = $mysqli -> query($queryInsert); 

//UPDATE
$queryUpdate = "UPDATE alumno SET nombre = 'Ivan Soria' WHERE Codalumno = '1'";
$resultadoUpdate = $mysqli -> query($queryUpdate); 

//DELETE
$queryDelete = "DELETE * FROM alumno WHERE Codalumno = '2'";
$resultadoDelete = $mysqli -> query($queryDelete); 

//INSERT2
//Sentencia preparada, etapa 1: preparación
$queryInsert2 = $sentencia = $mysqli->prepare("INSERT INTO alumno(Codalumno, DNI, Nombre, Direccion, Localidad) VALUES (4  ,?,?,?,?)");
$queryInsert2->bind_param('isss', $DNI, $Nombre, $Direccion, $Localidad);
//Sentencia preparada, etapa 2: vinculación y ejecución
$DNI = "98463546U";
$Nombre = "Khaled Beno";
$Direccion = "C/alaosid";
$Localidad = "Alcorcon";
$queryInsert2->execute();




$mysqli -> close();