/**
 * @openapi
 * tags:
 *   name: Admin Auth
 */

/**
 * @openapi
 * /api/admin/auth:
 *   get:
 *     summary: Logged In
 *     tags: [Admin Auth]
 *     responses:
 *       200:
 *         description: Returns logged in admin
 */

/**
 * @openapi
 * /api/admin/auth:
 *   post:
 *     summary: Login
 *     tags: [Admin Auth]
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
 *                 example: admin@accounts.com.pk
 *               password:
 *                 type: string
 *                 description: password
 *                 example: 123Abc456
 *     responses:
 *       200:
 *         description: Returns token and admin's payload
 */

/**
 * @openapi
 * /api/admin/auth/change-password:
 *   put:
 *     summary: Change password
 *     tags: [Admin Auth]
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
 * /api/admin/auth:
 *   put:
 *     summary: Update Profile
 *     tags: [Admin Auth]
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
 *         description: Returns update profile success message
 */
