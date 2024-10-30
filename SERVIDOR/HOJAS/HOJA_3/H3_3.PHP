<?php

$num = rand(1, 100);
echo "$num<br>";
if ($num %= 2){
    echo "es impar";
}else{
    echo "es par";
}