<?php
function leer_config($nombre, $esquema){
	$config = new DOMDocument();
	$config->load($nombre);
	$res = $config->schemaValidate($esquema);
	if ($res===FALSE){ 
	   throw new InvalidArgumentException("Revise fichero de configuración");
	} 		
	$datos = simplexml_load_file($nombre);	
	$ip = $datos->xpath("//ip");
	$nombre = $datos->xpath("//nombre");
	$usu = $datos->xpath("//usuario");
	$clave = $datos->xpath("//clave");	
	$cad = sprintf("mysql:dbname=%s;host=%s", $nombre[0], $ip[0]);
	$resul = [];
	$resul[] = $cad;
	$resul[] = $usu[0];
	$resul[] = $clave[0];
	return $resul;
}
function comprobar_usuario($nombre, $clave){
	$res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
	$bd = new PDO($res[0], $res[1], $res[2]);
	$ins = "SELECT CodRes, Correo FROM restaurantes WHERE Correo = '$nombre' 
			and clave = '$clave'";
	$resul = $bd->query($ins);	
	if($resul->rowCount() === 1){		
		return $resul->fetch();		
	}else{
		return FALSE;
	}
}

function cargar_categoria($id_categoria) {
    try {
        // Conexión a la base de datos
        $conexion = new PDO('mysql:host=localhost;dbname=tienda', 'root', '');
        $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Consulta para obtener la categoría
        $sql = "SELECT codCat, Nombre, Descripcion FROM categorias WHERE codCat = :id";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(':id', $id_categoria, PDO::PARAM_INT);
        $stmt->execute();

        // Retornar la categoría como un array asociativo
        $categoria = $stmt->fetch(PDO::FETCH_ASSOC);
        return $categoria;

    } catch (PDOException $e) {
        error_log("Error al cargar la categoría: " . $e->getMessage());
        return false;
    }
}

function cargar_productos_categoria($id_categoria) {
    try {
        // Conexión a la base de datos
        $conexion = new PDO('mysql:host=localhost;dbname=tienda', 'root', '');
        $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Consulta para obtener los productos de una categoría
        $sql = "SELECT CodProd, Nombre, Descripcion, Peso, Stock 
                FROM productos 
                WHERE categoria = :id";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(':id', $id_categoria, PDO::PARAM_INT);
        $stmt->execute();

        // Retornar los productos como un array asociativo
        $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $productos;

    } catch (PDOException $e) {
        error_log("Error al cargar productos de la categoría: " . $e->getMessage());
        return false;
    }
}

function cargar_categorias() {
	try {
		// Configuración y conexión a la base de datos con PDO
		$conexion = new PDO('mysql:host=localhost;dbname=tienda', 'root', '');
		$conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		// Consulta para obtener las categorías
		$sql = "SELECT codCat, Nombre FROM categorias";
		$stmt = $conexion->query($sql);

		// Recuperar las categorías
		$categorias = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return $categorias;

	} catch (PDOException $e) {
		// Manejo de errores
		error_log("Error al conectar o consultar la base de datos: " . $e->getMessage());
		return false;
	}
}

// Recibe un array de códigos de productos
// Devuelve un array con los datos de esos productos
function cargar_productos($codigosProductos) {
    try {
        // Cargar configuración desde los archivos XML y XSD
        $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
        $bd = new PDO($res[0], $res[1], $res[   2]);
        $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Crear una lista de marcadores para la consulta preparada
        $placeholders = implode(',', array_fill(0, count($codigosProductos), '?'));

        // Preparar la consulta
        $sql = "SELECT * FROM productos WHERE CodProd IN ($placeholders)";
        $stmt = $bd->prepare($sql);

        // Ejecutar la consulta con los códigos como parámetros
        $stmt->execute($codigosProductos);

        // Almacenar los productos en un array
        $productos = [];
        while ($producto = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $productos[] = $producto;
        }

        // Retornar el array de productos
        return $productos;

    } catch (PDOException $e) {
        // Manejo de errores
        error_log("Error al cargar productos: " . $e->getMessage());
        return false;
    }
}
function insertar_pedido($carrito, $codRes) {
    $res = leer_config(dirname(__FILE__)."/configuracion.xml", dirname(__FILE__)."/configuracion.xsd");
    $bd = new PDO($res[0], $res[1], $res[2]);
    $bd->beginTransaction();
    $hora = date("Y-m-d H:i:s", time());
    // insertar el pedido
    $sql = "INSERT INTO pedidos(Fecha, Enviado, Restaurante)
            values('$hora', 0, $codRes)";
    $result = $bd->query($sql);
    if (!$result) {
        return FALSE;
    }
    // coger el id del nuevo pedido para las filas detalle
    $pedido = $bd->lastInsertId();
    // insertar las filas en pedidoproductos
    foreach($carrito as $codProd => $unidades) {
        $sql = "INSERT INTO pedidosproductos(Pedido, Producto, Unidades)
                values($pedido, $codProd, $unidades)";
        //echo $sql;
        $result = $bd->query($sql);
        if (!$result) {
            $bd->rollback();
            return FALSE;
        }
        $sql = "UPDATE productos SET Stock = Stock - $unidades
                WHERE CodProd = $codProd";
        $result = $bd->query($sql);
        if (!$result) {
            $bd->rollback();
            return FALSE;
        }
    }
    $bd->commit();
    return $pedido;
}   

/*function crear_correo($carrito, $pedido, $correo){
    $texto = "<hl>Pedido n2 $pedido </hl><h2>Restaurante:
    $correo </h2>";
    $texto.= "Detalle del pedido:";
    $productos = cargar_productos(array_keys($carrito));
    $texto.= "<table>"; //abrir la tabla
    $texto.= "<tr><th>Nombre</th><th>Descripción</th><th>Peso</th>
    <th>Unidades</th><th>Eliminar</th></tr>";
    foreach($productos as $producto){
    $cod = $producto['CodProd'] ;
    $nom = $producto['Nombre'];
    $des = $producto['Descripción'];
    $peso = $producto['Peso'];
    $unidades = $_SESSION['carrito'][$cod];
    $texto.= "<tr><td>$nom</td><td>$des</td><td>$peso</td>
    <td>$unidades</tdxtdx/tr>";
    }
    $texto.= "</table>";
    return $texto;
    }*/
