
async function editar() {
    const id_profissional = await get_profissional(); 
    mostrarFormularioEdicao(id_profissional);
}

function mostrarFormularioEdicao(profissional) {
    const infoDiv = document.getElementById('info');
    console.log()
    infoDiv.innerHTML = `
        <div class="form-container">
    <h2>Editar profissional</h2>
        <form id="form-editar-profissional">
        <div class="form-group">
            <label for="nome">Nome:</label>
            <input type="text" id="nome" name="nome" value="${profissional.nome}" required>
        </div>
        <div class="form-group">
            <label for="email">E-mail:</label>
            <input type="email" id="email" name="email" value="${profissional.email}" required>
        </div>
        <div class="form-group">
            <label for="senha">Senha:</label>
            <input type="text" id="senha" name="senha" value="${profissional.senha}" required>
        </div>
        <div class="form-group">
            <label for="telefone">telefone:</label>
            <input type="number" id="telefone" name="telefone" value="${profissional.telefone}" required>
        </div>
        <div class="form-group">
            <label for="cpf">CPF:</label>
            <input type="text" id="cpf" name="cpf" value="${profissional.cpf}" required>
        </div>
        <div class="form-group">
            <label for="cargo">cargo:</label>
            <input type="text" id="cargo" name="cargo" value="${profissional.idcargo}" required>
        </div>
        <div class="form-buttons">
            <button type="button" onclick="editar_profissional(${profissional.idprofissional})" class="btn-salvar">Salvar</button>
        </div>
        </form>
        </div>
    `;
    document.querySelector('.section-info').scrollIntoView({ behavior: 'smooth' });
}

async function editar_profissional(id) {

    const fd = new FormData();

    console.log(id)
    fd.append('id', id);
    fd.append('nome', document.getElementById('nome').value);
    fd.append('email', document.getElementById('email').value);
    fd.append('senha', document.getElementById('senha').value);
    fd.append('telefone', document.getElementById('telefone').value);
    fd.append('cpf', document.getElementById('cpf').value);
    fd.append('cargo', document.getElementById('cargo').value);


    const retorno = await fetch("../../app/profissional/profissional_editar.php",{
        method: 'POST',
        body: fd
    })

    const response = await retorno.json();
    if(response.ok){
        window.location.href = '../../views/profissional/index.html';
    };

};