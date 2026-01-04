// Questo file va posizionato nella cartella /api/ per funzionare su Vercel
// Gestisce il salvataggio e il recupero della dashboard in tempo reale

let sharedState = {
    boxes: [],
    connections: [],
    lastUpdate: Date.now()
};

export default function handler(req, res) {
    // Abilita CORS per permettere l'accesso dalle pagine HTML
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        // Riceve i nuovi dati dalla Dash e aggiorna lo stato comune
        const { boxes, connections } = req.body;
        sharedState = {
            boxes: boxes || [],
            connections: connections || [],
            lastUpdate: Date.now()
        };
        return res.status(200).json(sharedState);
    }

    if (req.method === 'GET') {
        // Restituisce lo stato attuale della lavagna a chi lo richiede
        return res.status(200).json(sharedState);
    }
}