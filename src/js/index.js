import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('#placeholderSingle');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showError() {
  Notiflix.Report.failure(
    'Error',
    'Oops! Something went wrong! Try reloading the page!'
  );
}

function hideCatInfo() {
  catInfo.style.display = 'none';
}

function clearCatInfo() {
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

function updateCatInfo(cat) {
  const catElement = document.createElement('div');
  catElement.classList.add('cat-container');

  const image = document.createElement('img');
  image.setAttribute('src', cat.url);
  image.alt = 'Cat';
  image.classList.add('cat-image');
  catElement.appendChild(image);

  const catDetails = document.createElement('div');
  catDetails.classList.add('cat-details');

  const breedName = document.createElement('h2');
  breedName.textContent = cat.breeds[0].name;
  breedName.classList.add('cat-title');
  catDetails.appendChild(breedName);

  const description = document.createElement('p');
  description.textContent = cat.breeds[0].description;
  description.classList.add('cat-description');
  catDetails.appendChild(description);

  const temperament = document.createElement('p');
  temperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;
  temperament.classList.add('cat-temperament');
  catDetails.appendChild(temperament);

  catElement.appendChild(catDetails);

  catInfo.innerHTML = '';
  catInfo.appendChild(catElement);
}

function handleBreedSelectChange() {
  const selectedBreedId = breedSelect.value;

  hideCatInfo();
  clearCatInfo();
  showLoader();

  fetchCatByBreed(selectedBreedId)
    .then(cat => {
      updateCatInfo(cat);
      hideLoader();
      catInfo.style.display = 'flex';
      catInfo.style.justifyContent = 'center';
      
    })
    .catch(error => {
      hideLoader();
      showError();
    });
}

fetchBreeds()
  .then(breeds => {
    populateBreedSelect(breeds);
    hideLoader();
  })
  .catch(error => {
    hideLoader();
    showError();
  });
