<?php

require_once "Empleado.php";
class Empresa{

    private $nombre;
    private $representante_legal;
    private $CIF;
    private $direccion;
    private $localidad;
    private $cp;
    private $pais;
    private $num_empleados;

    //CONSTRUCTORES

    function __construct($nombre, $representante_legal, $CIF, $direccion, $localidad, $cp, $pais, $num_empleados){
        $this->nombre = $nombre;
        $this->representante_legal = $representante_legal;
        $this->CIF = $CIF;
        $this->direccion = $direccion;
        $this->localidad = $localidad;
        $this->cp = $cp;
        $this->pais = $pais;
        $this->num_empleados = $num_empleados;
    }

    //GETTERS Y SETTERS

    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    public function getNombre() {
        return $this->nombre;
    }

    public function setRepresentante_legal($representante_legal) {
        $this->representante_legal = $representante_legal;
    }

    public function getRepresentante_legal() {
        return $this->representante_legal;
    }

    public function setCIF($CIF) {
        $this->CIF = $CIF;
    }

    public function getCIF() {
        return $this->CIF;
    }

    public function setDireccion($direccion) {
        $this->direccion = $direccion;
    }

    public function getDireccion() {
        return $this->direccion;
    }

    public function setLocalidad($localidad) {
            $this->localidad = $localidad;
    }

    public function getLocalidad() {
        return $this->localidad;
    }

    public function setCp($num_empleados) {
        $this->num_empleados = $num_empleados;
    }

    public function getCp() {
        return $this->num_empleados;
    }

    public function setPais($pais) {
        $this->pais = $pais;
    }

    public function getPais() {
        return $this->pais;
    }

    public function setNum_empleados($num_empleados) {
        $this->num_empleados = $num_empleados;
    }

    public function getNum_empleados() {
        return $this->num_empleados;
    }


    //TOSTRING

    function __toString(){
        return __CLASS__ ."";
    }

}