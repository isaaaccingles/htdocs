<?php

session_start();

$titulo = isset($_SESSION["titulo"]) ? $_SESSION["titulo"] : null;
$noticia = isset($_SESSION["noticia"]) ? $_SESSION["noticia"] : null;
$categoria = isset($_SESSION["categoria"]) ? $_SESSION["categoria"] : null;
$imagen = isset($_SESSION["imagen"]) ? $_SESSION["imagen"] : null;

echo "<h2>BIENVENIDO</h2><br>";
echo "<p><strong>Título:</strong> " . htmlspecialchars($titulo) . "</p>";
echo "<p><strong>Texto de la Noticia:</strong> " . htmlspecialchars($noticia) . "</p>";
echo "<p><strong>Categorías seleccionadas:</strong> " . htmlspecialchars(implode(", ", $categoria)) . "</p>";

echo "<p><strong>Imágenes:</strong></p>";
if (!empty($imagenes)) {
    echo "<ul>";
    foreach ($imagenes as $imagen) {
        echo "<li>" . htmlspecialchars($imagen) . "</li>";
    }
    echo "</ul>";
} else {
    echo "<p>No se subieron imágenes.</p>";
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <a href="Repintar_1_6.php">Volver al Formulario</a>
</body>
</html>