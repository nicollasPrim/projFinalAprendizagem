let listar = document.getElementById("listar");
let res = document.getElementById("res");

listar.addEventListener("click", () => {
    res.innerHTML = "";
    
    fetch("http://localhost:8081/saida")
    .then(resp => resp.json())
    .then(saida => {
        res.innerHTML = ""
        produtos.forEach(e => {
            res.innerHTML += `Nome aluno: ${saida.nomeAluno}<br>`
            res.innerHTML += `Nome professor: ${saida.nomeProfessor}<br>`
            res.innerHTML += `Motivo: ${saida.motivo}<br>`
            res.innerHTML += `Local de destino: ${saida.localDestino}<br>`
            res.innerHTML += `Hora de saida: ${saida.horaSaida}<br>`
            res.innerHTML += `Hora de retorno: ${saida.horaRetorno}<br>`
            res.innerHTML += `Status: ${saida.status}<br>`
        });
    })
    .catch(erro => {
        res.innerHTML = `Erro ao listar produtos: ${erro.message}`;
        console.error("Erro:", erro);
    });
});
