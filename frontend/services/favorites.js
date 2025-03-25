class Favorites {
    constructor(cardFlipper) {
        this.cardFlipper = cardFlipper;
        this.favoritesBtn = document.getElementById('favorites-btn');
        this.modalFavoriteBtn = document.getElementById('modal-favorite');
        this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        this.showingFavorites = false;
        this.setupEventListeners();
        this.updateFavoritesButtonState();
    }

    setupEventListeners() {
        this.favoritesBtn.addEventListener('click', this.toggleFavoritesView.bind(this));
        this.modalFavoriteBtn.addEventListener('click', this.toggleFavorite.bind(this));
    }

    toggleFavoritesView() {
        this.showingFavorites = !this.showingFavorites;
        
        if (this.showingFavorites) {
            const favoriteModels = this.cardFlipper.models.filter(model => 
                this.favorites.includes(model.id)
            );
            this.cardFlipper.renderCards(favoriteModels);
            this.favoritesBtn.classList.add('bookmark-active');
        } else {
            this.cardFlipper.renderCards();
            this.favoritesBtn.classList.remove('bookmark-active');
        }
    }

    toggleFavorite(event) {
        const modelId = parseInt(event.currentTarget.dataset.id);
        const index = this.favorites.indexOf(modelId);
        
        if (index === -1) {
            // Add to favorites
            this.favorites.push(modelId);
            event.currentTarget.classList.add('bookmark-active');
        } else {
            // Remove from favorites
            this.favorites.splice(index, 1);
            event.currentTarget.classList.remove('bookmark-active');
        }
        
        // Update localStorage
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        
        // Update UI if in favorites view
        if (this.showingFavorites) {
            this.toggleFavoritesView();
            this.toggleFavoritesView();
        }
        
        this.updateFavoritesButtonState();
    }

    updateFavoritesButtonState() {
        if (this.favorites.length > 0) {
            this.favoritesBtn.innerHTML = `
                <i data-lucide="bookmark" class="w-4 h-4"></i>
                <span>收藏 (${this.favorites.length})</span>
            `;
        } else {
            this.favoritesBtn.innerHTML = `
                <i data-lucide="bookmark" class="w-4 h-4"></i>
                <span>收藏</span>
            `;
        }
        lucide.createIcons();
    }
}
