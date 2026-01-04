/**
 * CORE MANAGER - DebateKit
 * Gestisce autenticazione, permessi e persistenza dati.
 */

// Inizializzazione immediata dell'oggetto globale
window.CoreManager = window.CoreManager || {};

const DEBATE_CONFIG = {
    PASS_STANDARD: "MeleCotte",
    PASS_SPECIAL: "la grande mela",
    STORAGE_KEY: "debatekit_session"
};

/**
 * Controlla se l'utente è loggato. 
 * Se non lo è, reindirizza al login (tranne se si è già lì).
 */
function checkAuth() {
    const sessionStr = localStorage.getItem(DEBATE_CONFIG.STORAGE_KEY);
    const session = sessionStr ? JSON.parse(sessionStr) : null;
    
    // Controllo robusto dell'URL per evitare loop infiniti
    const currentPath = window.location.pathname;
    const isLoginPage = currentPath.includes('login.html') || (currentPath.endsWith('/login'));

    if (!session && !isLoginPage) {
        // Se non loggato e non in login page -> Vai al login
        window.location.replace('login.html');
        return null;
    } else if (session && isLoginPage) {
        // Se già loggato e provi ad andare al login -> Vai alla home
        window.location.replace('index.html');
        return session;
    }
    
    // Gestione fluida delle transizioni di pagina
    if (!document.getElementById('page-transitions-style')) {
        const style = document.createElement('style');
        style.id = 'page-transitions-style';
        style.innerHTML = `
            body { opacity: 0; transition: opacity 0.4s ease-in-out; }
            body.loaded { opacity: 1; }
        `;
        document.head.appendChild(style);
        window.addEventListener('load', () => document.body.classList.add('loaded'));
    }

    return session;
}

// Esecuzione immediata del controllo
const activeUser = checkAuth();

// Esportazione funzioni nell'oggetto globale
window.CoreManager = {
    user: activeUser,
    
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
        return { success: true };
    },

    logout: function() {
        localStorage.removeItem(DEBATE_CONFIG.STORAGE_KEY);
        window.location.replace('login.html');
    }
};