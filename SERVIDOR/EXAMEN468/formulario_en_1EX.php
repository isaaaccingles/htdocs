<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['cerveza']) && count($_POST['cerveza']) >= 3) {
        header("Location: principal.php");
        exit();
    } else {
        $err = true;
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Formulario con select múltiple repintado</title>
    <meta charset="UTF-8">
</head>
<body>
<?php 

if (isset($err)) {
    echo "<p>Revise su selección: debe seleccionar al menos tres cervezas.</p>";
}
?>


<form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="POST">
    Cervezas: <br>
    <select multiple name="cerveza[]" size="5">
        <option value="SanMiguel" <?php echo (isset($_POST['cerveza']) && in_array("SanMiguel", $_POST['cerveza'])) ? "selected" : ""; ?>>San Miguel</option>
        <option value="Mahou" <?php echo (isset($_POST['cerveza']) && in_array("Mahou", $_POST['cerveza'])) ? "selected" : ""; ?>>Mahou</option>
        <option value="Heineken" <?php echo (isset($_POST['cerveza']) && in_array("Heineken", $_POST['cerveza'])) ? "selected" : ""; ?>>Heineken</option>
        <option value="Carlsberg" <?php echo (isset($_POST['cerveza']) && in_array("Carlsberg", $_POST['cerveza'])) ? "selected" : ""; ?>>Carlsberg</option>
        <option value="Aguila" <?php echo (isset($_POST['cerveza']) && in_array("Aguila", $_POST['cerveza'])) ? "selected" : ""; ?>>Aguila</option>
    </select><br>
    <input type="submit" value="Enviar">
</form>
</body>
</html>


if (isset($_POST['cerveza']) || count($_POST['cerveza']) < 3){
    err = true;
}else{
    header("Location: principal.php")
    exit();
}

<?php echo htmalspecialchars($_SERVER['PHP_SELF']); ?>

<?php $seleccionMultiple = isset($_POST['cerveza']) ? $_POST['cerveza'] : []; ?>
<select multiple name "cerveza[]"></select>
<?php if(in_array("cervezaelegida", $$seleccionMultiple)) echo "selected";?>
<?php if(in_array("sanMiguel", $seleccionMultiple)) echo "selected";?>

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["cerveza"])) {

    echo "Has seleccionado las siguientes cervezas <br>";

    foreach($_POST['cerveza'] as $cerveza){
        echo $cerveza;
    }else{
        echodjasldj
    }

    $hash = password_verify("contraseña", PASSWORD_DEFAULT);
    $HASH = password_verify("contraseña", PASSWORD_DEFAULT)
    hash = password_verify("contraseña", PASSWORD_DEFAULT);