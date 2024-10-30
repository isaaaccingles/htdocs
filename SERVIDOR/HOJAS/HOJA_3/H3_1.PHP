<?php

$a = 5;
$b = 3;
$c = 9;

if($a > $b && $a > $c){
    echo $a, " es el mayor";
}elseif($b > $a && $b > $c){
    echo $b, " es el mayor";
}else{
    echo $c, " es el mayor";
}