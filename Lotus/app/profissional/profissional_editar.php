<?php
    require '../conexao.php';
    $id = $_POST['id'].
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    $telefone = $_POST['telefone'];
    $cargo = $_POST['cargo'];
    $cpf = $_POST['cpf'];

    $sql = $conn->prepare('UPDATE profissional SET nome = ?, email = ?, senha = ?, telefone = ?, cpf = ?, idcargo = ? WHERE idprofissional = ?');
    $sql->bind_param('sssidii', $nome, $email, $senha, $telefone, $cpf, $cargo ,$id);
    $sql->execute();
    $retorno = ['ok' => true];
    header("Content-type: application/json,charset:utf-8");
    echo json_encode($retorno);
?>