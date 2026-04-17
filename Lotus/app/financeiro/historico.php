<?php
require '../conexao.php';
$id = $_GET['id'];
$pendente = 0;
$sql = $conn->prepare('INSERT INTO historico_consulta (idAgendamento, pendente) VALUES (?,?)');
$sql->bind_param('ii', $id, $pendente);
$sql->execute();
$status = 'finalizado';
$sql = $conn->prepare('UPDATE agendamento SET status = ? WHERE idAgendamento = ?');
$sql->bind_param('si', $finalizado, $id);
$sql->execute();

$resposta = ['deu certo'];
echo json_encode($resposta);
?>