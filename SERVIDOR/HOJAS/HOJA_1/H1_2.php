<?php
$a=7;
$b=&$a;
$c=&$b;
echo $a,$b,$c;
unset($a);
$b=8;
echo $a,$b,$c;
?>
