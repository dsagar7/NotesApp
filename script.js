

const addNoteBtn = document.querySelector('.add__notes__btn');
const inputData = document.querySelector('.add__note__detail__text');
let noteContainerLS = JSON.parse(localStorage.getItem('notes') || '[]');
const notesContainer = document.querySelector('.notes__container');


function showNotes() {
    document.querySelectorAll('.note').forEach(note => note.remove());
    noteContainerLS.forEach((note, index) => {

        let noteBox = `<div class="note">
                       <div class="note__action">
                                <button class="note__action__btn" onclick="actionNote(this, '${index}')">Edit</button>
                                <button class="note__action__delete" onclick="deleteNote(${index})"><img src="icons/trash-fill.svg" alt="delete"></button>   
                       </div>
                        <div class="note__detail">
                                <p class="note__text">${note.text}</p>
                        </div>
                       </div>`;

        notesContainer.insertAdjacentHTML("beforeend", noteBox);
    });
}
showNotes();


//Delete note

function deleteNote(noteID)
{
   noteContainerLS.splice(noteID , 1);
   localStorage.setItem('notes', JSON.stringify(noteContainerLS))
   showNotes();
}



//Update data

function actionNote(currElement, noteID){ 

    let currElementData = currElement.parentElement.parentElement.lastElementChild.lastElementChild.textContent;
    let noteActionBtn = currElement;
    // let noteDetail = currElement.parentElement.parentElement.lastElementChild;
    let noteDetailEdit = currElement.parentElement.parentElement.lastElementChild.lastElementChild;
    let currInput = currElement.parentElement.parentElement.lastElementChild;
    
    
    if(noteActionBtn.textContent == "Done"){
        noteActionBtn.textContent = "Edit";
        // noteDetail.value;
        let currText = document.createElement('p');
        currText.className = "note__text";
        currText.textContent = noteDetailEdit.value;
        currInput.replaceChild(currText, noteDetailEdit);
        
         noteContainerLS[noteID].text = currText.textContent;
         localStorage.setItem('notes', JSON.stringify(noteContainerLS))
        // newStg = localstorage.setItem('text', JSON.stringify(currText.textContent))
        // localstorage.setItem('notes', JSON.stringify(currText.textContent))
    }else{
        noteActionBtn.textContent = "Done";
        let inputCurrTextArea = document.createElement('textarea');
        inputCurrTextArea.placeholder = "Update This Note";
        inputCurrTextArea.className = "note__text__edit";
        inputCurrTextArea.value = currElementData;
        currInput.replaceChild(inputCurrTextArea, noteDetailEdit);
        
    }
    
}



addNoteBtn.addEventListener('click', e => {
    e.preventDefault();
    let inputDataValue = inputData.value;
    if (inputDataValue) {

        let noteInfo = {
            text: inputDataValue
        }

        noteContainerLS.push(noteInfo);
        localStorage.setItem('notes', JSON.stringify(noteContainerLS));

        showNotes();

    }
    inputData.value = '';
})



// Search Filter 

const searchFunction = () => {
    let inputDataSearch = document.getElementById('myInputSearch').value.toUpperCase();
    let myNoteContainer = document.querySelector('.notes__container');
    let myNoteMain = myNoteContainer.getElementsByClassName('note');
    
    // let myNoteText = myNote[2].textContent;
    

    for(var i = 0; i < myNoteMain.length; i++){
        let myNote = myNoteMain[i].getElementsByClassName('note__text')[0];
        // console.log(myNote.textContent)
        if(myNote){
            let textValue = myNote.textContent || myNote.innerHTML;
            if(textValue.toUpperCase().indexOf(inputDataSearch) > -1 ){
                myNoteMain[i].style.display = "";
            }else{
                myNoteMain[i].style.display = "none";
            }
        }
    }
}


