<?php
$a='var1';
$$a='var2';
echo $a, $var1;
$$var2='var3';
echo $a,$var2;
?>