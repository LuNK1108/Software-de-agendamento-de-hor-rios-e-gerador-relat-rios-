<?php
    require "../conexao.php";
    $sql = $conn->prepare('DELETE FROM profissional WHERE idprofissional = ?');
    $sql->bind_param('i', $_GET['id']);
    $sql->execute();
    header("Content-type: application/json,charset:utf-8");
    echo json_encode([
        'ok' => true      
    ]);
?>