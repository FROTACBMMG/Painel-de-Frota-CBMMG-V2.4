/********************************************************************
 * Painel da Frota do CBMMG
 * dados.js
 * Versão 2.0
 *
 * Responsabilidade:
 * - Ler a Carta de Situação
 * - Descobrir automaticamente as colunas
 * - Converter cada linha em objeto JavaScript
 ********************************************************************/

"use strict";

//======================================================
// Mapa das colunas da planilha
//======================================================

let MAPA_COLUNAS = {};

//======================================================
// Carrega a Carta de Situação
//======================================================

async function carregarDados() {

    log("Conectando ao Google Sheets...");

    const resposta = await fetch(CONFIG.URL_CSV);

    if (!resposta.ok) {

        throw new Error(
            "Não foi possível acessar o Google Sheets."
        );

    }

    const csv = await resposta.text();

    const workbook = XLSX.read(csv, {

        type: "string"

    });

    const planilha = workbook.Sheets[
        workbook.SheetNames[0]
    ];

    const registros = XLSX.utils.sheet_to_json(

        planilha,

        {

            raw: false,

            defval: ""

        }

    );

    if (registros.length === 0) {

        throw new Error(

            "Carta de Situação vazia."

        );

    }

    criarMapaColunas(

        Object.keys(registros[0])

    );

    console.table(MAPA_COLUNAS);

    return registros.map(

        prepararRegistro

    );

}

//======================================================
// Descobre automaticamente as colunas
//======================================================

function criarMapaColunas(colunas) {

    MAPA_COLUNAS = {};

    colunas.forEach(function (coluna) {

        const nome = removerAcentos(coluna)

            .toUpperCase()

            .trim();

        //--------------------------------------------------

        if (nome === "PLACA")

            MAPA_COLUNAS.placa = coluna;

        //--------------------------------------------------

        else if (nome.includes("PREFIXO"))

            MAPA_COLUNAS.prefixo = coluna;

        //--------------------------------------------------

        else if (nome.includes("SUBCLASSE"))

            MAPA_COLUNAS.subclasse = coluna;

        //--------------------------------------------------

        else if (nome === "COMANDO")

            MAPA_COLUNAS.comando = coluna;

        //--------------------------------------------------

        else if (nome.includes("UNIDADE PRINCIPAL"))

    		MAPA_COLUNAS.unidadePrincipal = coluna;

		else if (nome.includes("NOME UNID"))

   			 MAPA_COLUNAS.nomeUnidade = coluna;

        //--------------------------------------------------

        else if (

            nome === "SITUACAO" ||

            nome === "SITUAÇÃO"

        )

            MAPA_COLUNAS.situacao = coluna;

        //--------------------------------------------------

        else if (nome.includes("COMBUST"))

            MAPA_COLUNAS.combustivel = coluna;

        //--------------------------------------------------

        else if (nome.includes("HOD"))

            MAPA_COLUNAS.hodometro = coluna;

        //--------------------------------------------------

        else if (nome.includes("INDICE DE DISPON"))

            MAPA_COLUNAS.indiceDisponibilidade = coluna;

        //--------------------------------------------------

        else if (nome.includes("VALOR VENAL"))

            MAPA_COLUNAS.valorVenal = coluna;

        //--------------------------------------------------

        else if (nome.includes("ANO FABR"))

            MAPA_COLUNAS.ano = coluna;

        //--------------------------------------------------

        else if (

            nome.includes("MARCA") &&

            !nome.includes("MODELO")

        )

            MAPA_COLUNAS.marca = coluna;

        //--------------------------------------------------

        else if (nome.includes("MARCA / MODELO"))

            MAPA_COLUNAS.marcaModelo = coluna;

        //--------------------------------------------------

        else if (nome.includes("MODELO/ANO"))

            MAPA_COLUNAS.modeloAno = coluna;

    });

}

//======================================================
// Converte um registro da planilha
//======================================================

function prepararRegistro(registro) {

    let marca = "";

    let modelo = "";

    //--------------------------------------------------

    if (MAPA_COLUNAS.marcaModelo) {

        const partes = limparTexto(

            registro[MAPA_COLUNAS.marcaModelo]

        ).split("/");

        marca = partes[0] || "";

        modelo = partes.slice(1).join("/");

    }

    //--------------------------------------------------

    return {

        prefixo:

            limparTexto(

                registro[MAPA_COLUNAS.prefixo]

            ),

        placa:

            limparTexto(

                registro[MAPA_COLUNAS.placa]

            ),

        comando:

            limparTexto(

                registro[MAPA_COLUNAS.comando]

            ),

	nomeUnidade:

   		limparTexto(

       		 registro[MAPA_COLUNAS.nomeUnidade]

   		 ),

        unidadePrincipal:

            limparTexto(

                registro[MAPA_COLUNAS.unidadePrincipal]

            ),

        subclasse:

            limparTexto(

                registro[MAPA_COLUNAS.subclasse]

            ),

        situacao:

            limparTexto(

                registro[MAPA_COLUNAS.situacao]

            ),

        combustivel:

            limparTexto(

                registro[MAPA_COLUNAS.combustivel]

            ),

        marca:

            limparTexto(

                marca

            ),

        modelo:

            limparTexto(

                modelo

            ),

        ano:

            paraNumero(

                registro[MAPA_COLUNAS.ano]

            ),

        hodometro:

            paraNumero(

                registro[MAPA_COLUNAS.hodometro]

            ),

        indiceDisponibilidade:

            paraNumero(

                registro[MAPA_COLUNAS.indiceDisponibilidade]

            ),

        valorVenal:

            paraNumero(

                registro[MAPA_COLUNAS.valorVenal]

            ),

        idade:

            idadeVeiculo(

                registro[MAPA_COLUNAS.ano]

            ),

        registroOriginal:

            registro

    };

}

//======================================================
// Retorna o mapa das colunas
//======================================================

function obterMapaColunas() {

    return {

        ...MAPA_COLUNAS

    };

}
