const apiKey =
  'live_A0BddCBCvw3bx0QQ33fvXeI93mVx6l59VBUsyj7uHjfZvkQnUvjiGTaolms8FVAg';

export function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds', {
    headers: {
      'x-api-key': apiKey,
    },
  }).then(response => response.json());
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=${apiKey}`;

  return fetch(url, {
    headers: {
      'x-api-key': apiKey,
    },
  })
    .then(response => response.json())
    .then(data => data[0]);
}
