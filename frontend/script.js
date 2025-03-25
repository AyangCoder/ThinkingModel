document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Get DOM elements
    const modelsContainer = document.getElementById('models-container');
    const searchInput = document.getElementById('search-input');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const closeModalBtn = document.getElementById('close-modal');
    const modal = document.getElementById('model-detail-modal');
    
    // Initialize card flipper
    const cardFlipper = new CardFlipper(modelsContainer, mentalModels);
    
    // Initialize search functionality
    const search = new Search(searchInput, cardFlipper);
    
    // Initialize favorites functionality
    const favorites = new Favorites(cardFlipper);
    
    // Render all cards initially (with a slight delay to allow for transition effects)
    setTimeout(() => {
        cardFlipper.renderCards();
    }, 500);
    
    // Set up category filtering
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button state
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter cards
            const category = button.textContent;
            cardFlipper.filterByCategory(category);
        });
    });
    
    // Modal close functionality
    closeModalBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Keyboard shortcut to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = 'auto';
        }
    });
});
