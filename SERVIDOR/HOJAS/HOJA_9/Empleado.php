<?php

require_once 'Persona.php';
class Empleado extends Persona{
   public $sueldo;
   public $antigüedad;

//CONSTRUCTOR
function __construct($DNI, $nombre, $apellido, $sueldo, $antigüedad) {
    parent::_construct($DNI, $nombre, $apellido); // Llamar al constructor de la clase padre
    $this->sueldo = $sueldo;
    $this->antigüedad = $antigüedad;
}

//FUNCION PARA INCREMENTAR SUELDO
function incrementar_sueldo($porcentaje) {
    $this->sueldo += $this->sueldo * ($porcentaje / 100);
}

function incrementar_antiguedad($años) {
    $this->antigüedad += $años;
}

//METODO PARA VISUALIZAR EL SUELDO
function visualizar_sueldo() {
    return "Sueldo: " . $this->sueldo . " euros";
}

//METODO PARA VISUALIZAR LA ANTIGÜEDAD
function visualizar_antiguedad() {
    return "Antigüedad: " . $this->antigüedad . " años";
}

//METODO TOSTRING
function __toString() {
    return parent::__toString() . ", " . $this->visualizar_sueldo() . ", " . $this->visualizar_antiguedad();
}

//METODO PARA VERIFICAR LOS IMPUESTOS
function verificar_impuestos() {
    if ($this->sueldo > 3000) {
        return "Debe pagar impuestos extra.";
    } else {
        return "No debe pagar impuestos extra.";
    }
}
}

