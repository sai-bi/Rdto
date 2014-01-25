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
var blockTagNum = 0;
$('document').ready(function(){

    var mouseDown = false;
    // add event listener
    importantButton = document.getElementById('importantButton');
    commentButton = document.getElementById('commentButton');
    importantButton.addEventListener("click",markImportant,false);
    commentButton.addEventListener("click",comment,false);
    setCommentLocation();
    
      
});

function markImportant(){

}

// analysis the selection text
function isSelectable(currNode){
    // get selected range 
    // var selectedHTML = getSelectionHtml();

    // alert(selectedHTML);
    // console.log(selectedHTML);
    // var parsedHTML = $.parseHTML(selectedHTML);
    // console.log(parsedHTML);

    // var nodeName = [];
    // $.each(parsedHTML,function(i,el){
        // nodeName[i] = el.nodeName; 
    // } 
    if(blockTagNum > 1)
        return false;
    var textNum = 0;    
    var blockElements = ["p","h1","h2","h3","h4","h5","h6",
                        "ol","ul","pre","address","blockquote",
                        "dl","div","fieldset","form","hr","noscript",
                        "table","li","br"];
    
    for(var i = 0;i < currNode.length;i++){
        var temp = currNode[i].nodeName.toLowerCase();
        console.log(temp);
        if(temp.parElement == null && temp == "#text")
            textNum = textNum + 1;
        if(jQuery.inArray(temp,blockElements) != -1){
            blockTagNum = blockTagNum + 1;
        }
        if(blockTagNum == 1 && textNum != 0)
            return false;
        if(blockTagNum > 1)
            return false;         
        isSelectable(currNode[i].childNodes);        
        if(blockTagNum > 1)
            return false;         

    } 
    return true;   
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
        // console.log(selection); 
        // if(selection == lastSelection && selection != "")
            // return;
        // console.log("mouse down hidden");  
        // $("#bubble").css("visibility","hidden"); 
    });

    $('body').mouseup(function(){
        console.log('Mouseup');
        var selection = getSelectedText();
        console.log(selection);
        if(selection == ""){
            console.log("mouse up hidden");  
            $("#bubble").css("visibility","hidden"); 
            return;
        }
        if(selection == lastSelection){
            return;
        }
    
        var selectedHTML = getSelectionHtml();
        var parsedHTML = $.parseHTML(selectedHTML); 
        console.log(parsedHTML);
        blockTagNum = 0; 
        var result = isSelectable(parsedHTML); 
        if(!result){
            return;
        }
        lastSelection = selection; 
        
        $("#bubble").css("visibility","visible"); 
        $("#bubble").css("left",mousePosX-60);
        $("#bubble").css("top",mousePosY-70); 
    });
    
    $('body').bind('click',function(){
        console.log('mouse click');
        var selection = getSelectedText();
        console.log(selection);
        if(selection == ""){
            console.log("mouse up hidden");  
            $("#bubble").css("visibility","hidden"); 
            return;
        }
        if(selection == lastSelection){
            return;
        }
        
        $("#bubble").css("visibility","hidden"); 
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

// get selected html
function getSelectionHtml() {
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
    return html;
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
    if(window.getSelection) {
        return window.getSelection().toString();
    } else if (document.selection) {
        return document.selection.createRange().text;
    }
    return '';
}


// remove the hightlight


