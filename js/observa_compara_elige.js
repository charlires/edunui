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
//    var numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
//    var nutritivo = ['Jitomate', 'manzana', 'carne', 'zanahoria', 'papa', 'brocoli'];
//    var chatarra = ['paleta', 'hamburgesa', 'panes', 'flan', 'refresco', 'pan dulce'];
//
//    var words = nutritivo.concat(chatarra);
//
//    numbers.sort( function() { return Math.random() - .5 } );
//    console.log(numbers);
//
//    for ( var i=0; i<12; i++ ) {
//        $('<div><img width="65" height="65" src=\"../img/observa_compara_elige/' + numbers[i] + '.png\"></div>').data( 'number', numbers[i] ).attr( 'id', 'card'+numbers[i] ).appendTo( '#cardPile' ).draggable( {
//            containment: '#content',
//            stack: '#cardPile div',
//            cursor: 'move',
//            revert: true
//        } );
//    }
//
//    // Create the card slots
////    var words = ['calcio', 'fosforo', 'potasio', 'sodio', 'hierro', 'yodo', 'fluor', 'zinc'];
//    for ( var i=1; i<=12; i++ ) {
//        if (i < 7) {
////            console.log()
//            $('<div>' + words[i-1] + '</div>').data( 'number', i ).appendTo( '#cardSlots1' ).droppable( {
//                accept: '#cardPile div',
//                hoverClass: 'hovered',
//                drop: handleCardDrop
//            });
//        } else {
//            $('<div>' + words[i-1] + '</div>').data( 'number', i ).appendTo( '#cardSlots2' ).droppable( {
//                accept: '#cardPile div',
//                hoverClass: 'hovered',
//                drop: handleCardDrop
//            } );
//        }
//
//    }

    var numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
    var nutritivo = ['Nutritivo', 'Nutritivo', 'Nutritivo', 'Nutritivo', 'Nutritivo', 'Nutritivo'];
    var chatarra = ['Chatarra', 'Chatarra', 'Chatarra', 'Chatarra', 'Chatarra', 'Chatarra'];

    var words = nutritivo.concat(chatarra);

    numbers.sort( function() { return Math.random() - .5 } );
//    console.log(numbers);

    for ( var i=0; i<12; i++ ) {
        if (numbers[i] <= 6 ) {

            $('<div><img width="65" height="65" src=\"../img/observa_compara_elige/' + numbers[i] + '.png\"></div>').data( 'number', 1 ).attr( 'id', 'card'+numbers[i] ).appendTo( '#cardPile' ).draggable( {
                containment: '#content',
                stack: '#cardPile div',
                cursor: 'move',
                revert: true
            } );
        } else {
            $('<div><img width="65" height="65" src=\"../img/observa_compara_elige/' + numbers[i] + '.png\"></div>').data( 'number', 2 ).attr( 'id', 'card'+numbers[i] ).appendTo( '#cardPile' ).draggable( {
                containment: '#content',
                stack: '#cardPile div',
                cursor: 'move',
                revert: true
            } );
        }
    }

    // Create the card slots
//    var words = ['calcio', 'fosforo', 'potasio', 'sodio', 'hierro', 'yodo', 'fluor', 'zinc'];
    for ( var i=1; i<=12; i++ ) {
        if (i < 7) {
//            console.log()
            $('<div>' + words[i-1] + '</div>').data( 'number', 1 ).appendTo( '#cardSlots1' ).droppable( {
                accept: '#cardPile div',
                hoverClass: 'hovered',
                drop: handleCardDrop
            });
        } else {
            $('<div>' + words[i-1] + '</div>').data( 'number', 2 ).appendTo( '#cardSlots2' ).droppable( {
                accept: '#cardPile div',
                hoverClass: 'hovered',
                drop: handleCardDrop
            } );
        }

    }

}

function handleCardDrop( event, ui ) {
    console.log($(this).data( 'number' ));
    console.log(ui.draggable.data( 'number' ));
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

    if ( correctCards == 12 ) {
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

