<?php
require "../conexao.php";
session_start();
$id = $_SESSION['idpaciente'];
$sql = $conn->prepare('SELECT 
    a.idagendamento,
    h.idhorario,
    h.data,
    h.horario,
    h.idProfissional,
    pr.nome AS nome_profissional,
    p.idPaciente,
    p.nome AS nome_paciente
FROM agendamento a
JOIN horarios_disponiveis h ON a.idHorario = h.idhorario
JOIN paciente p ON a.idPaciente = p.idPaciente
JOIN profissional pr ON h.idProfissional = pr.idprofissional
WHERE p.idPaciente = ?
ORDER BY h.data, h.horario;
');
$sql->bind_param('i', $id);
$sql->execute();
$consulta = $sql->get_result();
$pendecias = $consulta->fetch_all(MYSQLI_ASSOC);
echo json_encode($pendecias);
?>