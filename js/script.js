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

                // setting the coordinates of the ui/tile object

                // console.log("$(this).offset().left/$(this).offset().top:", $(this).offset().left, $(this).offset().top);
                // console.log("ui.offset.left/ui.offset.top:", ui.offset.left, ui.offset.top);
                // // Source - https://stackoverflow.com/a/34247600
                // // Posted by julian soro, modified by community. See post 'Timeline' for change history
                // // Retrieved 2026-06-20, License - CC BY-SA 3.0
                // // let drop_x = $(this).offset().left - ui.offset.left;
                // // let drop_y = $(this).offset().top - ui.offset.top;
                // let drop_x = $(this).offset().left;
                // let drop_y = $(this).offset().top;
                // console.log("drop_x'drop_y", drop_x, drop_y);
                // ui.draggable.css('position', "absolute");
                // ui.draggable.css('top', drop_y-10+'px');  // y-axis
                // ui.draggable.css('left', drop_x+'px'); // x-axis

                // appending ui/tile to the space to center it into the space

                console.log("$(this): ", $(this));
                console.log("this: ", this);
                console.log("$(this).offset()", $(this).offset());
                console.log("$(ui): ", $(ui));
                console.log("ui: ", ui);
                console.log("$(ui.draggable): ", $(ui.draggable));
                console.log("ui.draggable: ", ui.draggable);
                console.log("$(ui.helper): ", $(ui.helper));
                console.log("ui.helper: ", ui.helper);

                console.log("Before append ui.draggable.offset(): ", ui.draggable.offset());

                // TO-DO: function that checks if ok to drop the tile
                //          check if space is open
                //          check if first tile being dropped (true: logic stops, false:)
                //              then check if space to the left has a tile
                //          edge cases
                $(this).append(ui.draggable);
                console.log("$(this).offset()", $(this).offset());
                console.log("After append ui.draggable.offset(): ", ui.draggable.offset());
                let spacePos = $(this).offset();
                console.log("spacePos", spacePos);
                spacePos.top = spacePos.top + 3;
                spacePos.left = spacePos.left + 3;
                console.log("spacePos", spacePos);
                ui.draggable.offset(spacePos);
                console.log("After setting ui.draggable.offset(): ", ui.draggable.offset());

                // $(ui.draggable).appendTo(this);
                // let spacePos = $(this).offset;
                // $(ui.draggable).offset({top: spacePos.top, left: spacePos.left});
                // css({ position: "absolute", left: 0, top: 0} );
                // console.log("$(this): ", $(this));
                // ui.draggable.css('position', "relative");
                // ui.draggable.css('top', 0);  // y-axis
                // ui.draggable.css('left', 0); // x-axis

                // making the tile not moveable after being dropped
                ui.draggable.draggable("disable");


            },
            tolerance: "intersect", // if tile is at least 50% over the space it is dropped
            accept: function() { // only one tile per space, TO-DO: move this to drop
                return ($(this).children().length === 0)
            }
        });
        spaceID = spaceID + 1;
        return $space;
    }

    // calling createSpace, assinging special spaces
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
    const tile_array = []; // array of tiles and their types
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

    pieces_array = []; // array holding actual letter characters

    // const array = ["a", "b", "c"];

    // array.forEach((item) => console.log("Item= ", item));

    // console.log("ScrabbleTiles: ", ScrabbleTiles);
    // console.log("ScrabbleTiles: ", ScrabbleTiles['A']['original-distribution']);
    

    // ScrabbleTiles.forEach((item) => console.log("Item= ", item));

    // populate pieces_array
    let letter;
    let offset = 0;
    for (letter in ScrabbleTiles) {
        // console.log("Letter: ", letter);
        // console.log("Number-remaining: ", ScrabbleTiles[letter]['number-remaining'])
        for (let k = 0; k < ScrabbleTiles[letter]['number-remaining']; k++) {
            pieces_array[offset + k] = letter;
        }
        offset += ScrabbleTiles[letter]['number-remaining'];
    }

    // console.log("pieces_array: ", pieces_array);

    // for random number generator
    let min = 0;
    let max = pieces_array.length - 1;
    // console.log("Min/max: ", min, max);


    // creates a tile div, assigns attributes
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
        // console.log("tile_letter: ", tile_letter);
        // console.log("pieces_array[index]: ", pieces_array[index]);
        if (!(tile_letter == "_")) { // blank image
            $tile.css("background-image", "url('./graphics_data/graphics_data/Scrabble_Tiles/Scrabble_Tile_"+tile_letter+".jpg')");
            // console.log("Should not be blank");
            // console.log("url('./graphics_data/graphics_data/Scrabble_Tiles/Scrabble_Tile_'"+tile_letter+"'.jpg')");
        } else { // letter image
            $tile.css("background-image", "url('./graphics_data/graphics_data/Scrabble_Tiles/Scrabble_Tile_Blank.jpg')");
            console.log("Should be blank");
        }
        pieces_array.splice(index, 1); // remove letter from pieces_array
        tileID = tileID + 1; // increment tileID number
        $tile.attr("letter", tile_letter); // add letter attribute
        return $tile // return the tile jq variables
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

    // create submit button
    $("#submit").button();

    // jquery var for submit button
    let $submit = $("#submit");

    // console.log("board_array: ", board_array);
    // board_array.forEach(function(i) {
    //     console.log("board_array element: ", i);
    // });

    // while (true) {
    //     $("#score:last-child").text(calculateScore);
    // }

    // a tile is placed into a space 
    // $("#board > *").on("drop", function(event, ui) {
    //     console.log("A tile was palced on the board! Calculating potential score...");
    //     $("#potential-score").text("Current Word Score: " + calculateScore().toString());
    // });



    // submit button is clicked
    $submit.click(function() {
        // console.log("submit button was clicked");
        console.log('$("#score")', $("#score"));
        calculateScore();
        $("#score").text("Score: " + calculateScore().toString());
    });

    function calculateScore() {
        let totalScore = 0;
        let dwScore = false;
        let dlScore = false;
        let dlScore_letter_score = 0;
        board_array.forEach(function(i) {
            // console.log("board_array element: ", i);
            // console.log("array_board[i].children().length", i.children().length);
            if (!(i.children().length === 0)) {
                // return i.css("background-image");
                // console.log("board_array element: ", i);
                console.log("board_array element children: ", i.children());
                // console.log("board_array element children attribute letter: ", i.children().attr("letter"));
                // console.log("board_array element class: ", i.attr("class"));
                let letter = i.children().attr("letter").toString();
                if (i.hasClass("double-word")) {
                    console.log("double word!");
                    dwScore = true;
                    console.log("dwScore: ", dwScore);
                }
                if (i.hasClass("double-letter")) {
                    console.log("double letter!");
                    dlScore = true;
                    console.log("dlScore: ", dlScore);
                    dlScore_letter_score = Number(ScrabbleTiles[letter].value) * 2;
                    console.log("dlScore_letter_score", dlScore_letter_score);
                }
                if (dlScore) {
                    console.log("Setting score with dlScore...");
                    totalScore += dlScore_letter_score;
                    console.log("totalScore: ", totalScore);
                    dlScore = false; // reset varable
                    console.log("dlScore: ", dlScore);
                } else {
                    console.log("Setting score...");
                    totalScore += Number(ScrabbleTiles[letter].value);
                    console.log("totalScore: ", totalScore);
                }
            }
        });

        if (dwScore) {
            console.log("There was a double word!");
            totalScore *= 2;
        }

        console.log("Final totalScore:", totalScore);
        return totalScore;

    }

});
