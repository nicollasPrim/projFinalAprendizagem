const res = document.getElementById('res')
const buscar = document.getElementById('buscar')
const atualizar = document.getElementById('atualizar')

const id = document.getElementById('id')
const dataSol = document.getElementById('dataSol')
const horaSaida = document.getElementById('horaSaida')
const horaRet = document.getElementById('horaRet')
const motivo = document.getElementById('motivo')
const localDest = document.getElementById('localDest')
const status = document.getElementById('status')
const nmAluno = document.getElementById('nmAluno')
const nmProf = document.getElementById('nmProf')
let alunoCod = null
let profCod = null

buscar.addEventListener('click', () => {
  if (!id.value) {
    res.innerHTML = 'Informe o CÓDIGO da saída!<br>'
    res.style.backgroundColor = 'lightcoral'
    return
  }

  fetch(`http://localhost:8081/saida/${id.value}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Saída não encontrada')
      }
      return response.json()
    })
    .then(saida => {

        alunoCod = saida.aluno?.codAluno
        profCod = saida.professor?.codProfessor
        dataSol.value = saida.dataSolicitacao
        horaSaida.value = saida.horaSaida
        horaRet.value = saida.horaRetorno
        motivo.value = saida.motivo
        localDest.value = saida.localDestino
        status.value = saida.status
        nmAluno.value = saida.nomeAluno || saida.aluno?.nome || ''
        nmProf.value = saida.nomeProfessor || saida.professor?.nome || ''

    })
    .catch(error => {
      res.style.backgroundColor = 'lightcoral'
      res.innerHTML = 'Erro ao buscar saída: ' + error.message
      console.error('Erro ao buscar saída:', error)
    })
})

atualizar.addEventListener('click', (e) => {
  e.preventDefault();

  if (!id.value) {
    res.style.backgroundColor = 'lightcoral';
    res.innerHTML = 'Busque uma saída antes de editar!';
    return;
  }

  if (
    dataSol.value && horaSaida.value && horaRet.value &&
    motivo.value && localDest.value && status.value &&
    nmAluno.value && nmProf.value
  ) {

    console.log('Enviando objeto para PUT:', {
    id: parseInt(id.value),
    aluno_cod: alunoCod,
    professor_cod: profCod,
    dataSolicitacao: dataSol.value,
    horaSaida: horaSaida.value,
    horaRetorno: horaRet.value,
    motivo: motivo.value,
    localDestino: localDest.value,
    status: status.value,
    nomeAluno: nmAluno.value,
    nomeProfessor: nmProf.value
    });

    fetch(`http://localhost:8081/saida/${id.value}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: parseInt(id.value),
        aluno_cod: alunoCod,
        professor_cod: profCod,
        dataSolicitacao: dataSol.value,
        horaSaida: horaSaida.value,
        horaRetorno: horaRet.value,
        motivo: motivo.value,
        localDestino: localDest.value,
        status: status.value,
        nomeAluno: nmAluno.value,
        nomeProfessor: nmProf.value
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao atualizar');
        }
        return response.json();
      })
      .then(data => {
        res.style.backgroundColor = 'lightgreen';
        res.innerHTML = 'Saída atualizada com sucesso!<br><br>';
        res.innerHTML += `Código da saída: ${data.id}<br>`;
        res.innerHTML += `Código do aluno: ${data.aluno.codAluno}<br>`;
        res.innerHTML += `Nome aluno: ${data.nomeAluno}<br>`;
        res.innerHTML += `Código do professor: ${data.professor.codProfessor}<br>`;
        res.innerHTML += `Nome professor: ${data.nomeProfessor}<br>`;
        res.innerHTML += `Motivo: ${data.motivo}<br>`;
        res.innerHTML += `Local de destino: ${data.localDestino}<br>`;
        res.innerHTML += `Hora de saída: ${data.horaSaida}<br>`;
        res.innerHTML += `Hora de retorno: ${data.horaRetorno}<br>`;
        res.innerHTML += `Status: ${data.status}<br>`;
      })
      .catch(error => {
        res.innerHTML = 'Erro ao atualizar saída: ' + error.message;
        console.error('Erro:', error);
      });
  } else {
    res.style.backgroundColor = 'lightcoral';
    res.innerHTML = 'Preencha todos os campos!';
  }
});
