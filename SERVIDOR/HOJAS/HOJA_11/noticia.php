<?php

session_start();

$titulo = isset($_SESSION["titulo"]) ? $_SESSION["titulo"] : null;
$noticia = isset($_SESSION["noticia"]) ? $_SESSION["noticia"] : null;
$categoria = isset($_SESSION["categoria"]) ? $_SESSION["categoria"] : null;
$imagen = isset($_SESSION["imagen"]) ? $_SESSION["imagen"] : null;