/**
 * File: script.js
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
                // let prevSPID = "droppable"+ Number($(this).attr("id").substring(9) - 1);
                if (isOkayToDropTile($(this))){
                    $(this).droppable("option", "accept", function() { // only one tile per space
                        return true; 
                    });
                    ui.draggable.draggable("option", "revert", "invalid"); // reverts back if not in space
                    $(this).append(ui.draggable);
                    // adjusting the position of the tile
                    let spacePos = $(this).offset();
                    spacePos.top = spacePos.top + 3;
                    spacePos.left = spacePos.left + 3;
                    ui.draggable.offset(spacePos);
                    ui.draggable.draggable("disable");
                    ui.draggable.draggable( "option", "disabled", true );
                    // calculate current word score
                    $("#potential-score").text("Current Word Score: " + calculateScore().toString());
                    if (ui.draggable.attr("letter") === "_") {
                        // console.log("A blank has been dropped!");
                        blankLetterInRack = false;
                    }
                    
                }
                else {
                    // make file revert back to rack
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
        let isEmpty, isFirst, isPrevSpaceOcc = false; // bool conditions
        let childNum = 0; // number of tiles in a space
        // previous space index and id:
        let prevSpaceIndex = Number($space.attr("id").substring(9)-1);
        let prevSpaceID = "droppable" + prevSpaceIndex;
        // check to see if space is empty
        if ($space.children().length === 0) {
            isEmpty = true;
        }
        // check to see if tile is first to be dropped
        board_array.forEach(function(i) {
            childNum += Number(i.children().length); 
        });
        if (childNum === 0) {
            isFirst = true;
        }
        // check if both empty and first tile
        if (isEmpty && isFirst) {
            return true;
        } else {
            // check if previous space has a tile/is occupied
            if (!($("#"+prevSpaceID).children().length === 0)) {
                isPrevSpaceOcc = true;
            }
        }
        // check if both empty and previous space occupied
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
        // calling createSpace, assinging special spaces, adding to board_array
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
    let numTiles = 7; // number of tiles that should be in the tile-rack
    let $tile_rack = $("#tile-rack"); // actual tile-rack div
    pieces_array = []; // array holding the letter characters
    let totalScore = 0; // total running score
    let blankLetter; // holds letter from user input when user plays a blank tile
    let blankLetterUsed = false; // bool for is blankLetter was used
    let blankLetterInRack = false;

    populatePiecesArray();

    // for random number generator
    let min = 0;
    // let min = 90; // for testing
    let max;

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
            for (let k = 0; k < ScrabbleTiles[letter]['number-remaining']; k++) {
                pieces_array[offset + k] = letter;
            }
            offset += ScrabbleTiles[letter]['number-remaining'];
        }
        // console.log("populatePiecesArray: pieces_array: ", pieces_array);
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
        if (max < 0){ // if there are not more tiles to generate
            return null;
        } else {
            max--;
        }
        let tile_letter = pieces_array[index];
        if (!(tile_letter == "_")) { // blank image
            $tile.css("background-image", "url('./graphics_data/graphics_data/Scrabble_Tiles/Scrabble_Tile_"+tile_letter+".jpg')");
        } else { // letter image
            $tile.css("background-image", "url('./graphics_data/graphics_data/Scrabble_Tiles/Scrabble_Tile_Blank.jpg')");
        }
        pieces_array.splice(index, 1); // remove letter from pieces_array
        tileID = tileID + 1; // increment tileID number
        $tile.attr("letter", tile_letter); // add 'letter' attribute
        $tile.attr("index", index); // add 'index' attribute // needed?
        return $tile // return the tile jq variable
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
        // max = 99; // for testing
        // clear tile rack
        $tile_rack.html("");
        // generate new tiles
        for (let i = 0; i < numTiles; i++) {
            let $newTile = createTile();
            if ($newTile === null) { // if there are no more tiles
                return;
            }
            if ($newTile.attr("letter") === "_") { // if letter is a blank
                // add input textbox element
                $("#buttons").append('<input type="text" id="blank-letter" placeholder="Enter blank space letter here:">');
                blankLetterInRack = true;
            }
            $tile_rack.append($newTile);
        }
        // console.log("createTileRack: pieces_array: ", pieces_array);
        // console.log("createTileRack: max: ", max);
    }


    // when user enters something in the input textbox for the blank tile
    $(document).on("input", function() {
        blankLetter = $("#blank-letter").val().trim().toString();
        blankLetterUsed = true;
        blankLetterInRack = false;
    });
    


    // submit button

    $("#submit").button(); // create submit button
    let $submit = $("#submit"); // jquery var for submit button
    let isDepletedMessageOn = false; // bool var for message that shows after tiles been depleted
    let numTilesOnBoard = 0; // counter for tiles on board for new tile pieces

    // set of dictionary words
    const wordSet = new Set(scrabbleWords.map(function(e) {
        return e.toLowerCase();
    }));

    // submit button is clicked
    $submit.click(function() {
        // console.log("Submit button is clicked...");
        // remove blank letter text input box if blank letter was used, or not in rack
        // console.log("Submit.click: blankLetterUsed: ", blankLetterUsed);
        // console.log("Submit.click: blankLetterInRack: ", blankLetterInRack);
        if (blankLetterUsed) {
            $("#blank-letter").remove();
            // console.log("Submit.click: blank-letter textbox removed...");
            blankLetterUsed = false;
        }
        else if (!blankLetterInRack) {
            $("#blank-letter").remove();
            // console.log("Submit.click: blank-letter textbox removed...");
        }
        // check if word is in dictionary
        if (checkWord()) { // if a legal word
            // remove messages if showing
            $("#not-a-word").text("");
            $("#board-clear").text("");
            // calcuate and display total score, reset tile rack
            totalScore += calculateScore();
            $("#score").text("Score: " + totalScore.toString());
            resetTileRack(0);
        } 
        else { // if not a legal word
            // display message
            $("#not-a-word").text("That was not a word!");
            $("#board-clear").text(""); // clear message if showing
            resetTileRack(0);
        }
        numTilesOnBoard = 0; // reset counter for tiles on board for new tile pieces
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
        let dwScore = false; // bool for doubleWord tile
        let dlScore = false; // bool for doubleLetter tile
        let dlScore_letter_score = 0; // score if there is a double letter tile
        board_array.forEach(function(i) {
            if (!(i.children().length === 0)) {
                let letter = i.children().attr("letter").toString();
                // if tile is a doubleWord tile:
                if (i.hasClass("double-word")) {
                    dwScore = true;
                }
                // if tile is a doubleLetter tile:
                if (i.hasClass("double-letter")) {
                    dlScore = true;
                    dlScore_letter_score = Number(ScrabbleTiles[letter].value) * 2;
                }
                // score for doubleLetter tile:
                if (dlScore) {
                    totalScore += dlScore_letter_score;
                    dlScore = false; // reset bool variable
                } else {
                    totalScore += Number(ScrabbleTiles[letter].value);
                }
            }
        });
        // score for doubleWord tile:
        if (dwScore) {
            totalScore *= 2;
        }
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
            if (!(i.children().length === 0)) { // if a space has a tile
                let letter = i.children().attr("letter").toString(); // get tile letter
                if (!(letter === "_")) { // if regular letter
                    _word_ += letter;
                } else { // if letter on the board is a blank
                    _word_ += blankLetter;
                }
            }
        });
        _word_ = _word_.trim().toLowerCase();
        if (wordSet.has(_word_)) { // if word is in dictionary
            return true;
        } else {
            return false;
        }
    }


    /**
     * Function resetTileRack makes sure there are 7 tiles on the tile rack,
     *          either adds random tile(s) to the rack if there are less than
     *          seven tiles, or replaces all tiles
     *          called by $submit.click, $reset.click
     * @param   opt     integer     0-reset tile rack and create tiles needed (after submit word)
     *                              1-reset all tiles on the tile rack (after reset tiles)
     * @return  N/A
     * @throws  N/A
     */
    function resetTileRack(opt) {
        if (opt === 0) { // option 0
            board_array.forEach(function(i) {
                numTilesOnBoard += i.children().length;
            });
            // console.log("resetTileRack: numTilesOnBoard: (opt 0)", numTilesOnBoard);
            // if (blankLetterInRack) { // reset var for blank letter on tile rack, and remove textbox
            //     console.log("resetTileRack(0): blankLetterInRack", blankLetterInRack);
            //     blankLetterInRack = false;
            //     $("#blank-letter").remove();
            //     console.log("resetTileRack: blank-letter textbox removed...");
            //     console.log("resetTileRack(0): blankLetterInRack is now", blankLetterInRack);
            // }
            // console.log("pieces_array is ", pieces_array);
            // console.log("max is: ", max);
            if (numTilesOnBoard > 0) { // if there are tiles on the board
                for (let l = 0; l < numTilesOnBoard; l++) {
                    let $newTile = createTile();
                    if (!($newTile === null)) { // if there are more tiles, create tiles needed
                        if ($newTile.attr("letter") === "_") { // if letter is a blank
                            $("#buttons").append('<input type="text" id="blank-letter" placeholder="Enter blank space letter here:">');
                            $tile_rack.append($newTile);
                            blankLetterInRack = true;
                        }
                        else {
                            $tile_rack.append($newTile);
                        }
                    }
                    else { // if there are no more tiles, dislay message
                        if (!isDepletedMessageOn) {
                            $("#tiles-depleted").text("All tiles have been dealt!");
                            isDepletedMessageOn = true;
                        }
                    }
                }
                // console.log("pieces_array is now: ", pieces_array);
                // console.log("max is now: ", max);
                // reset board
                createBoard(); 
                // reset potential score
                $("#potential-score").text("Current Word Score: 0"); 
            }
        } else if (opt === 1) { // option 1
            // console.log("resetTileRack: numTilesOnBoard: (opt 1, should be 0): ", numTilesOnBoard);
            $("#blank-letter").remove(); // remove blank letter input box if showing
            for (let l = 0; l < $tile_rack.children().length; l++) { // put tile back in "bag"
                // console.log("Letter in tile-rack: ", $tile_rack.children().eq(l).attr("letter"));
                let tileLetter = $tile_rack.children().eq(l).attr("letter");
                // console.log("Index attr of letter in tile-rack:", $tile_rack.children().eq(l).attr("index"));
                // let tileLetterIndex = $tile_rack.children().eq(l).attr("index");
                let insertIndex = pieces_array.indexOf(tileLetter);
                // console.log("insertIndex:", insertIndex);
                if (insertIndex === -1) {
                    insertIndex = getCorrectIndex(tileLetter);
                    // console.log("insertIndex is now:", insertIndex);
                }
                pieces_array.splice(insertIndex, 0, tileLetter);
                // console.log("inserted ", tileLetter, " at index ", insertIndex);
                max++;
                // console.log("pieces_array is currently", pieces_array);
                // console.log("max is currently: ", max);
            }
            // console.log("pieces_array after putting back tiles: ", pieces_array);
            // console.log("max after putting back tiles:: ", max);
            $tile_rack.html("") // clear tile rack
            // console.log("restTileRack: Tile rack cleared...");
            for (let l = 0; l < numTiles; l++) {
                let $newTile = createTile();
                if (!($newTile === null)) { // if there are more tiles, create tiles needed
                    if ($newTile.attr("letter") === "_") { // if letter is a blank
                        $("#buttons").append('<input type="text" id="blank-letter" placeholder="Enter blank space letter here:">');
                        $tile_rack.append($newTile);
                        blankLetterInRack = true;
                    }
                    else {
                        $tile_rack.append($newTile);
                    }
                }
                else { // if there are no more tiles, dislay message
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
        } else {
            // console.log("Option was not specified for resetTileRack.");
        }
    }


    /**
     * Function getCorrectIndex, helper function for resetTileRack, gets the index
     *          that the letter should be placed in pieces_array
     * @param   letter      string      letter that is being placed back in pieces_array
     * @return              integer     index that the letter should be placed in pieces_array
     * @throws  N/A
     */
    function getCorrectIndex(letter) {
        let nextTileLetter;
        if (letter === "_") {
            return 0;
        }
        if (!(letter === "Z")) { // if letter is not "Z"
            nextTileLetter = String.fromCharCode(letter.charCodeAt(0)+1);
        } else { // if letter is "Z"
            nextTileLetter = "_";
        }
        // console.log("getCorrectIndex: nextTileLetter: ", nextTileLetter);
        index = pieces_array.indexOf(nextTileLetter);
        // console.log("getCorrectIndex: index: ", index);
        if (index === -1) {
            index = getCorrectIndex(nextTileLetter);
            return index;
        } else {
            return index;
        }
    }



    // restart button

    $("#restart").button(); // create restart button
    let $restart = $("#restart"); // jquery var for restart button
    // restart button is clicked
    $restart.click(function() {
        // console.log("Restart button is clicked...");
        totalScore = 0; // reset total score variable
        createBoard(); // create new board
        populatePiecesArray(); // helper to create tiles
        $("#blank-letter").remove(); // remove blank letter input box
        blankLetterUsed = false; // reset blank letter bool variable
        createTileRack(); // create new tile rack
        $("#score").text("Score: 0"); // reset total score
        $("#potential-score").text("Current Word Score: 0"); // reset potential score
        $(".messages").text(""); // remove messages
    });


    // reset tiles button 

    $("#reset").button(); // create reset tiles button
    let $reset = $("#reset"); // jquery var for reset tiles button

    // reset tiles button is clicked
    $reset.click(function() {
        // console.log("Reset Tiles button is clicked...");
        board_array.forEach(function(i) { // check for tiles on board
            numTilesOnBoard += i.children().length;
        });
        if (numTilesOnBoard > 0) { // if there are tiles on board
            $("#board-clear").text("Board must be clear to reset tiles."); // show message
            numTilesOnBoard = 0; // reset variable
            return;
        }
        $("#board-clear").text(""); // clear message if showing
        resetTileRack(1);
    });

    
});
