import '../css/listBreedsComponent.css';
import ContentComponent from '../contentComponent/contentComponent.js';

class ListBreeds extends ContentComponent {
  constructor() {
    super();
    this.render();
  }

  // Task 3
  async getFullList() {
    // localStorage ellenőrzése
    if (localStorage.getItem('dogBreedsList')) {
      // Betöltés a localStorage-ról, amennyiben létezik
      return JSON.parse(localStorage.getItem('dogBreedsList'));
    } else {
      // Ha nincs adat, lekérjük az API-ról
      const response = await fetch('https://dog.ceo/api/breeds/list/all');
      if (!response.ok) {
        throw new Error('API response error');
      }
      const data = await response.json();
      localStorage.setItem('dogBreedsList', JSON.stringify(data.message));
      return data.message;
    }
  }

  /**
   * displays a single breed
   * @param {string} breedName - name of the breed
   */
  createListItem(breedName) {
    const item = document.createElement('div');
    item.classList.add('breed-list-item');
    item.textContent = breedName;
    document.querySelector('#content').appendChild(item);
  }

  /**
   * displays the list of breeds
   * @param {object} breedList - object containing the list of breeds
   */
  displayList(breedList) {
    for (let breed in breedList) {
      if (breedList[breed].length !== 0) {
        // if the breed has sub-breeds
        for (const subBreed of breedList[breed]) {
          this.createListItem(`${subBreed} ${breed}`);
        }
      } else {
        this.createListItem(breed);
      }
    }
  }

  render() {
    const button = document.createElement('button');
    button.classList.add('list-button');
    button.textContent = 'List Breeds';
    button.addEventListener('click', () => {
      this.clearContent();
      this.getFullList()
        .then((breedList) => {
          //        👇 short circuit evaluation
          breedList && this.displayList(breedList);
        })
        .catch((error) => {
          this.displayError('Error listing breeds :( please try again later.');
          console.log(error);
        });
    });
    document.querySelector('#header').appendChild(button);
  }
}

export default ListBreeds;
