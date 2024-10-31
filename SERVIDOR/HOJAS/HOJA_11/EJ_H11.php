<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $titulo = $_POST["titulo"];
    $noticia =$_POST["noticia"];
    $categoria =$_POST["categoria"];
    $imagen =$_POST["imagen"];

    if (empty($titulo)) {
        $err1 = "Inserte un tútulo para la noticia";
    }
    if (empty($noticia)) {
        $err2 = "Introduzca el cuerpo de la noticia";
    }
    if (empty($categoria)) {
        $err3 = "Seleccione una categoría";
    }
    if (empty($imagen)) {
        $err4 = "Inserte una imagen";
    }

    if(!$err1 && !$err2 && !$err3 && !$err4 && !$err5) {
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
        <form>
            <fieldset>
                <table>
                    <tr>
                        <td><label>Título:*</label></td>
                        <td><input type = "text" id = "titulo" name = "titulo"
                        value = "<?php if(isset($titulo))echo $titulo;?>"></td>
                    </tr>
                    <tr>
                        <td><label>Texto:*</label></td>
                        <td><textarea name = "noticia" cols = "34" rows = "4"
                        value = "<?php if(isset($noticia))echo $noticia;?>"></textarea></td>
                    </tr>
                    <tr>
                        <td><label>Categoría:</label></td>
                        <td>
                            <select name="categoria">
                                <option value="promociones" <?php if(isset($categoria) && $categoria == "promociones") echo 'selected'; ?>>Promociones</option>
                                <option value="actualidad" <?php if(isset($categoria) && $categoria == "actualidad") echo 'selected'; ?>>Actualidad</option>
                                <option value="nacional" <?php if(isset($categoria) && $categoria == "nacional") echo 'selected'; ?>>Nacional</option>
                                <option value="global" <?php if(isset($categoria) && $categoria == "global") echo 'selected'; ?>>Global</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><label>Imagen:</label></td>
                        <td><input type = "file" size = "20" name = "imagen"
                        value = "<?php if(isset($imagen))echo $imagen;?>"></td>
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