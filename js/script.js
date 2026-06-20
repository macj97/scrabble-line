/**
 * File: script.css
 * GUI Assignment: HW5 - Implementing a bit of Scrabble with drag-and-drop
 * Description: JavaScript file for Assignment 5
 * Joe Plummer, UMass Lowell Computer Science, joseph_plummer@student.uml.edu
 * Copyright (c) 2026 by Joe Plummer. All rights reserved. May be freely copied or excerpted for educational purposes with credit to the author.
 */

$(function() { //jQuery ready function

    $("#draggable").draggable({ revert: "invalid" });
    $("#draggable1").draggable({ revert: "invalid" });
    $("#draggable2").draggable({ revert: "invalid" });
    $("#draggable3").draggable({ revert: "invalid" });
    $("#draggable4").draggable({ revert: "invalid" });
    $("#draggable5").draggable({ revert: "invalid" });
    $("#draggable6").draggable({ revert: "invalid" });

    $("#droppable").droppable({
        drop: function() {
            console.log("item has been dropped");
            alert("item has been dropped");
            // $(this).addClass("ui-state-highlight")
            //         .find("p")
            //         .html("Dropped!");
                    
        }
    });
    $("#droppable1").droppable({
        drop: function() {
            console.log("item has been dropped");
            alert("item has been dropped");
        }
    });
    $("#droppable2").droppable({
        drop: function() {
            console.log("item has been dropped");
            alert("item has been dropped");
        }
    });
    $("#droppable3").droppable({
        drop: function() {
            console.log("item has been dropped");
            alert("item has been dropped");
        }
    });
    $("#droppable4").droppable({
        drop: function() {
            console.log("item has been dropped");
            alert("item has been dropped");
        }
    });
    $("#droppable5").droppable({
        drop: function() {
            console.log("item has been dropped");
            alert("item has been dropped");
        }
    });
    $("#droppable6").droppable({
        drop: function() {
            console.log("item has been dropped");
            alert("item has been dropped");
        }
    });



});
