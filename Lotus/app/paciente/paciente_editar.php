<?php
    require '../conexao.php';
    $id = $_POST['id'].
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    $idade = $_POST['idade'];
    $cpf = $_POST['cpf'];

    $sql = $conn->prepare('UPDATE paciente SET nome = ?, email = ?, senha = ?, idade = ?, cpf = ? WHERE idPaciente = ?');
    $sql->bind_param('sssidi', $nome, $email, $senha, $idade, $cpf, $id);
    $sql->execute();
    $retorno = ['ok' => true];
    header("Content-type: application/json,charset:utf-8");
    echo json_encode($retorno);
?>