async function excluir_paciente(id){
    const retorno = await fetch("../../app/paciente/paciente_excluir.php?id="+id);
    const response = await retorno.json();
    if (response.ok === true) {
        alert('paciente excluido');
        window.location.reload();
    }
};