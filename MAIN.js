document.addEventListener('DOMContentLoaded', () => {
    let cartCount = 0;

    const leftCart = document.getElementById('left-cart');
    const rightCart = document.getElementById('right-cart');
    const ball = document.getElementById('ball');
    const leftCountSpan = document.getElementById('left-count');
    const rightCountSpan = document.getElementById('right-count');

    document.addEventListener('click', (e) => {
        const favBtn = e.target.closest('.fav');
        if (!favBtn) return;

        e.stopPropagation();
        const icon = favBtn.querySelector('i') || favBtn;

        if (icon.classList.contains('fa-regular')) {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
            favBtn.style.color = '#ef4444';
            favBtn.style.background = '#fef2f2';
        } else {
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');
            favBtn.style.color = '';
            favBtn.style.background = '';
        }
    });

    document.addEventListener('click', (e) => {
        const cartBtn = e.target.closest('.cart, #special-shop');
        if (!cartBtn) return;

        cartCount++;
        if (leftCountSpan) leftCountSpan.textContent = cartCount;
        if (rightCountSpan) rightCountSpan.textContent = cartCount;

        const btnRect = cartBtn.getBoundingClientRect();
        const startX = btnRect.left + btnRect.width / 2 - 10;
        const startY = btnRect.top + btnRect.height / 2 - 10;

        if (leftCart) leftCart.className = 'fixed-cart-widget';
        if (rightCart) rightCart.className = 'fixed-cart-widget';
        if (ball) ball.className = 'fixed-cart-widget';

        if (leftCart) void leftCart.offsetWidth;
        if (ball) void ball.offsetWidth;
        if (rightCart) void rightCart.offsetWidth;

        if (leftCart) leftCart.classList.add('left-cart-enter');

        if (ball && leftCart) {
            const leftCartRect = leftCart.getBoundingClientRect();
            const endX = leftCartRect.left + leftCartRect.width / 2 - 10;
            const endY = leftCartRect.top + leftCartRect.height / 2 - 10;

            ball.style.setProperty('--start-x', `${startX}px`);
            ball.style.setProperty('--start-y', `${startY}px`);
            ball.style.setProperty('--end-x', `${endX}px`);
            ball.style.setProperty('--end-y', `${endY}px`);

            ball.classList.add('ball-flying');
        }

        setTimeout(() => {
            if (ball) ball.classList.remove('ball-flying');
            if (leftCart) {
                leftCart.classList.remove('left-cart-enter');
                leftCart.classList.add('left-cart-exit');
            }
        }, 500);

        setTimeout(() => {
            if (leftCart) leftCart.classList.remove('left-cart-exit');
            if (rightCart) rightCart.classList.add('right-cart-sequence');
        }, 800);
    });
});