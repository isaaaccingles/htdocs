<?php


session_start();

$err1 = "";
$err2 = "";
$err3 = "";
$err4 = "";
$errors = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $titulo = $_POST["titulo"];   
    $noticia =$_POST["noticia"];
    $categoria = isset($_POST["categoria"]) ? $_POST["categoria"] : [];
    $imagen =isset($_FILES["imagen"]) ? $_FILES["imagen"] : [];

    if (empty($titulo)) {
        $err1 = "Inserte un título para la noticia";
        $errors = true;
    } elseif (!preg_match('/^[A-Z ]{15,25}$/', $titulo)) {
        $err1 = "El título debe tener entre 15 y 25 caracteres en mayúsculas y solo letras";
        $errors = true;
    }

     // Validación del texto de la noticia
     if (empty($noticia)) {
        $err2 = "Introduzca el cuerpo de la noticia";
        $errors = true;
    } elseif (strlen($noticia) < 50) {
        $err2 = "El texto debe contener al menos 50 caracteres";
        $errors = true;
    }

    $valid_categories = ["promociones", "locales comerciales", "nueva construccion", "pisos", "naves industriales", "terrenos"];
    if (empty($categoria)) {
        $err3 = "Seleccione al menos una categoría";
        $errors = true;
    } else {
        foreach ($categoria as $cat) {
            if (!in_array($cat, $valid_categories)) {
                $err3 = "Seleccione categorías válidas";
                $errors = true;
                break;
            }
        }
    }

// Validación de imágenes
    if (empty($imagenes['name'][0])) {
        $err4 = "Inserte al menos una imagen";
        $errors = true;
    } else {
        foreach ($imagenes['name'] as $index => $image_name) {
            $target_file = "img/" . basename($image_name);
            if (!move_uploaded_file($imagenes['tmp_name'][$index], $target_file)) {
                $err4 = "Error al subir las imágenes";
                $errors = true;
                break;
            }
        }
    }

    if(!$errors) {
        $_SESSION['titulo'] = $titulo;
        $_SESSION['noticia'] = $noticia;
        $_SESSION['categoria'] = $categoria;
        $_SESSION['imagen'] = $imagen;
 
        header("Location: noticia.php");
        exit();
    }

    

}

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hoja 11</title>
</head>
<body>
    <h1>Subida de ficheros</h1>
    <h2>Insertar nueva noticia</h2>

    <p>
    <form action = "<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method = "POST">
        <form>
            <fieldset>
                <table>
                    <tr>
                        <td><label>Título:*</label></td>
                        <td><input type = "text" id = "titulo" name = "titulo"
                        value = "<?php if(isset($titulo))echo $titulo;?>">
                        <span class="error"><?php echo $err1; ?></span></td>
                    </tr>
                    <tr>
                        <td><label>Texto:*</label></td>
                        <td><textarea name = "noticia" cols = "34" rows = "4"
                        value = "<?php if(isset($noticia))echo $noticia;?>"></textarea>
                        <span class="error"><?php echo $err2; ?></span></td>
                    </tr>
                    <tr>
                        <td><label>Categoría:</label></td>
                        <td>
                            <select name="categoria[]" id="categoria" multiple>
                                <option value="promociones" <?php if(isset($categoria) && $categoria == "promociones") echo 'selected'; ?>>Promociones</option>
                                <option value="locales comerciales" <?php if(isset($categoria) && $categoria == "locales comerciales") echo 'selected'; ?>>Locales Comerciales</option>
                                <option value="nueva construccion" <?php if(isset($categoria) && $categoria == "nueva construccion") echo 'selected'; ?>>Nueva Construccion</option>
                                <option value="pisos" <?php if(isset($categoria) && $categoria == "pisos") echo 'selected'; ?>>Pisos</option>
                                <option value="naves industriales" <?php if(isset($categoria) && $categoria == "naves industriales") echo 'selected'; ?>>Naves Industriales</option>
                                <option value="terrenos" <?php if(isset($categoria) && $categoria == "terrenos") echo 'selected'; ?>>Terrenos</option>
                            </select>
                            <span class="error"><?php echo $err3; ?></span></td>
                        </td>
                    </tr>
                    <tr>
                        <td><label>Imagen:</label></td>
                        <td><input type = "file" name = "imagen[]" id="imagen" multiple>
                        <span class="error"><?php echo $err4; ?></span></td>
                    </tr>
                    <tr></tr>
                    <tr>
                        <td><input type="submit" value="Insertar Noticia"></td>
                    </tr>
                </table>
            </fieldset>
        </form>
    </p>
</body>
</html>