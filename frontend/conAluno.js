let consultar = document.getElementById('consultar');
let res = document.getElementById('res');

consultar.addEventListener("click", () => {
    const id = document.getElementById("id").value;

    fetch(`http://localhost:8081/aluno/${id}`)
        .then(resp => resp.json())
        .then(aluno => {
            res.innerHTML = "";
            if (aluno) {
                res.innerHTML += `<p><strong>ID:</strong> ${aluno.codAluno || 'N/A'}</p>`;
                res.innerHTML += `<p><strong>Nome:</strong> ${aluno.nome || 'N/A'}</p>`;
                res.innerHTML += `<p><strong>Sobrenome:</strong> ${aluno.sobrenome || 'N/A'}</p>`;
                res.innerHTML += `<p><strong>Matrícula:</strong> ${aluno.matricula || 'N/A'}</p>`;
                res.innerHTML += `<p><strong>Telefone:</strong> ${aluno.telefone || 'N/A'}</p>`;
                res.innerHTML += `<p><strong>Email:</strong> ${aluno.email || 'N/A'}</p>`;
            } else {
                res.innerHTML = "Nenhum aluno encontrado com este ID.";
            }
        })
        .catch(erro => {
            res.innerHTML = `Erro ao consultar aluno: ${erro.message}`;
            console.error("Erro:", erro);
        });
});
