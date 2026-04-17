//abre na página inserir paciente
async function pagina_inserir_paciente() {
    window.location.href = '../views/paciente/inserir.html';
};

//manda um fecht com os dados para o inserir.php
async function inserir_paciente(){
    const fd = new FormData();
    const hoje = new Date();
    const dataFormatada = hoje.toISOString().split('T')[0];
    fd.append("nome", document.getElementById("nome").value);
    fd.append("email", document.getElementById("email").value);
    fd.append("senha", document.getElementById("senha").value);
    fd.append("idade", document.getElementById("idade").value);
    fd.append("cpf", document.getElementById("cpf").value);
    fd.append("data", dataFormatada);

    const retorno = await fetch("../../app/paciente/paciente_inserir.php", {
        method: "POST",
        body: fd
    });

    const response =  await retorno.json();
    if (response.ok){
        window.location.href = "../../views/index.html";
    };
    
    
};