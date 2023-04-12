const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Manga = sequelize.define('Manga', {
    name: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, { timestamps: false });

  const Genre = sequelize.define('Genre', {
    genre_name: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false
    },
  }, { timestamps: false });

  Manga.belongsToMany(Genre, { through: 'MangaGenres', as: 'genres' });
  Genre.belongsToMany(Manga, { through: 'MangaGenres', as: 'mangas' });
};