import { convert } from './vid.js';


let input = getEl("#inp");
let loader = getEl("#loading");
let a = getEl("#link");
let audio_name_box = getEl("#name-box");
let audio_name = getEl("#name");


async function convertToAudio() {

    toggleClassBetween(loader, 'd-block', 'd-none')

    let sourceVideoFile = input.files[0];
    let targetAudioFormat = 'mp3'
    let convertedAudioDataObj = await convert(sourceVideoFile, targetAudioFormat);

    downloadAudio(convertedAudioDataObj);
}


function downloadAudio(convertedAudioDataObj) {
    audio_name.value = convertedAudioDataObj.name;

    toggleClassBetween(audio_name_box, 'd-block', 'd-none')
    toggleClassBetween(loading, 'd-none', 'd-block')
    toggleClassBetween(a, 'd-flex', 'd-none')

    a.textContent = "Download " + convertedAudioDataObj.format + " version";
    a.href = convertedAudioDataObj.data;

    a.addEventListener('click', _ => {
        convertedAudioDataObj.name = audio_name.value;
        a.download = convertedAudioDataObj.name + "." + convertedAudioDataObj.format;

        setTimeout(() => {
            toggleClassBetween(a, 'd-none', 'd-flex')
            toggleClassBetween(audio_name_box, 'd-none', 'd-flex')

            input.value = ''
            audio_name.value = ''

        }, 100);
    })

}

inp.addEventListener('change', convertToAudio, this);




// helper functions

function toggleClassBetween(target, add, remove) {
    target.classList.add(add);
    target.classList.remove(remove);

}

function getEl(by) {
    return document.querySelector(by);
}