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
    var numbers = [ 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3 ];
    var imgsGreen = ['jitomate', 'kiwi', 'lechuga', 'mango', 'manzana', 'zanahoria'];
    var imgsRed = ['carne', 'pescado', 'pollo', 'nuez', 'frijoles', 'cacahuate'];
    var imgsYellow = ['papa', 'pan', 'cuernito', 'granos'];
    numbers.sort(function () {
        return Math.random() - .5
    });

    var id;
    var img = '';
    var green = 0;
    var red = 0;
    var yellow = 0;

    for (var i = 0; i < 12; i++) {
        if (numbers[i] == 1) {
            id = 'green';
            img = imgsGreen[green];
            green++;
        } else if (numbers[i] == 2) {
            id = 'red';
            img = imgsRed[red];
            red++;
        } else if (numbers[i] == 3) {
            id = 'yellow';
            img = imgsYellow[yellow];
            yellow++;
        }
        $('<div><img src="../img/iconos/' + img + '.png"/></div>').data('number', numbers[i]).attr('id', id).appendTo('#cardPile').draggable({
//            $('<div id="' + id + '" class="correct"><img src="../img/iconos/' + img + '.png"/></div>').data('number', numbers[i]).attr('id', id).appendTo('#cardPile').draggable({
            containment: '#content',
            stack: '#cardPile div',
            cursor: 'move',
            revert: true
        });
    }

    // Create the card slots
    var words = [ 'verde', 'rojo', 'amarillo' ];
    for (var j = 1; j <= 4; j++) {
        for (var i = 1; i <= 3; i++) {
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

    if (correctCards == 12) {
        $('#successMessage').show();
        $('#successMessage').animate({
//            left: '380px',
//            top: '200px',
            width: '400px',
            height: '100px',
            opacity: 1
        });
    }

}