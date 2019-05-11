var playerVideo, view, timer;

var btnPlay, btnVol;

var h,m,s,ch,cm,cs;

var bar, loader, prog;

var pct, pctbar;  

var intervalTimer;

var full;

var ctrlBar;

function prepare(elem){
	if(playerVideo != elem){
		playerVideo = elem;
	    
		/*Elementos*/	
		ctrlBar = document.getElementById("vid");
		view = playerVideo.querySelector(".video-view");		
		timer = playerVideo.querySelector(".video-time");
		bar = playerVideo.querySelector(".video-progress-bar");
		loader = playerVideo.querySelector(".video-loader");
		prog = playerVideo.querySelector(".video-progress");
		full = playerVideo.querySelector(".video-screen");
		
		/*Eventos*/
		full.addEventListener("click", fullS);
		bar.addEventListener("click", seeker);
		view.addEventListener("mouseover", control);
		view.addEventListener("click", play);
		
		btnPlay = playerVideo.querySelector(".video-play");
		btnPlay.addEventListener("click", play);
		
		btnVol = playerVideo.querySelector(".video-volume");
		btnVol.addEventListener("click", volume);
		
		intervalTimer = setInterval(updateTimer, 100);
	}
}

function control2(){
	ctrlBar.style.opacity = "0";
}

function control(){
	if(playerVideo.onmouseover){
		ctrlBar.style.opacity = "1";
		ctrlBar.style.transitionDuration = "1s";
	}
	
}

function fullS(){
	if(!document.webkitFullscreenElement){
		playerVideo.webkitRequestFullscreen();
		full.style.backgroundImage = "url(_icons/full-exit-24.png)";
	}else{
		document.webkitExitFullscreen();
		full.style.backgroundImage = "url(_icons/full-24.png)";
	}
}


function play(){
    if(view.paused){
		  view.play();
		  btnPlay.style.backgroundImage = "url(_icons/pause-24.png)"
	} else{
		view.pause();
		btnPlay.style.backgroundImage = "url(_icons/play-24.png)"
	}
	view.onended = function(){
		btnPlay.style.backgroundImage = "url(_icons/play-24.png)"
	}
}

function volume(){
	if(view.muted){
		  view.muted = false;
		  btnVol.style.backgroundImage = "url(_icons/volume-24.png)"
	} else{
		view.muted = true;
		btnVol.style.backgroundImage = "url(_icons/mute-24.png)"
	}
}

function seeker(){	
	pctbar = (event.clientX / bar.clientWidth) * 100;
	view.currentTime = (view.duration * pctbar) / 100;	
}

function convertTime(hour, mins, secs){
	if(hour < 10 && hour > 0){
		hour = '0' + String(hour) + ":";
	} else{
		hour = ''; 
	}
	if(mins < 10){
		mins = '0' + String(mins);
	}else if(mins > 59){
		mins = Math.floor(mins % 60);
	}
	if(secs < 10){
		secs = '0' + String(secs);
	}
	
	return String(hour) + String(mins) + ":" + String(secs);
}

function updateTimer(){	
	bufferEnd = view.buffered.end(view.buffered.length - 1);
	
	loader.style.width = String((bufferEnd / view.duration) * 100)+'%';
	
	pct = (view.currentTime / view.duration) * 100;
	
	prog.style.width = String(pct)+'%';
	
	/*Duração do video*/	
	h = Math.floor(view.duration / 3600);
	m = Math.floor(view.duration / 60);
	s = Math.floor(view.duration %  60);
	
	/*Tempo decorrido*/
	ch = Math.floor(view.currentTime / 3600);
	cm = Math.floor(view.currentTime / 60);
	cs = Math.floor(view.currentTime % 60);
	
	timer.innerHTML = convertTime(ch,cm,cs)+ ' | '+convertTime(h,m,s);	
}	