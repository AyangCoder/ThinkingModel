class CardFlipper {
    constructor(container, models) {
        this.container = container;
        this.models = models;
        this.currentModels = [...models];
    }

    createCard(model) {
        const card = document.createElement('div');
        card.className = 'flip-card h-[180px]';
        card.dataset.id = model.id;
        card.dataset.category = model.category;

        // 创建卡片内部结构
        const cardInner = document.createElement('div');
        cardInner.className = 'flip-card-inner';
        
        // 创建卡片正面
        const cardFront = document.createElement('div');
        cardFront.className = 'flip-card-front p-4';
        
        const frontContent = document.createElement('div');
        const frontTitle = document.createElement('h3');
        frontTitle.className = 'text-lg font-medium mb-2';
        frontTitle.textContent = model.name;
        
        const frontDesc = document.createElement('p');
        frontDesc.className = 'text-gray-600 text-sm line-clamp-3';
        frontDesc.textContent = model.definition;
        
        frontContent.appendChild(frontTitle);
        frontContent.appendChild(frontDesc);
        
        const frontFooter = document.createElement('div');
        frontFooter.className = 'mt-auto pt-3';
        
        const frontCategory = document.createElement('span');
        frontCategory.className = 'inline-block px-2 py-0.5 bg-gray-100 rounded-md text-xs font-medium text-gray-600';
        frontCategory.textContent = model.category;
        
        frontFooter.appendChild(frontCategory);
        
        cardFront.appendChild(frontContent);
        cardFront.appendChild(frontFooter);
        
        // 创建卡片背面
        const cardBack = document.createElement('div');
        cardBack.className = 'flip-card-back p-4';
        
        const backTitle = document.createElement('h3');
        backTitle.className = 'text-lg font-medium mb-2';
        backTitle.textContent = model.name;
        
        const backDesc = document.createElement('p');
        backDesc.className = 'text-sm text-gray-600 mb-2';
        backDesc.textContent = model.principle;
        
        const backFooter = document.createElement('div');
        backFooter.className = 'mt-auto pt-2 flex justify-between items-center';
        
        const backCategory = document.createElement('span');
        backCategory.className = 'inline-block px-2 py-0.5 bg-gray-100 rounded-md text-xs font-medium text-gray-600';
        backCategory.textContent = model.category;
        
        const detailBtn = document.createElement('button');
        detailBtn.className = 'text-xs text-gray-500 hover:text-gray-900';
        detailBtn.textContent = '详情';
        
        backFooter.appendChild(backCategory);
        backFooter.appendChild(detailBtn);
        
        cardBack.appendChild(backTitle);
        cardBack.appendChild(backDesc);
        cardBack.appendChild(backFooter);
        
        // 组装卡片
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        card.addEventListener('click', () => this.openModal(model));
        return card;
    }

    renderCards(models = this.currentModels) {
        this.container.innerHTML = '';
        models.forEach(model => {
            this.container.appendChild(this.createCard(model));
        });
    }

    filterByCategory(category) {
        if (category === '全部') {
            this.currentModels = [...this.models];
        } else {
            this.currentModels = this.models.filter(model => model.category === category);
        }
        this.renderCards();
    }

    filterBySearch(query) {
        if (!query.trim()) {
            this.currentModels = [...this.models];
        } else {
            const lowerQuery = query.toLowerCase();
            this.currentModels = this.models.filter(model => 
                model.name.toLowerCase().includes(lowerQuery) || 
                model.definition.toLowerCase().includes(lowerQuery) ||
                model.principle.toLowerCase().includes(lowerQuery) ||
                model.application.toLowerCase().includes(lowerQuery)
            );
        }
        this.renderCards();
    }

    openModal(model) {
        const modal = document.getElementById('model-detail-modal');
        
        // Fill modal content
        document.getElementById('modal-title').textContent = model.name;
        document.getElementById('modal-definition').textContent = model.definition;
        document.getElementById('modal-principle').textContent = model.principle;
        document.getElementById('modal-application').textContent = model.application;
        document.getElementById('modal-example').textContent = model.example;
        document.getElementById('modal-quote').textContent = model.quote;
        document.getElementById('modal-category').textContent = model.category;

        // Update favorite button state
        const favoriteBtn = document.getElementById('modal-favorite');
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (favorites.includes(model.id)) {
            favoriteBtn.classList.add('bookmark-active');
        } else {
            favoriteBtn.classList.remove('bookmark-active');
        }

        // Set up favorite toggle
        favoriteBtn.dataset.id = model.id;
        
        // Show modal
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
    }
}
