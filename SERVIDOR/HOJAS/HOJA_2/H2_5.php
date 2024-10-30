<?php
$var="prueba";
if (isset($var)) echo "Declarada";
if (empty($var)) echo "No esta vacia";
unset($var);
if (isset($var)) echo "Declarada";
if (empty($var)) echo "";
$var="foo";
if ((bool) $var) echo "";
if (!empty($var)) echo "";
?>