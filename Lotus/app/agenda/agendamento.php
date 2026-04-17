<?php
    require '../conexao.php';
    session_start();
    $paciente = $_SESSION['idpaciente'];
    $id = $_GET['id'];
    $data = $_GET['data'];
    $status = 'agendado';
    $obs = '';

    $sql = $conn->prepare('INSERT INTO agendamento (idPaciente, idHorario, status, observacao, data_criacao) VALUES (?, ?, ?, ?, ?)');
    $sql->bind_param("iisss", $paciente, $id, $status, $obs, $data);
    $resposta = [];
    if ($sql->execute()){
        //update na tabela horario disponivel
        $false = false;
        $up = $conn->prepare('UPDATE horarios_disponiveis set disponivel = ? WHERE idHorario = ?');
        $up->bind_param('ii', $false, $id);
        $up->execute();
        $resposta = true;
    } else {
        $resposta = false;
    };
    
    header("Content-type: application/json,charset:utf-8");
    echo json_encode(['ok' => $resposta]);

?>