/**
 * User: carlos_andonaegui
 * Date: 8/1/13
 */



var correctCards = 0;
$( init );

function init() {

    // Hide the success message
    $('#successMessage').hide();
    $('#successMessage').css( {
        left: '580px',
        top: '250px',
        width: 0,
        height: 0
    } );

    // Reset the game
    correctCards = 0;
    $('#cardPile').html( '' );
    $('#cardSlots').html( '' );

    // Create the pile of shuffled cards
    var numbers = [ 1, 2, 3, 4];
    var words = ['Sandwitch de atun', 'Torta de pollo', 'Ensalada de brocoli papa y jamon', 'Ensalada de papa']
    numbers.sort( function() { return Math.random() - .5 } );
    console.log(numbers);

    for ( var i=0; i<4; i++ ) {
        $('<div><img width="100" height="100" src=\"../img/refrigerios/' + numbers[i] + '.png\"></div>').data( 'number', numbers[i] ).attr( 'id', 'card'+numbers[i] ).appendTo( '#cardPile' ).draggable( {
            containment: '#content',
            stack: '#cardPile div',
            cursor: 'move',
            revert: true
        } );
    }

    // Create the card slots
    var minerales = ['Sandwitch de atun', 'Torta de pollo', 'Ensalada de brocoli papa y jamon', 'Ensalada de papa']
    for ( var i=1; i<=4; i++ ) {
        $('<div>' + words[i-1] + '</div>').data( 'number', i ).appendTo( '#cardSlots' ).droppable( {
            accept: '#cardPile div',
            hoverClass: 'hovered',
            drop: handleCardDrop
        } );
    }

}

function handleCardDrop( event, ui ) {
    var slotNumber = $(this).data( 'number' );
    var cardNumber = ui.draggable.data( 'number' );

    // If the card was dropped to the correct slot,
    // change the card colour, position it directly
    // on top of the slot, and prevent it being dragged
    // again

    if ( slotNumber == cardNumber ) {
        ui.draggable.addClass( 'correct' );
        ui.draggable.draggable( 'disable' );
        $(this).droppable( 'disable' );
        ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
        ui.draggable.draggable( 'option', 'revert', false );
        $(this).html("");
        correctCards++;
    }

    // If all the cards have been placed correctly then display a message
    // and reset the cards for another go

    if ( correctCards == 4 ) {
        $('#successMessage').show();
        $('#successMessage').animate( {
            left: '380px',
            top: '200px',
            width: '400px',
            height: '150px',
            opacity: 1
        } );
    }

}

