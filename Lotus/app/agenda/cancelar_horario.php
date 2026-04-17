<?php
    require "../conexao.php";
    $id = $_GET['id'];
    $sql = $conn->prepare('DELETE FROM horarios_disponiveis WHERE idHorario = ?');
    $sql->bind_param('i', $id);
    $sql->execute();

    header("Content-type: application/json,charset:utf-8");
    echo json_encode([
        'ok' => true      
    ]);
?>