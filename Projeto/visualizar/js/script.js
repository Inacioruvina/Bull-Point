const lista = document.getElementById("lista");
let dados = JSON.parse(localStorage.getItem("animais")) || [];

// Função para renderizar todos os cards
function renderizarCards() {
    lista.innerHTML = ""; // Limpa lista
    dados.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${item.nome}</h3>
            <p><strong>Peso:</strong> ${item.peso}</p>
            <p><strong>Preço:</strong> R$ ${item.preco}</p>
            <p><strong>Localização:</strong> ${item.local}</p>
            <p><strong>Registro:</strong> ${item.registro}</p>
            <p><strong>Idade:</strong> ${item.idade}</p>
            <p><strong>Condições:</strong> ${item.condicoes}</p>
            <p><strong>Entrega:</strong> ${item.entrega}</p>
            <p><strong>Raça:</strong> ${item.raca}</p>
            <p><strong>Categoria:</strong> ${item.categoria}</p>
            ${item.foto ? `<img src="${item.foto}" alt="Foto" style="margin-top:10px; border-radius:8px; width:100%;">` : ""}
            <div style="margin-top: 10px; display: flex; gap: 10px; flex-wrap: wrap;">
                <button onclick="editar(${index})">Editar</button>
                <button onclick="excluir(${index})">Excluir</button>
            </div>
        `;

        lista.appendChild(card);
    });
}

// Função para excluir um item
function excluir(index) {
    if(confirm(`Deseja realmente excluir ${dados[index].nome}?`)) {
        dados.splice(index, 1);
        localStorage.setItem("animais", JSON.stringify(dados));
        renderizarCards();
    }
}

// Função para editar um item
function editar(index) {
    const item = dados[index];

    // Função auxiliar para atualizar campo se o usuário não cancelar
    function editarCampo(campo, label) {
        const novo = prompt(`Editar ${label}:`, item[campo]);
        if(novo !== null && novo.trim() !== "") {
            item[campo] = novo;
        }
    }

    editarCampo("nome", "Nome");
    editarCampo("peso", "Peso");
    editarCampo("preco", "Preço");
    editarCampo("local", "Localização");
    editarCampo("registro", "Registro");
    editarCampo("idade", "Idade");
    editarCampo("condicoes", "Condições");
    editarCampo("entrega", "Entrega");
    editarCampo("raca", "Raça");
    editarCampo("categoria", "Categoria");

    // Atualiza dados no localStorage
    dados[index] = item;
    localStorage.setItem("animais", JSON.stringify(dados));
    renderizarCards();
}

// Inicializa
renderizarCards();
