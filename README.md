# scrabble-line
Implementing a bit of Scrabble with drag-and-drop for Assignment 5 of the class GUI I at UML.

# Github URL:
https://macj97.github.io/scrabble-line/

# Github Repo: 
https://github.com/macj97/scrabble-line/tree/gh-pages

# Features:
This program is a modified version of the game Scrabble. It is only one line of the board and for one player only. A user starts with seven random tiles. They must place the tiles on the board to spell out a word. If the tiles on the board indeed spell a letter, they get points depending on the value of each letter and where that tile was placed on the board.

When the program starts, the board and spaces are created, as well as the tile rack and tiles. Each tile is randomly generated. The file "Scrabble_Pieces_AssociativeArray_Jesse.js" has an array that is the data structure used to populate an array of letter characters which serves as the "bag" of tiles. From this bag a tile gets picked to be put on the tile rack. When the user drags a tile and drops it onto a space, the tile cannot be moved again. Only one tile can go into a space. Tiles must also be placed on the board left to right with no spaces in between. If the user tries to put a tile in an occupied space or another illegal space, the tile will revert back to its original position on the tile rack.

Once a user has placed the tiles on the board, they must hit "Submit Word" to generate a score. This score will be added next to the label "Score" and will be a running total score throughout the game. For every tile the user places on the board, the label "Current Word Score" shows the potential score for those tiles on the board. A score is only generated if the tiles placed on the board actually spells a word. When a user submits what they have the board, the word is checked from a dictionary list of words (Source: kamilmielnik on github). If the tiles on the board actually spell a word, a score is generated and added to "Score". Any tiles on the board when the user hits "Submit Word" will be discarded from the "bag" and will no longer enter field of play for the rest of the game.

The score depends not only on if the tiles placed on the board spells a word, but also where the tiles are placed. If a tile is placed on a "Double Word Score" space, then the score of the entire word is doubled. If a tile is on a "Double Letter Score" space, the point value of the tile on that space is doubled. When a word's tiles occupy both a "Double Letter Score" and "Double Letter Score" space, the double letter scores are added first and then the entire score is doubled. 

If the user receives a blank tile on the tile rack, they may use that tile as a wile-card letter to spell a word. When a blank tile appears on the tile rack, a textbox next to the buttons at the bottom of the page will show up. The user must enter the letter they wish to represent the blank tile before they hit the "Submit Word"

At any point the user can hit the "Restart Game" button to start a new game. This will clear the board and generate 7 new tiles from the full "bag" of tiles. The user can also hit the "Reset Tiles" button, but only when there are no tiles on the board. This button comes in handy when the user cannot spell a word from the tiles on their current tile rack. When this button is pressed, the tiles on the tile rack go back into the "bag" and seven new tiles are randomly generated for the tile rack.

Currently the game does not support more than one blank tile on the tile rack. If this occurs the tiles placed on the board will automatically be deemed as not a word. Also it cannot remove both textboxes that get generated.

# Sources

JavaScript getRndInteger Function: 
https://www.w3schools.com/JS/js_random.asp

Dictionary list of words for scrabble-words.js file: 
https://github.com/kamilmielnik/scrabble-dictionaries/blob/master/english/twl06.txt


