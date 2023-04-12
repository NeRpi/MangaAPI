const Router = require('express');
const MangaController = require('../controllers/manga.controller');

const router = new Router();


module.exports = (sequelize) => {
    const mangaController = new MangaController(sequelize);

    router.get('/manga', mangaController.getManga);
    router.get('/manga/:id', mangaController.getOneManga);
    router.post('/manga', mangaController.createManga);
    router.put('/manga/:id', mangaController.updateManga);
    router.delete('/manga/:id', mangaController.deleteManga);

    return router;
};