<?php
    require '../conexao.php';
    session_start();
    $id = $_SESSION['idpaciente'];
    $sql = $conn->prepare('SELECT * FROM prontuario WHERE idPacientes = ?');
    $sql->bind_param('i', $id);
    $sql->execute();
    $resultado = $sql->get_result();
    $prontuario = $resultado->fetch_all(MYSQLI_ASSOC);
    header("Content-type: application/json,charset:utf-8");
    echo json_encode($prontuario);
?>