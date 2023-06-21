/**
 * @openapi
 * tags:
 *   name: Head
 */

/**
 * @openapi
 * /api/app/head:
 *   get:
 *     summary: Get Heads without parent ID
 *     tags: [Head]
 *     parameters:
 *       - in: query
 *         name: offset
 *         schema:
 *           required: true
 *           type: integer
 *           default: 1
 *         description: The number of items to skip before starting to collect the result set
 *       - in: query
 *         name: limit
 *         schema:
 *           required: true
 *           type: integer
 *           default: 10
 *         description: The numbers of items to return
 *       - in: query
 *         name: search
 *         schema:
 *           required: false
 *           type: string
 *         description: The option to search inside the result
 *     responses:
 *       200:
 *         description: Returns list of heads
 */

/**
 * @openapi
 * /api/app/head/{parentId}:
 *   get:
 *     summary: Get Heads with parent ID
 *     tags: [Head]
 *     parameters:
 *       - in: query
 *         name: offset
 *         schema:
 *           required: true
 *           type: integer
 *           default: 1
 *         description: The number of items to skip before starting to collect the result set
 *       - in: query
 *         name: limit
 *         schema:
 *           required: true
 *           type: integer
 *           default: 10
 *         description: The numbers of items to return
 *       - in: query
 *         name: search
 *         schema:
 *           required: false
 *           type: string
 *         description: The option to search inside the result
 *       - in: path
 *         name: parentId
 *         schema:
 *           required: true
 *           type: string
 *         description: The parent ID of the entity
 *     responses:
 *       200:
 *         description: Returns list of heads
 */
