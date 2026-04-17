
async function editar() {
    const id_paciente = await get_paciente(); 
    mostrarFormularioEdicao(id_paciente);
}

function mostrarFormularioEdicao(paciente) {
    const infoDiv = document.getElementById('info');
    console.log()
    infoDiv.innerHTML = `
        <div class="form-container">
    <h2>Editar Paciente</h2>
        <form id="form-editar-paciente">
        <div class="form-group">
            <label for="nome">Nome:</label>
            <input type="text" id="nome" name="nome" value="${paciente.nome}" required>
        </div>
        <div class="form-group">
            <label for="email">E-mail:</label>
            <input type="email" id="email" name="email" value="${paciente.email}" required>
        </div>
        <div class="form-group">
            <label for="senha">Senha:</label>
            <input type="text" id="senha" name="senha" value="${paciente.senha}" required>
        </div>
        <div class="form-group">
            <label for="idade">Idade:</label>
            <input type="number" id="idade" name="idade" value="${paciente.idade}" required>
        </div>
        <div class="form-group">
            <label for="cpf">CPF:</label>
            <input type="text" id="cpf" name="cpf" value="${paciente.cpf}" required>
        </div>
        <div class="form-buttons">
            <button type="button" onclick="editar_paciente(${paciente.idPaciente})" class="btn-salvar">Salvar</button>
        </div>
        </form>
        </div>
    `;
    document.querySelector('.section-info').scrollIntoView({ behavior: 'smooth' });
}

async function editar_paciente(id) {

    const fd = new FormData();

    console.log(id)
    fd.append('id', id);
    fd.append('nome', document.getElementById('nome').value);
    fd.append('email', document.getElementById('email').value);
    fd.append('senha', document.getElementById('senha').value);
    fd.append('idade', document.getElementById('idade').value);
    fd.append('cpf', document.getElementById('cpf').value);

    const retorno = await fetch("../../app/paciente/paciente_editar.php",{
        method: 'POST',
        body: fd
    })

    const response = await retorno.json();
    if(response.ok){
        window.location.href = '../../views/paciente/index.html';
    };

};