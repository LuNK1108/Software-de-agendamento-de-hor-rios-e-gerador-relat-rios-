<?php
    require "../conexao.php";

    //recebe os dados do inserir.js
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    $idade = $_POST['idade'];
    $cpf = $_POST['cpf'];
    $data = $_POST['data'];

    //conecta ao banco e insere os dados
    $sql = $conn->prepare("INSERT INTO paciente (nome, email, senha, idade, cpf, data_cadastro) VALUES (?, ?, ?, ?, ?, ?)");
    $sql-> bind_param("sssids", $nome, $email, $senha, $idade, $cpf, $data);
    
    if ($sql->execute()){
        $retorno = ['ok' => true, 'id' => (int)$conn->insert_id];
    } else {
        $retorno = ['ok' => false, 'id' => null];
    };
    header("Content-type: application/json,charset:utf-8");
    echo json_encode($retorno);

?>