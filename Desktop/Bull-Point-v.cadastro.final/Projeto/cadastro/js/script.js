document.getElementById("form-cadastro").addEventListener("submit", function(e) { 
    e.preventDefault();

    // Validação dos campos obrigatórios
    const nome = document.getElementById("nome");
    const peso = document.getElementById("peso");
    const preco = document.getElementById("preco");
    const local = document.getElementById("local");
    const registro = document.getElementById("registro");
    const idade = document.getElementById("idade");
    const condicoes = document.getElementById("condicoes");
    const entrega = document.getElementById("entrega");
    const raca = document.getElementById("raca");
    const categoria = document.getElementById("categoria");
    const foto = document.getElementById("foto");
    const telefone = document.getElementById("Telefone");

    // Verificar campos obrigatórios
    if (!nome.value || !peso.value || !preco.value || !local.value || !registro.value || 
        !idade.value || !condicoes.value || !entrega.value || !raca.value || !telefone.value) {
        alert("Todos os campos são obrigatórios!");
        return;
    }

    const nomeVal = nome.value;
    const pesoVal = peso.value;
    const precoVal = preco.value;
    const localVal = local.value;
    const registroVal = registro.value;
    const idadeVal = idade.value;
    const condicoesVal = condicoes.value;
    const entregaVal = entrega.value;
    const racaVal = raca.value;
    const categoriaVal = categoria.value;
    const telefoneVal = telefone.value;

    // Função para salvar o animal
    function salvarAnimal(fotoBase64) {
        const dados = {
            id: Date.now(),
            nome: nomeVal,
            peso: pesoVal,
            preco: precoVal,
            local: localVal,
            registro: registroVal,
            idade: idadeVal,
            condicoes: condicoesVal,
            entrega: entregaVal,
            raca: racaVal,
            categoria: categoriaVal,
            telefone: telefoneVal,
            foto: fotoBase64,
            dataCadastro: new Date().toLocaleDateString("pt-BR")
        };

        try {
            let lista = JSON.parse(localStorage.getItem("animais")) || [];
            lista.push(dados);
            localStorage.setItem("animais", JSON.stringify(lista));

            alert("Cadastro realizado com sucesso!");
            document.getElementById("form-cadastro").reset();
        } catch (error) {
            alert("❌ Erro ao salvar cadastro: " + error.message);
            console.error(error);
        }
    }

    // Converter imagem para Base64
    if(foto.files[0]) {
        // Validar se é imagem
        if (!foto.files[0].type.startsWith("image/")) {
            alert(" Selecione uma imagem válida!");
            return;
        }

        // Validar tamanho (máx 2MB)
        if (foto.files[0].size > 2 * 1024 * 1024) {
            alert("Imagem muito grande! Máximo 2MB");
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            salvarAnimal(e.target.result);
        }
        reader.onerror = function() {
            alert("Erro ao ler arquivo!");
        }
        reader.readAsDataURL(foto.files[0]);
    } else {
        salvarAnimal(null);
    }
});