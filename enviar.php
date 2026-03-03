<?php
// Configuración
$destino = "[TU_CORREO_AQUI]"; // Reemplazar con el correo real de PETROVIM
$asunto = "Nuevo lead desde Landing Page PETROVIM";

// Comprobar si recibimos la solicitud POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Saneamiento simple de los datos
    $nombre = strip_tags(trim($_POST["nombre"]));
    $correo = filter_var(trim($_POST["correo"]), FILTER_SANITIZE_EMAIL);
    $telefono = strip_tags(trim($_POST["telefono"]));
    $empresa = isset($_POST["empresa"]) ? strip_tags(trim($_POST["empresa"])) : "No especificada";
    $estado = isset($_POST["estado"]) ? strip_tags(trim($_POST["estado"])) : "No especificado";
    $volumen = isset($_POST["volumen"]) ? strip_tags(trim($_POST["volumen"])) : "No especificado";

    // Validar en el lado del servidor también como buena práctica
    if (empty($nombre) || empty($telefono) || !filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        // Redireccionar o mostrar error si falta algo crucial
        header("Location: index.html?error=campos_invalidos");
        exit;
    }

    // Construir el cuerpo del mensaje
    $mensaje = "Has recibido una nueva cotización desde la Landing Page:\n\n";
    $mensaje .= "Nombre: " . $nombre . "\n";
    $mensaje .= "Correo: " . $correo . "\n";
    $mensaje .= "Teléfono: " . $telefono . "\n";
    $mensaje .= "Empresa: " . $empresa . "\n";
    $mensaje .= "Estado: " . $estado . "\n";
    $mensaje .= "Volumen Mensual Requerido: " . $volumen . " lts\n";

    // Encabezados
    $headers = "From: " . $nombre . " <" . $correo . ">\r\n";
    $headers .= "Reply-To: " . $correo . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Intentar enviar el correo
    if (mail($destino, $asunto, $mensaje, $headers)) {
        // Redirección exitosa a gracias.html
        header("Location: gracias.html");
        exit;
    } else {
        // Manejo de error nativo si mail() falla
        echo "Hubo un error al enviar el mensaje. Por favor intenta más tarde.";
    }

} else {
    // Si se accede directamente al archivo sin POST, redirigir al inicio
    header("Location: index.html");
    exit;
}
?>