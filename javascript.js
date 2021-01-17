console.log("Hi, all working fine");
showNotes();
//if user add a note, add it to the local storage
let addBtn = document.getElementById('addBtn');
let addTitle = document.getElementById('addTitle');
addBtn.addEventListener('click', addingText);
function addingText(e)
{
    //console.log(e);
    let addTxt=document.getElementById('addText');
    // console.log(addTxt.value);
    let currentNotes=localStorage.getItem('note');
    // console.log(currentNotes);
    let notesArr=[];
    if(currentNotes!=null){
        notesArr=JSON.parse(currentNotes);
    }
    let myArr={
        title: addTitle.value,
        text: addTxt.value
    }
    notesArr.push(myArr);
    localStorage.setItem('note',JSON.stringify(notesArr));
    addTxt.value="";
    addTitle.value="";
    showNotes();
    console.log(localStorage);
}
//console.log(addBtn);
function showNotes()
{
    let notes=localStorage.getItem('note');
    let notesArr=[];
    if(notes!=null){
        notesArr=JSON.parse(notes);
    }
    let noteString='';
    notesArr.forEach(function(i,index){
        noteString+=`<div class="my-2 mx-2 nCard" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${i.title}</h5>
          <p class="card-text">${i.text}</p>
          <button id='${index}' onclick="deleteNode(this.id)" class="btn btn-primary">Delete</button>
        </div>
      </div>`;
        //console.log(noteString);
    })
    //console.log(notes)
    let html=document.getElementById('notes');
    if(notesArr.length!=0)
    {
        html.innerHTML=noteString;
    }
    else{
        html.innerHTML='Nothing to show, Right Now!'
    }
}

function deleteNode(i)
{
    //console.log(i);
    let notes=localStorage.getItem('note');
    let notesArr=[];
    if(notes!=null){
        notesArr=JSON.parse(notes);
    }
    notesArr.splice(i,1);
    localStorage.setItem("note",JSON.stringify(notesArr));
    showNotes();
}

let search=document.getElementById('searchTxt');
search.addEventListener('input',function(){
    let input=search.value.toLowerCase();
    //console.log(input);
    let card =document.getElementsByClassName('nCard');
    //console.log(typeof(card));                                   
    Array.from(card).forEach(function(i)
    {
        let para=i.getElementsByTagName('p')[0].innerText;
        //console.log(para);
        if(para.includes(input))
        {
            i.style.display="block";
        }
        else{
            i.style.display='none';
        }
    })
});

/* other features like
add title for note
mark as imp button so that it'll at top always
sync with server ir instead of local storage save it in server
*/