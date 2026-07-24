/********************************************************************
 * Painel da Frota do CBMMG
 * modal.js
 * Versão 2.0
 *
 * Responsável pelo Modal de detalhes da viatura.
 ********************************************************************/

"use strict";

//==================================================
// Abre o modal
//==================================================

function abrirModal(registro){

    console.log(registro);

    atualizarTexto(

        "modalPlaca",

        registro.placa

    );

    atualizarTexto(

        "modalPrefixo",

        registro.prefixo

    );

    atualizarTexto(

        "modalComando",

        registro.comando

    );

    atualizarTexto(

        "modalUnidade",

        registro.nomeUnidade

    );

    atualizarTexto(

        "modalSubclasse",

        registro.subclasse

    );

    atualizarTexto(

        "modalSituacao",

        registro.situacao

    );

    atualizarTexto(

        "modalCombustivel",

        registro.combustivel

    );

    atualizarTexto(

        "modalAno",

        registro.ano

    );

    atualizarTexto(

        "modalHodometro",

        inteiro(

            registro.hodometro

        )

    ); 

    const modal = new bootstrap.Modal(

        document.getElementById(

            "modalViatura"

        )

    );

    modal.show();

}

//==================================================
// Fecha o modal
//==================================================

function fecharModal(){

    const elemento = document.getElementById(

        "modalViatura"

    );

    const modal = bootstrap.Modal.getInstance(

        elemento

    );

    if(modal)

        modal.hide();

}
