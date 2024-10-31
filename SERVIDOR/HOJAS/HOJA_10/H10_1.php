<?php

session_start();

$err1 = false;
$err2 = false;
$err3 = false;


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $buscar = $_POST["buscar"];
    $busqueda = isset($_POST["busqueda"])?$_POST["busqueda"]: '';
    $genero = $_POST["genero"];

if (empty($buscar)) {
    $err1 = true;
} 
if (empty($busqueda)) {
    $err2 = true;
} 
if (empty($genero)) {
    $err3 = true;

} 
if(!$err1 && !$err2 && !$err3) {
    $_SESSION['buscar'] = $buscar;
    $_SESSION['busqueda'] = $busqueda;
    $_SESSION['genero'] = $genero;

    header("Location: bienvenido.php");
    exit();
}

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
        <?php if($err1){
			echo "Búsqueda vacía";
            }
            if($err2){
                echo "Ofrezca tipo de busqueda";
            }
            if($err3){
                echo "Seleccione Género Musical";
            }
        ?>
    <h1 style = "font-style: italic; color: blue">Formulario simple</h1>
    <h2 style = "font-style: italic">Búsqueda de canciones</h2>

<p>
    <form action = "<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method = "POST">
        <fieldset>
            <table>
                <tr>
                    <td>Texto a buscar: </td>
                    <td><input type = "text" id = "texto" name="buscar"  
                            value = "<?php if(isset($buscar))echo $buscar;?>"></td>
                </tr>
                <tr>
                    <td>Buscar en:</td>
                    <td><input type = "radio" id = "titulos" name = "busqueda" value="titulos">Titulos de cancion</td>
                    <td><input type = "radio" id = "titulos" name = "busqueda" value="album">Nombres de álbum</td>
                    <td><input type = "radio" id = "titulos" name = "busqueda" value="ambos">Ambos campos</td>
                </tr>
                <tr>
                    <td>Género musical: </td>
                    <td>
                        <select name="genero">
                            <option value="Acustica">Acustica</option>
                            <option value="Banda Sonora">Banda Sonora</option>
                            <option value="Blues">Blues</option>
                            <option value="Electrónica">Electrónica</option>
                            <option value="Folk">Folk</option>
                            <option value="Jazz">Jazz</option>
                            <option value="New Age">New Age</option>
                            <option value="Pop">Pop</option>
                            <option value="Rock">Rock</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td><input type="submit" value="Buscar"></td>
                </tr>
            </table>
        </fieldset>
    </form>
</p>

</body>
</html>