let apagar = document.getElementById("apagar");
let res = document.getElementById("res");

apagar.addEventListener("click", () => {
    const id = document.getElementById("id").value;

    fetch(`http://localhost:8081/saida/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(resp => {
        if (!resp.ok) throw new Error(`Status: ${resp.status} - ${resp.statusText}`);

        const contentType = resp.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
            return resp.json();
        } else {
            return null;
        }
    })
    .then(data => {
        res.innerHTML = `Saída apagada com sucesso!`;
        console.log("Resposta do DELETE:", data);
    })
    .catch(erro => {
        res.innerHTML = `Erro ao apagar saída: ${erro.message}`;
        console.error("Erro:", erro);
    });
});
