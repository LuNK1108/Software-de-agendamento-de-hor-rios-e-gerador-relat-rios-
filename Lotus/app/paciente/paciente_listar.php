<?php
    require '../conexao.php';
    $sql = $conn->prepare('SELECT idPaciente, nome, email, idade, cpf FROM paciente');
    $sql->execute();
    $resposta = $sql->get_result();
    $pacientes = $resposta->fetch_all(MYSQLI_ASSOC);
    header("Content-type: application/json,charset:utf-8");
    echo json_encode($pacientes);
?>