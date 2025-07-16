let consultar = document.getElementById('consultar');
let res = document.getElementById('res');

consultar.addEventListener("click", () => {
    const id = document.getElementById("id").value;

    fetch(`http://localhost:8081/saida/${id}`)
        .then(resp => resp.json())
        .then(saida => {
            res.innerHTML = "";
            res.innerHTML += `Código da saida: ${saida.codSaida}<br>`
            res.innerHTML += `Nome aluno: ${saida.nomeAluno}<br>`
            res.innerHTML += `Nome professor: ${saida.nomeProfessor}<br>`
            res.innerHTML += `Motivo: ${saida.motivo}<br>`
            res.innerHTML += `Local de destino: ${saida.localDestino}<br>`
            res.innerHTML += `Hora de saida: ${saida.horaSaida}<br>`
            res.innerHTML += `Hora de retorno: ${saida.horaRetorno}<br>`
            res.innerHTML += `Status: ${saida.status}<br>`
        })
        .catch(erro => {
            res.innerHTML = `Erro ao consultar entrega: ${erro.message}`;
            console.error("Erro:", erro);
        });
});
