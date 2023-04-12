const Models = require('../models/manga.model');

class MangaController {
    constructor(sequlize) {
        Models(sequlize);
        this.models = sequlize.models;

    }

    // Создание манги
    createManga = async (req, res) => {
        try {
            const { name, description, price, genres } = req.body;
            const mangaModel = await this.models.Manga.create({ name, description, price });
            const promises = genres.map((genre) => { return { genre_name: genre } }).map(genre => this.models.Genre.findOrCreate({ where: genre }));

            const genresFindOrCreate = await Promise.all(promises);
            const genresModels = genresFindOrCreate.map(([genre, create]) => { return genre });
            await mangaModel.addGenres(genresModels);
            console.log('Добавление манги');
            res.status(201).json(mangaModel);
        } catch (err) {
            console.log('Ошибка ', err);
            res.json(err);
        }
    }

    // Получение списка манги
    getManga = async (req, res) => {
        try {
            const mangas = await this.models.Manga.findAll({
                include: [{ model: this.models.Genre, as: 'genres', attributes: ['genre_name'], through: { attributes: [] } }]
            });
            console.log('Получение списка манги');
            res.status(200).json(mangas);
        } catch (err) {
            console.log('Ошибка ', err);
            res.json(err);
        }
    }

    // Получение одной манги
    getOneManga = async (req, res) => {
        try {
            const mangaModel = await this.models.Manga.findOne({
                where: { id: req.params.id },
                include: [{ model: this.models.Genre, as: 'genres', attributes: ['genre_name'], through: { attributes: [] } }]
            });
            console.log('Получение манги по ID');
            if (mangaModel)
                res.status(200).json(mangaModel);
            else
                res.status(403).json("Такой манги не найдено");
        } catch (err) {
            console.log('Ошибка ', err);
            res.status(403).json(err);
        }
    }

    // Обновление манги
    updateManga = async (req, res) => {
        try {
            const { name, description, price, genres } = req.body;
            await this.models.Manga.update({ name, description, price }, { where: { id: req.params.id } });

            console.log('Обновление манги');
            res.json({ message: 'Манга успешно обновлена' });
        } catch (err) {
            console.log('Ошибка ', err);
            res.json(err);
        }
    }

    // Удаление манги
    deleteManga = async (req, res) => {
        try {
            await this.models.Manga.destroy({ where: { id: req.params.id } });
            console.log('Удаление манги');
            res.json({ message: 'Манга успешно удалена' });
        } catch (err) {
            console.log('Ошибка ', err);
            res.json(err);
        }
    }
}

module.exports = MangaController;