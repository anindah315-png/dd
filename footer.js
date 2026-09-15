document.addEventListener("DOMContentLoaded", () => {
    // 1. INJECT CSS FOR THE FOOTER
    const style = document.createElement('style');
    style.innerHTML = `
        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 60px;
            background-color: #ffffff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            
            padding: 0 10px;
            box-sizing: border-box;
            box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.04);
            z-index: 999;
            transition: transform 0.1s, filter 0.1s;
            /* Prevent default mobile text selection/highlight on long press */
            user-select: none; 
            -webkit-user-select: none;
            -webkit-tap-highlight-color: transparent;
            /* Needed to contain the background ripple effect */
            overflow: hidden; 
        }
        
        /* Ensure items stay above the background ripple */
        .nav-item, .fab-wrapper {
            position: relative;
            z-index: 1; 
        }

        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            color: #9ca3af;
            flex: 1;  
            border-radius: 50%;
            height: 100%;
            transition: color 0.3s ease, transform 0.2s ease;
            margin-top: 8px;
            cursor: pointer;
            background: transparent;
            border: 0;
            transition: background-color 0.15s ease;
        }
      
        .nav-item.active { 
            color: #111827;
            /* Optional: Make cursor default for active item to indicate it's not clickable */
            cursor: default;
        }
        .nav-item svg {
            width: 24px;
            height: 24px;
            margin-bottom: 4px;
            stroke-width: 2px;
        }
        .nav-item span {
            font-size: 11px;
            font-weight: 600;
        }
        
        .fab-wrapper {
            width: 80px; 
            height: 100%;
            display: flex;
            justify-content: center;
        }
        .fab {
            position: absolute;
            top: 5px;
            width: 45px;
            height: 45px;
            background-color: #7352ff; 
            border: none;
            border-radius: 50%;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 2;
            box-shadow: 0 4px 12px rgba(115, 82, 255, 0.4);
            transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      
        .fab:active {
            transform: scale(0.95);
        }
        .fab svg {
            width: 32px;
            height: 32px;
            stroke-width: 2.5px;
        }

        /* --- FULL BACKGROUND RIPPLE EFFECT CSS --- */
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(115, 82, 255, 0.15); /* Adjust color/opacity as needed */
            transform: scale(0);
            animation: ripple-anim 0.6s ease-out forwards;
            pointer-events: none;
            z-index: 0; /* Stays behind buttons */
        }
        
        @keyframes ripple-anim {
            to {
                transform: scale(1);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // 2. INJECT HTML FOR THE FOOTER WITH INLINE SVGs
    const footerContainer = document.createElement('div');
    footerContainer.innerHTML = `
        <nav class="bottom-nav">
            <a href="index.html" class="nav-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>Home</span>
            </a>
            
            <a href="explore.html" class="nav-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m10 7 5 3-5 3Z"></path>
                    <rect width="20" height="14" x="2" y="3" rx="2"></rect>
                    <path d="M12 17v4"></path>
                    <path d="M8 21h8"></path>
                </svg>
                <span>Courses</span>
            </a>
            
            <a href="" class="fab-wrapper">
                <div class="fab-cutout"></div>
                <button class="fab">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5v14"></path>
                    </svg>
                </button>
            </a>

            <a href="study.html" class="nav-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                <span>Study</span>
            </a>

            <a href="profile.html" class="nav-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>Profile</span>
            </a>
        </nav>
    `;
    document.body.appendChild(footerContainer);

    // 3. INITIALIZE LUCIDE ICONS 
    // (Optional: Kept just in case you still use data-lucide icons elsewhere on the page)
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 4. SMART ACTIVE STATE LOGIC
    const currentPath = window.location.pathname.split('/').pop() || 'index.html'; 
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentPath) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // 5. RIPPLE EFFECT & CLICK/LONG-PRESS LOGIC
    const bottomNav = document.querySelector('.bottom-nav');

    // Prevent default context menu on mobile so long press doesn't open browser options
    bottomNav.addEventListener('contextmenu', (e) => e.preventDefault());

    // Prevent standard click navigation to handle it cleanly via pointer events
    bottomNav.addEventListener('click', (e) => {
        const target = e.target.closest('.nav-item');
        if (target) {
            e.preventDefault();
        }
    });

    // Trigger ripple immediately upon touching/clicking
    bottomNav.addEventListener('pointerdown', function(e) {
        // Only trigger if clicking a button/link
        const target = e.target.closest('.nav-item, .fab');
        if (!target) return;
        
        // Prevent ripple if clicking the currently active page
        if (target.classList.contains('active')) return;

        // Calculate size to cover the entire footer width/height
        const rect = bottomNav.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2.5; 
        
        // Calculate coordinates relative to the footer container
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        bottomNav.appendChild(ripple);

        // Remove the ripple element after the animation is completed
        setTimeout(() => {
            ripple.remove();
        }, 600); 
    });

    // Navigate to link ONLY when touch is released (closed) 
    bottomNav.addEventListener('pointerup', function(e) {
        const target = e.target.closest('.nav-item');
        if (target && target.hasAttribute('href')) {
            // Do not navigate if we are already on this page
            if (target.classList.contains('active')) return;

            const href = target.getAttribute('href');
            
            // Brief 50ms delay lets the user see the ripple begin before navigation takes over
            setTimeout(() => {
                window.location.href = href;
            }, 50);
        }
    });
});