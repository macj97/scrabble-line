/**
 * File: script.css
 * GUI Assignment: HW5 - Implementing a bit of Scrabble with drag-and-drop
 * Description: JavaScript file for Assignment 5
 * Joe Plummer, UMass Lowell Computer Science, joseph_plummer@student.uml.edu
 * Copyright (c) 2026 by Joe Plummer. All rights reserved. May be freely copied or excerpted for educational purposes with credit to the author.
 */

/**
 * What does a blank do?
 */

$(function() { // jQuery ready function

    // create board and spaces

    let spaceID = 0; // counter for spaceID creation
    let numSpaces = 15; // counter for space creation
    const board_array = []; // array of spaces and their types
    let $board = $("#board"); // actual board div

    createBoard();

    /**
     * Function createSpace creates a space/droppable object
     *          called by createBoard
     * @param   N/A
     * @return  jQuery object   Returns the varable $space
     * @throws  N/A
     */
    function createSpace() {
        let $space = $("<div></div>");
        $space.attr("id", "droppable"+spaceID);
        $space.attr("class", "spaces");
        $space.droppable({
            drop: function(event, ui) { // when a tile is dropped into a space
                let prevSPID = "droppable"+ Number($(this).attr("id").substring(9) - 1);

                // TO-DO: function that checks if ok to drop the tile

                if (isOkayToDropTile($(this))){

                    console.log("Tile is okay to drop");
                    
                    $(this).droppable("option", "accept", function() {
                        return true; 
                    });

                    ui.draggable.draggable("option", "revert", "invalid");

                    $(this).append(ui.draggable);

                    let spacePos = $(this).offset();
                    
                    spacePos.top = spacePos.top + 3;
                    spacePos.left = spacePos.left + 3;
                
                    ui.draggable.offset(spacePos);
                    // ui.offset = spacePos;
                    
                    ui.draggable.draggable("disable");
                    ui.draggable.draggable( "option", "disabled", true );
                    
                    // calculate current word score
                    $("#potential-score").text("Current Word Score: " + calculateScore().toString());
                    
                }
                else {

                    console.log("Tile is NOT okay to drop!");

                    // make file vert back to rack
                    ui.draggable.draggable("option", "revert", true);
                }
                
            },
            tolerance: "intersect", // if tile is at least 50% over the space it is dropped
           
        });
        spaceID = spaceID + 1;
        return $space;
    }

    /**
     * Function isOkayToDropTile determines if the draggable object
     *          (tile) should be dropped into the droppable object (space) 
     *          called by createSpace
     * @param   $space  jQuery object   the draggable object being tested
     * @return          bool            true or false if tile is okay to drop
     * @throws  N/A
     */
    function isOkayToDropTile($space) {
        let isEmpty, isFirst, isPrevSpaceOcc = false;
        let childNum = 0;
        // console.log("isOkayToDropTile(): $space.attr('id'):", $space.attr("id"));
        let prevSpaceIndex = Number($space.attr("id").substring(9)-1);
        // console.log("isOkayToDropTile(): prevSpaceIndex: ", prevSpaceIndex);
        let prevSpaceID = "droppable" + prevSpaceIndex;
        // console.log("isOkayToDropTile(): prevSpaceID:", prevSpaceID);
        // check to see if space is empty
        if ($space.children().length === 0) {
            isEmpty = true;
            // console.log("isOkayToDropTile(): isEmpty now true...");
        }
        // check to see if tile is first to be dropped
        board_array.forEach(function(i) {
            childNum += Number(i.children().length); 
        });
        // console.log("isOkayToDropTile(): childNum: ", childNum);
        if (childNum === 0) {
            isFirst = true;
            // console.log("isOkayToDropTile(): isFirst now true...");
        }
        // check if both empty and first tile
        if (isEmpty && isFirst) {
            return true;
        } else {
            // check if previous space is occupied
            // console.log("isOkayToDropTile(): isEmpty && isFirst were NOT true...");
            // console.log("isOkayToDropTile(): $(prevSpaceID).children().length: ", $("#"+prevSpaceID).children().length);
            if (!($("#"+prevSpaceID).children().length === 0)) {
                // console.log("isOkayToDropTile(): isPrevSpaceOcc now true...");
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

    /**
     * Function createBoard creates the board of spaces
     *          called by resetTileRack, $restart.click
     * @param   N/A
     * @return  N/A
     * @throws  N/A
     */
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
    

    /**
     * Function getRndInteger returns a random integer between parameters 
     *          min and max included (Source: w3schools)
     *          called by createTile
     * @param   min     integer     minimum number
     * @param   max     integer     maximum number
     * @return          integer     random number between min and max included
     * @throws  N/A
     */
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }



    // create tiles
    
    let tileID = 0; // counter for tileID creation
    let numTiles = 7; // counter for tile creation
    let $tile_rack = $("#tile-rack"); // actual tile-rack div
    pieces_array = []; // array holding the letter characters
    let totalScore = 0; // total running score
    let blankLetter; // holds letter from user input when user plays a blank tile

    populatePiecesArray();

    // for random number generator
    let min = 0;
    let max;
    // console.log("Min/max: ", min, max);

    createTileRack();



    /**
     * Function populatePiecesArray populates the pieces_array array that is used to 
     *          assign the grpahics onto the tiles
     *          called by $restart.click
     * @param   N/A
     * @return  N/A
     * @throws  N/A
     */
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

    
    /**
     * Function createTile creates a tile/draggable object
     *          called by createTileRack, resetTileRack
     * @param   N/A
     * @return          jQuery object   returns $tile, the declared jQuery variable
     * @throws  N/A
     */
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
    
    /**
     * Function createTileRack creates the tilerack for the tiles
     *          called by $restart.click
     * @param   N/A
     * @return  N/A
     * @throws  N/A
     */
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
            if ($newTile.attr("letter") === "_") { // if letter is a blank
                $("#buttons").append('<input type="text" id="blank-letter" placeholder="Enter blank space letter here:">');
            }
            $tile_rack.append($newTile);
            // tile_array[i] = $newTile;
        }
    }


    // when user enters something in the input field for the blank tile
    $(document).on("input", function() {
        console.log("Input entered for blank letter!!!");
        blankLetter = $("#blank-letter").val().trim().toString();
        console.log("blankLetter: ", blankLetter);
    });
    

    

    // submit button

    // create submit button
    $("#submit").button();

    // jquery var for submit button
    let $submit = $("#submit");

    // bool var for message that shows after tiles been depleted
    let isDepletedMessageOn = false; 
    
    let numTilesOnBoard = 0; // counter for tiles on board for new tile pieces

    // set of dictionary words
    const wordSet = new Set(scrabbleWords.map(function(e) {
        return e.toLowerCase();
    }));

    // submit button is clicked
    $submit.click(function() {
        // console.log("submit button was clicked");
        // console.log('$("#score")', $("#score"));

        // remove blankLetter text input box
        $("#blank-letter").remove();

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

    /**
     * Function calculateScore calculates the score of the player when they submit a word
     *          called by createSpace, $submit.click
     * @param   N/A
     * @return          integer     the total score of the word played
     * @throws  N/A
     */
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

    /**
     * Function checkWord checks if the word played is actually a word
     *          (Source for text file of words: kamilmielnik on github)
     *          called by $submit.click
     * @param   N/A
     * @return          bool    true if word played is a word, false otherwise
     * @throws  N/A
     */
    function checkWord() {
        let _word_ = "";
        board_array.forEach(function(i) {
            if (!(i.children().length === 0)) {
                let letter = i.children().attr("letter").toString();
                if (!(letter === "_")) {
                    _word_ += letter;
                } else { // if letter on the board is a blank:
                    _word_ += blankLetter;
                }
            }
        });
        _word_ = _word_.trim().toLowerCase();
        // console.log("checkWord: _word_: ", _word_);
        if (wordSet.has(_word_)) {
            return true;
        } else {
            return false;
        }
    }


    /**
     * Function resetTileRack makes sure there are 7 tiles on the tile rack,
     *          only adds random tile(s) to the rack if there are less than
     *          seven tiles
     *          called by $submit.click
     * @param   N/A
     * @return  N/A
     * @throws  N/A
     */
    function resetTileRack() {
        board_array.forEach(function(i) {
            numTilesOnBoard += i.children().length;
        });
        // console.log("submit.click: numTilesOnBoard: ", numTilesOnBoard);
        if (numTilesOnBoard > 0) { // if there are tiles on the board
            for (let l = 0; l < numTilesOnBoard; l++) {
                let $newTile = createTile();
                if (!($newTile === null)) { // if there are more tiles
                    if ($newTile.attr("letter") === "_") { // if letter is a blank
                        $("#buttons").append('<input type="text" id="blank-letter" placeholder="Enter blank space letter here:">');
                        
                    }
                    else {
                        $tile_rack.append($newTile);
                    }
                }
                else { // if there are no more tiles
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

    // let isPressedRestart = false;

    // create restart button
    $("#restart").button();

    // jquery var for submit button
    let $restart = $("#restart");

    // restart button is clicked
    $restart.click(function() {
        console.log("restart button was clicked");
        // isPressedRestart = true;
        // console.log('$("#restart")', $("#restart"));
        totalScore = 0;
        createBoard();
        populatePiecesArray();
        $("#blank-letter").remove();
        createTileRack();
        $("#score").text("Score: 0");
        $("#potential-score").text("Current Word Score: 0");
        $(".messages").text("");
    });

    
});
