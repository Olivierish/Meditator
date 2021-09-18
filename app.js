
const app = () => {
    console.log("Inside App");
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');
    
    //sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    //Time display
    const timeDisplay = document.querySelector('.time-display');
    //Time select
    const timeSelect = document.querySelectorAll(".time-select button");
    //Get the length of the outline
    const outlineLength = outline.getTotalLength();
    console.log(outlineLength);
    //Duration
    let fakeDuration = 600;
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;
    //Pick different sounds
    sounds.forEach(sound => {
        sound.addEventListener("click", function(){
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    });
    //Play sound
    play.addEventListener("click",() => {
        checkPlaying(song);
    });

    //Select time
    timeSelect.forEach(option =>{
        option.addEventListener("click",function(){
            fakeDuration = this.getAttribute("data-time");
            //timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
            timeDisplay.textContent = formatTime(fakeDuration);
        });
    });

    //Create a function to stop and play a song 
    const checkPlaying = song =>{
        if(song.paused){
            song.play();
            video.play();
            play.src = './svg/pause.svg';
            play.style.transform = "translateX(0%)";
            play.style.width = "20%";


        }
        else{
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
            play.style.transform = "translateX(10%)";
            play.style.width = "30%";
        }
    };
    //Animate the circle
    song.ontimeupdate = () =>{
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        //Animate the circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        //Animate the time display
        //timeDisplay.textContent = `${minutes}:${seconds}`;
        timeDisplay.textContent = formatTime(elapsed);
        if(currentTime >= fakeDuration){
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        }
    };
};

formatTime = (timeData) =>{
    let seconds = Math.floor(timeData % 60);
    let minutes = Math.floor(timeData / 60);
    let secondsString =`${seconds}`;
    let minutesString =`${minutes}`;
    if(seconds < 10){
        secondsString =`0${seconds}`;
    }
    if(minutes < 10){
        minutesString =`0${minutes}`;
    }
    return(`${minutesString}:${secondsString}`);
}

app();