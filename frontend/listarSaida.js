let listar = document.getElementById("listar");
let res = document.getElementById("res");

listar.addEventListener("click", () => {
    res.innerHTML = "";

    fetch("http://localhost:8081/saida")
    .then(resp => resp.json())
    .then(resp => {
        resp.forEach(saida => {
            res.innerHTML += `<br>Código aluno: ${saida.aluno?.codAluno || 'Desconhecido'}<br>`;
            res.innerHTML += `Nome aluno: ${saida.nomeAluno}<br>`;
            res.innerHTML += `Código professor: ${saida.professor?.codProfessor || 'Desconhecido'}<br>`;
            res.innerHTML += `Nome professor: ${saida.nomeProfessor}<br>`;
            res.innerHTML += `Motivo: ${saida.motivo}<br>`;
            res.innerHTML += `Local de destino: ${saida.localDestino}<br>`;
            res.innerHTML += `Hora de saída: ${saida.horaSaida}<br>`;
            res.innerHTML += `Hora de retorno: ${saida.horaRetorno}<br>`;
            res.innerHTML += `Status: ${saida.status}<br>`;
        });
    })
    .catch(erro => {
        res.innerHTML = `Erro ao listar saídas: ${erro.message}`;
        console.error("Erro:", erro);
    });
});
