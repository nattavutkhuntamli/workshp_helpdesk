export default {
/**
 * @swagger
 * /api/admin/:
 *   get:
 *     summary: Get admins with pagination
 *     tags: [Admin]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /api/admin/checkAuth:
 *   get:
 *     summary: Check authentication for admin
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful authentication
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *               
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */


/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Login as admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for login
 *               password:
 *                 type: string
 *                 description: The password for login
 *     responses:
 *       '200':
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: Status code
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 data:
 *                   type: object
 *                   description: Logged in admin data
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The ID of the logged in admin
 *                     username:
 *                       type: string
 *                       description: The username of the logged in admin
 *                     fullname:
 *                       type: string
 *                       description: The full name of the logged in admin
 *                     email:
 *                       type: string
 *                       description: The email of the logged in admin
 *                     phone:
 *                       type: string
 *                       description: The phone number of the logged in admin
 *                     address:
 *                       type: string
 *                       description: The address of the logged in admin
 *                     token:
 *                       type: string
 *                       description: The authentication token of the logged in admin
 *                     status:
 *                       type: integer
 *                       description: The status code of the logged in admin
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */


/**
 * @swagger
 * /api/admin/editProfile/{id}:
 *   patch:
 *     summary: Update admin profile
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the admin
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 description: The full name of the admin
 *               email:
 *                 type: string
 *                 description: The email of the admin
 *               phone:
 *                 type: string
 *                 description: The phone number of the admin
 *               address:
 *                 type: string
 *                 description: The address of the admin
 *     responses:
 *       '200':
 *         description: Successfully updated profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /api/admin/editPassword/{id}:
 *   patch:
 *     summary: Update admin password
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the admin
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The new password of the admin
 *     responses:
 *       '200':
 *         description: Successfully updated password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */


}