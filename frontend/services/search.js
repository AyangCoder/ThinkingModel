class Search {
    constructor(inputElement, cardFlipper) {
        this.inputElement = inputElement;
        this.cardFlipper = cardFlipper;
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.inputElement.addEventListener('input', this.handleSearch.bind(this));
        this.inputElement.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.clearSearch();
            }
        });
    }

    handleSearch() {
        const query = this.inputElement.value.trim();
        this.cardFlipper.filterBySearch(query);
    }

    clearSearch() {
        this.inputElement.value = '';
        this.cardFlipper.filterBySearch('');
    }
}
