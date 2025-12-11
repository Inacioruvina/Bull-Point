document.getElementById("form-cadastro").addEventListener("submit", function(e) { 
    e.preventDefault();

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
    const fotoInput = foto;

    // Função para salvar o animal após processar a imagem
    function salvarAnimal(fotoBase64) {
        const dados = {
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
            foto: fotoBase64
        };

        let lista = JSON.parse(localStorage.getItem("animais")) || [];
        lista.push(dados);
        localStorage.setItem("animais", JSON.stringify(lista));

        alert("Cadastro salvo!");
        document.getElementById("form-cadastro").reset();
    }

    // Converter imagem para Base64
    if(fotoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            salvarAnimal(e.target.result);
        }
        reader.readAsDataURL(fotoInput.files[0]);
    } else {
        salvarAnimal(null);
    }
});
