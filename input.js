// Função para adicionar palavras à lista e atualizar as tabelas
const addWords = (palavra) => {
  if (words.indexOf(palavra) < 0 && palavra.length > 0) {
    // Verifica se a palavra não está na lista e não é vazia
    $("#input-field").append(`<p class='addedWord'>${palavra}</p>`);
    // Adiciona a palavra à interface do usuário
    words.push(palavra);
    // Adiciona a palavra à lista 'words'
    $("#input_palavras").val("");
    // Limpa o campo de entrada
  }
  // Gera as tabelas atualizadas
  generateTables();
};

// Função para montar o estado das palavras
const mountWordState = () => {
  words.forEach((arrayWords) => {
    // Itera por todas as palavras
    let actualState = 0; // Inicializa o estado atual como 0
    actualState = createSingleWordState(arrayWords, actualState); // Cria o estado da palavra
  });
};

// Função para gerar as linhas da tabela
const generateTableLines = () => {
  let estadosArray = [];
  states.forEach((state, idx) => {
    // Itera pelos estados
    estadosArray.push(manageState(state, idx)); // Converte o estado em um formato mais legível
  });

  return estadosArray;
};

// Função para criar o estado de uma única palavra em um autômato finito determinístico
const createSingleWordState = (arrayWords, actualState) => {
  for (let j = 0; j < arrayWords.length; j++) {
    // Verifica se não existe transição do estado atual para a letra atual da palavra
    if (typeof states[actualState][arrayWords[j]] === "undefined") {
      let nextState = globalState + 1;
      // Cria uma nova transição para o próximo estado
      states[actualState][arrayWords[j]] = nextState;
      states[nextState] = [];
      // Atualiza o estado atual para o próximo estado
      globalState = actualState = nextState;
    } else {
      // Move para o próximo estado
      actualState = states[actualState][arrayWords[j]];
    }

    // Se for a última letra da palavra, marca o estado como final
    if (j == arrayWords.length - 1) {
      states[actualState]["final"] = true;
    }
  }

  return actualState;
};

// Função para converter um estado de um autômato finito determinístico (AFD) em um objeto mais legível
const manageState = (state, index) => {
  const stateInfo = {
    estado: index,
    final: typeof state["final"] !== "undefined", // Verifica se o estado é final
  };

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  for (let letter of alphabet) {
    const transition = state[letter];
    // Adiciona a transição ou "-" se não houver transição
    stateInfo[letter] = typeof transition !== "undefined" ? transition : "-";
  }

  return stateInfo;
};

// Função para gerar as tabelas
const generateTables = () => {
  // Monta o estado das palavras
  mountWordState();
  // Gera as linhas da tabela
  table = generateTableLines();
  // Monta a tabela
  mountTable(table);
};
