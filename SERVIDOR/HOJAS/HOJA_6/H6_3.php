<?php

$supermercado = array(
    "Electrodomesticos" => array("Televisor", "Heladera"),
    "alimentos" => array("Carne", "Leche", "Verduras")
);

$claves_supermercado = array_keys($supermercado);

echo "Claves del array supermercado:\n";
foreach ($claves_supermercado as $clave) {
    echo $clave . "\n";
}
?>
