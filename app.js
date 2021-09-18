const app = () =>{

    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vide-container video');

    //sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    //Time display
    //Get the length of the outline

const outlineLength = outline.getTotalLength();
console.log(outlineLength);

}