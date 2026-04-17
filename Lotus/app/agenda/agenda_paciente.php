<?php
    require '../conexao.php';
    session_start();
    $paciente = $_SESSION['idpaciente'];
    $sql = $conn->prepare('SELECT idHorario FROM agendamento WHERE idPaciente = ?');
    $sql->bind_param('i', $paciente);
    $sql->execute();
    $resultado = $sql->get_result();
    $horario = $resultado->fetch_all(MYSQLI_ASSOC);


    $sql = $conn->prepare('SELECT hd.idHorario, hd.idProfissional ,hd.horario, hd.data ,hd.disponivel, a.status  FROM horarios_disponiveis hd JOIN agendamento a ON a.idHorario = hd.idHorario WHERE a.idPaciente = ?
');
    $sql->bind_param('i', $paciente);
    $sql->execute();
    $resultado = $sql->get_result();
    $horario_paciente = $resultado->fetch_all(MYSQLI_ASSOC);
    header("Content-type: application/json,charset:utf-8");
    echo json_encode($horario_paciente);
?>