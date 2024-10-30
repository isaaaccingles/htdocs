<?php
$a=7;
$b=&$a;
$c=&$b;
echo
$a,$b,$c;
$b=8;
echo $a,$b,$c;
?>