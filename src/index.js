import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorElement = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');


function toggleLoader(showLoader) {
  loader.style.display = showLoader ? 'block' : 'none';
}


function toggleError(showError) {
  errorElement.style.display = showError ? 'block' : 'none';
}


async function populateBreeds() {
  try {
    toggleLoader(true);
    const breeds = await fetchBreeds();
    breedSelect.innerHTML = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('');
  } catch (error) {
    toggleError(true);
  } finally {
    toggleLoader(false);
  }
}


async function displayCatInfo(breedId) {
  try {
    toggleLoader(true);
    const catData = await fetchCatByBreed(breedId);
    const cat = catData[0];
    catInfo.innerHTML = `
      <img src="${cat.url}" alt="${cat.breeds[0].name}">
      <p><strong>Breed:</strong> ${cat.breeds[0].name}</p>
      <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
      <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
    `;

    toggleError(false);
  } catch (error) {
    toggleError(true);
  } finally {
    toggleLoader(false);
  }
}


breedSelect.addEventListener('change', (event) => {
  const selectedBreedId = event.target.value;
  displayCatInfo(selectedBreedId);
});


populateBreeds();