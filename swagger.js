/**
 * @swagger
 * components:
 *   securitySchemes:
 *     auth:       # имя схемы авторизации, должно совпадать с указанным в security секции
 *       type: apiKey
 *       name: Authorization
 *       in: header
 *       description: Ввелите ваш токе авторизации
 */

/**
* @swagger
* /auth/signup:
*   post:
*     summary: Создание аккаунта
*     requestBody: 
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               user_name:
*                 type: string
*                 description: Имя пользователя
*               password:
*                 type: string
*                 description: Пароль 
*             required:
*               - user_name
*               - password
*     responses:
*       201:
*         description: Аккаунт успешно создан!
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                   accessToken:
*                     type: string
*                     description: Полученный токен
*/


/**
* @swagger
* /auth/login:
*   post:
*     summary: Авторизация
*     requestBody: 
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               user_name:
*                 type: string
*                 description: Имя пользователя
*               password:
*                 type: string
*                 description: Пароль 
*             required:
*               - user_name
*               - password
*     responses:
*       200:
*         description: Успешный авторизация!
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                   accessToken:
*                     type: string
*                     description: Полученный токен
*/

/**
* @swagger
* /manga:
*   get:
*     summary: Получение списка манги
*     security:
*       - auth: []
*     responses:
*       200:
*         description: Успешный ответ
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                   type: object
*                   properties:
*                       name:
*                           type: string
*                           description: Название манги
*                       description:
*                           type: string
*                           description: Описание 
*                       price:
*                           type: number
*                           format: double
*                           description: Цена
*                       genres:
*                           type: array
*                           items:
*                               type: string
*                               description: название манги
*/

/**
* @swagger
* /manga/{id}:
*   get:
*       summary: Получение списка манги
*       parameters:
*           - name: id
*             in: path
*             description: Идетнификатор манги
*             required: true
*             type: integer
*       security:
*           - auth: []
*       responses:
*           200:
*             description: Успешный ответ
*             content:
*               application/json:
*                 schema:
*                   type: object
*                   properties:
*                     name:
*                       type: string
*                       description: Название манги
*                     description:
*                       type: string
*                       description: Описание 
*                     price:
*                       type: number
*                       description: Цена
*                     genres:
*                       type: array
*                       items:
*                         type: string
*                         description: название манги
*/

/**
* @swagger
* /manga:
*   post:
*     summary: Создание манги
*     security:
*       - auth: []
*     requestBody: 
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*                 description: Название манги
*               description:
*                 type: string
*                 description: Описание 
*               price:
*                 type: number
*                 format: double
*                 description: Цена
*               genres:
*                 type: array
*                 items:
*                   type: string
*                   description: Название жанра манги
*     responses:
*       201:
*         description: Манга успешно создана!
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 name:
*                   type: string
*                   description: Название манги
*                 description:
*                   type: string
*                   description: Описание 
*                 price:
*                   type: number
*                   format: double
*                   description: Цена
*                 genres:
*                   type: array
*                   items:
*                     type: string
*                     description: Название жанра манги
*/

/**
* @swagger
* /manga/{id}:
*   delete:
*     summary: Удаление манги по идентификатору
*     parameters:
*       - name: id
*         in: path
*         description: Идентификатор манги
*         required: true
*         type: integer
*     security:
*       - auth: []
*     responses:
*       200:
*         description: Успешное удаление
*       404:
*         description: Манга не найдена
*/

/**
* @swagger
* /manga/{id}:
*   put:
*     summary: Обновление манги по идентификатору
*     parameters:
*       - name: id
*         in: path
*         description: Идентификатор манги
*         required: true
*         type: integer
*     security:
*       - auth: []
*     requestBody: 
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*                 description: Название манги
*               description:
*                 type: string
*                 description: Описание 
*               price:
*                 type: number
*                 format: double
*                 description: Цена
*               genres:
*                 type: array
*                 items:
*                   type: string
*                   description: Название жанра манги
*     responses:
*       200:
*         description: Успешное обновление
*       404:
*         description: Манга не найдена
*/