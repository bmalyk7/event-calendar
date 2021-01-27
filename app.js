"Use strict";

//elements//
const mainBlock = document.querySelector('.main_block'),
    table = document.querySelector('table'),
    createBtn = document.querySelector('.create_btn'),
    modalAdding = document.querySelector('.modal_adding'),
    modal = document.querySelector('.modal');
time = document.querySelectorAll('.time'),
    filter = document.querySelector('#filter'),
    inputDay = modalAdding.querySelector('#day'),
    eventName = modalAdding.querySelector('.event_name'),
    inputTime = modalAdding.querySelector('#time'),
    submit = modalAdding.querySelector('.submit'),
    cancel = modalAdding.querySelector('.cancel'),
    people = modalAdding.querySelector('#participants'),
    warningEvent = modalAdding.querySelector('.warning_event'),
    warningTime = modalAdding.querySelector('.warning_time'),
    title = document.querySelector('.quest_dlt');

const week = {
    'monday': document.querySelectorAll('.monday'),
    'tuesday': document.querySelectorAll('.tuesday'),
    'wednesday': document.querySelectorAll('.wednsday'),
    'thursday': document.querySelectorAll('.thursday'),
    'friday': document.querySelectorAll('.friday'),
}

let nodes = []
let persons = {
    'Anna, Jadwiga, Anrdzej': [],
    'Anastazja, Jędzrej, Dagmara': [],
    'Paulina, Dominika, Mateusz': [],
    'Agnieska, Ola, Alex': [],
    'Krzysztof, Dominik, Sebastian': []
}
let whichElement;

//functions//
function selectCell() {
    const arr = Array.from(time);
    const a = arr.map(item => item.textContent);
    let b = a.indexOf(inputTime.value);
    let c;
    for (let key in week) {
        if (key == inputDay.value.toLowerCase()) {
            if (eventName.value == '') {
                warningEvent.style.display = 'inline-block';
            }
            if (week[key][b].innerText != '') {
                warningTime.style.display = 'inline-block';
            }
            if (week[key][b].innerText == '' && eventName.value != '') {
                c = week[key][b];
                week[key][b].style.display = 'block';
                if (eventName.value.length > 10) {
                    week[key][b].innerText = eventName.value.slice(0, 10) + '...';
                } else {
                    week[key][b].innerText = eventName.value
                }
                warningTime.style.display = 'none';
                warningEvent.style.display = 'none';
                week[key][b].classList.add('filled');
                const elem = document.createElement('button');
                elem.innerHTML = '&#9747';
                week[key][b].append(elem);
                elem.classList.add('del_btn');
                nodes.push(week[key][b]);
                toggleModal()
            }
        }
    }
    for (let person in persons) {
        if (person == people.value && c != undefined) {
            persons[person].push(c);
        }
    }
}

function reset() {
    eventName.value = '';
    participants.value = 'Anna, Jadwiga, Anrdzej';
    inputDay.value = 'Monday';
    inputTime.value = '10:00';
}

function toggleModal() {
    modalAdding.classList.toggle('active')
    mainBlock.classList.toggle('noactive')
}

function toggleModalDelete() {
    modal.classList.toggle('active');
}


//Events//
createBtn.addEventListener('click', toggleModal)
cancel.addEventListener('click', e => {
    toggleModal();
    warningTime.style.display = 'none';
    warningEvent.style.display = 'none';
})



mainBlock.addEventListener('click', e => {
    let target = e.target;
    if (target && target.classList.contains('del_btn')) {
        toggleModalDelete();
        title.innerText = `Are you sure you want to delete "${target.parentElement.textContent.slice(0,target.parentElement.textContent.length - 1)}" event`;
        whichElement = target;
    }
})

modal.addEventListener('click', event => {
    const option = event.target;
    if (option && option.classList.contains('yes')) {
        whichElement.parentElement.classList.remove('filled');
        whichElement.parentElement.innerText = '';
        toggleModalDelete();
    }
    if (option && option.classList.contains('no')) {
        toggleModalDelete();
    }
})

submit.addEventListener('click', () => {
    selectCell();
    reset();
})

filter.addEventListener('change', () => {
    if (filter.value == 'All') {
        nodes.forEach(item => item.style.display = 'block');
    } else {
        for (let key in persons) {
            if (key == filter.value) {
                nodes.forEach(item => item.style.display = 'none');
                persons[key].forEach(item => item.style.display = 'block');
            }
        }
    }
})