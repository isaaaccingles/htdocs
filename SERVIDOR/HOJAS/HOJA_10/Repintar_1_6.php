<?php

session_start();

$err1 = false;
$err2 = false;
$err3 = false;
$err4 = false;
$err5 = false;


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nombre = $_POST["nombre"];
    $contraseña =$_POST["contraseña"];
    $color = isset($_POST["color"])?$_POST["color"]: '';
    $publicidad = isset($_POST["publicidad"])?$_POST["publicidad"]: '';
    $fecha = $_POST["fecha"];
    $ciudad = $_POST["ciudad"];

    if (empty($nombre)) {
        $err1 = "Campo nombre vacío";
    }
    if (empty($contraseña)) {
        $err2 = "Contraseña incorrecta";
    }
    if (empty($color)) {
        $err3 = "Seleccione un color";
    }
    if (empty($fecha)) {
        $err4 = "Seleccione una fecha";
    }
    if (empty($ciudad)) {
        $err5 = "Seleccione una ciudad";
    }


    if(!$err1 && !$err2 && !$err3 && !$err4 && !$err5) {
        $_SESSION['nombre'] = $nombre;
        $_SESSION['contraseña'] = $contraseña;
        $_SESSION['color'] = $color;
        $_SESSION['publicidad'] = $publicidad;
        $_SESSION['fecha'] = $fecha;
        $_SESSION['ciudad'] = $ciudad;
    
        header("Location: nombre.php");
        exit();
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario Usuario</title>
    <link rel="stylesheet" href="estiloFormulario.css">
</head>
<body>
    <h1>Recibe parámetros y repinta el formulario</h1>
<p>
    <form action = "<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method = "POST">
        <fieldset>
            <table>
                <tr>
                   <td><h2>CAMPOS DE TEXTO:</h2></td>
                </tr>
                <tr>
                    <td>Nombre</td>
                    <td><input type = "text" id = "texto" name="nombre"  
                    value = "<?php if(isset($nombre))echo $nombre;?>">
                    <span class="error"><?php echo $err1; ?></span></td>
                </tr>
                <tr>
                    <td>Contraseña:</td>
                    <td><input type = "password" id ="contraseña" name = "contraseña"
                    value = "<?php if(isset($nombre))echo $nombre;?>">
                    <span class="error"><?php echo $err2; ?></span></td>
                    
                </tr>
                <tr>
                    <td>---------------</td>
                </tr>
                <tr>
                    <td>RADIO:</td>
                </tr>
                <tr>
                    <td>Rojo<input type = "radio" id ="color" name = "color"
                    value = "Rojo" <?php if(isset($color) && $color == 'Rojo') echo 'checked'; ?>></td>
                    <td>Naranja<input type = "radio" id ="color" name = "color" 
                    value = "Naranja"<?php if(isset($color) && $color == 'Naranja') echo 'checked'; ?>></td>
                    <td>Verde<input type = "radio" id ="color" name = "color" 
                    value = "Verde"<?php if(isset($color) && $color == 'Verde') echo 'checked'; ?>></td>
                    <td><span class="error"><?php echo $err3; ?></span></td>
                </tr>
                <tr>
                    <td>---------------</td>
                </tr>
                <tr>
                    <td>CHECKBOX:</td>
                </tr>
                <tr>
                    <td>Quiero recibir publicidad:</td>
                    <td><input type = "checkbox" id ="publicidad" name = "publicidad"
                    value = "publicidad" <?php if(isset($publicidad) && $publicidad) echo 'checked';?>></td>
                </tr>
                <tr>
                    <td>---------------</td>
                </tr>
                <tr>
                    <td>SELECT:</td>
                </tr>
                <tr>
                    <td>Simple:</td>
                </tr>
                <tr>
                    <td>Año de finalización de estudios: </td>
                    <td><input type = "date" id ="fecha" name = "fecha" 
                    value = "<?php if(isset($fecha))echo $fecha;?>">
                    <span class="error"><?php echo $err4; ?></span></td>
                </tr>
                <tr>
                    <td>Múltiple:</td>
                </tr>
                <tr>
                    <td>Ciudades:</td>
                    <td>
                        <select name="ciudad">
                            <option value="Gerona"<?php if(isset($ciudad) && $ciudad == "Gerona") echo 'selected'; ?>>Gerona</option>
                            <option value="Madrid" <?php if(isset($ciudad) && $ciudad == "Madrid") echo 'selected'; ?>>Madrid</option>
                            <option value="Zaragoza" <?php if(isset($ciudad) && $ciudad == "Zaragoza") echo 'selected'; ?>>Zaragoza</option>
                        </select>
                        <span class="error"><?php echo $err5; ?></span>
                    </td>
                </tr>
            </table>
        </fieldset>
        <input type="submit" value="Buscar">
    </form>
</p>
</body>
</html>