<?php
    session_start();
    require_once "conexao.php";

    // Se algum dos campos do login não for preenchido, redireciona para a página de login.
    if (empty($_POST['email']) || empty($_POST['senha'])){
        header("Location: login.php");
        exit();
    } 

    $email =$_POST['email'];
    $senha = $_POST['senha'];
    $stmt = $conexao->prepare("SELECT COUNT(*) FROM login WHERE email = '$email' and senha ='$senha'");
    $stmt->execute();
    $loginsCompativeis = $stmt->fetchColumn(); 
    
    if($loginsCompativeis > 0){
        $_SESSION['email'] = $email;
        header('Location: CRUD_questoes.php');
        exit();
    } else {
        $_SESSION['nao_autenticado'] = true;
        header('Location: login.php');
        exit();
    }
    
?>