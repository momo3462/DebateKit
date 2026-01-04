/**
 * CORE MANAGER - DebateKit
 * Gestisce autenticazione, permessi e persistenza dati.
 */

const DEBATE_CONFIG = {
    PASS_STANDARD: "MeleCotte",
    PASS_SPECIAL: "la grande mela",
    STORAGE_KEY: "debatekit_session"
};

window.CoreManager = {
    user: null,

    init: function() {
        const sessionStr = localStorage.getItem(DEBATE_CONFIG.STORAGE_KEY);
        this.user = sessionStr ? JSON.parse(sessionStr) : null;
        
        // Esegui il controllo di sicurezza
        this.checkAuth();
        
        // Gestione estetica transizioni
        this.injectTransitions();
        
        return this.user;
    },

    checkAuth: function() {
        const path = window.location.pathname;
        // Riconosce sia login.html che il percorso semplice /login (per Vercel)
        const isLoginPage = path.endsWith('login.html') || path.endsWith('/login');

        if (!this.user && !isLoginPage) {
            window.location.replace('login.html');
        } else if (this.user && isLoginPage) {
            // Se sei loggato e provi ad andare al login, ti riporta in home
            window.location.replace('index.html');
        }
    },

    login: function(username, password) {
        if (!username || username.trim().length < 2) {
            return { success: false, message: "Inserisci un nome valido!" };
        }

        let role = 'user';
        if (password === DEBATE_CONFIG.PASS_SPECIAL) {
            role = 'admin';
        } else if (password === DEBATE_CONFIG.PASS_STANDARD) {
            role = 'user';
        } else {
            return { success: false, message: "Password errata!" };
        }

        const sessionData = {
            username: username.trim(),
            role: role,
            loginTime: new Date().getTime(),
            id: 'user_' + Math.random().toString(36).substr(2, 9)
        };

        localStorage.setItem(DEBATE_CONFIG.STORAGE_KEY, JSON.stringify(sessionData));
        this.user = sessionData;
        return { success: true };
    },

    logout: function() {
        localStorage.removeItem(DEBATE_CONFIG.STORAGE_KEY);
        window.location.replace('login.html');
    },

    injectTransitions: function() {
        if (!document.getElementById('page-transitions-style')) {
            const style = document.createElement('style');
            style.id = 'page-transitions-style';
            style.innerHTML = `
                body { opacity: 0; transition: opacity 0.4s ease-in-out; }
                body.loaded { opacity: 1; }
            `;
            document.head.appendChild(style);
            window.addEventListener('load', () => {
                setTimeout(() => document.body.classList.add('loaded'), 50);
            });
        }
    }
};

CoreManager.init();
