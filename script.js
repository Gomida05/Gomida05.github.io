// Simple cookie consent banner implementation with unique UI

function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, '');
}

window.onload = function() {
    if (!getCookie('cookieConsent')) {
        const banner = document.createElement('div');
        banner.style.position = 'fixed';
        banner.style.bottom = '30px';
        banner.style.left = '50%';
        banner.style.transform = 'translateX(-50%)';
        banner.style.minWidth = '320px';
        banner.style.maxWidth = '90vw';
        banner.style.background = 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)';
        banner.style.color = '#333';
        banner.style.padding = '24px 32px';
        banner.style.borderRadius = '18px';
        banner.style.boxShadow = '0 8px 32px rgba(0,0,0,0.18)';
        banner.style.display = 'flex';
        banner.style.flexDirection = 'row';
        banner.style.alignItems = 'center';
        banner.style.justifyContent = 'space-between';
        banner.style.zIndex = '1000';
        banner.style.fontFamily = 'Segoe UI, Arial, sans-serif';

        banner.innerHTML = `
            <div style="display:flex;align-items:center;">
                <span style="font-size:2rem;margin-right:16px;">🍪</span>
                <div>
                    <div style="font-weight:bold;font-size:1.1rem;margin-bottom:4px;">Cookie Notice</div>
                    <div style="font-size:0.97rem;">We use cookies to personalize your experience. Do you accept our cookies?</div>
                </div>
            </div>
            <div style="display:flex;flex-direction:column;gap:8px;margin-left:24px;">
                <button id="acceptCookies" style="background:#4caf50;color:#fff;border:none;padding:8px 18px;border-radius:8px;font-weight:bold;cursor:pointer;box-shadow:0 2px 8px rgba(76,175,80,0.12);transition:background 0.2s;">Accept</button>
                <button id="denyCookies" style="background:#fff;color:#f44336;border:2px solid #f44336;padding:8px 18px;border-radius:8px;font-weight:bold;cursor:pointer;transition:background 0.2s;">Deny</button>
            </div>
        `;

        document.body.appendChild(banner);

        document.getElementById('acceptCookies').onclick = function() {
            setCookie('cookieConsent', 'accepted', 365);
            banner.remove();
        };

        document.getElementById('denyCookies').onclick = function() {
            setCookie('cookieConsent', 'denied', 365);
            banner.remove();
        };
    }
};