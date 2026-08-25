/********************************************************************
 * Painel da Frota do CBMMG
 * graficos.js
 * Versão 2.0
 *
 * Responsável apenas pelos gráficos.
 *
 * Gráficos:
 * • Disponibilidade por Comando
 ********************************************************************/

"use strict";

//==================================================
// Objetos Chart.js
//==================================================

let graficoSubclasse = null;


//==================================================
// Inicialização
//==================================================

function inicializarGraficos(){

    criarGraficoSubclasse();

}


//==================================================
// Atualiza todos os gráficos
//==================================================

function atualizarGraficos(dados){

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
// Disponibilidade operacional em tempo real
//------------------------------------------------

const disponibilidadeMedia = calcularDisponibilidade(dados);
    

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

    data:[],

    backgroundColor:[
        "#0057A8", // Azul CBMMG
        "#198754", // Verde
        "#FFC107", // Amarelo
        "#DC3545", // Vermelho
        "#6F42C1", // Roxo
        "#0DCAF0", // Azul claro
        "#FD7E14", // Laranja
        "#20C997", // Verde água
        "#6C757D", // Cinza
        "#343A40"  // Cinza escuro
    ],

    borderWidth:1

}]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                indexAxis:"x",

                plugins:{

                    legend:{

                        display:false

                    }

                },

                scales:{

                    y:{
                        beginAtZero:true,
                        ticks:{
                                precision:0
                               }
                        },

                   x:{
                        ticks:{
                            autoSkip:false,
                            maxRotation:0,
                            minRotation:0,
                            font:{
                                size:11
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

    //------------------------------------------------
    // Agrupa por Comando
    //------------------------------------------------

    const comandos = {};

    dados.forEach(function(v){

    // Veículos em processo de descarga
    // não participam do cálculo de disponibilidade

    if(v.situacao === SITUACAO.DESCARGA)
        return;


    if(!comandos[v.comando]){

        comandos[v.comando]={

            total:0,

            disponiveis:0

        };

    }

    comandos[v.comando].total++;

    if(v.situacao === SITUACAO.DISPONIVEL){

        comandos[v.comando].disponiveis++;

    }

});

    //------------------------------------------------
    // Calcula disponibilidade
    //------------------------------------------------

   const lista = Object.entries(comandos)

    .filter(function(item){

    return item[0]
        && item[0] !== "CÓD UNID. VEÍCULO NÃO CADASTRADA"
        && item[0] !== "NÃO INFORMADO";

})

    .map(function(item){

        return{

            comando:item[0],

            disponibilidade:

                (item[1].disponiveis /

                 item[1].total) *100

        };

    })

    .sort(function(a,b){

        return b.disponibilidade-a.disponibilidade;

    });

    //------------------------------------------------
    // Atualiza gráfico
    //------------------------------------------------

    graficoSubclasse.data.labels =

        lista.map(v=>v.comando);

    graficoSubclasse.data.datasets[0].label =

        "Disponibilidade (%)";

    //------------------------------------------------
// Atualiza valores
//------------------------------------------------

graficoSubclasse.data.datasets[0].data =

    lista.map(function(v){

        return Number(v.disponibilidade.toFixed(2));

    });


//------------------------------------------------
// Define as cores conforme a disponibilidade
//------------------------------------------------

graficoSubclasse.data.datasets[0].backgroundColor =

    lista.map(function(v){

        if(v.disponibilidade >= 85){

            return "#198754"; // Verde

        }

        if(v.disponibilidade >= 70){

            return "#ffc107"; // Amarelo

        }

        return "#dc3545"; // Vermelho

    });


//------------------------------------------------
// Remove bordas das barras
//------------------------------------------------

graficoSubclasse.data.datasets[0].borderWidth = 0;


//------------------------------------------------
// Atualiza gráfico
//------------------------------------------------

graficoSubclasse.update();

}
