const lista = document.getElementById("lista");
let dados = JSON.parse(localStorage.getItem("animais")) || [];
let indexEditando = null;

// Renderiza todos os cards
function renderizarCards() {
    lista.innerHTML = "";
    if (!dados || dados.length === 0) {
        lista.innerHTML = "<p style='text-align:center; color:#999;'>Nenhum animal cadastrado ainda.</p>";
        return;
    }

    dados.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${item.nome || "-"}</h3>
            <p><strong>Peso:</strong> ${item.peso || "-"} kg</p>
            <p><strong>Preço:</strong> R$ ${item.preco || "-"}</p>
            <p><strong>Localização:</strong> ${item.local || "-"}</p>
            <p><strong>Registro:</strong> ${item.registro || "-"}</p>
            <p><strong>Idade:</strong> ${item.idade || "-"} anos</p>
            <p><strong>Condições:</strong> ${item.condicoes || "-"}</p>
            <p><strong>Entrega:</strong> ${item.entrega || "-"}</p>
            <p><strong>Raça:</strong> ${item.raca || "-"}</p>
            <p><strong>Categoria:</strong> ${item.categoria || "-"}</p>
            <p><strong>Telefone:</strong> ${item.telefone || "-"}</p>
            ${item.foto ? `<img src="${item.foto}" alt="Foto" style="margin-top:10px; border-radius:8px; width:100%; height:220px; object-fit:cover;">` : ""}
            <div class="btn-group">
                <button class="btn-editar" type="button" data-index="${index}">Editar</button>
                <button class="btn-excluir" type="button" data-index="${index}">Excluir</button>
            </div>
        `;

        lista.appendChild(card);
    });

    // Listeners
    document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', (e) => abrirModalEditar(Number(e.currentTarget.dataset.index)));
    });
    document.querySelectorAll('.btn-excluir').forEach(btn => {
        btn.addEventListener('click', (e) => excluir(Number(e.currentTarget.dataset.index)));
    });
}

// Modal de edição
function abrirModalEditar(index) {
    indexEditando = index;
    const item = dados[index] || {};

    document.getElementById("editNome").value = item.nome || "";
    document.getElementById("editPeso").value = item.peso || "";
    document.getElementById("editPreco").value = item.preco || "";
    document.getElementById("editLocal").value = item.local || "";
    document.getElementById("editRegistro").value = item.registro || "";
    document.getElementById("editIdade").value = item.idade || "";
    document.getElementById("editCondicoes").value = item.condicoes || "";
    document.getElementById("editEntrega").value = item.entrega || "";
    document.getElementById("editRaca").value = item.raca || "";
    document.getElementById("editCategoria").value = item.categoria || "";
    document.getElementById("editTelefone").value = item.telefone || "";

    const modal = document.getElementById("modalEditar");
    if (modal) modal.style.display = "flex";
}

function fecharModal() {
    const modal = document.getElementById("modalEditar");
    if (modal) modal.style.display = "none";
    indexEditando = null;
}

// Salvar edição
function salvarEdicao() {
    if (indexEditando === null) {
        alert("Nenhum animal selecionado para editar!");
        return;
    }

    const nome = document.getElementById("editNome").value.trim();
    const peso = document.getElementById("editPeso").value.trim();
    const preco = document.getElementById("editPreco").value.trim();

    if (!nome || !peso || !preco) {
        alert("Preencha os campos obrigatórios (Nome, Peso e Preço)!");
        return;
    }

    const itemAtualizado = {
        ...dados[indexEditando],
        nome,
        peso,
        preco,
        local: document.getElementById("editLocal").value.trim(),
        registro: document.getElementById("editRegistro").value.trim(),
        idade: document.getElementById("editIdade").value.trim(),
        condicoes: document.getElementById("editCondicoes").value.trim(),
        entrega: document.getElementById("editEntrega").value.trim(),
        raca: document.getElementById("editRaca").value.trim(),
        categoria: document.getElementById("editCategoria").value,
        telefone: document.getElementById("editTelefone").value.trim()
    };

    dados[indexEditando] = itemAtualizado;
    localStorage.setItem("animais", JSON.stringify(dados));

    alert("Animal atualizado com sucesso!");
    fecharModal();
    renderizarCards();
}

// Excluir
function excluir(index) {
    const nomeAnimal = (dados[index] && dados[index].nome) || "este item";
    if (confirm(`Deseja realmente excluir ${nomeAnimal}?`)) {
        dados.splice(index, 1);
        localStorage.setItem("animais", JSON.stringify(dados));
        alert("Animal excluído com sucesso!");
        renderizarCards();
    }
}

// Fecha modal ao clicar fora
window.addEventListener("click", (event) => {
    const modal = document.getElementById("modalEditar");
    if (modal && event.target === modal) fecharModal();
});

// Inicializa
document.addEventListener("DOMContentLoaded", renderizarCards);
