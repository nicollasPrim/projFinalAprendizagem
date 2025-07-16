let buscar = document.getElementById('buscar');
let atualizar = document.getElementById('atualizar');
let res = document.getElementById('res');

buscar.addEventListener("click", () => {
    let cod_aluno = Number(document.getElementById("cod_aluno").value);

    fetch(`http://localhost:8081/aluno/${cod_aluno}`)
    .then(resp => {
        if (!resp.ok) {
            throw new Error(`Aluno com ID ${cod_aluno} não encontrado.`);
        }
        return resp.json();
    })
    .then(aluno => {
        res.innerHTML = "";
        document.getElementById('nome').value = aluno.nome;
        document.getElementById('sobrenome').value = aluno.sobrenome;
        document.getElementById('matricula').value = aluno.matricula;
        document.getElementById('telefone').value = aluno.telefone;
        document.getElementById('email').value = aluno.email;
    })
    .catch(erro => {
        res.innerHTML = `Erro ao consultar aluno: ${erro.message}`;
        console.error("Erro:", erro);
    });
});

atualizar.addEventListener("click", () => {
    let cod_aluno = Number(document.getElementById("cod_aluno").value);
    const nome = document.getElementById("nome").value;
    const sobrenome = document.getElementById("sobrenome").value;
    const matricula = document.getElementById("matricula").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;

    const dados = {
        nome: nome,
        sobrenome: sobrenome,
        matricula: matricula,
        telefone: telefone,
        email: email
    };

    fetch(`http://localhost:8081/aluno/${cod_aluno}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
    .then(resp => {
        if (!resp.ok) {
            throw new Error(`Erro ao atualizar aluno (status ${resp.status})`);
        }
        return resp.json();
    })
    .then(retorno => {
        res.innerHTML = `Aluno atualizado com sucesso!<br>`;
        res.innerHTML += `Código do aluno: ${cod_aluno}<br>`;
        res.innerHTML += `Nome: ${nome}<br>`;
        res.innerHTML += `Sobrenome: ${sobrenome}<br>`;
        res.innerHTML += `Matrícula: ${matricula}<br>`;
        res.innerHTML += `Telefone: ${telefone}<br>`;
        res.innerHTML += `Email: ${email}<br>`;
    })
    .catch(erro => {
        res.innerHTML = `Erro ao atualizar aluno: ${erro.message}`;
        console.error("Erro:", erro);
    });
});
