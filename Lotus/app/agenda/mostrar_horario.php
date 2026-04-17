<?php
    require '../conexao.php';
    session_start();
    $id = $_SESSION['idprofissional'];
    
    $sql = $conn->prepare('SELECT idHorario, horario, data ,disponivel FROM horarios_disponiveis WHERE idProfissional = ?');
    $sql->bind_param('i', $id);
    $sql->execute();
    $resultado = $sql->get_result();
    $horario = $resultado->fetch_all(MYSQLI_ASSOC);

    header("Content-type: application/json,charset:utf-8");
    echo json_encode($horario);
?>