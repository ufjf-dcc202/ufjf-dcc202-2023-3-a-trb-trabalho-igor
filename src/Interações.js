import { Jogador } from './Jogador.js'
import { atualizar_tela } from './Tela.js'

let divTabuleiroPlayer = document.getElementById('tab_player')
let divDadoPlayer = document.getElementById('dado_player')
let divPontoPlayer = document.querySelector('#pontos_player')
let player = Jogador(divTabuleiroPlayer, divDadoPlayer, divPontoPlayer)

let divTabuleiroBot = document.getElementById('tab_bot')
let divDadoBot = document.getElementById('dado_bot')
let divPontoBot = document.querySelector('#pontos_bot')
let bot = Jogador(divTabuleiroBot, divDadoBot, divPontoBot)

function Jogo(player1, player2) {
    return {
        player: player1,
        bot: player2,

        deleta_coluna: function(coluna_jogada, who_delete){

            const tabuleiro = this.player.tabuleiro
            const tabuleiro2 = this.bot.tabuleiro
            const tamanho = tabuleiro.length
            
            function pegarNumRepetido(){
                let repetido = 0
                for (let x = 0; x < tamanho; x++) {

                    for (let y = 0; y < tamanho; y++) {
                        const casa1 = tabuleiro[x][coluna_jogada];
                        const casa2 = tabuleiro2[y][coluna_jogada];
                        if(casa1==casa2 && casa1!=0 && casa2!=0){
                            repetido= casa1
                        }
                    }
                    
                }
                return repetido 

            }
            function apagar_repetidos( repetido){
                for (let y = 0; y < tamanho; y++) {
                    const casa = who_delete.tabuleiro[y][coluna_jogada];
                    
                    if(casa==repetido){
                        who_delete.tabuleiro[y][coluna_jogada]=0
                    }
                }
            }
            let repetido = pegarNumRepetido()
            apagar_repetidos(repetido)


        },
        checa_vitoria: function () {
            const tab_player = this.player.tabuleiro
            const tab_player2 = this.bot.tabuleiro
            const pontos_player1 = this.player.pontos
            const pontos_player2 = this.bot.pontos
            const pontos = [0, 0]
            let fim_de_jogo = true

            for (let x = 0; x < tab_player.length; x++) {
                for (let y = 0; y < tab_player.length; y++) {
                    if (tab_player[x][y] == 0 || tab_player2[x][y] == 0) {
                        fim_de_jogo = false
                    }

                }
            }

            if (fim_de_jogo == true) {
                for (let ponto = 0; ponto < 3; ponto++) {
                    pontos[0] += parseInt(pontos_player1[ponto])
                    pontos[1] += parseInt(pontos_player2[ponto])
                    console.log(pontos)
                }
                if (pontos[0] > pontos[1]) {
                    window.alert("você ganhou")
                } else {
                    window.alert("você perdeu")
                }
            }
        },

        ciclo_de_jogo: function (x, y) {
            
            this.player.posicionar_dado(x, y)
            this.deleta_coluna(y,bot)
            this.player.jogar_dado()

            let bot_pos = this.bot.jogada()
            
            this.bot.jogar_dado()
            this.deleta_coluna(bot_pos[1],player)

            this.checa_vitoria()
            atualizar_tela(this.player)
            atualizar_tela(this.bot)
        },
        pega_posições: function (e) {
            let tabuleiro = document.getElementById('tab_player')
            let rows = tabuleiro.children
            for (let x = 0; x < 3; x++) {
                let collum = rows[x].children
                for (let y = 0; y < 3; y++) {
                    let elemento = collum[y];
                    let posição = this.player.tabuleiro[x][y]
                    if (e.target == elemento && posição == "") {
                        this.player.posicionar_dado(x, y)

                        this.ciclo_de_jogo(x, y)
                    }
                }
            }
        }
    }
}

function setar_click() {
    let tabuleiro = document.getElementById('tab_player')
    let rows = tabuleiro.children
    for (let x = 0; x < rows.length; x++) {
        let collum = rows[x].children

        for (let y = 0; y < collum.length; y++) {
            let elemento = collum[y];
            if (collum[y].tagName == 'TD') {
                let jogo = Jogo(player, bot)
                elemento.addEventListener("click", (e) => {
                    jogo.pega_posições(e)
                }
                );
            }
        }
    }
}
setar_click()
player.jogar_dado()
bot.jogar_dado()
atualizar_tela(player)
atualizar_tela(bot)