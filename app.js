const express = require('express');
const cors = require('cors');
const jwtMiddleware = require('./middlewares/jwt.middleware');
const mangaRouter = require('./routes/manga.router');
const userRouter = require('./routes/user.router');
const Sequelize = require('sequelize');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

require('dotenv').config();

const config = require('./config/config.json')['development'];
const sequelize = new Sequelize(config);

const app = express();
app.set('port', 8000 || process.env.port);


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Mangas',
            version: '1.0.0'
        },
        servers: [{
            url: '/api'
        }]
    },
    apis: ['./swagger.js']
}

const swaggerSpac = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpac));


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/manga', jwtMiddleware);

function connectToPostgres() {
    sequelize.authenticate().then(() => {
        console.log('Подключение произошло успешно');
    }).catch(e => {
        console.log('Не удалось подключиться к базе данных');
    });
    return sequelize;
}

const postgresClient = connectToPostgres();
postgresClient.sync({ force: false });

app.use('/api', mangaRouter(postgresClient), userRouter(postgresClient));

app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`);
});

process.on('SIGINT', () => {
    sequelize.close()
        .then(() => {
            console.log('Соединение с базой данных закрыто');
            process.exit(0);
        })
        .catch(err => {
            console.error('Ошибка при закрытии соединения с базой данных:', err);
            process.exit(1);
        });
});

module.exports = app;