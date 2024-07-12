
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
    video.setAttribute("class","myvedio");
    video.volume= 0;
});

//********************* Volume UP *******************/


const volumeUp=document.querySelector("#volumeUp");
const volumeDown=document.querySelector("#volumeDown");
volumeUp.addEventListener('click',()=>{
    const video=document.querySelector(".myvedio");
console.log(video);
video.volume=video.volume + 0.25;`~`
})


