<?php
require '../conexao.php';
session_start();
$id = $_SESSION['idprofissional'];
$data = $_POST['data'];
$horario = $_POST['horario'];

$sql = $conn->prepare('INSERT INTO horarios_disponiveis (idProfissional ,data, horario) VALUES (?,?,?)');
$sql->bind_param('iss', $id, $data, $horario);

if ($sql->execute()){
    $resposta = 'deu certo aqui';
} else {
    $resposta = 'deu errado kkkk burro';

};
header("Content-type: application/json,charset:utf-8");
echo json_encode($resposta);
?>