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
    var numbers = [ 1, 2, 3, 4, 5, 6, 7, 8 ];

    numbers.sort( function() { return Math.random() - .5 } );
    console.log(numbers);

    for ( var i=0; i<8; i++ ) {
        $('<div><img width="120" height="120" src=\"../img/arrastra/' + numbers[i] + '.png\"></div>').data( 'number', numbers[i] ).attr( 'id', 'card'+numbers[i] ).appendTo( '#cardPile' ).draggable( {
            containment: '#content',
            stack: '#cardPile div',
            cursor: 'move',
            revert: true
        } );
    }

    // Create the card slots
    var words = ['calcio', 'f&oacute;sforo', 'potasio', 'sodio', 'hierro', 'yodo', 'fl&uacute;or', 'zinc'];
    var minerales = [
        'Fortalece huesos y dientes.',
        'Te ayuda a la contracción muscular.',
        'Ayuda para tu crecimiento normal y actividad eléctrica del corazón.',
        'Control de presión arterial y volumen sanguíneo.',
        'Permite la formación de glóbulos rojos.',
        'Apoya el crecimiento y el desarrollo físico y mental.',
        'Útil para el esmalte de tus dientes.',
        'Necesario para tu piel, cabello, esqueleto.'
    ]
    for ( var i=1; i<=8; i++ ) {
        $('<div><b>' + words[i-1] + '</b> <br/> <p>' + minerales[i - 1] + '</p></div>').data( 'number', i ).appendTo( '#cardSlots' ).droppable( {
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
        correctCards++;
    }

    // If all the cards have been placed correctly then display a message
    // and reset the cards for another go

    if ( correctCards == 8 ) {
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

