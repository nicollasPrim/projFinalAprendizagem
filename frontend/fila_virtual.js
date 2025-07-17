const main = document.querySelector('main')

function carregarSaidas() {
fetch('http://localhost:8081/saida')
    .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar saídas')
            return res.json()
        })
        .then(saidas => {
            const pendentes = saidas.filter(s => s.status === 'pendente')
            main.innerHTML = ''
    if (pendentes.length === 0) {
            main.innerHTML = '<p>Não há saídas pendentes.</p>'
        return
    }

    pendentes.forEach(saida => {
        const div = document.createElement('div')
        div.classList.add('saida')
        div.dataset.id = saida.codSaida

        div.innerHTML = `
        <p><strong>ID:</strong> ${saida.codSaida}</p>
        <p><strong>Aluno:</strong> ${saida.nomeAluno}</p>
        <p><strong>Motivo:</strong> ${saida.motivo}</p>
        <p><strong>Destino:</strong> ${saida.localDestino}</p>
        <p><strong>Solicitação:</strong> ${saida.dataSolicitacao} às ${saida.horaSaida}</p>
        <div class="botoes">
            <button class="permitir">Permitir</button>
            <button class="recusar">Recusar</button>
        </div>
        `
        main.appendChild(div)
    })
    })
    .catch(erro => {
        main.innerHTML = `<p style="color:red">Erro: ${erro.message}</p>`
        console.error(erro)
    })
}

function atualizarStatus(id, novoStatus) {
    return fetch(`http://localhost:8081/saida/${id}`)
        .then(resBusca => {
        if (!resBusca.ok) throw new Error('Saída não encontrada para atualização')
        return resBusca.json()
        })
        .then(saidaAtual => {
        const body = {
            aluno_cod: saidaAtual.aluno.codAluno,
            professor_cod: saidaAtual.professor.codProfessor,
            dataSolicitacao: saidaAtual.dataSolicitacao,
            horaSaida: saidaAtual.horaSaida,
            horaRetorno: saidaAtual.horaRetorno,
            motivo: saidaAtual.motivo,
            localDestino: saidaAtual.localDestino,
            status: novoStatus,
            nomeAluno: saidaAtual.nomeAluno,
            nomeProfessor: saidaAtual.nomeProfessor
        }

        return fetch(`http://localhost:8081/saida/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        })
        .then(resPut => {
        if (!resPut.ok) throw new Error('Erro ao atualizar status')
        return resPut.json()
        })
    }

    main.addEventListener('click', e => {
    const divSaida = e.target.closest('.saida')
    if (!divSaida) return
    const id = divSaida.dataset.id

    if (e.target.classList.contains('recusar')) {
        atualizarStatus(id, 'recusada')
        .then(() => {
            divSaida.remove()
        })
        .catch(erro => {
            alert(erro.message)
            console.error(erro)
        })
    } 
    else if (e.target.classList.contains('permitir')) {
        atualizarStatus(id, 'permitida')
        .then(() => {
            const botoesDiv = divSaida.querySelector('.botoes')
            botoesDiv.innerHTML = `<button class="retorno">Registrar Retorno</button>`
        })
        .catch(erro => {
            alert(erro.message)
            console.error(erro)
        })
    } 
    else if (e.target.classList.contains('retorno')) {
        atualizarStatus(id, 'retornada')
        .then(() => {
            divSaida.remove()
        })
        .catch(erro => {
            alert(erro.message)
            console.error(erro)
        })
    }
})

carregarSaidas()
