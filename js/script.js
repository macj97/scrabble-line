/**
 * File: script.css
 * GUI Assignment: HW5 - Implementing a bit of Scrabble with drag-and-drop
 * Description: JavaScript file for Assignment 5
 * Joe Plummer, UMass Lowell Computer Science, joseph_plummer@student.uml.edu
 * Copyright (c) 2026 by Joe Plummer. All rights reserved. May be freely copied or excerpted for educational purposes with credit to the author.
 */

$(function() { // jQuery ready function

    // create board spaces

    let spaceID = 0; // counter for spaceID creation
    let numSpaces = 15; // counter for space creation
    const board_array = []; // array of spaces and their types
    let $board = $("#board"); // actual board div

    function createSpace() {
        let $space = $("<div></div>");
        $space.attr("id", "droppable"+spaceID);
        $space.attr("class", "spaces");
        $space.droppable({
            drop: function(event, ui) {
                console.log(event + " item has been dropped");
                console.log("$(this).offset().left/$(this).offset().top:", $(this).offset().left, $(this).offset().top);
                console.log("ui.offset.left/ui.offset.top:", ui.offset.left, ui.offset.top);
                // Source - https://stackoverflow.com/a/34247600
                // Posted by julian soro, modified by community. See post 'Timeline' for change history
                // Retrieved 2026-06-20, License - CC BY-SA 3.0
                // let drop_x = $(this).offset().left - ui.offset.left;
                // let drop_y = $(this).offset().top - ui.offset.top;
                let drop_x = $(this).offset().left;
                let drop_y = $(this).offset().top;
                console.log("drop_x'drop_y", drop_x, drop_y);
                ui.draggable.css('top', drop_y+'px');  // y-axis
                ui.draggable.css('left', drop_x+'px'); // x-axis

            },
            tolerance: "intersect"
        });
        spaceID = spaceID + 1;
        return $space;
    }

    for (let j = 0; j < numSpaces; j++) {
        let $newSpace = createSpace();
        if (j === 2 || j === 12) {
            $newSpace.addClass("double-word");
            $newSpace.text("DOUBLE WORD SCORE");
        } else if (j === 6 || j === 8) {
            $newSpace.addClass("double-letter");
            $newSpace.text("DOUBLE LETTER SCORE");
        } else {
            $newSpace.addClass("blank");
        }
        $board.append($newSpace);
        board_array[j] = $newSpace;
    }

    

    

    // $("#droppable").droppable({
    //     drop: function() {
    //         console.log("item has been dropped");
    //         alert("item has been dropped");
    //         // $(this).addClass("ui-state-highlight")
    //         //         .find("p")
    //         //         .html("Dropped!");
                    
    //     }
    // });
    // $("#droppable1").droppable({
    //     drop: function() {
    //         console.log("item has been dropped");
    //         alert("item has been dropped");
    //     }
    // });
    // $("#droppable2").droppable({
    //     drop: function() {
    //         console.log("item has been dropped");
    //         alert("item has been dropped");
    //     }
    // });
    // $("#droppable3").droppable({
    //     drop: function() {
    //         console.log("item has been dropped");
    //         alert("item has been dropped");
    //     }
    // });
    // $("#droppable4").droppable({
    //     drop: function() {
    //         console.log("item has been dropped");
    //         alert("item has been dropped");
    //     }
    // });
    // $("#droppable5").droppable({
    //     drop: function() {
    //         console.log("item has been dropped");
    //         alert("item has been dropped");
    //     }
    // });
    // $("#droppable6").droppable({
    //     drop: function() {
    //         console.log("item has been dropped");
    //         alert("item has been dropped");
    //     }
    // });

    

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }


    // create tiles
    
    let tileID = 0; // counter for tileID creation
    let numTiles = 7; // counter for tile creation
    const tile_array = []; // array of spaces and their types
    let $tile_rack = $("#tile-rack"); // actual tile-rack div

    // trying to use the json file:

    // let pieces_json = null;
    // // Load file content into variable
    // $.getJSON("./graphics_data/graphics_data/pieces.json", function(data) {
    //     pieces_json = data; // Store file content in variable
    //     console.log("JSON loaded:", pieces_json);
    //     console.log("Pieces from JSON:", pieces_json.pieces);
    //     console.log("Pieces from JSON:", pieces_json.pieces[0].letter);
    //     console.log("Pieces from JSON:", pieces_json.pieces[0].amount);
    //     console.log("Pieces from JSON:", pieces_json.pieces[0].value);
    // }).fail(function (jqxhr, textStatus, error) {
    //     console.error("Error loading JSON:", textStatus, error);
    // }); 

    // console.log("pieces_json:", pieces_json);

    // let pj = JSON.stringify(pieces_json);
    // console.log("pj: ", pj);

    // console.log("Pieces from JSON:", pieces_json.pieces);
    // console.log("Pieces from JSON:", pieces_json.pieces[0].letter);
    // console.log("Pieces from JSON:", pieces_json.pieces[0].amount);
    // console.log("Pieces from JSON:", pieces_json.pieces[0].value);

    // using Scrabble_Pieces JS file:

    pieces_array = [];

    const array = ["a", "b", "c"];

    array.forEach((item) => console.log("Item= ", item));

    // console.log("ScrabbleTiles: ", ScrabbleTiles);
    console.log("ScrabbleTiles: ", ScrabbleTiles['A']['original-distribution']);
    

    // ScrabbleTiles.forEach((item) => console.log("Item= ", item));

    let letter;
    let offset = 0;
    for (letter in ScrabbleTiles) {
        console.log("Letter: ", letter);
        console.log("Number-remaining: ", ScrabbleTiles[letter]['number-remaining'])
        for (let k = 0; k < ScrabbleTiles[letter]['number-remaining']; k++) {
            pieces_array[offset + k] = letter;
        }
        offset += ScrabbleTiles[letter]['number-remaining'];
    }

    console.log("pieces_array: ", pieces_array);

    // for random number generator
    let min = 0;
    let max = pieces_array.length - 1;
    console.log("Min/max: ", min, max);


    function createTile() {
        // create div element
        let $tile = $("<div></div>");
        // assign attrubutes
        $tile.attr("id", "draggable"+tileID);
        $tile.attr("class", "tiles");
        $tile.draggable({ revert: "invalid" });
        // setting graphic
        let index = getRndInteger(min, max);
        max--;
        let tile_letter = pieces_array[index];
        console.log("tile_letter: ", tile_letter);
        console.log("pieces_array[index]: ", pieces_array[index]);
        if (!(tile_letter == "_")) {
            $tile.css("background-image", "url('./graphics_data/graphics_data/Scrabble_Tiles/Scrabble_Tile_"+tile_letter+".jpg')");
            console.log("Should not be blank");
            console.log("url('./graphics_data/graphics_data/Scrabble_Tiles/Scrabble_Tile_'"+tile_letter+"'.jpg')");
        } else {
            $tile.css("background-image", "url('./graphics_data/graphics_data/Scrabble_Tiles/Scrabble_Tile_Blank.jpg')");
            console.log("Should be blank");
        }
        pieces_array.splice(index, 1);
        tileID = tileID + 1;
        return $tile
    }
    
    for (let i = 0; i < numTiles; i++) {
        let $newTile = createTile();
        $tile_rack.append($newTile);
        tile_array[i] = $newTile;
    }

    // $("#draggable").draggable({ revert: "invalid" });
    // $("#draggable1").draggable({ revert: "invalid" });
    // $("#draggable2").draggable({ revert: "invalid" });
    // $("#draggable3").draggable({ revert: "invalid" });
    // $("#draggable4").draggable({ revert: "invalid" });
    // $("#draggable5").draggable({ revert: "invalid" });
    // $("#draggable6").draggable({ revert: "invalid" });



});
