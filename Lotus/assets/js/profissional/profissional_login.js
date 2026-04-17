//envia os dados de email e senha para o backend
async function entrar_profissional() {
    const fd = new FormData();
    fd.append("email", document.getElementById("email").value);
    fd.append("senha", document.getElementById("senha").value);

    const retorno = await fetch('../app/profissional/profissional_login.php',
        {
        method: 'POST',
        body: fd
        }
    );
    const resposta = await retorno.json();
    
    if (resposta.status === true){
        alert(resposta.msg);
        window.location.href = `../app/profissional/profissional_index.php?id=${resposta.id}`;
    } else {
        alert(resposta.msg);
    }
}