/********************************************************************
 * Painel da Frota do CBMMG
 * tabela.js
 * Versão 2.0
 *
 * Responsável apenas pela tabela da frota.
 ********************************************************************/

"use strict";

//==================================================
// DataTable
//==================================================

let tabelaFrota = null;


//==================================================
// Inicialização
//==================================================

function inicializarTabela(){

    tabelaFrota = $("#tabelaFrota").DataTable({

        destroy:true,

        pageLength:25,

        searching:false,

        ordering:true,

        info:true,

        lengthChange:false,

        autoWidth:false,

        responsive:true,

        language:{

            url:"https://cdn.datatables.net/plug-ins/1.13.8/i18n/pt-BR.json"

        },

        columns:[

            {

                title:"Placa",

                data:"placa"

            },

            {

                title:"Prefixo",

                data:"prefixo"

            },

            {

                title:"Comando",

                data:"comando"

            },

            {

                title:"Unid. Veículo",

                data:"nomeUnidade"

            },

            {

                title:"Subclasse",

                data:"subclasse"

            },

            {

                title:"Situação",

                data:"situacao"

            },

            {

                title:"Ano Fabr.",

                data:"ano"

            },

            {

                title:"Hodômetro",

                data:"hodometro",

                render:function(valor){

                    return inteiro(valor) + " km";

                }

            }

        ]

    });

}


//==================================================
// Atualiza uma linha
//==================================================

function atualizarLinha(indice,registro){

    if(!tabelaFrota)

        return;

    tabelaFrota

        .row(indice)

        .data(registro)

        .draw(false);

}


//==================================================
// Limpa tabela
//==================================================

function limparTabela(){

    if(!tabelaFrota)

        return;

    tabelaFrota.clear().draw();

}


//==================================================
// Quantidade de registros
//==================================================

function totalRegistrosTabela(){

    if(!tabelaFrota)

        return 0;

    return tabelaFrota.rows().count();

}


//==================================================
// Registro selecionado
//==================================================

function registroSelecionado(){

    const linha =

        tabelaFrota

        .row(".selected")

        .data();

    return linha ?? null;

}


//==================================================
// Destaca linha selecionada
//==================================================

$("#tabelaFrota tbody").on(

    "click",

    "tr",

    function(){

        $("#tabelaFrota tbody tr")

            .removeClass("selected");

        $(this)

            .addClass("selected");

        const registro =

            tabelaFrota

                .row(this)

                .data();

        if(registro){

            abrirModal(registro);

        }

    }

);

//==================================================
// Atualiza após filtros
//==================================================

function atualizarTabela(dados){

    if(!tabelaFrota)

        return;

    tabelaFrota.clear();

    tabelaFrota.rows.add(

        dados

    );

    tabelaFrota.draw(false);

}
