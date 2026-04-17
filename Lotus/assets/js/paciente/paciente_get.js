async function get_paciente(id) {
    const retorno = await fetch("../../app/paciente/paciente_get.php?id="+id);
    const response = await retorno.json();
    return response.data;
}
