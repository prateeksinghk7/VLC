const media=document.querySelector('#media');
const fileopen=document.querySelector("#file");
const videoDiv=document.querySelector(".video");
const biglogo=document.querySelector(".biglogo");
media.addEventListener("click",()=>{
    fileopen.click();
   
})


fileopen.addEventListener("change",(obj)=>{
 
    const files=obj.target.files[0];
    console.log(files);
    const link=URL.createObjectURL(files)
    console.log(files.type)

    //here we used split fucntion to get the string split wherever the '/' is and poped the the last element out......
    console.log(files.type.split('/').pop());
    const filetype=files.type.split('/').pop();
    if(filetype !== "mp4"){
        alert("File type not supported\nTry with some other file type");
       return;
    }
    //to remove previous video if any(arleady exits)
    while (videoDiv.firstChild) {
        videoDiv.removeChild(videoDiv.firstChild);
    }

    //**** creation of div element ***/
    const video=document.createElement("video");
    video.src=link;
    // video.controls=true; 
    videoDiv.appendChild(video);
    video.autoplay=true;
    video.volume=0.3
    video.setAttribute("class","myvideo");

    //so that error don't occur as progressLoop may run even before the cur time loads so that will give error to us
    video.addEventListener("loadedmetadata",function(){

            //calling the progress bar function
             progressLoop();
    })

    //make icons visible if video is there
    fullScreen.style.cssText="opacity:1; pointer-events: auto;";
    pause.style.cssText="opacity:1; pointer-events: auto;";

    
   
});

//Function to get video element
const getVideo =()=>{
return document.querySelector(".myvideo");
}


//********************* Volume UP *******************/


const volumeUp=document.querySelector("#volumeUp");

volumeUp.addEventListener('click',()=>{
    const video=getVideo();
if(video==null){
    return;
}

if(video.volume > 0.95){
    setToast("Max. Volume");
    return;
}

video.volume = video.volume+0.025;

setToast(Math.floor(video.volume * 100) + " %");
})

//********************* Volume Down *******************/



const volumeDown=document.querySelector("#volumeDown");
volumeDown.addEventListener('click',()=>{
    const video=getVideo();
if(video==null){
    return;
}

if(video.volume < 0.1){
    setToast("Min. Volume");
    return;
}

video.volume = video.volume-0.025;

setToast(Math.floor(video.volume * 100) + " %");
})





//************ Speed Up

const speedUp=document.querySelector("#speedUp");
const speedDown=document.querySelector("#speedDown");

speedUp.addEventListener("click",()=>{
    const video=getVideo();
    if(video==null){
        return;
    }
    if(video.playbackRate > 2.75){
        setToast("Max. Speed");
        return;
    }
    video.playbackRate+= 0.25;
 
    setToast(video.playbackRate + " X");

})

//*********** Speed Down

speedDown.addEventListener("click",()=>{
    const video=getVideo();
    if(video==null){
        return;
    }
    if(video.playbackRate < 0.26){
        setToast("Min. Speed");
        return;
    }
    video.playbackRate-= 0.25;

    
    setToast(video.playbackRate + " X");

})


// Toast.......................

const toast=document.querySelector(".toast");
function setToast(text){

    toast.textContent=text;
    toast.style.display="block";
    console.log(text)
    setTimeout(() => {
        toast.style.display="none";
    }, 3000);
}




// Full Screen.......................
const fullScreen = document.querySelector(".fa-expand");

fullScreen.addEventListener("click",()=>{
   const video=getVideo();
    
    if(video==null){
        return;
    }

    video.requestFullscreen();
})



// to get the timer time in proper format........................
const convertSeconds = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const min = Math.floor((seconds % 3600) / 60)
    const sec = Math.floor(seconds % 60);
    if (hours > 0) {
      return `${String(hours).padStart(2,'0')}:${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')} `
    } else {
      return `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`
    }

  }


//Porgress Bar.......................
const progress = document.getElementById("progress");
const timer = document.getElementById( "timer" );
 
function progressLoop() {
  setInterval(function () {
        const video=getVideo();

    progress.value = Math.round((video.currentTime / video.duration) * 100);


    timer.innerHTML =convertSeconds(video.currentTime);
    const totaldur = document.getElementById("totaldur");
totaldur.innerHTML =convertSeconds(video.duration);

});
}







//************ pause the video
const pause=document.querySelector('.fa-pause');
pause.addEventListener("click",()=>{
    const video=getVideo();
    if(video==null){
        return;
    }
   
    video.pause();
    pause.style.cssText="opacity:0; pointer-events:none;";
    play.style.cssText="opacity:1; pointer-events: auto;";
    
     
});


//************** play the video
const play=document.querySelector('.fa-play');
play.addEventListener("click",playfun=()=>{
    const video=getVideo();
    if(video==null){
        return;
    }
    video.play();
    pause.style.cssText="opacity:1; pointer-events:auto;";
    play.style.cssText="opacity:0; pointer-events: none;";
});