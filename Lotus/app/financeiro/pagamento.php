<?php
require '../conexao.php';
$metodo = $_POST['metodo'];
$id = $_POST['idagenda'];
$valor = 100;
$pendente = 1;

$sql = $conn->prepare('INSERT INTO pagamento (idAgendamento, valor, metodo_pagamento) VALUES (?,?,?)');
$sql->bind_param('iis', $id, $valor, $metodo);
$sql->execute();
$resposta = 'pagaram aqui';

$sql = $conn->prepare('UPDATE historico_consulta SET pendente = ? WHERE idAgendamento = ?');
$sql->bind_param('ii', $pendente, $id);
$sql->execute();
echo json_encode($resposta);

?>