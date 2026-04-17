<?php
    require '../conexao.php';
    session_start();
    $id = $_SESSION['idprofissional'];
    $sql = $conn->prepare('SELECT idprofissional, nome, email, senha ,cpf, telefone, idcargo FROM profissional WHERE idprofissional = ?');
    $sql->bind_param('i', $id);
    $sql->execute();
    $resposta = $sql->get_result();
    $profissionals = $resposta->fetch_assoc();
    echo json_encode(['data' => $profissionals]);
?>