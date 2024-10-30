<?php

$a = "Hola";
$b = "maracaton";
$c = "altruista";



if(strlen($a) > strlen($b) && strlen($a) > strlen($c)){
    echo $a, " es el mayor";
}elseif(strlen($b) > strlen($a) && strlen($b) > strlen($c)){
    echo $b, " es el mayor";
}else{
    echo $c, " es el mayor";
}