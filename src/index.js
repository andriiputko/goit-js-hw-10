import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";

const catInfo = document.querySelector(".cat-info");
const breedSelect = document.querySelector("#placeholderSingle");
const loader = document.querySelector(".loader");
const selectContainer = document.querySelector(".breed-select")


function showLoad() {
  loader.style.display = 'block';
  selectContainer.style.display = 'none';
}

function hideLoad() {
  loader.style.display = 'none';
  selectContainer.style.display = 'block';
}

function seeError() {
  Notiflix.Report.failure(
    'Error',
    'Oops! Something went wrong! Try reloading the page!'
  );
}

function hideCI() {
  catInfo.style.display = 'none';
}

function clearCI() {
  catInfo.innerHTML = '';
}

function populateBreedSelect(breeds) {
  const options = breeds.map(breed => ({
    value: breed.id,
    text: breed.name,
  }));

  new SlimSelect({
    select: '#placeholderSingle',
    data: options,
    settings: {
      placeholderText: 'Select a breed',
    }
  });

  breedSelect.addEventListener('change', handleBreedSelectChange);
}

function updateCI(cat) {
  const catEl = document.createElement('div');
  catEl.classList.add('cat-cont');

  const image = document.createElement('img');
  image.setAttribute('src', cat.url);
  image.alt = 'Cat';
  image.classList.add('cat-image');
  catEl.appendChild(image);

  const catDetail = document.createElement('div');
  catDetail.classList.add('cat-detail');

  const breedName = document.createElement('h2');
  breedName.textContent = cat.breed[0].name;
  breedName.classList.add('cat-title');
  catDetail.appendChild(breedName);

  const description = document.createElement('p');
  description.textContent = cat.breeds[0].description;
  description.classList.add('cat-description');
  catDetail.appendChild(description);

  const temperament = document.createElement('p');
  temperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;
  temperament.classList.add('cat-temperament');
  catDetail.appendChild(temperament);

  catElement.appendChild(catDetail);

  catInfo.innerHTML = '';
  catInfo.appendChild(catElement);
}

function handleBreedSelectChange() {
  const selectBreedId = breedSelect.value;
  hideCI();
  clearCI();
  showLoad();

  fetchCatByBreed(selectBreedId)
    .then(cat => {
      updateCI(cat);
      hideLoad();
      catInfo.style.display = 'flex';
      catInfo.style.justifyContent = 'center';
    })
    .catch(error => {
      hideLoad();
      seeError();
    });
}

fetchBreeds()
  .then(breeds => {
    populateBreedSelect(breeds);
    hideLoad();
  })
  .catch(error => {
    hideLoad();
    seeError();
  });
