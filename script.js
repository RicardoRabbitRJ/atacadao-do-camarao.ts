document.addEventListener('DOMContentLoaded', () => {

    // --- Data ---
    const products = [
        { name: "Camarão Médio", price: 39.99, unit: "Kg", type: "camarao", image: "assets/camcinza.png" },
        { name: "Camarão Médio Limpo", price: 79.99, unit: "Kg", type: "camarao", image: "assets/camcinzalimpo.png" },
        { name: "Camarão Grande", price: 54.99, unit: "Kg", type: "camarao", image: "assets/camcinzagd.png" },
        { name: "Camarão Grande Limpo", price: 109.99, unit: "Kg", type: "camarao", image: "assets/camcinzalimpo.png" },
        { name: "Filé de Salmão", price: 119.99, unit: "Kg", type: "peixe", image: "assets/salmaoemfile.png" },
        { name: "Posta de Salmão", price: 109.99, unit: "Kg", type: "peixe", image: "assets/salmaoemposta.png" },
        { name: "Filé de Tilápia", price: 59.99, unit: "Kg", type: "peixe", image: "assets/tilapiafile.png" },
        { name: "Filé de Linguado", price: 49.99, unit: "Kg", type: "peixe", image: "assets/linguadofile.png" },
        { name: "Filé de Merluza", price: 49.99, unit: "Kg", type: "peixe", image: "assets/merluzafile.png" },
        { name: "Filé de Truta", price: 39.99, unit: "Kg", type: "peixe", image: "assets/trutafile.png" },
        { name: "Filé de Pescadinha", price: 29.99, unit: "Kg", type: "peixe", image: "assets/pescadinhafile.png" },
        { name: "Corvina de Linha", price: 27.99, unit: "Kg", type: "peixe", image: "assets/corvina.png" },
        { name: "Tilápia Inteira", price: 27.99, unit: "Kg", type: "peixe", image: "assets/tilapiainteira.png" },
        { name: "Namorado", price: 29.99, unit: "Kg", type: "peixe", image: "assets/namoradointeiro.png" },
        { name: "Pescadinha Verdadeira", price: 24.99, unit: "Kg", type: "peixe", image: "assets/pescadinhaverdadeira.png" },
        { name: "Tambaqui", price: 24.99, unit: "Kg", type: "peixe", image: "assets/tambaqui.png" },
        { name: "Anchova", price: 39.99, unit: "Kg", type: "peixe", image: "assets/anchova.png" },
        { name: "Polvo", price: 59.99, unit: "Kg", type: "frutos_do_mar", image: "assets/polvo.png" },
        { name: "Sururu", price: 29.99, unit: "500g", type: "frutos_do_mar", image: "assets/sururu.png" },
        { name: "Mexilhão", price: 29.99, unit: "500g", type: "frutos_do_mar", image: "assets/mexilhao.png" },
        { name: "Siri", price: 24.99, unit: "Kg", type: "frutos_do_mar", image: "assets/siri.png" },
        { name: "Carne de Siri", price: 29.99, unit: "Kg", type: "frutos_do_mar", image: "assets/siricarne.png" },
        { name: "Lula Pequena", price: 29.99, unit: "Kg", type: "frutos_do_mar", image: "assets/lula.png" },
        { name: "Bacalhau Imperial", price: 74.99, unit: "Kg", type: "peixe", image: "assets/bacalhau.png" },
        { name: "Bolinho de Bacalhau", price: 39.99, unit: "Kg", type: "frutos_do_mar", image: "assets/bolinhodebacalhaucru.png" },
        { name: "Bolinho de Bacalhau (Frito)", price: 54.99, unit: "Kg", type: "frutos_do_mar", image: "assets/bolinhodebacalhau.png" },
        { name: "Kani", price: 14.99, unit: "Pacote 250g", type: "frutos_do_mar", image: "assets/kani.png" }
    ];

    let cart = [];

    // --- DOM Elements ---
    const productsList = document.getElementById('products-list');
    const searchInput = document.getElementById('productSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalDisplay = document.getElementById('cart-total-display');
    const cartCountBadge = document.querySelector('.cart-count');
    const cartTotalBadge = document.querySelector('.cart-total'); // Fixed selector
    const whatsappForm = document.getElementById('whatsapp-order-form');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const deliveryMethodSelect = document.getElementById('delivery-method');
    const addressFields = document.getElementById('address-fields');

    // --- Components ---

    function renderProduct(product) {
        // For placeholder images since we don't have real ones
        const bgColors = ['#e3f2fd', '#ffebee', '#e8f5e9', '#fff3e0'];
        const randomBg = bgColors[Math.floor(Math.random() * bgColors.length)];

        // Simulating an image if the file doesn't exist (browser will show broken img icon, but let's make it graceful with CSS background if possible or just accept it)
        // Ideally we'd valid check or use a placeholder service
        const imgUrl = product.image;

        return `
            <div class="product-card" data-type="${product.type}" data-aos="fade-up">
                <div class="product-image" style="background-color: ${randomBg}; display: flex; align-items: center; justify-content: center;">
                    <!-- Placeholder text/icon if image fails -->
                    <i class="fa-solid fa-fish" style="font-size: 3rem; color: rgba(0,0,0,0.1);"></i>
                    <img src="${imgUrl}" alt="${product.name}" onerror="this.style.display='none'" style="position: absolute; top:0; left:0; width:100%; height:100%;">
                </div>
                <div class="product-details">
                    <h3>${product.name}</h3>
                    <p class="description">Fresco e selecionado. ${product.unit}</p>
                    <div class="price-action">
                        <span class="price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                        <button class="btn-add" onclick="addToCart('${product.name}', ${product.price}, '${product.unit}')">
                            <i class="fa-solid fa-cart-plus"></i> Adicionar
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    function renderProducts(filter = 'all', searchTerm = '') {
        productsList.innerHTML = '';
        const lowerTerm = searchTerm.toLowerCase();

        const filtered = products.filter(p => {
            const matchesType = filter === 'all' || p.type === filter;
            const matchesSearch = p.name.toLowerCase().includes(lowerTerm);
            return matchesType && matchesSearch;
        });

        if (filtered.length === 0) {
            productsList.innerHTML = '<p class="text-center" style="width: 100%; grid-column: 1/-1;">Nenhum produto encontrado.</p>';
            return;
        }

        filtered.forEach(p => {
            productsList.innerHTML += renderProduct(p);
        });

        // Refresh animations for new elements
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }

    function updateCartUI() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let count = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Seu carrinho está vazio.</p>';
        } else {
            cart.forEach((item, index) => {
                const itemTotal = item.price * item.qty;
                total += itemTotal;
                count += item.qty;

                const cartItemHTML = `
                    <div class="cart-item">
                        <div class="item-info">
                            <h4>${item.name}</h4>
                            <span class="item-price">R$ ${item.price.toFixed(2).replace('.', ',')} / ${item.unit}</span>
                        </div>
                        <div class="item-controls">
                            <div class="qty-btn" onclick="updateQty(${index}, -1)">-</div>
                            <span>${item.qty}</span>
                            <div class="qty-btn" onclick="updateQty(${index}, 1)">+</div>
                            <button class="remove-btn" onclick="removeFromCart(${index})"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                `;
                cartItemsContainer.innerHTML += cartItemHTML;
            });
        }

        const formattedTotal = `R$ ${total.toFixed(2).replace('.', ',')}`;
        cartTotalDisplay.textContent = formattedTotal;
        cartCountBadge.textContent = count;
        if (cartTotalBadge) cartTotalBadge.textContent = formattedTotal;
    }

    // --- Global Actions (Exposed to window) ---

    window.addToCart = (name, price, unit) => {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.qty++;
        } else {
            cart.push({ name, price, unit, qty: 1 });
        }
        updateCartUI();

        // Simple visual feedback
        const btn = event.target.closest('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Adicionado';
        btn.classList.add('btn-secondary');
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('btn-secondary');
        }, 1000);
    };

    window.updateQty = (index, change) => {
        if (cart[index].qty + change > 0) {
            cart[index].qty += change;
        } else {
            // Optional: Confirm removal? Or just remove if qty goes to 0
            // For now, let's just keep it at 1 minimum via this button, user can use delete button
        }
        updateCartUI();
    };

    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        updateCartUI();
    };

    // --- Search & Filter Listeners ---

    searchInput.addEventListener('input', (e) => {
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        renderProducts(activeFilter, e.target.value);
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts(btn.dataset.filter, searchInput.value);
        });
    });

    // --- Mobile Menu ---

    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-xmark');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        });
    });

    // --- Delivery Logic ---
    if (deliveryMethodSelect) { // Check existence
        deliveryMethodSelect.addEventListener('change', (e) => {
            const pickupTimeGroup = document.getElementById('pickup-time-group');
            const pickupTimeInput = document.getElementById('pickup-time');

            if (e.target.value === 'retirada') {
                addressFields.style.display = 'none';
                document.querySelectorAll('#address-fields input').forEach(input => input.required = false);

                // Show pickup time and make required
                if (pickupTimeGroup) {
                    pickupTimeGroup.style.display = 'block';
                    pickupTimeInput.required = true;
                }
            } else {
                addressFields.style.display = 'block';
                document.querySelectorAll('#address-fields input').forEach(input => {
                    // restore required if it was required. Simplifying by making core ones required
                    if (input.id !== 'customer-complement') input.required = true;
                });

                // Hide pickup time and not required
                if (pickupTimeGroup) {
                    pickupTimeGroup.style.display = 'none';
                    pickupTimeInput.required = false;
                }
            }
        });
    }

    // --- CEP Auto-fill ---
    const cepInput = document.getElementById('customer-cep');
    if (cepInput) {
        cepInput.addEventListener('blur', async (e) => {
            const cep = e.target.value.replace(/\D/g, '');

            if (cep.length === 8) {
                // Show loading state
                document.getElementById('customer-address').value = 'Buscando...';
                document.getElementById('customer-district').value = 'Buscando...';

                try {
                    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                    const data = await response.json();

                    if (!data.erro) {
                        document.getElementById('customer-address').value = data.logradouro;
                        document.getElementById('customer-district').value = data.bairro;
                        // Focus on number field for better UX
                        document.getElementById('customer-number').focus();
                    } else {
                        alert('CEP não encontrado.');
                        document.getElementById('customer-address').value = '';
                        document.getElementById('customer-district').value = '';
                    }
                } catch (error) {
                    console.error('Erro ao buscar CEP:', error);
                    alert('Erro ao buscar o CEP. Por favor, preencha o endereço manualmente.');
                    document.getElementById('customer-address').value = '';
                    document.getElementById('customer-district').value = '';
                }
            }
        });

        // Format CEP while typing
        cepInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 5) {
                value = value.substring(0, 5) + '-' + value.substring(5, 8);
            }
            e.target.value = value;
        });
    }

    // --- WhatsApp Order ---

    whatsappForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            alert('Seu carrinho está vazio! Adicione produtos antes de finalizar.');
            return;
        }

        const name = document.getElementById('customer-name').value;
        const phone = document.getElementById('customer-phone').value;
        const method = document.getElementById('delivery-method').value;
        const payment = document.getElementById('payment-method').value;
        const notes = document.getElementById('order-notes').value;

        // Date and Time
        const now = new Date();
        const dateTimeStr = now.toLocaleString('pt-BR');
        const dateKey = now.toISOString().split('T')[0]; // YYYY-MM-DD

        // Daily Order Number Logic
        let orderData = JSON.parse(localStorage.getItem('atacadao_daily_order')) || { date: dateKey, count: 0 };

        if (orderData.date !== dateKey) {
            orderData = { date: dateKey, count: 1 };
        } else {
            orderData.count++;
        }
        localStorage.setItem('atacadao_daily_order', JSON.stringify(orderData));

        const orderNumber = `#${dateKey.replace(/-/g, '')}-${String(orderData.count).padStart(3, '0')}`;

        // Customer Order Count Logic
        let customerOrderCount = parseInt(localStorage.getItem('atacadao_customer_order_count')) || 0;
        customerOrderCount++;
        localStorage.setItem('atacadao_customer_order_count', customerOrderCount);

        // Address
        let addressText = '';
        if (method === 'delivery') {
            const cep = document.getElementById('customer-cep').value;
            const address = document.getElementById('customer-address').value;
            const number = document.getElementById('customer-number').value;
            const district = document.getElementById('customer-district').value;
            const complement = document.getElementById('customer-complement').value;
            addressText = `*Endereço de Entrega:*\n${address}, ${number} - ${district}\nCEP: ${cep}\n${complement ? `Comp: ${complement}` : ''}`;
        } else {
            const pickupTime = document.getElementById('pickup-time').value;
            addressText = `*Método:* Retirada na Loja\n*Previsão de Retirada:* ${pickupTime}`;
        }

        // Cart items
        let itemsText = '';
        let total = 0;
        cart.forEach(item => {
            itemsText += `- ${item.qty}x ${item.name} (R$ ${item.price.toFixed(2)})\n`;
            total += item.price * item.qty;
        });

        // Construct Message
        const message = `
*NOVO PEDIDO - FEITO PELO SITE*
*Pedido Nº:* ${orderNumber}
*Data:* ${dateTimeStr}
*Pedido do Cliente Nº:* ${customerOrderCount}

*Cliente:* ${name}
*Telefone:* ${phone}

*Pedido:*
${itemsText}
*Total:* R$ ${total.toFixed(2).replace('.', ',')}

${addressText}

*Forma de Pagamento:* ${payment}
${notes ? `*Observações:* ${notes}` : ''}
        `.trim();

        const encodedMessage = encodeURIComponent(message);
        const whatsappNumber = '5521965596209';

        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    });

    // --- Initial Render ---
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true
        });
    }
    // --- Hero Carousel Logic ---
    const carouselItems = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideInterval = 10000; // 10 seconds

    function showSlide(index) {
        carouselItems.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        carouselItems[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let next = (currentSlide + 1) % carouselItems.length;
        showSlide(next);
    }

    // Auto-rotate
    let autoSlide = setInterval(nextSlide, slideInterval);

    // Manual control via dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(autoSlide);
            showSlide(index);
            // Restart auto-rotate after manual intervention
            autoSlide = setInterval(nextSlide, slideInterval);
        });
    });

    renderProducts();
});
