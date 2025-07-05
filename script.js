const readline = require('readline');
// importando o módulo readline para ler entradas do usuário no terminal
// e escrever saídas no terminal.
const rl = readline.createInterface({
  input: process.stdin, // Entrada padrão, vem do teclado
  output: process.stdout // Saída padrão, vai para o terminal
});

let fs = require('fs');
// Verifica se o arquivo lista-de-tarefas.json existe, se não existir, cria um novo
fs.existsSync('lista-de-tarefas.json') || fs.writeFileSync('lista-de-tarefas.json', JSON.stringify([]));
// verifica se existe o arquivo lista-de-tarefas.json,|| verifica se a resposta foi true ou false, caso false cria um array vazio convertido em json


class Tarefa {
    constructor(titulo) {
        this.titulo = titulo;
        this.concluida = false;
    }

    marcarComoConcluida() {
        this.concluida = true;
    }
    marcarComoNaoConcluida() {
        this.concluida = false;
    }
}


class ListaDeTarefas {
    constructor() {
        this.tarefas = [];
    }
    adicionarTarefa(titulo) {
        const novaTarefa = new Tarefa(titulo);
        this.tarefas.push(novaTarefa);
    }

    removerTarefa(numero) {
        const idx = numero - 1; // Ajusta o índice para começar em 0
        if (idx >= 0 && idx < this.tarefas.length) { // Verifica se o índice existe no array
            this.tarefas.splice(idx, 1); // Remove a tarefa do array, no caso idx é qual será removida e 1 é a quantidade de itens a serem removidos
            console.log(`Tarefa ${numero} removida com sucesso.`);
        } else {
            console.log("Número da tarefa inválido.");
        }
    }
    marcarTarefaConcluida(numero) {
        const idx = numero - 1; // Ajusta o índice para começar em 0 denovo
        if (idx >= 0 && idx < this.tarefas.length) { // Verifica se o índice existe no array
            this.tarefas[idx].marcarComoConcluida(); // Marca a tarefa como concluída
            console.log(`Tarefa ${numero} marcada como concluída.`);
        } else {
            console.log("Número da tarefa inválido.");
        }
    }

    marcarTarefaNaoConcluida(numero) {
        const idx = numero - 1; // Ajusta o índice para começar em 0 denovo
        if (idx >= 0 && idx < this.tarefas.length) { // Verifica se o índice existe no array
            this.tarefas[idx].marcarComoNaoConcluida(); // Marca a tarefa como concluída
            console.log(`Tarefa ${numero} marcada como não concluída.`);
        } else {
            console.log("Número da tarefa inválido.");
        }
    }

    listarTarefas() {
        if (this.tarefas.length === 0) { // Verifica se a lista está vazia, se tiver retorna a mensagem na linha abaixo
            console.log("Nenhuma tarefa cadastrada.");
        }
        this.tarefas.forEach((tarefa, index) => { //percorre a classe ListaDeTarefas e exibe cada tarefa no array
            console.log(`${index + 1}. ${tarefa.titulo} - [${tarefa.concluida ? "Concluída" : "Pendente"}]`); // O final verifica se 
            // a tarefa concluída retorna true ou false, gerando uma string pra cada ocasião
        });
    }
}

function salvarLista(lista) {
    fs.writeFileSync('lista-de-tarefas.json', JSON.stringify(lista.tarefas, null, 2));
    // Salva o catálogo no arquivo lista-de-tarefas.json, convertendo o array de livros em JSON
    // O segundo parâmetro é null porque não estamos usando uma função de substituição
    // O terceiro parâmetro é para formatar o JSON com 2 espaços de indentação
}

function carregarLista() {
    const dadosArquivo = fs.readFileSync('lista-de-tarefas.json', 'utf8');
    // Lê o conteúdo do arquivo lista-de-tarefas.json
    const tarefas = JSON.parse(dadosArquivo);
    // Converte o conteúdo lido de JSON para um array de objetos tarefa
    const lista = new ListaDeTarefas();
    tarefas.forEach(item => {
        const novaTarefa = new Tarefa(item.titulo);
        novaTarefa.concluida = item.concluida; // Mantém o estado de concluída
        lista.tarefas.push(novaTarefa);
    });
    return lista;
}
function mostrarMenu() {
  console.log("\nMenu:");
  console.log("1. Adicionar nova tarefa");
  console.log("2. Listar tarefas");
  console.log("3. Remover tarefa");
  console.log("4. Marcar tarefa como concluída");
  console.log("5. Marcar tarefa como não concluída");
  console.log("6. Sair");

  rl.question("Escolha uma opção: ", (opcao) => {
    switch (opcao.trim()) {
      case '1':
        rl.question("Digite o título da tarefa: ", (titulo) => {
          lista.adicionarTarefa(titulo.trim());
          salvarLista(lista);
          console.log(`Tarefa "${titulo.trim()}" adicionada!`);
          mostrarMenu();
        });
        break;
      case '2':
        lista.listarTarefas();
        mostrarMenu();
        break;
      case '3':
        lista.listarTarefas();
        rl.question("Digite o número da tarefa que deseja remover: ", (num) => {
          lista.removerTarefa(parseInt(num));
          salvarLista(lista);
          mostrarMenu();
        });
        break;
      case '4':
        lista.listarTarefas();
        rl.question("Digite o número da tarefa que deseja marcar como concluída: ", (num) => {
          lista.marcarTarefaConcluida(parseInt(num));
          salvarLista(lista);
          mostrarMenu();
        });
        break;
      case '5':
        lista.listarTarefas();
        rl.question("Digite o número da tarefa que deseja marcar como não concluída: ", (num) => {
          lista.marcarTarefaNaoConcluida(parseInt(num));
          salvarLista(lista);
          mostrarMenu();
        });
        break;
      case '6':
        salvarLista(lista);
        console.log("Saindo...");
        rl.close();
        break;
      default:
        console.log(`Opção "${opcao}" inválida.`);
        mostrarMenu();
    }
  });
}

mostrarMenu(); // Chama o menu principal ao iniciar o programa


let lista = carregarLista();