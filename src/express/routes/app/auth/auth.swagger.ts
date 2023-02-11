/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: uuid
 *           description: The auto-generated id
 *           example: 094c60c8-ddf0-4b7e-adf7-9e21458ad57c
 *         email:
 *           type: string
 *           description: email
 *           example: admin@accounts.com.pk
 *         avatar:
 *           type: string
 *           description: avatar
 *           example: uuid-filename.ext
 *         firstName:
 *           type: string
 *           description: first name
 *           example: Shahan
 *         lastName:
 *           type: string
 *           description: last name
 *           example: Ahmed Khan
 *         phone:
 *           type: string
 *           description: phone
 *           example: '+923331234563'
 *         genderId:
 *           type: string
 *           description: gender ID
 *           example: 04521c7b-a128-4f5f-bfb2-96053c0a31b0
 *         roleId:
 *           type: string
 *           description: role ID
 *           example: 6ab568da-c798-46a6-ac09-bf020ceb1bcf
 *         createdAt:
 *           type: string
 *           description: The created date & time in UTC
 *           example: 2022-01-29T21:30:00.0000Z
 *         updatedAt:
 *           type: string
 *           description: The updated date & time in UTC
 *           example: 2022-01-31T12:00:00.0000Z
 */

/**
 * @openapi
 * tags:
 *   name: User_Authentications
 *   description: The Authentication APIs
 */

/**
 * @openapi
 * /api/app/auth:
 *   get:
 *     summary: Logged In
 *     tags: [User_Authentications]
 *     responses:
 *       200:
 *         description: Returns logged in user
 */

/**
 * @openapi
 * /api/app/auth:
 *   post:
 *     summary: Login
 *     tags: [User_Authentications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: email
 *                 example: shahan.ahmed@apify.ai
 *               password:
 *                 type: string
 *                 description: password
 *                 example: 123Abc456
 *     responses:
 *       200:
 *         description: Returns token and user's payload
 */

/**
 * @openapi
 * /api/app/auth/change-password:
 *   put:
 *     summary: Change password
 *     tags: [User_Authentications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: old password
 *                 example: 123Abc456
 *               password:
 *                 type: string
 *                 description: new password
 *                 example: 123456Abc
 *     responses:
 *       200:
 *         description: Returns change password success message
 */

/**
 * @openapi
 * /api/app/auth/signup:
 *   post:
 *     summary: Sign Up
 *     tags: [User_Authentications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: email
 *                 example: shahan.ahmed@apify.ai
 *               password:
 *                 type: string
 *                 description: password
 *                 example: 123Abc456
 *               avatar:
 *                 type: string
 *                 description: avatar
 *                 example: temp/uuid-filename.ext
 *               firstName:
 *                 type: string
 *                 description: first name
 *                 example: Shahan
 *               lastName:
 *                 type: string
 *                 description: last name
 *                 example: Ahmed
 *               phone:
 *                 type: string
 *                 description: phone
 *                 example: '+923331234563'
 *               genderId:
 *                 type: string
 *                 description: gender Id
 *                 example: 04521c7b-a128-4f5f-bfb2-96053c0a31b0
 *     responses:
 *       200:
 *         description: Returns profile update success message
 */

/**
 * @openapi
 * /api/app/auth:
 *   put:
 *     summary: Update Profile
 *     tags: [User_Authentications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 description: avatar
 *                 example: temp/uuid-filename.ext
 *               firstName:
 *                 type: string
 *                 description: first name
 *                 example: Shahan
 *               lastName:
 *                 type: string
 *                 description: last name
 *                 example: Ahmed
 *               phone:
 *                 type: string
 *                 description: phone
 *                 example: '+923331234563'
 *               genderId:
 *                 type: string
 *                 description: gender Id
 *                 example: 04521c7b-a128-4f5f-bfb2-96053c0a31b0
 *     responses:
 *       200:
 *         description: Returns token and user's payload
 */
