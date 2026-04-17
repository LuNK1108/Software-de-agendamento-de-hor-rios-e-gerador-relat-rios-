//retorna os nomes e id do profissional
async function lista_profissional() {
    const retorno = await fetch('../../app/profissional/profissional_listar.php');
    const response = await retorno.json();

    const profissional = response;
   let html = '';
    profissional.forEach((e, index )=> {
    html += `
     <div class="prof-card fade-slide" style="animation-delay: ${index * 0.1}s">
            <h4>${e.nome}</h4>
            <button type="button" onclick="horario_profissional(${e.idprofissional})">Ver Horários</button>
        </div>
        `;
});
    document.getElementById('profissional').innerHTML = html;
    document.querySelector('.section-profissionais').scrollIntoView({ behavior: 'smooth' });
};

//busca o id do profissional e retorna os horarios
async function horario_profissional(id) {
    const retorno = await fetch('../../app/agenda/agenda_horario.php?id='+id);
    const response = await retorno.json();

    // Agrupa os horários por data
    const horariosPorData = {};

    response.forEach(h => {
        if (h.disponivel === 1) {
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
                    type="button" onclick="agenda_horario(${h.idHorario})">
                    ${h.horario}</button>`;
        });
        html += `</div>`; 
    }

    document.getElementById('horarios').innerHTML = html;
}



//faz o agendamento do horario 
async function agenda_horario(id) {
    const agora = new Date();
    const data = agora.toLocaleString('pt-BR'); 

    if(confirm('Quer agendar esse horario?')) {
        const retorno = await fetch(`../../app/agenda/agendamento.php?id=${id}&data=${data}`);
        const response = retorno.json();
        
        if (response.ok === true){
            alert('Seu horario foi agendado');
            
        }

    } else {
        return
    };
    window.location.reload();
};

async function cancelar_horario(id) {
    if(confirm('Quer cancelar esse horario?')){
        const retorno = await fetch('../../app/agenda/agenda_cancelar.php?id='+id);
        const response = await retorno.json();
        if (response.ok === true){
            alert('Seu horario foi cancelado');
            window.location.reload();
        }
    } else{
        return
    }
}

//lista os horarios agendados do paciente
async function lista_horarios() {
    const retorno = await fetch('../../app/agenda/agenda_paciente.php');
    const response = await retorno.json();
    const container = document.getElementById('horarios_agendados');
    container.innerHTML = '';
    const ul = document.createElement('ul');
    ul.classList.add('lista-horarios');

    const ret = await fetch('../../app/profissional/profissional_listar.php');
    const res = await ret.json();
    let prof = res
    

    response.forEach(e => {
        const profissional = prof.find(p => p.idprofissional == e.idProfissional);
        const li = document.createElement('li');
        li.classList.add('item-horario');
        if (e.disponivel === 0 && e.status == null){
            console.log('aqui nao meu chapa')
        } else {
            li.innerHTML = `
            <span><strong>Data:</strong> ${e.data}</span>
            <span><strong>Hora:</strong> ${e.horario}</span>
            <span><strong>Profissional:</strong> ${profissional.nome}</span>
            <button onclick="cancelar_horario(${e.idHorario})">Cancelar</button>
        `;

        ul.appendChild(li);
        }});

        container.appendChild(ul);
        
        // Coloca data, hora e idProfissional
        
};

async function prontuario() {
    const retorno = await fetch('../../app/prontuario/prontuario_paciente.php');
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
}

window.addEventListener('load', lista_horarios());

async function ver_historico(){
    const retorno = await fetch('../../app/historico/historico_paciente.php');
    const response = await retorno.json();
    
    let html = '';
    response.forEach(e => {
        if(e.pendente === 1){
            html += `
                <div class="info-card">
                <p><strong>id:</strong> ${e.idAgendamento}</p>
                <p><strong>data:</strong> ${e.data}</p>
                <p><strong>horario:</strong> ${e.horario}</p>
                <p><strong>Status: </strong>pago</p>
                </div>
                <br>
                `;
            } else {
            html += `
            <div class="info-card">
            <p><strong>id:</strong> ${e.idAgendamento}</p>
            <p><strong>data:</strong> ${e.data}</p>
            <p><strong>horario:</strong> ${e.horario}</p>
            <p><strong>Status: </strong>pendente</p>
            <br>
            <button type='button' onclick='carregar_pagamento(${e.idAgendamento})'>Pagar</button>
            </div>
            <br>
        `;
    }
        
    });
    document.getElementById('info').innerHTML = html;
    document.querySelector('.section-info').scrollIntoView({ behavior: 'smooth' });
};

async function carregar_pagamento(id){
    let html = '';
    html += `
    <p>Valor: 100$</p>
    <P>ID da Consulta: ${id}</p>
    <h3>Escolha a forma de pagamento</h3>
    <div>
    <input id='metodo'></input>
    <button onclick='realizar_pagamento(${id})'>pagar</button>
    </div>

    `;
    document.getElementById('pagamento').innerHTML = html;
    document.querySelector('.section-info').scrollIntoView({ behavior: 'smooth' });
};

async function realizar_pagamento(id) {
    const fd = new FormData();
    fd.append('idagenda', id);
    fd.append('metodo',document.getElementById('metodo').value);

    const retorno = await fetch('../../app/financeiro/pagamento.php',{
        method: 'POST',
        body: fd
    });
    const response = await retorno.json();
    window.location.reload();
    
}