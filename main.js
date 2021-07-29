import {convert} from './vid.js';



let input = document.querySelector("#inp");
let loader =  document.querySelector("#loading");
let a =  document.querySelector("#link");


async function convertToAudio() {
    loader.classList.remove("d-none");
    loader.classList.add('d-block')
    let sourceVideoFile = input.files[0];
    let targetAudioFormat = 'mp3'
    let convertedAudioDataObj = await convert(sourceVideoFile, targetAudioFormat);

    downloadAudio(convertedAudioDataObj)
}


function downloadAudio(convertedAudioDataObj) {
    
    loading.classList.remove("d-block");
    loading.classList.add('d-none');
    a.classList.remove('d-none');
    a.classList.add('d-flex');

    a.textContent = "Download " + convertedAudioDataObj.format + " version";
    a.href = convertedAudioDataObj.data;
    a.download = convertedAudioDataObj.name + "." + convertedAudioDataObj.format;
    
 
}

inp.addEventListener('change', convertToAudio, this);