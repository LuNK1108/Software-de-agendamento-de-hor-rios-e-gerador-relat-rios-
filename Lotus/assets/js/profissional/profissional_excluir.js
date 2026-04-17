async function excluir_profissional(id){
    const retorno = await fetch("../../app/profissional/profissional_excluir.php?id="+id);
    const response = await retorno.json();
    if (response.ok === true) {
        alert('profissional excluido');
        window.location.reload();
    }
};