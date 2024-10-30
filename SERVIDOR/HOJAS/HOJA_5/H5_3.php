<?php

$array1=array("imagen12.png", "imagen10.png", "imagen2.png",
"img1.png");

$valores = array_values($array1);

//a)
natsort($valores);
print_r($valores);

//b)
sort($valores);
print_r($valores);