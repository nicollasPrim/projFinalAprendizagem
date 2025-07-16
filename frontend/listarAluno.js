let listar = document.getElementById("listar");
let res = document.getElementById("res");

listar.addEventListener("click", () => {

    fetch("http://localhost:8081/aluno")
    .then(ressp => ressp.json())
    .then(dados => {
        res.innerHTML = ""
        dados.forEach(aluno => {
            res.innerHTML += `
                <p><strong>ID:</strong> ${aluno.codAluno || 'N/A'}</p>
                <p><strong>Nome:</strong> ${aluno.nome || 'N/A'}</p>
                <p><strong>Sobrenome:</strong> ${aluno.sobrenome || 'N/A'}</p>
                <p><strong>Matrícula:</strong> ${aluno.matricula || 'N/A'}</p>
                <p><strong>Telefone:</strong> ${aluno.telefone || 'N/A'}</p>
                <p><strong>Email:</strong> ${aluno.email || 'N/A'}</p>`;
        });
        if (dados.length === 0) {
            res.innerHTML = "Nenhum aluno cadastrado.";
        }
    })
    .catch(erro => {
        res.innerHTML = `Erro ao listar produtos: ${erro.message}`;
        console.error("Erro:", erro);
    });
});
