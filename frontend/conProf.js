let consultar = document.getElementById('consultar');
let res = document.getElementById('res');

consultar.addEventListener("click", () => {
    const id = document.getElementById("id").value;

    fetch(`http://localhost:8081/professor/${id}`)
        .then(resp => resp.json())
        .then(professor => {
            res.innerHTML = "";
            if (professor) {
                res.innerHTML += `<p><strong>ID:</strong> ${professor.codProfessor || 'N/A'}</p>`;
                res.innerHTML += `<p><strong>Nome:</strong> ${professor.nome || 'N/A'}</p>`;
                res.innerHTML += `<p><strong>Sobrenome:</strong> ${professor.sobrenome || 'N/A'}</p>`;
                res.innerHTML += `<p><strong>Matrícula:</strong> ${professor.matricula || 'N/A'}</p>`;
                res.innerHTML += `<p><strong>Telefone:</strong> ${professor.telefone || 'N/A'}</p>`;
                res.innerHTML += `<p><strong>Email:</strong> ${professor.email || 'N/A'}</p>`;
            } else {
                res.innerHTML = "Nenhum professor encontrado com este ID.";
            }
        })
        .catch(erro => {
            res.innerHTML = `Erro ao consultar professor: ${erro.message}`;
            console.error("Erro:", erro);
        });
});
