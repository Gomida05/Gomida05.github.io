
function askUserThemePreference() {
    if (!getCookie('themePreference')) {

        showSettingsSidebar(true);
    } else {
        const pref = getCookie('themePreference');
        if (pref === 'light' || pref === 'dark') {
            applyTheme(pref);
        } else {
            applyThemeBasedOnSystem();
        }
    }
}

// Sidebar settings UI
function showSettingsSidebar(showOnLoad = false) {
    if (document.getElementById('settingsSidebar')) return;

    const sidebar = document.createElement('div');
    sidebar.id = 'settingsSidebar';
    sidebar.style.position = 'fixed';
    sidebar.style.top = '0';
    sidebar.style.right = '0';
    sidebar.style.height = '100vh';
    sidebar.style.width = '320px';
    sidebar.style.maxWidth = '90vw';
    sidebar.style.background = 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)';
    sidebar.style.color = '#222';
    sidebar.style.boxShadow = '-4px 0 24px rgba(0,0,0,0.12)';
    sidebar.style.padding = '32px 24px 24px 24px';
    sidebar.style.display = 'flex';
    sidebar.style.flexDirection = 'column';
    sidebar.style.zIndex = '2000';
    sidebar.style.fontFamily = 'Segoe UI, Arial, sans-serif';
    sidebar.style.transition = 'transform 0.3s';
    sidebar.style.transform = showOnLoad ? 'translateX(0)' : 'translateX(100%)';
    sidebar.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;">
            <div style="font-size:1.4rem;font-weight:bold;display:flex;align-items:center;">
                <span style="font-size:2rem;margin-right:10px;">🛠️</span> Settings
            </div>
            <button id="closeSidebar" style="background:none;border:none;font-size:1.6rem;cursor:pointer;" title="Close" aria-label="Close settings sidebar">&times;</button>
        </div>
        <div style="margin-bottom:18px;">
            <div style="font-weight:bold;font-size:1.1rem;margin-bottom:8px;">Theme Preference</div>
            <div style="display:flex;gap:10px;flex-wrap:wrap;">
                <button id="sidebarThemeLight" style="background:#fff;color:#222;border:2px solid #bbb;padding:10px 20px;border-radius:8px;font-weight:bold;cursor:pointer;display:flex;align-items:center;gap:6px;" aria-label="Switch to light theme">🌞 <span>Light</span></button>
                <button id="sidebarThemeDark" style="background:#222;color:#fff;border:2px solid #222;padding:10px 20px;border-radius:8px;font-weight:bold;cursor:pointer;display:flex;align-items:center;gap:6px;" aria-label="Switch to dark theme">🌙 <span>Dark</span></button>
                <button id="sidebarThemeSystem" style="background:#e0e0e0;color:#222;border:2px solid #bbb;padding:10px 20px;border-radius:8px;font-weight:bold;cursor:pointer;display:flex;align-items:center;gap:6px;" aria-label="Use system theme">🖥️ <span>System</span></button>
            </div>
            <div style="margin-top:10px;font-size:0.97rem;color:#444;">
                <span>Choose how the site looks. "System" will match your device's theme.</span>
            </div>
        </div>
        <div style="margin-top:auto;font-size:0.97rem;color:#666;display:flex;align-items:center;gap:8px;">
            <span>Tip: Open settings anytime using the</span>
            <span style="background:#e2ebf0;border-radius:50%;padding:6px 10px;font-size:1.2rem;box-shadow:0 1px 4px rgba(0,0,0,0.07);">⚙️</span>
            <span>button at the bottom right.</span>
        </div>
    `;

    document.body.appendChild(sidebar);

    // Animate in if not on load
    setTimeout(() => {
        sidebar.style.transform = 'translateX(0)';
    }, 10);

    document.getElementById('closeSidebar').onclick = function() {
        sidebar.style.transform = 'translateX(100%)';
        setTimeout(() => sidebar.remove(), 300);
    };

    document.getElementById('sidebarThemeLight').onclick = function() {
        setCookie('themePreference', 'light', 365);
        applyTheme('light');
    };
    document.getElementById('sidebarThemeDark').onclick = function() {
        setCookie('themePreference', 'dark', 365);
        applyTheme('dark');
    };
    document.getElementById('sidebarThemeSystem').onclick = function() {
        setCookie('themePreference', 'system', 365);
        applyThemeBasedOnSystem();
    };
}

// Add floating settings button
(function() {
    const btn = document.createElement('button');
    btn.id = 'openSettingsSidebarBtn';
    btn.innerHTML = '⚙️';
    btn.style.position = 'fixed';
    btn.style.bottom = '32px';
    btn.style.right = '32px';
    btn.style.width = '52px';
    btn.style.height = '52px';
    btn.style.borderRadius = '50%';
    btn.style.background = 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)';
    btn.style.border = 'none';
    btn.style.boxShadow = '0 4px 16px rgba(0,0,0,0.13)';
    btn.style.fontSize = '2rem';
    btn.style.cursor = 'pointer';
    btn.style.zIndex = '1500';
    btn.title = 'Open settings';

    btn.onclick = function() {
        showSettingsSidebar();
    };

    document.body.appendChild(btn);
})();

function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.style.setProperty('--bg-color', '#181a1b');
        document.documentElement.style.setProperty('--text-color', '#e0e0e0');
    } else {
        document.documentElement.style.setProperty('--bg-color', '#fff');
        document.documentElement.style.setProperty('--text-color', '#222');
    }
    document.body.style.background = 'var(--bg-color)';
    document.body.style.color = 'var(--text-color)';
}



function applyThemeBasedOnSystem() {
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.style.setProperty('--bg-color', isDark ? '#181a1b' : '#fff');
    document.documentElement.style.setProperty('--text-color', isDark ? '#e0e0e0' : '#222');
    document.body.style.background = 'var(--bg-color)';
    document.body.style.color = 'var(--text-color)';
}

// Listen for system theme changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyThemeBasedOnSystem);
}


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
            <div style="display:flex;align-items:center;gap:18px;">
                <div style="background:linear-gradient(135deg,#fcb69f 0%,#ffecd2 100%);border-radius:50%;width:48px;height:48px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(252,182,159,0.18);font-size:2rem;">
                    <span>🍪</span>
                </div>
                <div>
                    <div style="font-weight:700;font-size:1.15rem;margin-bottom:3px;letter-spacing:0.01em;">We Value Your Privacy</div>
                    <div style="font-size:0.98rem;line-height:1.5;color:#444;">
                        This site uses cookies to enhance your browsing experience and analyze site traffic. Choose your preference:
                    </div>
                </div>
            </div>
            <div style="display:flex;flex-direction:column;gap:10px;margin-left:32px;">
                <button id="acceptCookies" style="background:linear-gradient(90deg,#43cea2 0%,#185a9d 100%);color:#fff;border:none;padding:10px 22px;border-radius:10px;font-weight:600;cursor:pointer;box-shadow:0 2px 8px rgba(67,206,162,0.13);font-size:1rem;transition:filter 0.2s;">Accept All</button>
                <button id="denyCookies" style="background:linear-gradient(90deg,#fff 0%,#fcb69f 100%);color:#d7263d;border:2px solid #d7263d;padding:10px 22px;border-radius:10px;font-weight:600;cursor:pointer;font-size:1rem;transition:filter 0.2s;">Decline</button>
                <!--<a href="/privacy" style="margin-top:2px;font-size:0.93rem;color:#185a9d;text-decoration:underline;text-align:center;opacity:0.85;">Learn more</a> --!>
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