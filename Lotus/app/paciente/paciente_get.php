<?php
    require '../conexao.php';
    session_start();
    $id = $_SESSION['idpaciente'];
    $sql = $conn->prepare('SELECT idPaciente, nome, email, senha ,idade, cpf FROM paciente WHERE idPaciente = ?');
    $sql->bind_param('i', $id);
    $sql->execute();
    $resposta = $sql->get_result();
    $pacientes = $resposta->fetch_assoc();
    echo json_encode(['data' => $pacientes]);
?>