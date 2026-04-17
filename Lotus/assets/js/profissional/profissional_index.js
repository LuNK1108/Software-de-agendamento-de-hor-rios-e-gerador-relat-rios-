//puxa uma dos horarios marcados do profissional 
async function lista_atendimento(){
    const retorno = await fetch('../../app/agenda/agenda_atendimento.php');
    const respose = await retorno.json();
    respose;

    html = '';
    respose.forEach((e, index)=> {
        if (e.status == null){
            return;
        } else {
            html += `
        <div class="atendimento" style="animation-delay: ${index * 0.05}s">
        <p><strong>Nome:</strong> ${e.nome_paciente}</p>
        <p><strong>Data:</strong> ${e.data}</p>
        <p><strong>Horário:</strong> ${e.horario}</p>
        <button type="button" onclick="prontuario(${e.idPaciente})">Ver Prontuário</button>
        <button type="button" onclick="finalizar_cosulta(${e.idagendamento})">Finalizar Consulta</button>
        </div>
    `;
    }}); 
    document.getElementById('horarios_agendados').innerHTML = html;
        
};

async function finalizar_cosulta(id) {
    const retorno = await fetch(`../../app/financeiro/historico.php?id=${id}`);
    const response = await retorno.json();
    window.location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
    lista_atendimento();
});

async function prontuario(id) {
    const retorno = await fetch('../../app/prontuario/prontuario_profissional.php?id='+id);
    const response = await retorno.json();
    const prontuario = response;

    
    let html = '';
    prontuario.forEach(e => {
        html += `
    <div class="info-card">
    <h4>Registro de ${e.data_registro}</h4>
    <p><strong>Descrição:</strong> ${e.descricao}</p>
    <p><strong>Diagnóstico:</strong> ${e.diagnostico}</p>
    <p><strong>Medicamento:</strong> ${e.medicamento}</p>
    <p><strong>Anotação:</strong> ${e.anotacao}</p>
    </div>
    `;

    });
    document.getElementById('info').innerHTML = html;
    document.querySelector('.section-info').scrollIntoView({ behavior: 'smooth' });
};

async function inserir_horario() {
    let html = '';
    html += `
    <div class="info-card">
    <h4>inserir horario</h4>
    <input id='data' type='date'><strong>Data:</strong></input>
    <input id='horario' type='time'><strong>horario:</strong></input>
    <button type='button' onclick='adicionar_horario()'>inserir</button>
    </div>
    `;
    document.getElementById('info').innerHTML = html;
    document.querySelector('.section-info').scrollIntoView({ behavior: 'smooth' });
}

async function adicionar_horario(){
    const fd = new FormData();
    fd.append('data',document.getElementById('data').value);
    fd.append('horario',document.getElementById('horario').value);
    
    const retorno = await fetch('../../app/agenda/adicionar_horario.php',{
        method: 'POST',
        body: fd
    });

    const response = await retorno.json();
    alert('horario inserido');
    return response;
};

async function horario_profissional() {
    const retorno = await fetch('../../app/agenda/mostrar_horario.php');
    const response = await retorno.json();

    // Agrupa os horários por data
    const horariosPorData = {};

    response.forEach(h => {
        if (h.disponivel == 1) {
            if (!horariosPorData[h.data]) {
                horariosPorData[h.data] = [];
            }
            horariosPorData[h.data].push(h);
        }
    });

    let html = '';
    for (const data in horariosPorData) {
        html += `<div class="data-bloco"><h4>${data}</h4>`;
        horariosPorData[data].forEach((h, index) => {
        html += `<button class="fade-slide" style="animation-delay: ${index * 0.05}s" 
                    type="button" onclick="cancelar_horario(${h.idHorario})">
                    ${h.horario}</button>
                    
                    `;

        });
        html += `</div>`; 
    }

    document.getElementById('info').innerHTML = html;
};

async function cancelar_horario(id) {
    if(confirm('Quer cancelar esse horario?')){
        const retorno = await fetch(`../../app/agenda/cancelar_horario.php?id=${id}`);
        const response = await retorno.json();
        if (response.ok === true){
            alert('Seu horario foi cancelado');
            window.location.reload();
        }
    } else{
        return
    }
}