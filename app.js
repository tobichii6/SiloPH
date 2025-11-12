document.addEventListener("DOMContentLoaded", () => {

    
    const productDatabase = [
        {
            id: 1,
            name: "The Sanctuary Sweater",
            price: 699.00,
            image: "https://uploads.onecompiler.io/4438u64ww/4438u3mt4/6.png", 
            description: "Your peace is your power. Our premium off-white crewneck, made with pure cotton, and for comfort. Our wordmark on the left chest serves a silent reminder to protect your serenity."
        },
        {
            id: 2,
            name: 'The "Breathe" Oversized Shirt',
            price: 599.00,
            image: "https://uploads.onecompiler.io/4438u64ww/4438u3mt4/Breath%20Back%20Shirt.png", 
            description: "A light stone tee is made from soft, quality cotton. Includes a monochromatic Silo icon and \"your space to breathe\" below, it motivates a mindful pause in your day."
        },
        {
            id: 3,
            name: "'Inhale, Exhale' Sweater",
            price: 799.00,
            image: "https://uploads.onecompiler.io/4438u64ww/4438u3mt4/inexHALE%20Sweater.png", 
            description: "Breathe in, breathe out. The inexHALE sweater, in a soothing mustard tone, is made from ultra-soft cotton for effortless comfort. It gives a gentle nudge toward mindfulness and balance throughout the day."
        },
        {
            id: 4,
            name: 'The "Insulate" Joggers',
            price: 599.00,
            image: "https://uploads.onecompiler.io/4438u64ww/4438u3mt4/7.png", 
            description: "Move with comfort, rest with purpose. The Insulate jogger in a calming olive green tone, is crafted for both flexibility and ease. Made from premium fabric that balances softness and durability, it offers a relaxed fit that moves with you. Detailed with the logo “Silo” that serves as a reminder to protect your inner peace and stay grounded – in motion and in stillness alike."
        },
        {
            id: 5,
            name: "Nostos Hoodie",
            price: 799.00,
            image: "https://uploads.onecompiler.io/4438u64ww/4438u3mt4/NOSTOS%20HOODIE.png", 
            description: "Journey inward, find home. Our soft, pastel blue hoodie. This piece symbolizes the introspective journey back to one's true self and inner sanctuary."
        },
        {
            id: 6,
            name: "The 'Stillness' Cap",
            price: 399.00,
            images: [
                "https://uploads.onecompiler.io/4438u64ww/4438u3mt4/14.png", // White
                "https://uploads.onecompiler.io/4438u64ww/4438u3mt4/11.png", // Olive greEn
                "https://uploads.onecompiler.io/4438u64ww/4438u3mt4/12.png", // Navy blue
                "https://uploads.onecompiler.io/4438u64ww/4438u3mt4/13.png"  // RED
            ],
            swatches: [
                { color: "#FFFFFF", name: "White" },
                { color: "#556B2F", name: "Olive Green" },
                { color: "#36454F", name: "Navy Blue" }, 
                { color: "#B22222", name: "Red" }
            ],
            description: "Find calm in motion. The Stillness cap is crafted from double cotton twill and designed to bring balance to your everyday wear. Featuring “Stillness” embroidered that serves as a quiet reminder to pause, breathe, and stay centered -– even in the busiest moments. Available in three tones: Olive green for grounded focus, Deep Navy for quiet strength, and Ember Red for mindful energy."
        },
        {
            id: 7,
            name: "The 'MHM' Shirt",
            price: 499.00,
            image: "https://uploads.onecompiler.io/4438u64ww/4438u3mt4/8.png", 
            description: "Wear your voice for change. The Mental Health Matter shirt, in a soft cream is crafted from high quality cotton for everyday comfort. Featuring a bold graphic and a smiley face that carries a message that resonates: “Transforming stigma into understanding”."
        },
        {
            id: 8,
            name: "The 'Silo' Shirt",
            price: 399.00,
            image: "https://uploads.onecompiler.io/4438u64ww/4438u3mt4/9.png", 
            description: "Stand strong in simplicity. The vibrant blue tee, made from high-quality cotton, carries the brand “Silo” on the chest. Designed for those who move with confidence, it reflects strength, clarity, and presence."
        },
        {
            id: 9,
            name: "The 'Pulse' Shirt",
            price: 399.00,
            image: "https://uploads.onecompiler.io/4438u64ww/4438u3mt4/10.png", 
            description: "Feel the rhythm of purpose. The Pulse shirt, in striking red. Made from premium cotton, it features the “Silo” on the front and an intricate back design symbolizing vitality, connection, and movement. A wearable expression of life in motion — steady, strong, and full of intent."
        }
    ];

    // --- GLOBAL USER & CART LOGIC ---
    let cart = JSON.parse(sessionStorage.getItem('siloCart')) || [];
    let currentUser = JSON.parse(sessionStorage.getItem('siloCurrentUser')) || null;
    let orderHistory = JSON.parse(sessionStorage.getItem('siloOrderHistory')) || [];

    const cartLink = document.getElementById("cart-link");
    const accountNavLink = document.getElementById("account-nav-link");

    function updateCartCount() {
        let totalItems = 0;
        cart.forEach(item => {
            totalItems += item.quantity;
        });
        if (cartLink) {
            cartLink.textContent = `Cart (${totalItems})`;
        }
    }

    function saveCart() {
        sessionStorage.setItem('siloCart', JSON.stringify(cart));
        updateCartCount();
    }

    function saveOrderHistory() {
        sessionStorage.setItem('siloOrderHistory', JSON.stringify(orderHistory));
    }

    function checkLoginStatus() {
        if (currentUser) {
            if (accountNavLink) {
                accountNavLink.textContent = "My Account";
            }
        } else {
            if (accountNavLink) {
                accountNavLink.textContent = "Account";
            }
        }
    }

    updateCartCount();
    checkLoginStatus();


    
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    function addItemToCart(event) {
        const button = event.target.closest('.add-to-cart'); 
        if (!button) return; 

        
        if (button.id === 'product-detail-add-to-cart-btn') {
            return;
        }

        const id = button.dataset.id;
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);
        const image = button.dataset.image;

        if (!id || !name || !price || !image) {
            console.error("Add to Cart button is missing required data attributes.");
            return;
        }

        
        const itemFullName = name + " (M)";

        const existingItem = cart.find(item => item.name === itemFullName && item.image === image);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id: id, name: itemFullName, price: price, quantity: 1, image: image });
        }
        
        saveCart();
        
        const btnText = button.querySelector('.btn-text');
        if (btnText) {
            const originalText = btnText.textContent;
            btnText.textContent = "Added!";
            setTimeout(() => {
                btnText.textContent = originalText;
            }, 1500);
        } else {
            const originalText = button.textContent;
            button.textContent = "Added!";
            setTimeout(() => {
                button.textContent = originalText;
            }, 1500);
        }
    }

    addToCartButtons.forEach(button => {
        button.addEventListener("click", addItemToCart);
    });

    
    
    const shopGrid = document.getElementById("shop-product-grid");
    if (shopGrid) {
        const productsWithSwatches = productDatabase.filter(p => p.swatches);

        productsWithSwatches.forEach(product => {
            const swatchContainer = document.getElementById(`swatches-${product.id}`);
            if (swatchContainer) {
                product.swatches.forEach(swatch => {
                    const swatchEl = document.createElement('div');
                    swatchEl.classList.add('swatch');
                    swatchEl.style.backgroundColor = swatch.color;
                    swatchEl.title = swatch.name; 
                    swatchContainer.appendChild(swatchEl);
                });
            }
        });
    }


    
    const cartItemsContainer = document.getElementById("cart-items-container");
    if (cartItemsContainer) { 
        
        const cartSubtotalEl = document.getElementById("cart-subtotal");
        const cartShippingEl = document.getElementById("cart-shipping");
        const cartTotalEl = document.getElementById("cart-total");
        const cartEmptyMessage = document.getElementById("cart-empty-message");
        const checkoutForm = document.getElementById("checkout-form");
        const checkoutLoginPrompt = document.getElementById("checkout-login-prompt");
        const placeOrderBtn = document.getElementById('place-order-btn');
        const formatCurrency = (amount) => `₱${amount.toFixed(2)}`;
        
        const checkoutAddressInput = document.getElementById('checkout-address');

        
        const paymentCod = document.getElementById('payment-cod');
        const paymentEwallet = document.getElementById('payment-ewallet');
        const paymentCard = document.getElementById('payment-card');
        
        
        const cardDetails = document.getElementById('card-details');
        const ewalletDetails = document.getElementById('ewallet-details');
        const ewalletNumberContainer = document.getElementById('ewallet-number-container');

        
        const paymentGcash = document.getElementById('payment-gcash');
        const paymentMaya = document.getElementById('payment-maya');
        const ewalletNumberInput = document.getElementById('checkout-ewallet-number');

        
        const paymentBdo = document.getElementById('payment-bdo');
        const paymentBpi = document.getElementById('payment-bpi');
        const cardNameInput = document.getElementById('checkout-card-name');
        const cardNumberInput = document.getElementById('checkout-card-number');
        const cardExpiryInput = document.getElementById('checkout-card-expiry');


        
        if (currentUser) {
            
            if (checkoutAddressInput && currentUser.address) {
                checkoutAddressInput.value = currentUser.address;
            }
            const defaultPayment = currentUser.defaultPaymentType;
            if (defaultPayment) {
                if (defaultPayment === "Cash on Delivery") {
                    paymentCod.checked = true;
                } 
                else if (defaultPayment === "E-Wallet (GCash/Maya)") {
                    paymentEwallet.checked = true;
                    ewalletDetails.style.display = 'block';
                    
                    if (currentUser.defaultEwalletType === "GCash") {
                        paymentGcash.checked = true;
                    } else if (currentUser.defaultEwalletType === "Maya") {
                        paymentMaya.checked = true;
                    }
                    if (currentUser.defaultEwalletNumber) {
                        ewalletNumberContainer.style.display = 'block';
                        ewalletNumberInput.value = currentUser.defaultEwalletNumber;
                    }
                } 
                else if (defaultPayment === "Credit/Debit Card") {
                    paymentCard.checked = true;
                    cardDetails.style.display = 'block';
                    
                    if (currentUser.defaultCardType === "BDO") {
                        paymentBdo.checked = true;
                    } else if (currentUser.defaultCardType === "BPI") {
                        paymentBpi.checked = true;
                    }
                    if (currentUser.defaultCardName) {
                        cardNameInput.value = currentUser.defaultCardName;
                    }
                    if (currentUser.defaultCardNumber) {
                        cardNumberInput.value = currentUser.defaultCardNumber;
                    }
                    if (currentUser.defaultCardExpiry) {
                        cardExpiryInput.value = currentUser.defaultCardExpiry;
                    }
                }
            }
        }

        if (cardExpiryInput) {
            cardExpiryInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                    e.target.value = value.slice(0, 2) + '/' + value.slice(2, 4);
                } else {
                    e.target.value = value;
                }
            });
        }
        
        function updateCartQuantity(key, newQuantity) {
            const quantity = parseInt(newQuantity);
            if (quantity < 1) {
                cart = cart.filter(item => item.name !== key);
            } else {
                const item = cart.find(item => item.name === key);
                if (item) {
                    item.quantity = quantity;
                }
            }
            saveCart();
            renderCartItems();
        }
        
        function handleCartClick(event) {
            const target = event.target;
            const key = target.dataset.key;
            if (!key) return;

            if (target.classList.contains('remove-item')) {
                updateCartQuantity(key, 0);
            }
            if (target.classList.contains('qty-btn')) {
                const action = target.dataset.action;
                const item = cart.find(item => item.name === key);
                if (!item) return;
                if (action === 'increase') {
                    updateCartQuantity(key, item.quantity + 1);
                } else if (action === 'decrease') {
                    updateCartQuantity(key, item.quantity - 1);
                }
            }
        }
        function handleCartInput(event) {
            const target = event.target;
            if (target.classList.contains('qty-input')) {
                const key = target.dataset.key;
                let value = parseInt(target.value);
                if (isNaN(value) || value < 1) {
                    value = 1;
                }
                updateCartQuantity(key, value);
            }
        }
        
        function renderCartItems() {
            cartItemsContainer.innerHTML = '';
            let subtotal = 0;
            if (cart.length === 0) {
                cartEmptyMessage.style.display = 'block';
                if (checkoutForm) checkoutForm.style.display = 'none';
                if (checkoutLoginPrompt) checkoutLoginPrompt.style.display = 'none';
            } else {
                cartEmptyMessage.style.display = 'none';
                if (checkoutForm) checkoutForm.style.display = 'grid';
                cart.forEach(item => {
                    const itemEl = document.createElement('div');
                    itemEl.classList.add('cart-item');

                    const itemKey = item.name.replace(/"/g, '&quot;');

                    itemEl.innerHTML = `
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <p>${formatCurrency(item.price)}</p>
                            <button class="remove-item" data-key="${itemKey}">Remove</button>
                        </div>
                        <div class="cart-item-quantity">
                            <button class="qty-btn" data-key="${itemKey}" data-action="decrease">-</button>
                            <input type="number" class="qty-input" data-key="${itemKey}" value="${item.quantity}" min="1">
                            <button class="qty-btn" data-key="${itemKey}" data-action="increase">+</button>
                        </div>
                        <div class="cart-item-total">
                            ${formatCurrency(item.price * item.quantity)}
                        </div>
                    `;
                    cartItemsContainer.appendChild(itemEl);
                    subtotal += item.price * item.quantity;
                });
            }
            const shipping = (subtotal > 0) ? 50.00 : 0.00;
            const total = subtotal + shipping;
            cartSubtotalEl.textContent = formatCurrency(subtotal);
            cartShippingEl.textContent = formatCurrency(shipping);
            cartTotalEl.textContent = formatCurrency(total);
            if (!currentUser && cart.length > 0) {
                if (checkoutLoginPrompt) checkoutLoginPrompt.style.display = 'block';
                if (placeOrderBtn) placeOrderBtn.disabled = true;
            } else {
                if (checkoutLoginPrompt) checkoutLoginPrompt.style.display = 'none';
                if (placeOrderBtn) placeOrderBtn.disabled = false;
            }
        }
        
        if (cartItemsContainer) {
            cartItemsContainer.addEventListener('click', handleCartClick);
            cartItemsContainer.addEventListener('input', handleCartInput);
        }
        renderCartItems();

        if (checkoutForm) {
            checkoutForm.addEventListener('change', (e) => {
                
                if (e.target.name === 'payment') {
                    if (paymentCod.checked) {
                        cardDetails.style.display = 'none';
                        ewalletDetails.style.display = 'none';
                        ewalletNumberContainer.style.display = 'none'; 
                    } else if (paymentEwallet.checked) {
                        cardDetails.style.display = 'none';
                        ewalletDetails.style.display = 'block';
                    } else if (paymentCard.checked) {
                        cardDetails.style.display = 'block';
                        ewalletDetails.style.display = 'none';
                        ewalletNumberContainer.style.display = 'none';
                    }
                }

                if (e.target.name === 'ewallet-type') {
                    if (paymentGcash.checked || paymentMaya.checked) {
                        ewalletNumberContainer.style.display = 'block';
                    }
                }
            });

            checkoutForm.addEventListener('submit', (e) => {
                e.preventDefault(); 
                if (!currentUser) {
                    alert("Please log in to place an order.");
                    return;
                }

                if (paymentCard.checked) {
                    if (!paymentBdo.checked && !paymentBpi.checked) {
                        alert("Please select a card type (BDO or BPI).");
                        return;
                    }
                    const cardName = document.getElementById('checkout-card-name').value;
                    const cardNumber = document.getElementById('checkout-card-number').value;
                    const cardExpiry = document.getElementById('checkout-card-expiry').value;
                    if (!cardName || !cardNumber || !cardExpiry) {
                        alert("Please fill in all credit card details.");
                        return;
                    }
                    const expiryPattern = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
                    if (!expiryPattern.test(cardExpiry)) {
                        alert("Please enter a valid expiry date in MM/YY format.");
                        return;
                    }
                }
                
                if (paymentEwallet.checked) {
                    if (!paymentGcash.checked && !paymentMaya.checked) {
                        alert("Please select an e-wallet type (GCash or Maya).");
                        return;
                    }
                    const ewalletNumber = document.getElementById('checkout-ewallet-number').value;
                    if (!ewalletNumber || ewalletNumber.length < 11) {
                        alert("Please enter a valid 11-digit mobile number.");
                        return;
                    }
                }

                const selectedPayment = document.querySelector('input[name="payment"]:checked');
                if (!selectedPayment) { 
                    alert("Please select a payment method.");
                    return;
                }

                const orderEmail = currentUser.email;
                const orderName = currentUser.name;
                
                const orderAddress = document.getElementById('checkout-address').value;
                
                const randomId = 'SILO-' + Math.random().toString(36).substring(2, 8).toUpperCase();
                const orderDate = new Date();
                const arrivalDate = new Date(new Date().setDate(orderDate.getDate() + 5)).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                
                let subtotal = 0;
                cart.forEach(item => {
                    subtotal += item.price * item.quantity;
                });
                const shipping = (subtotal > 0) ? 50.00 : 0.00;
                const total = subtotal + shipping;

                const newOrder = {
                    id: randomId,
                    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                    arrival: arrivalDate,
                    status: "Pending",
                    items: cart,
                    paymentMethod: selectedPayment.value,
                    subtotal: subtotal,
                    shipping: shipping,
                    total: total,
                    userName: orderName, 
                    userEmail: orderEmail,
                    userAddress: orderAddress
                };
                orderHistory.push(newOrder);
                saveOrderHistory();
                sessionStorage.setItem('siloLastOrderID', randomId);
                cart = [];
                saveCart();
                window.location.href = 'confirmation.html';
            });
        }
    }

    const faqQuestions = document.querySelectorAll(".faq-question");
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener("click", () => {
                const item = question.parentElement;
                item.classList.toggle("active");
            });
        });
    }

    const fadeSections = document.querySelectorAll(".fade-in-section");
    if (fadeSections.length > 0) {
        const observerOptions = {
            root: null,
            threshold: 0.1,
        };

        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeSections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    const carousel = document.querySelector(".scroll-carousel-container");
    if (carousel) {
        const carouselItems = document.querySelectorAll(".carousel-item");
        const carouselObserverOptions = {
            root: carousel,
            threshold: 0.6,
        };
        const carouselObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                entry.target.classList.toggle("is-active", entry.isIntersecting);
            });
        }, carouselObserverOptions);
        carouselItems.forEach(item => {
            carouselObserver.observe(item);
        });

        let isDown = false;
        let startX;
        let scrollLeft;
        let velocity = 0;
        let lastX;
        let rafID; 

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.classList.add('is-dragging', 'is-dragging-js');
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
            lastX = e.pageX;
            velocity = 0;
            if (rafID) cancelAnimationFrame(rafID);
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault(); 
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2; 
            carousel.scrollLeft = scrollLeft - walk;
            const currentX = e.pageX;
            velocity = (currentX - lastX) * 2; 
            lastX = currentX;
        });

        const stopDragging = () => {
            if (!isDown) return; 
            isDown = false;
            carousel.classList.remove('is-dragging');
            startMomentumScroll();
        };

        carousel.addEventListener('mouseup', stopDragging);
        carousel.addEventListener('mouseleave', stopDragging); 

        function startMomentumScroll() {
            const friction = 0.95; 
            const minVelocity = 0.5; 

            function momentumLoop() {
                carousel.scrollLeft -= velocity;
                velocity *= friction; 
                if (Math.abs(velocity) > minVelocity) {
                    rafID = requestAnimationFrame(momentumLoop);
                } else {
                    carousel.classList.remove('is-dragging-js');
                }
            }
            
            if (Math.abs(velocity) > minVelocity) {
                rafID = requestAnimationFrame(momentumLoop);
            } else {
                carousel.classList.remove('is-dragging-js');
            }
        }
    }
    
    
    const orderIdEl = document.getElementById('order-id');
    if (orderIdEl) { 
        
        
        const pageHeader = document.querySelector('.page-header h1');
        const backBtn = document.getElementById('back-to-dashboard-link');
        const thankYouMsg = document.querySelector('.order-details h2');
        const subtitleMsg = document.querySelector('.order-details .order-subtitle');
        const continueBtn = document.getElementById('continue-shopping-btn');

        const params = new URLSearchParams(window.location.search);
        const urlOrderID = params.get('orderID');
        const lastOrderID = sessionStorage.getItem('siloLastOrderID');
        
        const orderIDToFind = urlOrderID || lastOrderID;

        if(urlOrderID) {
            if(pageHeader) pageHeader.textContent = "Order Details";
            if(backBtn) backBtn.style.display = "inline-block";
            if(thankYouMsg) thankYouMsg.style.display = 'none';
            if(subtitleMsg) subtitleMsg.style.display = 'none';
            if(continueBtn) continueBtn.style.display = 'none';
        } else {
            if(backBtn) backBtn.style.display = 'none';
            if(continueBtn) continueBtn.style.display = 'block';
            
            if (lastOrderID) {
                sessionStorage.removeItem('siloLastOrderID');
            }
        }


        const recentOrder = orderHistory.find(order => order.id === orderIDToFind);
        const formatCurrency = (amount) => `₱${amount.toFixed(2)}`;

        if (recentOrder) {
            orderIdEl.textContent = recentOrder.id;
            document.getElementById('order-date').textContent = recentOrder.arrival;
            if (!urlOrderID) {
                document.getElementById('order-user-name').textContent = recentOrder.userName;
            }
            document.getElementById('order-address').textContent = recentOrder.userAddress;
            const itemsContainer = document.getElementById('order-items-container');
            const totalSummaryContainer = document.getElementById('order-total-summary');

            itemsContainer.innerHTML = '';
            totalSummaryContainer.innerHTML = '';

            recentOrder.items.forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.classList.add('order-summary-item');
                itemEl.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="order-summary-item-details">
                        <h4>${item.name}</h4>
                        <p>Quantity: ${item.quantity}</p>
                    </div>
                    <p class="order-summary-item-total">${formatCurrency(item.price * item.quantity)}</p>
                `;
                itemsContainer.appendChild(itemEl);
            });
            totalSummaryContainer.innerHTML = `
                <p>Subtotal: <span>${formatCurrency(recentOrder.subtotal)}</span></p>
                <p>Shipping: <span>${formatCurrency(recentOrder.shipping)}</span></p>
                <p>Payment Method: <span>${recentOrder.paymentMethod}</span></p>
                <h3>Total: <span>${formatCurrency(recentOrder.total)}</span></h3>
            `;
            
            updateCartCount();
        } else {
            document.querySelector('.order-details').innerHTML = "<h2>Order Not Found</h2><p>Please <a href='shop.html'>return to the shop</a> or <a href='account.html'>check your account</a> for past orders.</p>";
        }
    }

    const accountPage = document.querySelector('.account-page');
    if (accountPage) { 
        const accountLoginView = document.getElementById('account-login-view');
        const accountDashboardView = document.getElementById('account-dashboard-view');
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');
        const logoutBtn = document.getElementById('logout-btn');
        
        const pendingOrdersContainer = document.getElementById('pending-orders-container');
        const noPendingOrdersMessage = document.getElementById('no-pending-orders-message');
        const orderHistoryContainer = document.getElementById('order-history-container');
        const noOrderHistoryMessage = document.getElementById('no-order-history-message');

        const accountHeaderTitle = document.getElementById('account-header-title');
        const accountHeaderSubtitle = document.getElementById('account-header-subtitle');
        
        const settingsForm = document.getElementById('settings-form');
        const settingsName = document.getElementById('settings-name');
        const settingsEmail = document.getElementById('settings-email');
        const settingsAddress = document.getElementById('settings-address'); 
        const settingsPassword = document.getElementById('settings-password'); 
        
        const settingsPaymentCod = document.getElementById('settings-payment-cod');
        const settingsPaymentEwallet = document.getElementById('settings-payment-ewallet');
        const settingsPaymentCard = document.getElementById('settings-payment-card');
        
        const settingsEwalletDetails = document.getElementById('settings-ewallet-details');
        const settingsEwalletNumberContainer = document.getElementById('settings-ewallet-number-container');
        const settingsPaymentGcash = document.getElementById('settings-payment-gcash');
        const settingsPaymentMaya = document.getElementById('settings-payment-maya');
        const settingsEwalletNumber = document.getElementById('settings-ewallet-number');

        const settingsCardDetails = document.getElementById('settings-card-details');
        const settingsPaymentBdo = document.getElementById('settings-payment-bdo');
        const settingsPaymentBpi = document.getElementById('settings-payment-bpi');
        const settingsCardName = document.getElementById('settings-card-name');
        const settingsCardNumber = document.getElementById('settings-card-number');
        const settingsCardExpiry = document.getElementById('settings-card-expiry');
        
        if (settingsCardExpiry) {
            settingsCardExpiry.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) {
                    e.target.value = value.slice(0, 2) + '/' + value.slice(2, 4);
                } else {
                    e.target.value = value;
                }
            });
        }
        
        const formatCurrency = (amount) => `₱${amount.toFixed(2)}`;
        
        function displayAccountPage() {
            const loginBtn = loginForm ? loginForm.querySelector('.btn-primary') : null;
            const signupBtn = signupForm ? signupForm.querySelector('.btn-primary') : null;
            if (loginBtn) loginBtn.classList.remove('is-success');
            if (signupBtn) signupBtn.classList.remove('is-success');
            
            currentUser = JSON.parse(sessionStorage.getItem('siloCurrentUser')) || null;
            orderHistory = JSON.parse(sessionStorage.getItem('siloOrderHistory')) || [];

            if (currentUser) {
                accountLoginView.style.display = 'none';
                accountDashboardView.style.display = 'flex';
                
                const justLoggedIn = sessionStorage.getItem('siloJustLoggedIn');
                if (justLoggedIn === 'true') {
                    accountHeaderTitle.textContent = `Welcome Back, ${currentUser.name}`;
                    accountHeaderSubtitle.textContent = 'You are now logged in.';
                    sessionStorage.removeItem('siloJustLoggedIn');
                } else {
                    accountHeaderTitle.textContent = 'My Dashboard';
                    accountHeaderSubtitle.textContent = `Welcome back, ${currentUser.name}.`;
                }

                settingsName.value = currentUser.name;
                settingsEmail.value = currentUser.email;
                settingsAddress.value = currentUser.address || ""; 
                settingsPassword.value = "";
                
                const defaultPayment = currentUser.defaultPaymentType;
                
                settingsEwalletDetails.style.display = 'none';
                settingsEwalletNumberContainer.style.display = 'none';
                settingsCardDetails.style.display = 'none';
                
                settingsPaymentCod.checked = false;
                settingsPaymentEwallet.checked = false;
                settingsPaymentCard.checked = false;
                settingsPaymentGcash.checked = false;
                settingsPaymentMaya.checked = false;
                settingsPaymentBdo.checked = false;
                settingsPaymentBpi.checked = false;
                
                settingsEwalletNumber.value = currentUser.defaultEwalletNumber || "";
                if (currentUser.defaultEwalletType === "GCash") {
                    settingsPaymentGcash.checked = true;
                    settingsEwalletNumberContainer.style.display = 'block';
                } else if (currentUser.defaultEwalletType === "Maya") {
                    settingsPaymentMaya.checked = true;
                    settingsEwalletNumberContainer.style.display = 'block';
                }
                
                settingsCardName.value = currentUser.defaultCardName || "";
                settingsCardNumber.value = currentUser.defaultCardNumber || "";
                settingsCardExpiry.value = currentUser.defaultCardExpiry || "";
                if (currentUser.defaultCardType === "BDO") {
                    settingsPaymentBdo.checked = true;
                } else if (currentUser.defaultCardType === "BPI") {
                    settingsPaymentBpi.checked = true;
                }

                if (defaultPayment === "Cash on Delivery") {
                    settingsPaymentCod.checked = true;
                } 
                else if (defaultPayment === "E-Wallet (GCash/Maya)") {
                    settingsPaymentEwallet.checked = true;
                    settingsEwalletDetails.style.display = 'block';
                } 
                else if (defaultPayment === "Credit/Debit Card") {
                    settingsPaymentCard.checked = true;
                    settingsCardDetails.style.display = 'block';
                }
                
                renderPendingOrders();
                renderOrderHistory();

            } else {
                accountLoginView.style.display = 'block';
                accountDashboardView.style.display = 'none';
                accountHeaderTitle.textContent = 'My Account';
                accountHeaderSubtitle.textContent = 'Login or create an account to manage your orders.';
            }
        }

        function renderPendingOrders() {
            if (!pendingOrdersContainer) return;
            pendingOrdersContainer.innerHTML = '';
            
            const pending = orderHistory.filter(order => order.status === "Pending");
            
            if (pending.length === 0) {
                noPendingOrdersMessage.style.display = 'block';
            } else {
                noPendingOrdersMessage.style.display = 'none';
                pending.slice().reverse().forEach(order => {
                    const orderEl = document.createElement('div');
                    orderEl.classList.add('order-history-item');

                    orderEl.innerHTML = `
                        <a href="confirmation.html?orderID=${order.id}" class="order-item-info-link">
                            <div class="order-item-info">
                                <h4>Order: ${order.id}</h4>
                                <p>Arrival: ${order.arrival}</p>
                                <p>Total: ${formatCurrency(order.total)}</p>
                                <p>Status: ${order.status}</p>
                            </div>
                        </a>
                        <div class="order-item-actions">
                            <button class="btn btn-primary mark-received-btn" data-id="${order.id}">Mark as Received</button>
                            <button class="cancel-order-btn" data-id="${order.id}">Cancel Order</button>
                        </div>
                    `;
                    pendingOrdersContainer.appendChild(orderEl);
                });
            }
        }

        function renderOrderHistory() {
            if (!orderHistoryContainer) return;
            orderHistoryContainer.innerHTML = '';
            
            const history = orderHistory.filter(order => order.status === "Delivered" || order.status === "Cancelled");
            
            if (history.length === 0) {
                noOrderHistoryMessage.style.display = 'block';
            } else {
                noOrderHistoryMessage.style.display = 'none';
                history.slice().reverse().forEach(order => {
                    const orderEl = document.createElement('div');
                    orderEl.classList.add('order-history-item');

                    orderEl.innerHTML = `
                        <a href="confirmation.html?orderID=${order.id}" class="order-item-info-link">
                            <div class="order-item-info">
                                <h4>Order: ${order.id}</h4>
                                <p>Date: ${order.date}</p>
                                <p>Total: ${formatCurrency(order.total)}</p>
                                <p>Status: ${order.status}</p>
                            </div>
                        </a>
                        <div class="order-item-actions">
                            <button class="remove-order-btn" data-id="${order.id}">Remove</button>
                        </div>
                    `;
                    orderHistoryContainer.appendChild(orderEl);
                });
            }
        }
        
        if (pendingOrdersContainer) {
            pendingOrdersContainer.addEventListener('click', (e) => {
                const orderId = e.target.dataset.id;
                if (!orderId) return;

                const orderIndex = orderHistory.findIndex(order => order.id === orderId);
                if (orderIndex === -1) return;

                if (e.target.classList.contains('cancel-order-btn')) {
                    e.preventDefault(); 
                    orderHistory[orderIndex].status = "Cancelled";
                }
                else if (e.target.classList.contains('mark-received-btn')) {
                    e.preventDefault(); 
                    orderHistory[orderIndex].status = "Delivered";
                }
                
                saveOrderHistory();
                renderPendingOrders();
                renderOrderHistory();
            });
        }
        
        if (orderHistoryContainer) {
            orderHistoryContainer.addEventListener('click', (e) => {
                const orderId = e.target.dataset.id;
                if (!orderId) return;

                if (e.target.classList.contains('remove-order-btn')) {
                    e.preventDefault(); 
                    
                    orderHistory = orderHistory.filter(order => order.id !== orderId);
                    
                    saveOrderHistory();
                    renderOrderHistory();
                }
            });
        }
        
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const signupBtn = signupForm.querySelector('.btn-primary'); 
                const name = document.getElementById('signup-name').value;
                const email = document.getElementById('signup-email').value;
                const password = document.getElementById('signup-password').value; 
                
                let userDatabase = JSON.parse(sessionStorage.getItem('siloUserDatabase')) || [];

                const existingUser = userDatabase.find(user => user.email === email);
                if (existingUser) {
                    alert("An account with this email already exists. Please log in.");
                    return; 
                }

                const newUser = { 
                    name: name, 
                    email: email, 
                    password: password, 
                    address: "",
                    defaultPaymentType: "",
                    defaultEwalletType: "",
                    defaultEwalletNumber: "",
                    defaultCardType: "",
                    defaultCardName: "",
                    defaultCardNumber: "",
                    defaultCardExpiry: ""
                };
                userDatabase.push(newUser);
                sessionStorage.setItem('siloUserDatabase', JSON.stringify(userDatabase)); 

                currentUser = newUser;
                sessionStorage.setItem('siloCurrentUser', JSON.stringify(currentUser)); 
                sessionStorage.setItem('siloJustLoggedIn', 'true');
                
                signupBtn.classList.add('is-success');
                setTimeout(() => {
                    displayAccountPage(); 
                    checkLoginStatus();
                }, 1000); 
            });
        }
        
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const loginBtn = loginForm.querySelector('.btn-primary'); 
                const btnText = loginBtn.querySelector('.btn-text');
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;
                
                let userDatabase = JSON.parse(sessionStorage.getItem('siloUserDatabase')) || [];
                
                loginForm.classList.remove('is-error');
                btnText.textContent = 'Login'; 
                
                const foundUser = userDatabase.find(user => user.email === email && user.password === password);
                
                if (foundUser) {
                    currentUser = foundUser;
                    sessionStorage.setItem('siloCurrentUser', JSON.stringify(currentUser));
                    sessionStorage.setItem('siloJustLoggedIn', 'true');
                    
                    loginBtn.classList.add('is-success');
                    setTimeout(() => {
                        displayAccountPage(); 
                        checkLoginStatus(); 
                    }, 1000); 
                } else {
                    loginForm.classList.add('is-error');
                    btnText.textContent = 'Invalid';
                    setTimeout(() => {
                        loginForm.classList.remove('is-error');
                        btnText.textContent = 'Login';
                    }, 1500);
                }
            });
        }
        
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                currentUser = null;
                sessionStorage.removeItem('siloCurrentUser'); 
                sessionStorage.removeItem('siloJustLoggedIn');

                logoutBtn.classList.add('is-success');
                setTimeout(() => {
                    displayAccountPage(); 
                    checkLoginStatus();
                    logoutBtn.classList.remove('is-success'); 
                }, 1000); 
            });
        }
        
        if (settingsForm) {
            settingsForm.addEventListener('change', (e) => {

                if (e.target.name === 'settings-payment') {
                    if (settingsPaymentCod.checked) {
                        settingsCardDetails.style.display = 'none';
                        settingsEwalletDetails.style.display = 'none';
                        settingsEwalletNumberContainer.style.display = 'none';
                    } else if (settingsPaymentEwallet.checked) {
                        settingsCardDetails.style.display = 'none';
                        settingsEwalletDetails.style.display = 'block';
                    } else if (settingsPaymentCard.checked) {
                        settingsCardDetails.style.display = 'block';
                        settingsEwalletDetails.style.display = 'none';
                        settingsEwalletNumberContainer.style.display = 'none';
                    }
                }

                if (e.target.name === 'settings-ewallet-type') {
                    if (settingsPaymentGcash.checked || settingsPaymentMaya.checked) {
                        settingsEwalletNumberContainer.style.display = 'block';
                    }
                }
            });
        }


        if (settingsForm) {
            settingsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const saveBtn = settingsForm.querySelector('.btn-primary');
                

                const newName = settingsName.value;
                const newAddress = settingsAddress.value;
                const newPassword = settingsPassword.value;
                
                const selectedPayment = document.querySelector('input[name="settings-payment"]:checked');
                
                let paymentType = "";
                let ewalletType = "";
                let ewalletNum = "";
                let cardType = "";
                let cardName = "";
                let cardNum = "";
                let cardExp = "";

                if (selectedPayment) {
                    paymentType = selectedPayment.value;
                    if (paymentType === "E-Wallet (GCash/Maya)") {
                        const selectedEwallet = document.querySelector('input[name="settings-ewallet-type"]:checked');
                        if (selectedEwallet) {
                            ewalletType = selectedEwallet.value;
                        }
                        ewalletNum = settingsEwalletNumber.value;
                    } else if (paymentType === "Credit/Debit Card") {
                         const selectedBank = document.querySelector('input[name="settings-card-type"]:checked');
                        if (selectedBank) {
                            cardType = selectedBank.value;
                        }
                        cardName = settingsCardName.value;
                        cardNum = settingsCardNumber.value;
                        cardExp = settingsCardExpiry.value;
                    }
                }
                
                let userDatabase = JSON.parse(sessionStorage.getItem('siloUserDatabase')) || [];
                
                const userIndex = userDatabase.findIndex(user => user.email === currentUser.email);

                if (userIndex > -1) {
                    userDatabase[userIndex].name = newName;
                    userDatabase[userIndex].address = newAddress;
                    
                    if (newPassword !== "") {
                        userDatabase[userIndex].password = newPassword;
                    }
                    
                    userDatabase[userIndex].defaultPaymentType = paymentType;
                    userDatabase[userIndex].defaultEwalletType = ewalletType;
                    userDatabase[userIndex].defaultEwalletNumber = ewalletNum;
                    userDatabase[userIndex].defaultCardType = cardType;
                    userDatabase[userIndex].defaultCardName = cardName;
                    userDatabase[userIndex].defaultCardNumber = cardNum;
                    userDatabase[userIndex].defaultCardExpiry = cardExp;
                    
                    sessionStorage.setItem('siloUserDatabase', JSON.stringify(userDatabase));

                    currentUser = userDatabase[userIndex];
                    sessionStorage.setItem('siloCurrentUser', JSON.stringify(currentUser));
                    
                    saveBtn.classList.add('is-success');
                    setTimeout(() => {
                        saveBtn.classList.remove('is-success');
                        
                        accountHeaderSubtitle.textContent = `Welcome back, ${currentUser.name}.`;
                    }, 1500);

                } else {
                    alert("Error: Could not find user to update. Please log out and log back in.");
                }
            });
        }
        
        
        function setupTabListeners(containerSelector, contentSelector) {
            const tabContainer = document.querySelector(containerSelector);
            if (!tabContainer) return;
            const tabButtons = tabContainer.querySelectorAll('.account-tab-btn');
            const tabContents = document.querySelectorAll(contentSelector);
            tabContainer.addEventListener('click', (e) => {
                const clickedTab = e.target.closest('.account-tab-btn');
                if (!clickedTab || clickedTab.id === 'logout-btn' || clickedTab.classList.contains('is-success')) return; 
                const targetId = clickedTab.dataset.tab;
                const targetContent = document.getElementById(targetId);
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                clickedTab.classList.add('active');
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        }
        
        setupTabListeners('#account-login-view .account-tabs', '#account-login-view .account-form-content');
        setupTabListeners('#account-dashboard-view .account-nav', '#account-dashboard-view .account-form-content');
        
        displayAccountPage();
    }

    const productDetailContainer = document.getElementById("product-detail-container");

    if (productDetailContainer) {
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('id');
        const product = productDatabase.find(p => p.id == productId);

        const pageTitle = document.querySelector('title');
        const formatCurrency = (amount) => `₱${amount.toFixed(2)}`;
        
        const singleImageEl = document.getElementById('product-image-single');
        const sliderEl = document.getElementById('product-carousel-slider');
        const btnPrev = document.getElementById('slider-btn-prev');
        const btnNext = document.getElementById('slider-btn-next');
        const swatchContainer = document.getElementById('product-swatch-container');
        
        const nameEl = document.getElementById('product-name');
        const priceEl = document.getElementById('product-price');
        const descEl = document.getElementById('product-description');
        const addBtn = document.getElementById('product-detail-add-to-cart-btn');

        const sizeGuideLink = document.getElementById('size-guide-link');
        const sizeGuideModal = document.getElementById('size-guide-modal');
        const modalCloseBtn = document.getElementById('modal-close-btn');
        const sizeOptionsContainer = document.getElementById('product-size-options');
        const sizeErrorMessage = document.getElementById('size-error-message');


        if (product) {
            pageTitle.textContent = `${product.name} - Silo`;
            nameEl.textContent = product.name;
            priceEl.textContent = formatCurrency(product.price);
            descEl.textContent = product.description;

            if (product.images && product.images.length > 0) {

                singleImageEl.style.display = 'none'; 
                btnPrev.style.display = 'block'; 
                btnNext.style.display = 'block';
                swatchContainer.style.display = 'flex'; 

                let currentSlide = 0;

                product.images.forEach((imgSrc, index) => {
                    const slide = document.createElement('img');
                    slide.src = imgSrc;
                    slide.alt = `${product.name} - ${product.swatches[index].name}`;
                    slide.classList.add('product-slider-image');
                    if (index === 0) slide.classList.add('active'); 
                    sliderEl.appendChild(slide);

                    const swatch = document.createElement('div');
                    swatch.classList.add('detail-swatch');
                    swatch.style.backgroundColor = product.swatches[index].color;
                    swatch.title = product.swatches[index].name;
                    swatch.dataset.index = index;
                    if (index === 0) swatch.classList.add('active');
                    swatchContainer.appendChild(swatch);
                });

                const slides = sliderEl.querySelectorAll('.product-slider-image');
                const swatches = swatchContainer.querySelectorAll('.detail-swatch');

                function goToSlide(index) {
                    slides.forEach((slide, i) => {
                        slide.classList.toggle('active', i === index);
                    });
                    swatches.forEach((swatch, i) => {
                        swatch.classList.toggle('active', i === index);
                    });
                    currentSlide = index;
                }

                btnNext.addEventListener('click', () => {
                    let nextSlide = currentSlide + 1;
                    if (nextSlide >= slides.length) nextSlide = 0;
                    goToSlide(nextSlide);
                });
                btnPrev.addEventListener('click', () => {
                    let prevSlide = currentSlide - 1;
                    if (prevSlide < 0) prevSlide = slides.length - 1;
                    goToSlide(prevSlide);
                });
                swatches.forEach(swatch => {
                    swatch.addEventListener('click', () => {
                        goToSlide(parseInt(swatch.dataset.index));
                    });
                });
                goToSlide(0); 

            } else if (product.image) {

                singleImageEl.style.display = 'block'; 
                sliderEl.style.display = 'none'; 
                btnPrev.style.display = 'none'; 
                btnNext.style.display = 'none';
                swatchContainer.style.display = 'none'; 

                singleImageEl.src = product.image;
                singleImageEl.alt = product.name;
                singleImageEl.classList.add('active');
            }


            if (sizeGuideLink) {
                sizeGuideLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    sizeGuideModal.style.display = 'flex';
                    setTimeout(() => sizeGuideModal.classList.add('is-visible'), 10);
                });
            }
            if (modalCloseBtn) {
                modalCloseBtn.addEventListener('click', () => {
                    sizeGuideModal.classList.remove('is-visible');
                    setTimeout(() => sizeGuideModal.style.display = 'none', 300);
                });
            }
            if (sizeGuideModal) {
                sizeGuideModal.addEventListener('click', (e) => {
                    if (e.target === sizeGuideModal) {
                        modalCloseBtn.click();
                    }
                });
            }

            if (sizeOptionsContainer) {
                sizeOptionsContainer.addEventListener('click', (e) => {
                    const clickedButton = e.target.closest('.variant-btn');
                    if (!clickedButton) return;

                    sizeErrorMessage.style.display = 'none';
                    sizeOptionsContainer.classList.remove('shake-error');

                    sizeOptionsContainer.querySelectorAll('.variant-btn').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    
                    clickedButton.classList.add('active');
                });
            }


            addBtn.addEventListener('click', () => {
                
                const selectedSizeBtn = sizeOptionsContainer.querySelector('.variant-btn.active');
                
                if (!selectedSizeBtn) {

                    sizeErrorMessage.style.display = 'block';
                    sizeOptionsContainer.classList.add('shake-error');

                    setTimeout(() => sizeOptionsContainer.classList.remove('shake-error'), 500);
                    return;
                }


                const selectedSize = selectedSizeBtn.dataset.size;
                
                let itemName = product.name;
                let itemImage = product.image;

                if (product.id == 6 && product.images) {
                    const activeSwatch = swatchContainer.querySelector('.detail-swatch.active');
                    const swatchIndex = parseInt(activeSwatch.dataset.index);
                    const swatchName = product.swatches[swatchIndex].name;
                    
                    itemName = `${product.name} (${swatchName}, ${selectedSize})`;
                    itemImage = product.images[swatchIndex];
                } else {

                    itemName = `${product.name} (${selectedSize})`;
                }


                const itemToAdd = {
                    id: product.id,
                    name: itemName,
                    price: product.price,
                    quantity: 1,
                    image: itemImage
                };

                const existingItem = cart.find(item => item.name === itemToAdd.name && item.image === itemToAdd.image);

                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cart.push(itemToAdd);
                }
                
                saveCart();

                const btnText = addBtn.querySelector('.btn-text');
                if (btnText) {
                    const originalText = btnText.textContent;
                    btnText.textContent = "Added!";
                    setTimeout(() => {
                        btnText.textContent = originalText;
                    }, 1500);
                }
            });

        } else {
            
            nameEl.textContent = "Product Not Found";
            descEl.textContent = "The product you are looking for does not exist. Please return to the shop.";
            priceEl.style.display = 'none';
            addBtn.style.display = 'none';
            singleImageEl.style.display = 'none';
        }
    }


});
