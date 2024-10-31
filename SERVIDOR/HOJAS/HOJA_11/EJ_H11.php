<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nombre = $_POST["nombre"];
    $contraseña =$_POST["contraseña"];
    $color = isset($_POST["color"])?$_POST["color"]: '';
    $publicidad = isset($_POST["publicidad"])?$_POST["publicidad"]: '';
    $fecha = $_POST["fecha"];
    $ciudad = $_POST["ciudad"];

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
                        <td><input type = "text" id = "titulo" name = "titulo"></td>
                    </tr>
                    <tr>
                        <td><label>Texto:*</label></td>
                        <td><textarea name = "noticia" cols = "34" rows = "4"></textarea></td>
                    </tr>
                    <tr>
                        <td><label>Categoría:</label></td>
                        <td>
                            <select name="categoria">
                                <option value="promociones">Promociones</option>
                                <option value="actualidad">Actualidad</option>
                                <option value="nacional">Nacional</option>
                                <option value="global">Global</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><label>Imagen:</label></td>
                        <td><input type = "file" size = "20"></td>
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