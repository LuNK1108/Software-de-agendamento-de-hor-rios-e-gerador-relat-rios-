<?php
require '../conexao.php';
session_start();
$id = $_SESSION['idpaciente'];
$sql = $conn->prepare("SELECT 
    h.idHistorico,
    h.idAgendamento,
    p.idPaciente,
    p.nome AS nome_paciente,
    hd.data,
    hd.horario,
    h.data_registro,
    h.pendente
FROM historico_consulta h
JOIN agendamento a ON h.idAgendamento = a.idagendamento
JOIN paciente p ON a.idpaciente = p.idpaciente
JOIN horarios_disponiveis hd ON a.idHorario = hd.idHorario
WHERE p.idpaciente = ?;

");
$sql->bind_param("i", $id);
$sql->execute();
$resultado = $sql->get_result();
$historico = $resultado->fetch_all(MYSQLI_ASSOC);
header("Content-type: application/json,charset:utf-8");
echo json_encode($historico);
?>