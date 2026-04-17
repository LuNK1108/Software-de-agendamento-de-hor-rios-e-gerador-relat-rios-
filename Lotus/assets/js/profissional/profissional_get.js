async function get_profissional() {
    const retorno = await fetch("../../app/profissional/profissional_get.php");
    const response = await retorno.json();
    return response.data;
}
