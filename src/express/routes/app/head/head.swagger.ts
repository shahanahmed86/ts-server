/**
 * @openapi
 * tags:
 *   name: Head
 */

/**
 * @openapi
 * /api/app/head?skip=1&take=10:
 *   get:
 *     summary: Get Heads
 *     tags: [Head]
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The number of items to skip before starting to collect the result set
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The numbers of items to return
 *     responses:
 *       200:
 *         description: Returns list of heads
 */
