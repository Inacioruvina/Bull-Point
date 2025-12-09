function salvar() {
  let a = document.getElementById("nome").value;
  let b = document.getElementById("preco").value;

  localStorage.setItem("nome", a);
  localStorage.setItem("preco", b);
  const nome = localStorage.getItem("nome");
  const preco = localStorage.getItem("preco");

  document.getElementById("Nome_boi").innerText = nome;
  document.getElementById("Preço_Boi").innerText = preco;
    document.getElementById("nome").value = "";
   document.getElementById("preco").value = "";
}

