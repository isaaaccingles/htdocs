<?php

require_once 'Empleado.php';
require_once 'Persona.php';
class main {

public static function main() {
    // Crear un objeto Empleado
    $empleado1 = new Empleado("12345678A", "Juan", "Pérez", 3200, 6);
    $empleado2 = new Empleado("09143893J", "Isaac", "Inglés", 1400, 1);

    // Llamar a los métodos del empleado
    echo "Información del empleado: <br/>";
    echo "$empleado1<br/>";
    echo "$empleado2<br/>";
    
    // Incrementar sueldo y antigüedad
    $empleado1->incrementar_sueldo(15); 
    $empleado1->incrementar_antiguedad(2); 
    $empleado2->incrementar_sueldo(15); 
    $empleado2->incrementar_antiguedad(2); 
    
    // Visualizar los cambios
    echo "Después de incrementar el sueldo y la antigüedad: <br/>";
    echo "$empleado1<br/>";
    echo "$empleado2<br/>"; 

    // Verificar si debe pagar impuestos
    echo "Verificación de impuestos:<br/>";
    echo $empleado1->verificar_impuestos();
    echo $empleado2->verificar_impuestos();
}
}

// Llamar al método main para ejecutar el programa
Main::main();

