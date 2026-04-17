
//retorna uma lista dos pacientes
async function lista_pacientes() {
    const retorno = await fetch('../../app/paciente/paciente_listar.php');
    const response = await retorno.json();
    return response;
};


async function lista() {
    const lista = await lista_pacientes();
    var html = '<table style="width:400px; border-collapse: collapse;" border="1">';
    html += '<tr><th>ID</th><th>Nome</th><th>E-mail</th><th>Idade</th><th>CPF</th><th>Açoes</th></tr>';

    lista.forEach(function(paciente) {
    html += `
    <tr>
    <td>${paciente.idPaciente}</td>
    <td>${paciente.nome}</td>
    <td>${paciente.email}</td>
    <td>${paciente.idade}</td>
    <td>${paciente.cpf}</td>
    <td>
        <a class="excluir" href="javascript:excluir_paciente(${paciente.idPaciente})">Excluir</a>

    </td>
    </tr>
`;

});
    html += '</table>';
    document.getElementById("lista_pacientes").innerHTML = "";
    document.getElementById("lista_pacientes").innerHTML = html;

};

//quando a pagina for carregada retorna a funcao
document.addEventListener("DOMContentLoaded",() => {
    lista();
});

