
//retorna uma lista dos profissional
async function lista_profissional() {
    const retorno = await fetch('../../app/profissional/profissional_listar.php');
    const response = await retorno.json();
    return response;
};


async function carregar_profissional() {
    const lista = await lista_profissional();
    var html = '<table style="width:400px; border-collapse: collapse;" border="1">';
    html += '<tr><th>ID</th><th>Nome</th><th>E-mail</th><th>telefone</th><th>CPF</th><th>Açoes</th></tr>';

    lista.forEach(function(profissional) {
    html += `
    <tr>
    <td>${profissional.idprofissional}</td>
    <td>${profissional.nome}</td>
    <td>${profissional.email}</td>
    <td>${profissional.telefone}</td>
    <td>${profissional.cpf}</td>
    <td>
        <a class="excluir" href="javascript:excluir_profissional(${profissional.idprofissional})">Excluir</a>
    </td>
    </tr>
`;

});
    html += '</table>';
    document.getElementById("lista_profissionais").innerHTML = html;

};

//quando a pagina for carregada retorna a funcao
document.addEventListener("DOMContentLoaded",() => {
    carregar_profissional();
});

