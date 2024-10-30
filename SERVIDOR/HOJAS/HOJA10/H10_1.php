<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

$busquedaRealizada = $_POST["busqueda"];
$tipoBusqueda = $_POST["tipoBusqueda"];
$generoMusical = $_POST["generoMusical"];

if (empty($busquedaRealizada)) {
    $err = true;
} else {
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
<?php if(isset($err)){
			echo "<p> Revise usuario y contraseña</p>";
		}?>
    <h1>Formulario simple</h1>
    <h2>Búsqueda de canciones</h2>

<p>
    <form action = "<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method = "POST">
        <fieldset>
            <table>
                <tr>
                    <td>Texto a buscar: </td>
                    <td><input type = "text" id = "texto" name="busqueda"  
                            value = "<?php if(isset($busquedaRealizada))echo $busquedaRealizada;?>"></td>
                </tr>
                <tr>
                    <td>Buscar en:</td>
                    <td><input type = "radio" id = "titulos" name = "tipoBusqueda"
                        value="titulos" 
                         <?php if($tipoBusqueda == "titulos") echo "checked"; ?>>Titulos de cancion</td>
                    <td><input type = "radio" id = "titulos" name = "tipoBusqueda"
                         value="album" 
                         <?php if($tipoBusqueda == "album") echo "checked"; ?>>Nombres de álbum</td>
                    <td><input type = "radio" id = "titulos" name = "tipoBusqueda"
                         value="ambos" 
                         <?php if($tipoBusqueda == "ambos") echo "checked"; ?>>Ambos campos</td>
                </tr>
                <tr>
                    <td>Género musical: </td>
                    <td>
                        <select name="generoMusical">
                        <option value="Todos" <?php if($generoMusical == "Todos") echo $generoMusical; ?>>Todos</option>
                        <option value="A" <?php if($generoMusical == "A") echo $generoMusical;?>>Acustica</option>
                        <option value="M" <?php if($generoMusical == "M") echo $generoMusical;?>>Banda Sonora</option>
                        <option value="B" <?php if($generoMusical == "B") echo $generoMusical;?>>Blues</option>
                        <option value="E" <?php if($generoMusical == "E") echo $generoMusical;?>>Electrónica</option>
                        <option value="F" <?php if($generoMusical == "F") echo $generoMusical;?>>Folk</option>
                        <option value="J" <?php if($generoMusical == "J") echo $generoMusical;?>>Jazz</option>
                        <option value="N" <?php if($generoMusical == "N") echo $generoMusical;?>>New Age</option>
                        <option value="P" <?php if($generoMusical == "P") echo $generoMusical;?>>Pop</option>
                        <option value="R" <?php if($generoMusical == "R") echo $generoMusical;?>>Rock</option>
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