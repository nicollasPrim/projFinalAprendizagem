let res = document.getElementById('res')
let cadastrar = document.getElementById('cadastrar')

cadastrar.addEventListener('click', (e)=>{
    e.preventDefault()

    const dt_solicita = document.getElementById("dt_solicita").value
    const hr_saida = document.getElementById("hr_saida").value
    const hr_retorno = document.getElementById("hr_retorno").value
    const motivo = document.getElementById("motivo").value
    const localDest = document.getElementById("localDest").value
    const status = document.getElementById("status").value
    const nm_aluno = document.getElementById("nm_aluno").value
    const nm_prof = document.getElementById("nm_prof").value

    const dados = {
        dataSolicitacao: dt_solicita,
        horaSaida: hr_saida,
        horaRetorno: hr_retorno,
        motivo: motivo,
        localDestino: localDest,
        status: status,
        nomeAluno: nm_aluno,
        nomeProfessor: nm_prof
    }

    fetch("http://localhost:8081/saida", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
    .then(resp => resp.json())
    .then(resultado => {
        res.innerHTML = ``
        res.innerHTML += `Nome aluno: ${nm_aluno}<br>`
        res.innerHTML += `Nome professor: ${nm_prof}<br>`
        res.innerHTML += `Motivo: ${motivo}<br>`
        res.innerHTML += `Local de destino: ${localDest}<br>`
        res.innerHTML += `Hora de saida: ${nm_prof}<br>`
        res.innerHTML += `Hora de retorno: ${nm_prof}<br>`
        res.innerHTML += `Status: ${status}<br>`
    })
})