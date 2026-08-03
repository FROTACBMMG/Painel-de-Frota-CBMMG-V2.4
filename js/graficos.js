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

    const canvas = document.getElementById("graficoSituacao");

    if(!canvas)
        return;

    graficoSituacao = new Chart(canvas,{

        type:"doughnut",

        data:{

            labels:["Disponível","Indisponível"],

            datasets:[{

                data:[100,0],

                backgroundColor:[

                    "#198754",   // verde

                    "#dee2e6"    // cinza

                ],

                borderWidth:0

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            cutout:"70%",

            plugins:{

                legend:{
                    display:false
                }

            }

        },

        plugins:[{

            id:"textoCentral",

            afterDraw(chart){

                const {

                    ctx,

                    chartArea:{left,right,top,bottom}

                } = chart;

                const valor = chart.data.datasets[0].data[0];

                ctx.save();

                ctx.textAlign="center";

                ctx.textBaseline="middle";

                ctx.fillStyle="#212529";

                ctx.font="bold 28px Arial";

                ctx.fillText(

                    valor.toFixed(2)+"%",

                    (left+right)/2,

                    (top+bottom)/2-10

                );

                ctx.font="16px Arial";

                ctx.fillStyle="#6c757d";

                ctx.fillText(

                    "Disponibilidade",

                    (left+right)/2,

                    (top+bottom)/2+18

                );

                ctx.restore();

            }

        }]

    });

}


//==================================================
// Atualiza gráfico Situação
//==================================================

function atualizarGraficoSituacao(dados){

    if(!graficoSituacao)
        return;

    if(dados.length===0){

        graficoSituacao.data.datasets[0].data=[0,100];
        graficoSituacao.update();

        return;
    }

    //------------------------------------------------
    // Média da disponibilidade
    //------------------------------------------------

    const disponibilidade = calcularDisponibilidade(dados);

    //------------------------------------------------
    // Atualiza gráfico
    //------------------------------------------------

    graficoSituacao.data.datasets[0].data=[

        disponibilidadeMedia,

        100-disponibilidadeMedia

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
