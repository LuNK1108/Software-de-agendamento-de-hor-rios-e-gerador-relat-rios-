<?php
    require "../conexao.php";
    $id = $_GET['id'];
    $sql = $conn->prepare('DELETE FROM agendamento WHERE idHorario = ?');
    $sql->bind_param('i', $id);
    $sql->execute();

    if ($sql->execute()){
        //update na tabela horario disponivel
        $true = true;
        $up = $conn->prepare('UPDATE horarios_disponiveis set disponivel = ? WHERE idHorario = ?');
        $up->bind_param('ii', $true, $id);
        $up->execute();
        $resposta = true;
    } else {
        $resposta = false;
    };
    header("Content-type: application/json,charset:utf-8");
    echo json_encode([
        'ok' => true      
    ]);
?>