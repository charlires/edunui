/**
 * User: carlos_andonaegui
 * Date: 8/1/13
 */



var correctCards = 0;
$(init);

function init() {

    // Hide the success message
    $('#successMessage').hide();
    $('#successMessage').css({
        left: '580px',
        top: '250px',
        width: 0,
        height: 0
    });

    // Reset the game
    correctCards = 0;
    $('#cardPile').html('');
    $('#cardSlots').html('');

    // Create the pile of shuffled cards
    var tooltips = ["Inicia abriendo la llave y mojando las manos",
        "Aplica Jabon",
        "Frota las palmas de las manos entre si",
        "Frota la palma de la mano derecha contra el dorso de la mano izquierda",
        "Frota las palas de las manos entre si, con los dedos entrelazados",
        "Frota el dorso de los dedos de una mano",
        "Rodeando el pulgar derecho con la palma de la mano izquierda",
        "Frota la punta de los dedos de la mano derecha contra la palma de la mano izquierda y viceversa",
        "Enjuega las manos ",
        "Secalas con una toallita de papel de un solo uso",
        "Utiliza la toalla para cerrar la llave"
    ];
    var numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ];
    numbers.sort(function () {
        return Math.random() - .5
    });
    console.log(numbers);

    for (var i = 0; i < 11; i++) {
        if ( i == 6) {
            $('<div style="margin-left: 75px;"><img data-toggle="tooltip" title="' + tooltips[numbers[i] - 1] + '" width="105" height="95" src=\"../img/lavado_manos/' + numbers[i] + '.png\"></div>').data('number', numbers[i]).attr('id', 'card' + numbers[i]).appendTo('#cardPile').draggable({
                containment: '#content',
                stack: '#cardPile div',
                cursor: 'move',
                revert: true
            });
        } else {
            $('<div><img data-toggle="tooltip" title="' + tooltips[numbers[i] - 1] + '" width="105" height="95" src=\"../img/lavado_manos/' + numbers[i] + '.png\"></div>').data('number', numbers[i]).attr('id', 'card' + numbers[i]).appendTo('#cardPile').draggable({
                containment: '#content',
                stack: '#cardPile div',
                cursor: 'move',
                revert: true
            });
        }
    }

    // Create the card slots
    var words = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
    for (var i = 1; i <= 11; i++) {
        if ( i == 7) {
            $('<div style="margin-left: 75px;">' + words[i - 1] + '</div>').data('number', i).appendTo('#cardSlots').droppable({
                accept: '#cardPile div',
                hoverClass: 'hovered',
                drop: handleCardDrop
            });
        } else {
            $('<div>' + words[i - 1] + '</div>').data('number', i).appendTo('#cardSlots').droppable({
                accept: '#cardPile div',
                hoverClass: 'hovered',
                drop: handleCardDrop
            });
        }
    }

}

function handleCardDrop(event, ui) {
    var slotNumber = $(this).data('number');
    var cardNumber = ui.draggable.data('number');

    // If the card was dropped to the correct slot,
    // change the card colour, position it directly
    // on top of the slot, and prevent it being dragged
    // again

    if (slotNumber == cardNumber) {
        ui.draggable.addClass('correct');
        ui.draggable.draggable('disable');
        $(this).droppable('disable');
        ui.draggable.position({ of: $(this), my: 'left top', at: 'left top' });
        ui.draggable.draggable('option', 'revert', false);
        correctCards++;
    }

    // If all the cards have been placed correctly then display a message
    // and reset the cards for another go

    if (correctCards == 10) {
        $('#successMessage').show();
        $('#successMessage').animate({
            left: '380px',
            top: '200px',
            width: '400px',
            height: '150px',
            opacity: 1
        });
    }

}

