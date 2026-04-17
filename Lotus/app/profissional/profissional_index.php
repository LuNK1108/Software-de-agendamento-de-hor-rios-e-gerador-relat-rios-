<?php
    $id = $_GET['id'];
    session_start();
    $_SESSION['idprofissional'] = $id;
    $html = file_get_contents('../../views/profissional/index.html');
    echo $html;
?>