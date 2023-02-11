/**
 * @openapi
 * components:
 *   schemas:
 *     Gender:
 *       type: object
 *       properties:
 *         id:
 *           type: uuid
 *           description: The auto-generated id
 *           example: 094c60c8-ddf0-4b7e-adf7-9e21458ad57c
 *         name:
 *           type: string
 *           description: name
 *           example: Male
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
 *   name: Gender
 *   description: The Gender APIs
 */

/**
 * @openapi
 * /api/app/common/genders:
 *   get:
 *     summary: Get Genders
 *     tags: [Gender]
 *     responses:
 *       200:
 *         description: Returns genders list
 */
