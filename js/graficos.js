/********************************************************************
 * Painel da Frota do CBMMG
 * graficos.js
 * Versão 2.0
 *
 * Responsável apenas pelos gráficos.
 *
 * Gráficos:
 * • Situação da Frota
 * • Subclasses (Top 15)
 ********************************************************************/

"use strict";

//==================================================
// Objetos Chart.js
//==================================================

let graficoSituacao = null;

let graficoSubclasse = null;


//==================================================
// Inicialização
//==================================================

function inicializarGraficos(){

    criarGraficoSituacao();

    criarGraficoSubclasse();

}


//==================================================
// Atualiza todos os gráficos
//==================================================

function atualizarGraficos(dados){

    atualizarGraficoSituacao(dados);

    atualizarGraficoSubclasse(dados);

}


//==================================================
// Cria gráfico Situação
//==================================================

function criarGraficoSituacao(){

    const canvas = document.getElementById(

        "graficoSituacao"

    );

    if(!canvas)

        return;

    graficoSituacao = new Chart(

        canvas,

        {

            type:"pie",

            data:{

                labels:[

                    "Disponíveis",

                    "Em Manutenção",

                    "Processo de Descarga"

                ],

                datasets:[{

                    data:[0,0,0]

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                plugins:{

                    legend:{

                        position:"bottom"

                    }

                }

            }

        }

    );

}


//==================================================
// Atualiza gráfico Situação
//==================================================

function atualizarGraficoSituacao(dados){

    if(!graficoSituacao)

        return;

    const disponiveis = dados.filter(function(v){

        return v.situacao===SITUACAO.DISPONIVEL;

    }).length;


    const manutencao = dados.filter(function(v){

        return v.situacao===SITUACAO.MANUTENCAO;

    }).length;


    const descarga = dados.filter(function(v){

        return v.situacao===SITUACAO.DESCARGA;

    }).length;


    graficoSituacao.data.datasets[0].data=[

        disponiveis,

        manutencao,

        descarga

    ];

    graficoSituacao.update();

}

//==================================================
// Cria gráfico Subclasses
//==================================================

function criarGraficoSubclasse(){

    const canvas = document.getElementById(

        "graficoSubclasse"

    );

    if(!canvas)

        return;

    graficoSubclasse = new Chart(

        canvas,

        {

            type:"bar",

            data:{

                labels:[],

                datasets:[{

                    label:"Quantidade",

                    data:[]

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                indexAxis:"y",

                plugins:{

                    legend:{

                        display:false

                    }

                },

                scales:{

                    x:{

                        beginAtZero:true,

                        ticks:{

                            precision:0

                        }

                    },

                    y:{

                        ticks:{

                            font:{

                                size:10

                            }

                        }

                    }

                }

            }

        }

    );

}


//==================================================
// Atualiza gráfico Subclasses
//==================================================

function atualizarGraficoSubclasse(dados){

    if(!graficoSubclasse)

        return;

    const agrupado = agrupar(

        dados,

        "subclasse"

    );

    const lista = Object.entries(

        agrupado

    )

    .map(function(item){

        return{

            nome:item[0],

            quantidade:item[1]

        };

    })

    .sort(function(a,b){

        return b.quantidade-a.quantidade;

    })

    .slice(0,15);


    graficoSubclasse.data.labels =

        lista.map(function(item){

            return item.nome;

        });


    graficoSubclasse.data.datasets[0].data =

        lista.map(function(item){

            return item.quantidade;

        });


    graficoSubclasse.update();

}
