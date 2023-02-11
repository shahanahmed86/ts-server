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
 *     summary: Upload Image
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
 *         description: Returns path of the uploaded file
 */

/**
 * @openapi
 * /api/images:
 *   get:
 *     summary: Image Buffer
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
 *     summary: Delete Image
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
 *         description: Returns deleted file confirmation
 */
