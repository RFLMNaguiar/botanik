// Criação de referências para objetos dos DOM:
/* --- MENU PRINCIPAL --- */
const bgAnimado = document.getElementById('bg-animado')
const menuPrincipal = document.getElementById('menuPrincipal')
const menuConfiguracoes = document.getElementById('menuConfiguracoes')
const jogo = document.getElementById('jogo')
const titulo = document.getElementById('titulo')
const botaoStart = document.getElementById('botaoStart')
const botaoRegras = document.getElementById('botaoRegras')
const botaoConfiguracoes = document.getElementById('botaoConfiguracoes')

/* --- MENU CONFIGURAÇÕES --- */
const botaoSalaDeAula = document.getElementById('botaoSalaDeAula')
const botaoSozinho = document.getElementById('botaoSozinho')
const sairMenuConfiguracoes = document.getElementById('voltarAoMenuPrincipal')

/* --- O JOGO --- */
const displayScore = document.getElementById('score')
const textoDaPergunta = document.getElementById('pergunta')
const elementoDosBotoesDeResposta = document.getElementById('botoesReposta')
const botao1 = document.getElementById('botaoAlternativa1')
const botao2 = document.getElementById('botaoAlternativa2')
const botao3 = document.getElementById('botaoAlternativa3')
const botao4 = document.getElementById('botaoAlternativa4')
const botaoProximo = document.getElementById('botaoProximo')
const botaoReiniciar = document.getElementById('botaoReiniciar')

const containerConfirmacaoAlternativa = document.getElementById('c-alternativa')
const botaoConfirmarAlternativa = document.getElementById('c-alternativa-confirmar')
const botaoNegarAlternativa = document.getElementById('c-alternativa-negar')
const botaoFecharContainerConfirmacaoAlternativa = document.getElementById('c-alternativa-fechar')

const containerConfirmacaoAjuda = document.getElementById('c-ajuda')
const botaoConfirmarAjuda = document.getElementById('c-ajuda-confirmar')
const botaoNegarAjuda = document.getElementById('c-ajuda-negar')
const botaoFecharContainerConfirmacaoAjuda = document.getElementById('c-ajuda-fechar')

/* --- AJUDAS --- */
const containerDaImagem = document.getElementById('containerDaImagem')
const botaoCartas = document.getElementById('botaoCartas')
const botaoPlacas = document.getElementById('botaoPlacas')
const botaoPula = document.getElementById('botaoPula')
const botaoCancelar = document.getElementById('botaoCancelar')
const botaoFecharImagem = document.getElementById('botaoFecharImagem')
const botaoMatarAlternativas = document.getElementById('botaoMatarAlternativas')
const caixaCartaVirada = document.getElementById('caixaCartaVirada')
const carta = document.getElementById('card')

// Criação e definição de variáveis globais:
let ajudas, ajudaSelecionada, botaoSelecionado, indiceDaPerguntaAtual, nivelAtual, perguntaAtual, perguntaAtualTemImagem, perguntasEmbaralhadas, resposta, score
let confirmado = false

// Atribuição de eventos para botões presentes no jogo:
/* --- MENU PRINCIPAL --- */
botaoStart.addEventListener('click', iniciarJogo)
botaoRegras.addEventListener('click', redirecionarParaSiteDeRegras)
botaoConfiguracoes.addEventListener('click', abrirConfiguracoes)

/* --- MENU CONFIGURAÇÕES --- */
sairMenuConfiguracoes.addEventListener('click', fecharConfiguracoes)

/* --- CONTROLES --- */
botaoProximo.addEventListener('click', passarParaProximaPergunta)
botaoReiniciar.addEventListener('click', iniciarJogo)

botaoConfirmarAlternativa.addEventListener('click', confirmarAlternativa)
botaoNegarAlternativa.addEventListener('click', fecharContainerConfirmacaoAlternativa)

botaoConfirmarAjuda.addEventListener('click', confirmarAjuda)
botaoNegarAjuda.addEventListener('click', fecharContainerConfirmacaoAjuda)
 
/* --- AJUDAS --- */
botaoCartas.addEventListener('click', acionarAjuda) 
botaoPlacas.addEventListener('click', acionarAjuda)
botaoPula.addEventListener('click', acionarAjuda)

botaoMatarAlternativas.addEventListener('click', abrirCartas)

// Funções do jogo:
function iniciarJogo(){
    menuPrincipal.classList.add('hidden')
    bgAnimado.style.animationPlayState='paused'
    jogo.classList.remove('hidden')
    botaoReiniciar.classList.add('hidden')
    removerImagem()
    destravarTodasAjudas()
    resetarCoresAlternativas()
    manipularBotoes('todosMenosControles', 'mostrar')

    // Embaralhamento de perguntas:
    perguntasEmbaralhadas = []
    perguntasEmbaralhadas[1] = perguntas[1].sort(() => Math.random() - .5)
    perguntasEmbaralhadas[2] = perguntas[2].sort(() => Math.random() - .5)
    perguntasEmbaralhadas[3] = perguntas[3].sort(() => Math.random() - .5)
    perguntasEmbaralhadas[4] = perguntas[4].sort(() => Math.random() - .5)

    // Reinicialização das variáveis globais:
    ajudas = [2, 4, 4, 5] //cartas, convidados, placas, pula, respectivamente.
    indiceDaPerguntaAtual = 0
    score = 0
    nivelAtual = 0
    numeroDePerguntas = 30
    setProximaPergunta()
    contarAjudasRestantes()
}

// Função que calcula o nível atual do jogador baseado em sua pontuação no momento:
function calcularNivel(score){
    if (score >= 0 && score <= 9){
        return 1
    } else if (score >= 10 && score <= 19){
        return 2
    } else if (score >= 20 && score <= 29){
        return 3
    } else if (score >= 30){
        return 4
    } else {
        return 0
    }
}

// Função que prepara e exibe uma nova pergunta:
function setProximaPergunta(){
    resetStatus()
    destravarAjudas()
    nivelAtual = calcularNivel(score)
    // seleciona a pergunta
    mostrarPergunta(perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual])
    displayScore.innerText =' NIVEL: ' + nivelAtual + ' PONTUAÇÃO: ' + score

    perguntaAtual = perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual]
    resposta = perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual].alternativa1

    let numeroAleatorio = Math.floor((Math.random() * 3) + 2)
    if (numeroAleatorio === 2) {
        respostaErradaAleatoria = perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual].alternativa2
    }
    else if (numeroAleatorio === 3) {
        respostaErradaAleatoria = perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual].alternativa3
    }
    else if (numeroAleatorio === 4) {
        respostaErradaAleatoria = perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual].alternativa4
    }
    manipularBotoes('todosMenosControles', 'mostrar')
    if (perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual].imagem != "") {
        if (perguntaAtual.id == (document.getElementById('img' + perguntaAtual.id).id).slice(3)) {
            document.getElementById('img' + perguntaAtual.id).classList.remove('hidden')
            perguntaAtualTemImagem = true
        }
    } 
}

function resetStatus(){
    botaoProximo.classList.add('hidden')
    while (elementoDosBotoesDeResposta.firstChild){
        elementoDosBotoesDeResposta.removeChild(elementoDosBotoesDeResposta.firstChild)
    }
    displayScore.classList.remove('hidden')
}

// Função que mostra, graficamente, uma nova pergunta:
function mostrarPergunta(pergunta){
    resetarCoresAlternativas()
    textoDaPergunta.innerText = pergunta.comando
    posicionamento = Math.floor(Math.random() * 4)
    if (posicionamento === 0){
        setBotao(botao1, pergunta, 1)
        setBotao(botao2, pergunta, 2)
        setBotao(botao3, pergunta, 3)
        setBotao(botao4, pergunta, 4)
    } else if (posicionamento === 1){
        setBotao(botao4, pergunta, 4)
        setBotao(botao3, pergunta, 3)
        setBotao(botao2, pergunta, 2)
        setBotao(botao1, pergunta, 1)
    } else if (posicionamento === 2){
        setBotao(botao3, pergunta, 3)
        setBotao(botao4, pergunta, 4)
        setBotao(botao1, pergunta, 1)
        setBotao(botao2, pergunta, 2)
    } else if (posicionamento === 3) {
        setBotao(botao2, pergunta, 2)
        setBotao(botao4, pergunta, 4)
        setBotao(botao3, pergunta, 3)
        setBotao(botao1, pergunta, 1)
    }
}

// Função que é acionada após a confirmação de alternativa:
function confirmarAlternativa(){
    let acertou

    // Modificações na exibição:
    mudarCoresAlternativas()
    travarAjudas()

    // Verifica se acertou:
    if (botaoSelecionado.innerText === resposta){
        /* --- FLUXO PARA ACERTO --- */
        // Modificações nas variáveis globais:
        score += 1
        acertou = true
    } else {
        /* --- FLUXO PARA ERRO --- */
        // Modificações nas variáveis globais:
        acertou = false
    }

    /* --- VERIFICAÇÃO DE FIM DE JOGO --- */
    if (numeroDePerguntas > indiceDaPerguntaAtual + 1 && acertou == true) {
        // Se o jogo ainda não terminou:
        botaoProximo.classList.remove('hidden')
    } else {
        // Se o jogo terminou:
        /* FINALIZAÇÃO DO JOGO */
        botaoProximo.classList.add('hidden')
        botaoReiniciar.classList.remove('hidden')
    }

    // Mostra a caixa de confirmação de alternativa:
    document.getElementById('c-alternativa').classList.add('hidden')
}

function confirmarAjuda(){
    if(ajudaSelecionada === 'botaoCartas'){
        carta.classList.remove('hidden')
        containerConfirmacaoAjuda.classList.add('hidden')
    } else if(ajudaSelecionada === 'botaoPlacas'){
        olharPlacas()
        containerConfirmacaoAjuda.classList.add('hidden')
    } else if(ajudaSelecionada === 'botaoPula'){
        pularPergunta()
        containerConfirmacaoAjuda.classList.add('hidden')
    }
}

// Função que colore as alternativas após a confirmação da seleção:
function mudarCoresAlternativas(){
    botao1.style.backgroundColor = '#00CC00'
    botao2.style.backgroundColor = '#CC0000'
    botao3.style.backgroundColor = '#CC0000'
    botao4.style.backgroundColor = '#CC0000'

    botao1.disabled = true
    botao2.disabled = true
    botao3.disabled = true
    botao4.disabled = true
}

// Função que descolore as alternativas após uma nova questão ser exibida:
function resetarCoresAlternativas(){
    botao1.style.backgroundColor = '#778899'
    botao2.style.backgroundColor = '#778899'
    botao3.style.backgroundColor = '#778899'
    botao4.style.backgroundColor = '#778899'

    botao1.disabled = false
    botao2.disabled = false
    botao3.disabled = false
    botao4.disabled = false
}

function travarAjudas(){
    botaoCartas.disabled = true
    botaoPlacas.disabled = true
    botaoPula.disabled = true
}

function destravarAjudas(){
    if (ajudas[0] > 0) {botaoCartas.disabled = false}
    if (ajudas[2] > 0) {botaoPlacas.disabled = false}
    if (ajudas[3] > 0) {botaoPula.disabled = false}
}

function selecionarResposta(e){
    botaoSelecionado = e.target
    document.getElementById('c-alternativa').classList.remove('hidden')
}

function manipularBotoes(classe, acao){
    if (acao === 'mostrar'){
        if (classe === 'alternativas'){
            botao1.classList.remove('hidden')
            botao2.classList.remove('hidden')
            botao3.classList.remove('hidden')
            botao4.classList.remove('hidden')
        } else if (classe === 'ajudas') {
            botaoCartas.classList.remove('hidden')
            botaoPlacas.classList.remove('hidden')
            botaoPula.classList.remove('hidden')
        } else if (classe === 'todosMenosControles'){
            botao1.classList.remove('hidden')
            botao2.classList.remove('hidden')
            botao3.classList.remove('hidden')
            botao4.classList.remove('hidden')
            botaoCartas.classList.remove('hidden')
            botaoPlacas.classList.remove('hidden')
            botaoPula.classList.remove('hidden')
        }
    } else if (acao === 'ocultar') {
        if (classe === 'alternativas'){
            botao1.classList.add('hidden')
            botao2.classList.add('hidden')
            botao3.classList.add('hidden')
            botao4.classList.add('hidden')
        } else if (classe === 'ajudas') {
            botaoCartas.classList.add('hidden')
            botaoPlacas.classList.add('hidden')
            botaoPula.classList.add('hidden')
        } else if (classe === 'todosMenosControles'){
            botao1.classList.add('hidden')
            botao2.classList.add('hidden')
            botao3.classList.add('hidden')
            botao4.classList.add('hidden')
            botaoCartas.classList.add('hidden')
            botaoPlacas.classList.add('hidden')
            botaoPula.classList.add('hidden')
        }
    }
}

function setBotao(botao, pergunta, alternativa){
    if (alternativa === 1){
        botao.innerText = pergunta.alternativa1
    } else if (alternativa === 2){
        botao.innerText = pergunta.alternativa2
    } else if (alternativa === 3){
        botao.innerText = pergunta.alternativa3
    } else if (alternativa === 4){
        botao.innerText = pergunta.alternativa4
    } else {
        botao.innerText = 'Erro. '
    }
    botao.addEventListener('click', selecionarResposta)
    elementoDosBotoesDeResposta.appendChild(botao)
}

function redirecionarParaSiteDeRegras(){
    window.location.href = "informacoes.php";
}

function abrirConfiguracoes(){
   menuPrincipal.classList.add('hidden')
   menuConfiguracoes.classList.remove('hidden')
}

function fecharConfiguracoes(){
   menuPrincipal.classList.remove('hidden')
   menuConfiguracoes.classList.add('hidden')
}

function removerImagem(){
    // Se a pergunta respondida anteriormente tem uma imagem:
    if (perguntaAtualTemImagem){
        document.getElementById('img' + perguntaAtual.id).classList.add('hidden')
        perguntaAtualTemImagem = false
    }
}

function passarParaProximaPergunta(){
    removerImagem()
    indiceDaPerguntaAtual++
    setProximaPergunta()
}

function pularPergunta(){
    if ((ajudas[3] > 0) && (31 > score)) {
            document.getElementById('container-principal-ajuda-pulo').classList.remove('hidden')
            passarParaProximaPergunta()
            ajudas[3] -= 1
            if (ajudas[3] === 0){
                travarBotao(botaoPula)
            }
        contarAjudasRestantes()
    }
}

function acionarAjuda(e){
    ajudaSelecionada = e.target.id
    document.getElementById('c-ajuda').classList.remove('hidden')
}

function contarAjudasRestantes(){
    document.getElementById('botaoCartas').innerText ='(' + ajudas[0] + 'x) Utilizar cartas'
    document.getElementById('botaoPlacas').innerText = '(' + ajudas[2] + 'x) Adquirir dica'
    document.getElementById('botaoPula').innerText = '(' + ajudas[3] + 'x) Pular pergunta'
}

function abrirCartas() {
    if (ajudas[0] > 0) {
        cartaAberta = Math.floor((Math.random() * 3) + 1)
        console.log('Carta aberta! Eliminada(s) ' + cartaAberta + ' alternativa(s) errada(s)!')
        if (cartaAberta === 1) {
            botao2.classList.add('hidden')
        } else if (cartaAberta === 2) {
            botao2.classList.add('hidden')
            botao3.classList.add('hidden')
        } else if (cartaAberta === 3) {
            botao2.classList.add('hidden')
            botao3.classList.add('hidden')
            botao4.classList.add('hidden')
        }
        ajudas[0]--
        if (ajudas[0] === 0){
            travarBotao(botaoCartas)
        }
        carta.classList.add('hidden')
        caixaCartaVirada.checked = false;
        contarAjudasRestantes()
    }
    /* TO DO: Adicionar texto mostrando quantas alternativas foram eliminadas */
}

// Placas === Colegas.
function olharPlacas(){
    if (ajudas[2] > 0){
        let porcentagemExibida = Math.floor((Math.random() * 50) + 50)
        /* TO DO
            ADICIONAR IMAGEM DOS COLEGAS
        */
        document.getElementById('container-principal-ajuda-dica').classList.remove('hidden')
        ajudas[2]--
        if (ajudas[2] === 0){
            travarBotao(botaoPlacas)
        }
        contarAjudasRestantes()
    }
}

function travarBotao(botao){
    botao.disabled = true
    botao.classList.add('btn-danger')
}

function destravarBotao(botao){
    botao.disabled = false
    botao.classList.remove('btn-danger')
}

function destravarTodasAjudas(){
    destravarBotao(botaoPula)
    destravarBotao(botaoCartas)
    destravarBotao(botaoPlacas)
}

$(function() {
    $('.pop').on('click', function() {
        $('.imagepreview').attr('src', $(this).find('img').attr('src'));
        $('#imagemodal').modal('show');   
    });		
});

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

function fecharContainerConfirmacaoAlternativa(){
    containerConfirmacaoAlternativa.classList.add('hidden')
}

function fecharContainerConfirmacaoAjuda(){
    containerConfirmacaoAjuda.classList.add('hidden')
}

/* DEBUG */

function DEBUG_SETARQUESTAO(perguntasEmbaralhadas, nivelPergunta, indiceDaPergunta){
    displayScore.innerText ='DEBUG MODE'
    mostrarPergunta(perguntasEmbaralhadas[nivelPergunta][indiceDaPergunta])
    perguntaAtual = perguntasEmbaralhadas[nivelPergunta][indiceDaPergunta]
    resposta = perguntasEmbaralhadas[nivelPergunta][indiceDaPergunta].alternativa1

    respostaErradaAleatoria = 'DEBUG - SÃO ERRADAS:' + perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual].alternativa2 + perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual].alternativa3 + perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual].alternativa4
    
    manipularBotoes('todosMenosControles', 'mostrar')
    if (perguntasEmbaralhadas[nivelAtual][indiceDaPerguntaAtual].imagem != "") {
        if (perguntaAtual.id == (document.getElementById('img' + perguntaAtual.id).id).slice(3)) {
            document.getElementById('img' + perguntaAtual.id).classList.remove('hidden')
        }
    } 
}

function DEBUG_MATARALTERNATIVAS(){
    botao2.classList.add('hidden')
    botao3.classList.add('hidden')
    botao4.classList.add('hidden')
}

function DEBUG_AJUDASINFINITAS(){
    ajudas[0] = 1000
    ajudas[1] = 1000
    ajudas[2] = 1000
    ajudas[3] = 1000
}