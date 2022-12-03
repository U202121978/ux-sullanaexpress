const seatingFeatures = document.querySelectorAll('.seating-feature');

function removeSelectedOfSeatingFeature(seatingFeature) {
  seatingFeature.classList.remove('seating-feature--selected');
}

function onSeatingFeaturesClick(evt) {
  seatingFeatures.forEach(removeSelectedOfSeatingFeature);
  evt.currentTarget.classList.add('seating-feature--selected');
}

seatingFeatures.forEach(seatingFeature => {
  seatingFeature.addEventListener('click', onSeatingFeaturesClick);
});

const seatingContainer = document.querySelector('.seatings');
// const total = parseInt(seatingContainer.attributes['data-total'].value);

const seatTemplate = document.getElementById('seat');
const seatTvTemplate = document.getElementById('seat-tv');
const seatEmptyTemplate = document.getElementById('seat-empty');

function getTemplateNode(tpl, nro) {
  if (typeof nro != 'undefined') {
    let html = tpl.innerHTML.replace(/\$nro/g, `${nro}`);
    let divTmp = document.createElement('div');
    divTmp.innerHTML = html;

    return divTmp.firstElementChild;
  } else {
    return tpl.content.cloneNode(true);
  }
}

let col = 20;
let rows = 5;
let tvs = [0, 5, 10, 15];
let total = col * rows;
let fragment = document.createDocumentFragment();
let seatCount = 0;

for (let i = 0; i < col; i++) {
  let ul = document.createElement('ul');

  for (let j = 0; j< rows; j++) {
    if (j == 2) { // En medio
      if (tvs.includes(i)) {
        ul.append(getTemplateNode(seatTvTemplate));
      } else {
        ul.append(getTemplateNode(seatEmptyTemplate));
      }
    } else {
      seatCount++;
      ul.append(getTemplateNode(seatTemplate, seatCount));
    }
  }

  fragment.appendChild(ul);
}

seatingContainer.appendChild(fragment);


