<?php
    require '../conexao.php';
    session_start();
    $id = $_SESSION['idprofissional'];
    $sql = $conn->prepare('SELECT 
    a.idagendamento,
    a.status,
    p.idPaciente,
    p.nome AS nome_paciente,
    h.data,
    h.horario,
    pr.idprofissional,
    pr.nome AS nome_profissional
    FROM agendamento a
    JOIN horarios_disponiveis h ON a.idHorario = h.idhorario
    JOIN paciente p ON a.idPaciente = p.idPaciente
    JOIN profissional pr ON h.idProfissional = pr.idprofissional
    WHERE pr.idprofissional = ?
    ORDER BY h.data, h.horario;');
    $sql->bind_param('i', $id);
    $sql->execute();
    $resultado = $sql->get_result();
    $atentimentos = $resultado->fetch_all(MYSQLI_ASSOC);
    header("Content-type: application/json,charset:utf-8");
    echo json_encode($atentimentos);
?>