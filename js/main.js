const form = document.getElementById('novoItem')//encontra o formulario
const lista = document.getElementById('lista')//encontra a lista
const itens = JSON.parse(localStorage.getItem('itens')) || []//recebe os dados do localstorage, transformando string em objeto. se não encontrar dados, cria um array vazio

itens.forEach((elemento)=>{//para cada elemento no localstorage, cria um item
    criaElemento(elemento)
})

form.addEventListener('submit', (evento)=>{//ao submeter o formulário, faça:
    evento.preventDefault();//não recarregar a pagina

    const nome = evento.target.elements['nome'];//encontra o valor do input nome
    const quantidade = evento.target.elements['quantidade'];//encontra o valor da quantidade
    if(quantidade.value==="" || nome.value===""){
        let mensagem = "Preencha todos os campos corretamente";

// criando o elemento div
        let caixaAlerta = document.createElement("div");
        caixaAlerta.id = "alert";

// criando o elemento div para o conteúdo
        let conteudoAlerta = document.createElement("div");
        conteudoAlerta.id = "conteudo-alerta";
        conteudoAlerta.innerHTML = mensagem + "<br><br><button>OK</button>";
        caixaAlerta.appendChild(conteudoAlerta);

// adicionando o elemento ao body
        document.body.appendChild(caixaAlerta);

// adicionando o evento de clique no botão OK
        let botaoOk = document.querySelector("#alert button");
        botaoOk.addEventListener("click", function(){
            caixaAlerta.remove();
        });

// adicionando o evento de clique no background
        caixaAlerta.addEventListener("click", function(evento) {
            evento.stopPropagation();
        });
        conteudoAlerta.addEventListener("click", function(evento) {
            evento.stopPropagation();
        });

    }else{
        const existe = itens.find(elemento=> elemento.nome === nome.value)

        const itemAtual = {//cria um objeto com os valores passados pelo formulário
            "nome": nome.value,
            "quantidade": quantidade.value
        }

        if(existe){//caso null, "", 0, -0, NaN, undefined = retorna false
            itemAtual.id= existe.id

            atualizaElemento(itemAtual)

            itens[itens.findIndex(elemento=> elemento.id === existe.id)] = itemAtual
        }else{
            itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

            criaElemento(itemAtual)

            itens.push(itemAtual);//acrescenta esse objeto ao array
        }

        localStorage.setItem("itens", JSON.stringify(itens))//manda o array para o localstorage (JSON.stringify para transformar o objeto em string)

        nome.value = ""; //esvazia o campo nome do form
        quantidade.value = ""; //esvazia o campo quantidade do form
    }
})

function criaElemento(item){
    const novoItem = document.createElement('li');//cria uma tag li e guarda na const
    novoItem.classList.add("item")//adiciona uma classe 'item' ao li

    const numeroItem = document.createElement('strong')//cria uma tag strong e guarda na const
    numeroItem.innerHTML = item.quantidade//acessa o interior da tag e grava a quantidade
    numeroItem.dataset.id = item.id;

    novoItem.appendChild(numeroItem)//acessa a li e adiciona a tag strong (com a quantidade) dentro da tag li
    novoItem.innerHTML += item.nome;//acessa o interior da tag e grava o nome

    novoItem.appendChild(criaBotaoDeleta(item.id))

    lista.appendChild(novoItem);//acessa o interior da lista e adiciona o novo item
}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}
function criaBotaoDeleta(id){
    const elementoBotao = document.createElement('button')
    elementoBotao.innerHTML = "x"

    elementoBotao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id)
    })
    return elementoBotao
}
function deletaElemento(tag, id){
    tag.remove();
    itens.splice(itens.indexOf(elemento=>elemento.id === id))

    localStorage.setItem("itens", JSON.stringify(itens))
}








