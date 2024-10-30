<?php

class Persona {

    public $DNI;
    public $nombre;
    public $apellido;

    //Constructores
    function _construct($DNI, $nombre, $apellido) {
        $this->DNI = $DNI;
        $this->nombre = $nombre;
        $this->apellido = $apellido;

}

//GETTERS Y SETTERS
function get_DNI() {
    return $this->DNI;
}

function get_nombre() {
    return $this->nombre;
}

function get_apellido() {
    return $this->apellido;
}

function setDNI($DNI) {
    $this->DNI = $DNI;
}

function setNombre($nombre) {
    $this->nombre = $nombre;
}


function setApellido($apellido) {
    $this->apellido = $apellido;
}

//TOSTRING
function __toString() {
    return "Persona: ".$this->nombre." ".$this->apellido."";
}


}