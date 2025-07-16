let apagar = document.getElementById("apagar");
let res = document.getElementById("res");

apagar.addEventListener("click", () => {
    const id = document.getElementById("id").value;

    fetch(`http://localhost:8081/saida/${id}`, {
        method: "DELETE"
    })
    .then(resp => resp.json())
    .then(resp =>{
        res.innerHTML = ``
        res.innerHTML += `Saída apagada com sucesso!`
    })
    .catch(erro => {
        res.innerHTML = `Erro ao apagar produto: ${erro.message}`;
        console.error("Erro:", erro);
    });
});
