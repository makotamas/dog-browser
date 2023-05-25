import '../css/contentComponent.css';

export default class contentComponent {
  displayError(message) {
    this.clearErrors();
    const popupMessage = document.createElement('h2');
    popupMessage.classList.add('error-message');
    popupMessage.textContent = message;
    document.querySelector('.errors').appendChild(popupMessage);
  }

  clearErrors() {
    const errors = document.querySelector('.errors');
    errors.innerHTML = '';
  }

  clearContent() {
    const errors = document.querySelector('#content');
    errors.innerHTML = '';
  }

  handleToSearch() {
    const searchTerm = document.querySelector('#dogSearchInput').value.toLowerCase();
    if (!searchTerm) {
      this.displayError('Please enter a search term');
      return;
    }
    let count = document.querySelector('#imageNumberInput').value;
    Number(count);
    Math.floor(count);
    if (!Number(count)) {
      count = 1;
    }
    this.clearContent();
    for (let i = 0; i < count; i++) {
      this.getImages(searchTerm)
        .then((imageList) => {
          if (imageList) {
            this.displayImage(imageList);
          } else {
            this.displayError('Breed not found. Please try to list the breeds first.');
          }
        })
        .catch((error) => {
          this.displayError('Something went wrong. Please try again later.');
          console.error(error);
        });
    }
  }
}
