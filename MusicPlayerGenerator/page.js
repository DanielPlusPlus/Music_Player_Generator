function addNew(){
    let table = document.getElementById("tab");
    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);
    
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    
    cell1.innerHTML = rowCount + ".";
    cell2.innerHTML = '<input type="text" class="titleInput" maxlength="20"/>';
    cell3.innerHTML = '<input type="text" placeholder = "Youtube Link" class="urlInput" maxlength="100"/>';
}
function hidden(){
    for(let i = 0; i < steps.length; i++){
        steps[i].style.display = "none";
    }
}
function resetStyle(){
    for(let i = 0; i < listEl.length; i++){
        listEl[i].style.textDecoration = "none";
    }
}
function changeStep(nb, nbList){
    hidden(steps);
    resetStyle(listEl);
    listEl[nbList].style.textDecoration = "underline";
    steps[nb].style.display = "block";
}
function screenDesign(){
    changeStep(0, 0);
}
function screenPlaylist(){
    changeStep(1, 1);
}
function screenSettings(){
    changeStep(2, 2);
}
function screenCode(){
    changeStep(3, 3);
}
function refreshPage(){
    window.location.href = window.location.href;
}
let listEl = document.getElementsByClassName("list");
let steps = document.getElementsByClassName("steps");
screenDesign();