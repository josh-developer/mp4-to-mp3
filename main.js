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
    let name =  document.querySelector("#name");
    name.value = convertedAudioDataObj.name;
    
    name.classList.remove("d-none");
    name.classList.add("d-block");
    loading.classList.remove("d-block");
    loading.classList.add('d-none');
    a.classList.remove('d-none');
    a.classList.add('d-flex');

    a.textContent = "Download " + convertedAudioDataObj.format + " version";
    a.href = convertedAudioDataObj.data;
   
    a.addEventListener('click', _ =>{       
        convertedAudioDataObj.name = name.value;
        a.download = convertedAudioDataObj.name + "." + convertedAudioDataObj.format;
    })
 
}

inp.addEventListener('change', convertToAudio, this);