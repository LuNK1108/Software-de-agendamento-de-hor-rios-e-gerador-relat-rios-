<?php
    require '../conexao.php';
    $sql = $conn->prepare('SELECT * FROM profissional');
    $sql->execute();
    $resposta = $sql->get_result();
    $profissionals = $resposta->fetch_all(MYSQLI_ASSOC);
    header("Content-type: application/json,charset:utf-8");
    echo json_encode($profissionals);
?>