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
    .then(dados => {
        res.innerHTML = ``
        res.innerHTML += `Cadastro feito com sucesso!<br><br>`
        res.innerHTML += `Código do aluno: ${cod_aluno}<br>`
        res.innerHTML += `Nome: ${nome}<br>`
        res.innerHTML += `Sobrenome: ${sobrenome}<br>`
        res.innerHTML += `Matrícula: ${matricula}<br>`
        res.innerHTML += `Telefone: ${telefone}<br>`
        res.innerHTML += `Email: ${email}<br>`
    })
})
