/**
 * @overview
 *
 * @author w
 * @version 2014/01/24
 */
var mousePosX;
var mousePosY;
var lastSelection = "";
var importantButton;
var commentButton;
$('document').ready(function(){

    var mouseDown = false;
    // add event listener
    importantButton = document.getElementById('importantButton');
    commentButton = document.getElementById('commentButton');
    importantButton.addEventListener("click",markImportant,false);
    commentButton.addEventListener("click",comment,false);
    setCommentLocation();
    
    
});

// function for mark contents as important
function markImportant(){
    // get selected range 
    
}


//function for make comments on selected text
function comment(){
    alert("comment");
}



//set the location of select box
function setCommentLocation(){ 
    $('body').mousedown(function(event){
        mousePosX = event.pageX;
        mousePosY = event.pageY;
        var selection = getSelectedText();
        
        if(selection == lastSelection && selection != "")
            return;
             
        $("#bubble").css("visibility","hidden"); 
    });

    $('body').mouseup(function(){
        var selection = getSelectedText();
        if(selection == ""){
            $("#bubble").css("visibility","hidden"); 
            return;
        }
        if(selection == lastSelection ){
            return;
        } 
        lastSelection = selection; 
        
        $("#bubble").css("visibility","visible"); 
        $("#bubble").css("left",mousePosX-60);
        $("#bubble").css("top",mousePosY-70); 
    });
}

// set mouse action
function setMouseAction(){
    $('body').mouseup(function(){ 
        mouseDrag = false;
        var selection = window.getSelection().getRangeAt(0);
        highLight(selection);  
    });

    $('body').mousemove(function(){
        var selection = window.getSelection().getRangeAt(0);
        if(mouseDown && selection != ""){
            removeHighlight();
            mouseDown = false;
        }
    });

    $('body').mousedown(function(){
        mouseDown = true; 
    }); 

}

// remove hightlights
function removeHighlight(){
    var selection = window.getSelection().getRangeAt(0); 
    var b = document.getElementsByClassName('highlight');
    if(b.length == 0)
    return;
    while(b.length){
        var parent = b[ 0 ].parentNode;
        while( b[ 0 ].firstChild ) {
            parent.insertBefore(  b[ 0 ].firstChild, b[ 0 ] );
        }
        parent.removeChild( b[ 0 ] );
    } 

}


// hightlight selected text
function highLight(range){
    var newNode = document.createElement("div");
    newNode.setAttribute(
        "style",
        "background-color: yellow; display: inline;"
    );
    newNode.setAttribute("class","highlight");
    range.surroundContents(newNode);
}

// get the text selected by user
function getSelectedText(){
    if (window.getSelection) {
        return window.getSelection().toString();
    } else if (document.selection) {
        return document.selection.createRange().text;
    }
    return '';
}


// remove the hightlight


