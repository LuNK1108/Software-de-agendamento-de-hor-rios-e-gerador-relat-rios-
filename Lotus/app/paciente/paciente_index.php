<?php
    $id = $_GET['id'];
    session_start();
    $_SESSION['idpaciente'] = $id;
    $html = file_get_contents('../../views/paciente/index.html');
    echo $html;
?>