<?php
    require "../conexao.php";

    //recebe os dados do inserir.js
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    $telefone = $_POST['telefone'];
    $cpf = $_POST['cpf'];
    $cargo = $_POST['cargo'];
    $data = $_POST['data'];

    //conecta ao banco e insere os dados
    $sql = $conn->prepare("INSERT INTO profissional (nome, email, senha, telefone, cpf,idcargo ,data_contratacao) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $sql-> bind_param("sssidis", $nome, $email, $senha, $telefone, $cpf, $cargo ,$data);
    
    if ($sql->execute()){
        $retorno = ['ok' => true, 'id' => (int)$conn->insert_id];
    } else {
        $retorno = ['ok' => false, 'id' => null];
    };
    header("Content-type: application/json,charset:utf-8");
    echo json_encode($retorno);

?>

