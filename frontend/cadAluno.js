let cadastrar = document.getElementById('cadastrar')
let res = document.getElementById('res')

cadastrar.addEventListener("click", (e) => {
    e.preventDefault() 

    const nome = document.getElementById("nome").value
    const sobrenome = document.getElementById("sobrenome").value
    const matricula = document.getElementById("matricula").value
    const telefone = document.getElementById("telefone").value
    const email = document.getElementById("email").value

    const dados = {
        nome: nome,
        sobrenome: sobrenome,
        matricula: matricula,
        telefone: telefone,
        email: email
    };

    fetch("http://localhost:8081/aluno", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
    .then(ressp => ressp.json())
    .then(aluno => {
        res.innerHTML = ``
        res.innerHTML += `Cadastro feito com sucesso!<br><br>`
        res.innerHTML += `Código do aluno: ${aluno.codAluno}<br>`
        res.innerHTML += `Nome: ${aluno.nome}<br>`
        res.innerHTML += `Sobrenome: ${aluno.sobrenome}<br>`
        res.innerHTML += `Matrícula: ${aluno.matricula}<br>`
        res.innerHTML += `Telefone: ${aluno.telefone}<br>`
        res.innerHTML += `Email: ${aluno.email}<br>`
    })
})
