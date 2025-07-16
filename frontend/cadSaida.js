let res = document.getElementById('res')
let btnCadSaida = document.getElementById('cadastrar')
let motivo = document.getElementById('motivo')
let localDestino = document.getElementById('localDest')
let statusSaida = document.getElementById('status')
let codAluno = document.getElementById('idAluno')
let nomeAluno = document.getElementById('nmAluno')
let codProfessor = document.getElementById('idProfessor')
let nomeProfessor = document.getElementById('nmProf')
let dataSolicitacao = document.getElementById('dataSol')
let horaSaida = document.getElementById('horaSaida')
let horaRetorno = document.getElementById('horaRet')

res.style.display = 'none'

codAluno.addEventListener('blur', () => {
  fetch(`http://localhost:8081/aluno/${codAluno.value}`)
    .then(resp => resp.json())
    .then(data => {
      nomeAluno.value = `${data.nome} ${data.sobrenome}`
    })
    .catch(error => {
      res.innerHTML = 'Erro ao buscar aluno!'
      res.style.backgroundColor = 'lightcoral'
      console.error('Erro ao buscar aluno:', error)
    })
})

codProfessor.addEventListener('blur', () => {
  fetch(`http://localhost:8081/professor/${codProfessor.value}`)
    .then(resp => resp.json())
    .then(data => {
      nomeProfessor.value = `${data.nome} ${data.sobrenome}`
    })
    .catch(error => {
      res.innerHTML = 'Erro ao buscar professor!'
      res.style.backgroundColor = 'lightcoral'
      console.error('Erro ao buscar professor:', error)
    })
})

btnCadSaida.addEventListener('click', (e) => {
  e.preventDefault()

  if (!dataSolicitacao.value) {
    dataSolicitacao.value = new Date().toISOString().split('T')[0]
  }
  if (!horaSaida.value) {
    horaSaida.value = new Date().toTimeString().slice(0, 5)
  }

  if (
    dataSolicitacao.value && horaSaida.value && horaRetorno.value &&
    motivo.value && localDestino.value && statusSaida.value &&
    codAluno.value && nomeAluno.value && codProfessor.value && nomeProfessor.value
  ) {
    const saida = {
      dataSolicitacao: dataSolicitacao.value,
      horaSaida: horaSaida.value,
      horaRetorno: horaRetorno.value,
      motivo: motivo.value,
      localDestino: localDestino.value,
      status: statusSaida.value,
      nomeAluno: nomeAluno.value,
      nomeProfessor: nomeProfessor.value,
      aluno_cod: Number(codAluno.value),
      professor_cod: Number(codProfessor.value)
    }

    console.log("Enviando:", saida)

    fetch("http://localhost:8081/saida", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(saida)
    })
      .then(resp => {
        if (!resp.ok) throw new Error("Falha ao cadastrar")
        return resp.json()
      })
      .then(saida => {
        res.innerHTML = `` 
      
        res.innerHTML += `<strong>Saída cadastrada com sucesso!</strong><br>`
        res.innerHTML += `Código da saída: ${saida.codSaida}<br>`
        res.innerHTML += `Motivo: ${saida.motivo}<br>`
        res.innerHTML += `Local de Destino: ${saida.localDestino}<br>`
        res.innerHTML += `Status: ${saida.status}<br>`
        res.innerHTML += `Data de Solicitação: ${saida.dataSolicitacao}<br>`
        res.innerHTML += `Hora de Saída: ${saida.horaSaida}<br>`
        res.innerHTML += `Hora de Retorno: ${saida.horaRetorno}<br>`
        res.innerHTML += `Aluno: ${saida.nomeAluno} (Código: ${saida.aluno?.codAluno || 'Desconhecido'})<br>`
        res.innerHTML += `Professor: ${saida.nomeProfessor} (Código: ${saida.professor?.codProfessor || 'Desconhecido'})<br>`        
      
        res.style.display = 'block' 
      
        console.log("Saída cadastrada:", saida)
      })
      .catch(error => {
        res.innerHTML = `<strong>ERRO AO CADASTRAR SAÍDA!</strong><br>Erro: ${error.message}`
        res.style.display = 'block' 
        console.error("Erro:", error)
      })
      
      } else {
        res.innerHTML = `<strong>Preencha todos os campos corretamente!</strong>`
        res.style.display = 'block' 
      }
    })      