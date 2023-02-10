/**
 * @openapi
 * tags:
 *   name: File_Uploads
 *   description: The APIs for images
 */

/**
 * @openapi
 * /api/images:
 *   post:
 *     summary: Returns path name of the uploaded file
 *     tags: [File_Uploads]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               uploadedFile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: filepath inside of a data property
 */

/**
 * @openapi
 * /api/images:
 *   get:
 *     summary: Returns File Buffer
 *     tags: [File_Uploads]
 *     parameters:
 *       - in: query
 *         name: filename
 *         schema:
 *           type: string
 *           required: true
 *           description: The path of the file
 *         example: temp/uuid-file-name.ext
 *     responses:
 *       200:
 *         description: file buffer according path name
 */

/**
 * @openapi
 * /api/images:
 *   delete:
 *     summary: Returns deleted file confirmation
 *     tags: [File_Uploads]
 *     parameters:
 *       - in: query
 *         name: filename
 *         schema:
 *           type: string
 *           required: true
 *           description: The path of the file
 *         example: temp/uuid-file-name.ext
 *     responses:
 *       200:
 *         description: confirmation of deleted file
 */
