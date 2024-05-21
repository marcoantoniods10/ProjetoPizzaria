// Dados dos Produtos
const Produtos = [
    {nome: "Coca-cola    2l", preco: 9.00, estoque:10},
    {nome: "Coca-cola 350ml", preco: 5.00, estoque:10},
    {nome: "Coca-cola 600ml", preco: 7.00, estoque:10},
    {nome: "Guarana   600ml", preco: 7.00, estoque:10},
    {nome: "Sprite    350ml", preco: 5.00, estoque:10},
    {nome: "Bohemia   350ml", preco: 8.00, estoque:10},
    {nome: "Skol      350ml", preco: 8.00, estoque:10},
];

const produtoCorpo = document.getElementById("produto-corpo");
const carrinhoCorpo = document.getElementById("carrinho-corpo");
const totalSpan = document.getElementById("total");
const resumoPedidoDiv = document.getElementById("resumo-pedido");

let carrinho = [];
let total = 0;

//Função para exibir produtos

function exibirProdutos (){
    produtoCorpo.innerHTML="";

    Produtos.forEach((produto, index)=>{
        const row = produtoCorpo.insertRow();
        const nomeCell = row.insertCell();
        const preçoCell = row.insertCell();
        const estoqueCell = row.insertCell();
        const acaoCell = row.insertCell();

        nomeCell.textContent = produto.nome;
        preçoCell.textContent = `R$${produto.preco.toFixed(2)}`;
        estoqueCell.textContent = produto.estoque;

        const btnAdicionar = document.createElement("button");
        btnAdicionar.textContent = "Adicionar";
        btnAdicionar.classList.add("btn");
        btnAdicionar.addEventListener("click", () => adicionarAoCarrinho(index));

        if(produto.estoque === 0){
            btnAdicionar.disabled = true;
            estoqueCell.classList.add("--");
            btnAdicionar.textContent = "Sem Estoque"

        }
        acaoCell.appendChild(btnAdicionar);

    });
};

// Função  para adicionar um produto no carrinho:

function adicionarAoCarrinho(index){
    const produto = Produtos[index];
    const itemExistente = carrinho.find(item => item.nome === produto.nome);

    if (itemExistente){
        itemExistente.qtd++;
    }else{
        carrinho.push({... produto, qtd: 1});
    }
    produto[index].estoque--;
    atualizaCarrinho();
    exibirProdutos();
}

// Atualiza carrinho

function atualizaCarrinho(){
    carrinhoCorpo.innerHTML = "";
    total = parseFloat(pedidoData.total);
    let totalBebidas = 0;

    carrinho.forEach((item, index) => {
        const row = carrinhoCorpo.insertRow();
        const nomeCell = row.insertCell();
        const preçoCell = row.insertCell();
        const qtdCell = row.insertCell();
        const acaoCell = row.insertCell();

        nomeCell.textContent = item.nome;
        preçoCell.textContent = `R$${produto.preco.toFixed(2)}`;
        qtdCell.textContent = item.qtd;

        const btnRemover = document.createElement("button");
        btnRemover.textContent = "Remover";
        btnRemover.classList.add("btn");
        btnRemover.addEventListener("click", () => removerDoCarrinho(index));
        acaoCell.appendChild(btnRemover);

        total += item.preco * item.qtd;

        //Verifica
        if(item.nome !== pedidoData.pizza){
            totalBebidas += item.preco * item.qtd;
        }
    });

    totalSpan.textContent = total.toFixed(2);

    //Exibir
    resumoPedidoDiv.innerHTML = `
    <p>${resumoData.descricao.replace(/<br>/g, '<br>')}</p>
    <p>Total da Pizza    : R$${pedidoData.total}</p>
    <p>Total das Bebidas : R$${totalBebidas.toFixed(2)}</p>
    <p>TOTAL DO PEDIDO   : R$${total.toFixed(2)}</p>
`
}

function removerDoCarrinho(index){
    const produtoRemovido = carrinho.splice(index, 1)[0];
    const produtoOriginal = produto.find(p => p.nome === produtoRemovido.nome);
    produtoOriginal.estoque += produtoRemovido.qtd;
    atualizaCarrinho();
    exibirProdutos();

}
const urlParams = new URLSearchParams(window.location.search);
const pedidoData = JSON.parse(decodeURIComponent(urlParams.get('pedido') || '{}'));
const resumoData = JSON.parse(decodeURIComponent(urlParams.get('resumo') || '{}'));

resumoPedidoDiv.innerHTML = `
<p>${resumoData.descricao.replace(/<br>/g, '<br>')}</p>
    <p>Total da Pizza    : R$${pedidoData.total}</p>
    <p>Total das Bebidas : R$${totalBebidas.toFixed(2)}</p>
    <p>TOTAL DO PEDIDO   : R$${total.toFixed(2)}</p>
`
exibirProdutos();
atualizaCarrinho();
