let buscar = document.getElementById('buscar');
let atualizar = document.getElementById('atualizar');
let res = document.getElementById('res');

buscar.addEventListener("click", () => {
    let id = Number(document.getElementById("id").value);

    fetch(`http://localhost:8081/professor/${id}`)
    .then(resp => {
        if (!resp.ok) {
            throw new Error(`Professor com ID ${id} não encontrado.`);
        }
        return resp.json();
    })
    .then(professor => {
        res.innerHTML = "";
        document.getElementById('nome').value = professor.nome;
        document.getElementById('sobrenome').value = professor.sobrenome;
        document.getElementById('matricula').value = professor.matricula;
        document.getElementById('telefone').value = professor.telefone;
        document.getElementById('email').value = professor.email;
    })
    .catch(erro => {
        res.innerHTML = `Erro ao consultar professor: ${erro.message}`;
        console.error("Erro:", erro);
    });
});

atualizar.addEventListener("click", () => {
    let id = Number(document.getElementById("id").value);
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

    fetch(`http://localhost:8081/professor/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
    .then(resp => {
        if (!resp.ok) {
            throw new Error(`Erro ao atualizar professor (status ${resp.status})`);
        }
        return resp.json();
    })
    .then(retorno => {
        res.innerHTML = `Professor atualizado com sucesso!<br>`;
        res.innerHTML += `Código do professor: ${id}<br>`;
        res.innerHTML += `Nome: ${nome}<br>`;
        res.innerHTML += `Sobrenome: ${sobrenome}<br>`;
        res.innerHTML += `Matrícula: ${matricula}<br>`;
        res.innerHTML += `Telefone: ${telefone}<br>`;
        res.innerHTML += `Email: ${email}<br>`;
    })
    .catch(erro => {
        res.innerHTML = `Erro ao atualizar professor: ${erro.message}`;
        console.error("Erro:", erro);
    });
});
