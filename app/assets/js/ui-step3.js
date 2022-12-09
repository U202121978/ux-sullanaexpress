function onFocus(evt) {
    let control = evt.target.closest('.control');
    control.classList.add('focus');
}

function onLeave(evt) {
    let control = evt.target.closest('.control');
    control.classList.remove('focus');
}

function onInput(evt) {
    let control = evt.target.closest('.control');
    
    if (evt.target.value) {
        control.classList.add('hasValue');
    } else {
        control.classList.remove('hasValue');
    }
}

const inputTexts = document.querySelectorAll([
    '.control input[type="text"]',
    '.control select'
].join(','));

inputTexts.forEach(input => {
    input.addEventListener('focus', onFocus);
    input.addEventListener('focusout', onLeave);
    input.addEventListener('input', onInput);
});
