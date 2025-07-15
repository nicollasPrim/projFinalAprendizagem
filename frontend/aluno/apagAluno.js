let apagar = document.getElementById("apagar");
let res = document.getElementById("res");

apagar.addEventListener("click", (e) => {
    e.preventDefault(); 

    const id = document.getElementById("id").value;

    fetch(`http://localhost:8081/aluno/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(dados => {
        res.innerHTML = "";
        if (dados.ok) {
            res.innerHTML += `Aluno com ID ${id} apagado com sucesso!<br>`;
        } else {
            res.innerHTML += `Nenhum aluno encontrado com o ID ${id}.<br>`;
        }
    })
    .catch(erro => {
        res.innerHTML = `Erro ao apagar aluno: ${erro.message}`;
        console.error("Erro:", erro);
    });
});
