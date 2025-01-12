const client = require('prom-client');
const express = require('express');
const app = express();

// Créer un compteur pour les requêtes HTTP
const httpRequestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Nombre total de requêtes HTTP',
    labelNames: ['method', 'route', 'status'],
});

// Middleware pour collecter les métriques des requêtes
app.use((req, res, next) => {
    res.on('finish', () => {
        httpRequestCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status: res.statusCode,
        });
    });
    next();
});

// Route pour exposer les métriques Prometheus
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.send(await client.register.metrics());
});

// Démarrer le serveur
const PORT = 6000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
