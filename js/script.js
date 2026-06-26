/**
 * File: script.css
 * GUI Assignment: HW5 - Implementing a bit of Scrabble with drag-and-drop
 * Description: JavaScript file for Assignment 5
 * Joe Plummer, UMass Lowell Computer Science, joseph_plummer@student.uml.edu
 * Copyright (c) 2026 by Joe Plummer. All rights reserved. May be freely copied or excerpted for educational purposes with credit to the author.
 */

$(function() { // jQuery ready function

    // create board and spaces

    let spaceID = 0; // counter for spaceID creation
    let numSpaces = 15; // counter for space creation
    const board_array = []; // array of spaces and their types
    let $board = $("#board"); // actual board div

    createBoard();

    function createSpace() {
        let $space = $("<div></div>");
        $space.attr("id", "droppable"+spaceID);
        $space.attr("class", "spaces");
        $space.droppable({
            drop: function(event, ui) {

                console.log("$space.droppable: drop:" + " item has been dropped");
                console.log("$space.droppable: drop: $space.attr('id'): ", $(this).attr("id"));
                console.log("$space.droppable: drop: $space.children().length: ", $(this).children().length);
                let prevSPID = "droppable"+ Number($(this).attr("id").substring(9) - 1);
                console.log("prevSPID", prevSPID);
                console.log("$space.droppable: drop: prev $space.children().length: ", $("#"+prevSPID).children().length);
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

                // console.log("$(this): ", $(this));
                console.log("this: ", this);
                // console.log("$(this).offset()", $(this).offset());
                // console.log("$(ui): ", $(ui));
                console.log("ui: ", ui);
                // console.log("$(ui.draggable): ", $(ui.draggable));
                console.log("ui.draggable: ", ui.draggable);
                // console.log("$(ui.helper): ", $(ui.helper));
                // console.log("ui.helper: ", ui.helper);

                // console.log("Before append ui.draggable.offset(): ", ui.draggable.offset());

                // TO-DO: function that checks if ok to drop the tile

                if (isOkayToDropTile($(this))){
                    console.log("Tile is okay to drop");
                    $(this).droppable("option", "accept", function() {
                        return true; 
                    });

                    ui.draggable.draggable("option", "revert", "invalid");

                    $(this).append(ui.draggable);

                    // console.log("ui.draggable.parent()", ui.draggable.parent());
                    // ui.draggable.css({
                    //     position: "absolute",
                    //     left: 0,
                    //     top: 0,
                    // });

                    let spacePos = $(this).offset();
                    // let spacePos = this.offset;
                    console.log("$(this).offset(): ", $(this).offset());
                    console.log("Before offset spacePos: ", spacePos);
                    spacePos.top = spacePos.top + 3;
                    spacePos.left = spacePos.left + 3;
                    console.log("After offset spacePos: ", spacePos);
                    ui.draggable.offset(spacePos);
                    // ui.offset = spacePos;
                    console.log("ui.draggable.offset()", ui.draggable.offset());
                    // console.log("ui.offset", ui.offset);
                    ui.draggable.draggable("disable");
                    ui.draggable.draggable( "option", "disabled", true );
                    console.log("spacePos: ", spacePos);
                    // calculate current word score
                    $("#potential-score").text("Current Word Score: " + calculateScore().toString());
                    
                }
                else {
                    console.log("Tile is NOT okay to drop!");
                    // make file vert back to rack
                    ui.draggable.draggable("option", "revert", true);
                    // $(this).droppable("option", "accept", function() {
                    //     return false;
                    // });
                }
                
                // check if space is empty
                // $(this).droppable("option", "accept", function() {
                //     console.log("Drop: Space is empty...");
                //     console.log("$(this).children().length === 0 ", ($(this).children().length === 0));
                //     return ($(this).children().length === 0); 
                // });

                // check if first tile being dropped
                // console.log("board_array length: ", board_array.length);
                // $(this).droppable("option", "accept", function() {
                //     board_array.forEach(function(i) {
                //         console.log("Drop: "+i.attr("id")+ ": Space has no children...");
                //         return (i.children().length === 0);
                //     }); 
                    
                //     console.log("Drop: First tile...");
                // });


                /*

                $(this).append(ui.draggable);
                // console.log("$(this).offset()", $(this).offset());
                // console.log("After append ui.draggable.offset(): ", ui.draggable.offset());

                let spacePos = $(this).offset();
                // console.log("spacePos", spacePos);
                spacePos.top = spacePos.top + 3;
                spacePos.left = spacePos.left + 3;
                // console.log("spacePos", spacePos);
                ui.draggable.offset(spacePos);
                // console.log("After setting ui.draggable.offset(): ", ui.draggable.offset());

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

                // calculate current word score
                $("#potential-score").text("Current Word Score: " + calculateScore().toString());

                */

            },
            tolerance: "intersect", // if tile is at least 50% over the space it is dropped
            // accept: function() { // only one tile per space, TO-DO: move this to drop
            //     return ($(this).children().length === 0)
            // }
        });
        spaceID = spaceID + 1;
        return $space;
    }

    function isOkayToDropTile($space) {
        let isEmpty, isFirst, isPrevSpaceOcc = false;
        let childNum = 0;
        console.log("isOkayToDropTile(): $space.attr('id'):", $space.attr("id"));
        let prevSpaceIndex = Number($space.attr("id").substring(9)-1);
        console.log("isOkayToDropTile(): prevSpaceIndex: ", prevSpaceIndex);
        let prevSpaceID = "droppable" + prevSpaceIndex;
        console.log("isOkayToDropTile(): prevSpaceID:", prevSpaceID);
        // check to see if space is empty
        if ($space.children().length === 0) {
            isEmpty = true;
            console.log("isOkayToDropTile(): isEmpty now true...");
        }
        // check to see if tile is first to be dropped
        board_array.forEach(function(i) {
            childNum += Number(i.children().length); 
        });
        console.log("isOkayToDropTile(): childNum: ", childNum);
        if (childNum === 0) {
            isFirst = true;
            console.log("isOkayToDropTile(): isFirst now true...");
        }
        // check if both empty and first tile
        if (isEmpty && isFirst) {
            return true;
        } else {
            // check if previous space is occupied
            console.log("isOkayToDropTile(): isEmpty && isFirst were NOT true...");
            console.log("isOkayToDropTile(): $(prevSpaceID).children().length: ", $("#"+prevSpaceID).children().length);
            if (!($("#"+prevSpaceID).children().length === 0)) {
                console.log("isOkayToDropTile(): isPrevSpaceOcc now true...");
                isPrevSpaceOcc = true;
            }
        }
        // check if both empty and prev space occupied
        if (isEmpty && isPrevSpaceOcc) {
            return true;
        }
        else {
            return false;
        }
    }


    function createBoard() {
        // clear board first
        $board.html("");
        spaceID = 0;
        board_array.length = 0;
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
    }
    
    // returns a random integer between min and max (both included)
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }



    // create tiles
    
    let tileID = 0; // counter for tileID creation
    let numTiles = 7; // counter for tile creation
    // const tile_array = []; // array of tiles and their piece types
    let $tile_rack = $("#tile-rack"); // actual tile-rack div
    pieces_array = []; // array holding the letter characters
    let totalScore = 0; // total running score

    populatePiecesArray();
    // for random number generator
    let min = 0;
    let max;
    // console.log("Min/max: ", min, max);

    createTileRack();

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

    

    // const array = ["a", "b", "c"];

    // array.forEach((item) => console.log("Item= ", item));

    // console.log("ScrabbleTiles: ", ScrabbleTiles);
    // console.log("ScrabbleTiles: ", ScrabbleTiles['A']['original-distribution']);
    

    // ScrabbleTiles.forEach((item) => console.log("Item= ", item));

    

    // console.log("pieces_array: ", pieces_array);

    // populate pieces_array
    function populatePiecesArray() {
        // clear array first
        pieces_array.length = 0;
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
    }

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
        // console.log("createTile(): remaining tiles: ", max);
        if (max < 0){ // if there are not more tiles to generate
            return null;
        }
        let tile_letter = pieces_array[index];
        // console.log("tile_letter: ", tile_letter);
        // console.log("pieces_array[index]: ", pieces_array[index]);
        if (!(tile_letter == "_")) { // blank image
            $tile.css("background-image", "url('./graphics_data/graphics_data/Scrabble_Tiles/Scrabble_Tile_"+tile_letter+".jpg')");
            // console.log("Should not be blank");
            // console.log("url('./graphics_data/graphics_data/Scrabble_Tiles/Scrabble_Tile_'"+tile_letter+"'.jpg')");
        } else { // letter image
            $tile.css("background-image", "url('./graphics_data/graphics_data/Scrabble_Tiles/Scrabble_Tile_Blank.jpg')");
            // console.log("Should be blank");
        }
        pieces_array.splice(index, 1); // remove letter from pieces_array
        tileID = tileID + 1; // increment tileID number
        $tile.attr("letter", tile_letter); // add letter attribute
        return $tile // return the tile jq variables
    }
    
    function createTileRack() {
        // set random number variables
        max = pieces_array.length - 1;
        // max = 7; // for testing
        // clear tile rack
        $tile_rack.html("");
        // generate new tiles
        for (let i = 0; i < numTiles; i++) {
            let $newTile = createTile();
            if ($newTile === null) { // if there are no more tiles
                return;
            }
            $tile_rack.append($newTile);
            // tile_array[i] = $newTile;
        }
    }
    

    

    // submit button

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

    // bool var for message that shows after tiles been depleted
    let isDepletedMessageOn = false; 
    
    let numTilesOnBoard = 0; // counter for tiles on board for new tile pieces

    // set of dictionary words
    const wordSet = new Set(scrabbleWords.map(function(e) {
        return e.toLowerCase();
    }));

    // let text = "";
    // for (const x of wordSet) {
    //     text += x;
    // }
    // console.log("Text: ", text);

    // submit button is clicked
    $submit.click(function() {
        // console.log("submit button was clicked");
        // console.log('$("#score")', $("#score"));
        // calculateScore();

        // check if word is in dictionary
        if (checkWord()) {
            console.log("It's a word!");

            $("#not-a-word").text("");

            // calcuate and display total score
            totalScore += calculateScore();
            $("#score").text("Score: " + totalScore.toString());

            resetTileRack();
            
        } 
        else {
            console.log("It's NOT a word!");

            $("#not-a-word").text("That was not a word!");

            resetTileRack();
        }

        numTilesOnBoard = 0; // counter for tiles on board for new tile pieces
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
                // console.log("board_array element children: ", i.children());
                // console.log("board_array element children attribute letter: ", i.children().attr("letter"));
                // console.log("board_array element class: ", i.attr("class"));
                let letter = i.children().attr("letter").toString();
                if (i.hasClass("double-word")) {
                    // console.log("double word!");
                    dwScore = true;
                    // console.log("dwScore: ", dwScore);
                }
                if (i.hasClass("double-letter")) {
                    // console.log("double letter!");
                    dlScore = true;
                    // console.log("dlScore: ", dlScore);
                    dlScore_letter_score = Number(ScrabbleTiles[letter].value) * 2;
                    // console.log("dlScore_letter_score", dlScore_letter_score);
                }
                if (dlScore) {
                    // console.log("Setting score with dlScore...");
                    totalScore += dlScore_letter_score;
                    // console.log("totalScore: ", totalScore);
                    dlScore = false; // reset varable
                    // console.log("dlScore: ", dlScore);
                } else {
                    // console.log("Setting score...");
                    totalScore += Number(ScrabbleTiles[letter].value);
                    // console.log("totalScore: ", totalScore);
                }
            }
        });

        if (dwScore) {
            // console.log("There was a double word!");
            totalScore *= 2;
        }

        // console.log("Final totalScore:", totalScore);
        return totalScore;

    }


    function checkWord() {
        let _word_ = "";
        board_array.forEach(function(i) {
            if (!(i.children().length === 0)) {
                let letter = i.children().attr("letter").toString();
                _word_ += letter;
            }
        });
        _word_ = _word_.trim().toLowerCase();
        console.log("checkWord: _word_: ", _word_);
        if (wordSet.has(_word_)) {
            return true;
        } else {
            return false;
        }
    }


    function resetTileRack() {
        board_array.forEach(function(i) {
            numTilesOnBoard += i.children().length;
        });
        console.log("submit.click: numTilesOnBoard: ", numTilesOnBoard);
        if (numTilesOnBoard > 0) { // if there are tiles on the board
            for (let l = 0; l < numTilesOnBoard; l++) {
                let $newTile = createTile();
                if (!($newTile === null)) { // if there are more tiles
                    $tile_rack.append($newTile);
                }
                else {
                    if (!isDepletedMessageOn) {
                        $("#tiles-depleted").text("All tiles have been dealt!");
                        isDepletedMessageOn = true;
                    }
                }
            }
            // reset board
            createBoard(); 
            // reset potential score
            $("#potential-score").text("Current Word Score: 0"); 
        }
    }


    // restart button

    let isPressedRestart = false;

    // create restart button
    $("#restart").button();

    // jquery var for submit button
    let $restart = $("#restart");

    // restart button is clicked
    $restart.click(function() {
        console.log("restart button was clicked");
        isPressedRestart = true;
        // console.log('$("#restart")', $("#restart"));
        totalScore = 0;
        createBoard();
        populatePiecesArray();
        createTileRack();
        $("#score").text("Score: 0");
        $("#potential-score").text("Current Word Score: 0");
        $(".messages").text("");
    });





});
