<?php
    require "../conexao.php";
    session_start();
    //recebe os dados do js
    $email = $_POST["email"];
    $senha = $_POST["senha"];

    $stmt = $conn->prepare('SELECT idPaciente, email FROM paciente WHERE email = ? AND senha = ?');
    $stmt->bind_param('ss', $email, $senha);

    $resposta = [];

    //confirma de foi executado e retorna uma mensagem
    if ($stmt->execute()) {
        //pega o resultado da consultra
        $consulta = $stmt->get_result();
        
        //verifica se paciente foi encontrado
        if ($consulta->num_rows > 0) {
            // pega a primeira linha encontrada
            $paciente = $consulta->fetch_assoc();

            //cria uma sessao
            $_SESSION["idpaciente"] = $paciente["idPaciente"];

            $resposta["msg"] = "o paciente " . $email . " foi encontrado";
            $resposta["id"] = $paciente["idPaciente"];
            $resposta["status"] = true;
        } else {
            $resposta["msg"] = "email ou senha invalidos";
            $resposta["status"] = false;
        }
        
    };

    header("Content-type: application/json, charset:utf-8");
    echo json_encode($resposta);
?>