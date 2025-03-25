document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Get DOM elements
    const modelsContainer = document.getElementById('models-container');
    const searchInput = document.getElementById('search-input');
    const categoriesContainer = document.querySelector('.flex.flex-wrap.gap-2');
    const closeModalBtn = document.getElementById('close-modal');
    const modal = document.getElementById('model-detail-modal');

    // Calculate model count and category count
    const modelCount = mentalModels.length;
    const categories = new Set(['全部']);
    mentalModels.forEach(model => categories.add(model.category));
    const categoryCount = categories.size - 1; // Subtract 1 to exclude '全部'

    // Update model and category count display
    const modelCountSpan = document.querySelector('.flex.items-center.space-x-2 span:first-child');
    const categoryCountSpan = document.querySelector('.flex.items-center.space-x-2 span:last-child');
    if (modelCountSpan) modelCountSpan.textContent = `${modelCount} 个模型`;
    if (categoryCountSpan) categoryCountSpan.textContent = `${categoryCount} 个分类`;
    
    // Clear existing category buttons
    categoriesContainer.innerHTML = '';
    
    // Create category buttons
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = `category-btn px-3 py-1.5 rounded-md ${category === '全部' ? 'bg-gray-900 text-white active' : 'bg-gray-100 hover:bg-gray-200 transition-colors'} text-sm font-medium`;
        button.textContent = category;
        categoriesContainer.appendChild(button);
    });
    
    // Get the dynamically created category buttons
    const categoryButtons = document.querySelectorAll('.category-btn');
    
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
            categoryButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.remove('bg-gray-900');
                btn.classList.remove('text-white');
                btn.classList.add('bg-gray-100');
            });
            button.classList.add('active');
            button.classList.add('bg-gray-900');
            button.classList.add('text-white');
            button.classList.remove('bg-gray-100');

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
