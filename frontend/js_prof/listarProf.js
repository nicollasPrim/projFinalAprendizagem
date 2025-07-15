let listar = document.getElementById("listar")
let res = document.getElementById("res")

listar.addEventListener("click", () => {

    fetch("http://localhost:8081/professor", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(dados => {
        res.innerHTML = ""
        dados.forEach(professor => {
            res.innerHTML += `
                <p><strong>Código:</strong> ${professor.codProfessor || 'N/A'}</p>
                <p><strong>Nome:</strong> ${professor.nome || 'N/A'}</p>
                <p><strong>Sobrenome:</strong> ${professor.sobrenome || 'N/A'}</p>
                <p><strong>Matrícula:</strong> ${professor.matricula || 'N/A'}</p>
                <p><strong>Telefone:</strong> ${professor.telefone || 'N/A'}</p>
                <p><strong>Email:</strong> ${professor.email || 'N/A'}</p><hr>`;
        })
    })
    .catch(erro => {
        res.innerHTML = `Erro ao listar professores: ${erro.message}`;
        console.error("Erro:", erro);
    });
})
