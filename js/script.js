document.addEventListener("DOMContentLoaded", function () {
    fetch("https://backend-cacaushow.onrender.com/produtos")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("produtos-container");
            data.forEach(produto => {
                const item = document.createElement("div");
                item.innerHTML = `<h3>${produto.nome}</h3><p>R$ ${produto.preco}</p>`;
                container.appendChild(item);
            });
        })
        .catch(error => console.error("Erro ao carregar produtos:", error));
});
