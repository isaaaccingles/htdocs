<?php
session_start();

//Recuperar datos de la sesion
$titulo = isset($_SESSION["titulo"]) ? $_SESSION["titulo"] : null;
$noticia = isset($_SESSION["noticia"]) ? $_SESSION["noticia"] : null;
$categoria = isset($_SESSION["categoria"]) ? $_SESSION["categoria"] : null;
$imagen = isset($_SESSION["imagen"]) ? $_SESSION["imagen"] : null;

echo "<h2>BIENVENIDO</h2><br>";
echo "<p><strong>Título:</strong> " . htmlspecialchars($titulo) . "</p>";
echo "<p><strong>Texto de la Noticia:</strong> " . nl2br(htmlspecialchars($noticia)) . "</p>";
echo "<p><strong>Categorías seleccionadas:</strong> " . htmlspecialchars(implode(", ", $categoria)) . "</p>";

echo "<p><strong>Imágenes:</strong></p>";
if (!empty($imagen)) { 
    echo "<ul>";
    foreach ($imagen['name'] as $index => $image_name) { // Mostrar las imágenes
        $target_file = "img/" . htmlspecialchars($image_name); 
        echo "<li><img src='$target_file' alt='" . htmlspecialchars($image_name) . "' style='max-width: 300px; max-height: 300px;'></li>"; // Mostrar imagen
    }
    echo "</ul>";
} else {
    echo "<p>No se subieron imágenes.</p>";
}
?>

<!DOCTYPE html>
<html lang="es"> 
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <a href="EJ_H11.php">Volver al inicio</a>
</body>
</html>
