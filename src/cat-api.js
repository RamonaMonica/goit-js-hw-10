import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_TPU41bUoCRIhLNE91UJ0y8prpDsKliDP8cC316SmEh53NEjl5Li29IPgDJyNAFEr';

  export async function fetchBreeds() {
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/breeds');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  export async function fetchCatByBreed(breedId) {
    try {
      const response = await axios.get(
        `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }  