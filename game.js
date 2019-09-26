var timerId = null; // variável que armazena a chamada da função timeOut


function iniciaJogo() {

    var url = window.location.search; // com o atributo search pega as informações após o ? no browser
    var nivel_jogo = url.replace("?", ""); // replace substituir ? por vazio para pegar o número da dificuldade do jogo


    var tempo_segundos = 0;

    if (nivel_jogo == 1) { //fácil = 120 segundos
        tempo_segundos = 120;

    }
    if (nivel_jogo == 2) { //normal = 60 segundos
        tempo_segundos = 60;

    }
    if (nivel_jogo == 3) { // difícil = 30 segundos
        tempo_segundos = 30;

    }
    // inserindo segundos no span
    document.getElementById("cronometro").innerHTML = tempo_segundos; // innerHTML = modifica o conteúdo de um elemento HTML  

    // qtd de balões

    var qtd_baloes = 80;
    cria_baloes(qtd_baloes); // chama a função cria_baloes referenciando a qtd de baloes em qtd_baloes

    // imprimir qt de balões inteiros

    document.getElementById("baloes_inteiros").innerHTML = qtd_baloes;
    document.getElementById("baloes_estourados").innerHTML = 0;

    contagem_tempo(tempo_segundos + 1)

}

function contagem_tempo(segundos) {

    segundos = segundos - 1; // decrementar o tempo do cronometro

    if (segundos == -1) {
        clearTimeout(timerId); // parar a execução da função setTimeout
        game_over();
        return false;
    }
    document.getElementById("cronometro").innerHTML = segundos;
    timerId = setTimeout("contagem_tempo(" + segundos + ")", 1000); // 1000= 1s a cada 1s chama a função setTimeout o tempo para segundos

}

function game_over() {
    alert("Você não conseguiu estourar todos os balões a tempo");
}

function cria_baloes(qtd_baloes) {

    for (var i = 1; i <= qtd_baloes; i++) {
        var balao = document.createElement("img"); // criar a figura do balao
        balao.src = "imagens/balao_azul_pequeno.png";
        balao.style.margin = "10px";
        balao.id = "b" + i;
        balao.onclick = function () {
            estourar(this)
        }

        document.getElementById("cenario").appendChild(balao); // appendChild coloca a tag img dentro da div cenario como filho

    }

    function estourar(e) {

        var id_balao = e.id;

        document.getElementById(id_balao).setAttribute("onclick", ""); // retirar o bug do mesmo balão estourado quando clicado contabilizando mais um

        document.getElementById(id_balao).src = "imagens/balao_azul_pequeno_estourado.png";

        pontuacao(-1);

    }

    function pontuacao(acao) {
        var baloes_inteiros = document.getElementById("baloes_inteiros").innerHTML;
        var baloes_estourados = document.getElementById("baloes_estourados").innerHTML;

        baloes_inteiros = parseInt(baloes_inteiros);
        baloes_estourados = parseInt(baloes_estourados);

        baloes_inteiros = baloes_inteiros + acao;
        baloes_estourados = baloes_estourados - acao; // - com menos dá + 

        document.getElementById("baloes_inteiros").innerHTML = baloes_inteiros; // receber o valor atualizado
        document.getElementById("baloes_estourados").innerHTML = baloes_estourados; // receber o valor atualizado

        situacao_jogo(baloes_inteiros);
    }

    function situacao_jogo(baloes_inteiros) {
        if (baloes_inteiros == 0) {
            alert("Parabéns, você conseguiu estourar todos os balões a tempo");
            parar_jogo();
        }
    }

    function parar_jogo() {
        clearTimeout(timerId);
    }


}