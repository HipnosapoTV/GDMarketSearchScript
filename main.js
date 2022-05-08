// ==UserScript==
// @name         GDMarket
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Script con mejoras para buscar en el market
// @author       Hipnosapo
// @match        https://galaxydust.io/publicalpha/game.php?page=market
// @icon         https://www.google.com/s2/favicons?sz=64&domain=galaxydust.io
// @grant        none
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

(function() {
    'use strict';

    var divOpciones = '<div class="gray_flettab" style="width: 100%; height: 75px;" id="hpnOpciones">' +
                            '<div style="width: 157px; position: relative; float: left;">' +
                                '<div style="width: 100%; position: relative;">Mostrar/Ocultar</div>' +
                                '<div style="width: 100%; position: relative;"><input type="checkbox" id="hpnChkMetal" checked>Metal</input></div>' +
                                '<div style="width: 100%; position: relative;"><input type="checkbox" id="hpnChkCristal" checked>Cristal</input></div>' +
                            '</div>' +
                            '<div style="width: 300px; position: relative; float: left;">' +
                                '<div style="width: 100%; position: relative;">Filtrar ofertas menores o iguales de (P. Unitario):</div>' +
                                '<div style="width: 100%; position: relative;"><input id="hpnPU" type="number" step="any"></input></div>' +
                                '<div style="width: 100%; position: relative;"><button id="hpnBtnPU" class="button_red">Filtrar</input></div>' +
                            '</div>' +
                        '</div>';
    $('#market_1').prepend(divOpciones);

    $('#market_1').on('click', '#hpnChkMetal', function () {
        hide();
    });

    $('#market_1').on('click', '#hpnChkCristal', function () {
        hide();    });

    $('#market_1').on('click', '#hpnBtnPU', function () {
        hide();    });

    function hide() {
        var value = $("#hpnPU").val();
        $('.build_box').show();
        hidematerial(value);
    }

    function hidematerial(price) {
        $('.market_name_utits').each(function() {
            var text = $(this).text();

            var quantity = text.split(' ')[0];
            var material = text.split(' ')[1];

            if (material.toLowerCase().startsWith("metal"))
            {
                if (!$("#hpnChkMetal").is(":checked"))
                    $(this).parent().parent().hide();
            }

            if (material.toLowerCase().startsWith("crystal"))
            {
                if (!$("#hpnChkCristal").is(":checked"))
                    $(this).parent().parent().hide();
            }

            if (price != "") {
                var value = $(this).find("#hpnUPValue").text();
                if (parseFloat(price) < parseFloat(value)) {
                    $(this).parent().parent().hide();
                }
            }
        });
    }

    $('.market_name_utits').each(function() {
        var text = $(this).text();
        var quantity = text.split(' ')[0];
        var material = text.split(' ')[1];
        var button = $(this).siblings('.market_button').text();
        var price = button.split(' ')[0];
        var unitPrice = price / quantity;
        var spanUnitPrice = '<span style="color:white">P. unit.: </span><span style="color:white" id="hpnUPValue">' + unitPrice.toFixed(2) + '</span>';
        $(this).append(spanUnitPrice);
    });

})();
