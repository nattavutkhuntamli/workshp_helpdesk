export default {
    /**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: ดึงข้อมูลลูกค้าทั้งหมด
 *     tags: [Customers]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: หน้าของผลลัพธ์ที่ต้องการแสดง
 *     responses:
 *       '200':
 *         description: สำเร็จ
 *       '400':
 *         description: ข้อมูลไม่ถูกต้อง
 *       '500':
 *         description: เกิดข้อผิดพลาดที่ไม่คาดคิด
 */

/**
 * @swagger
 * /api/customers/{id}:
 *   get:
 *     summary: ดึงข้อมูลลูกค้าตาม ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: รหัสของลูกค้าที่ต้องการดึงข้อมูล
 *     responses:
 *       '200':
 *         description: สำเร็จ
 *       '400':
 *         description: ข้อมูลไม่ถูกต้อง
 *       '500':
 *         description: เกิดข้อผิดพลาดที่ไม่คาดคิด
 */

/**
 * @swagger
 * /api/customers/create:
 *   post:
 *     summary: ลงทะเบียนลูกค้าใหม่
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FirstName:
 *                 type: string
 *               LastName:
 *                 type: string
 *               Email:
 *                 type: string
 *               Phone:
 *                 type: string
 *               Address:
 *                 type: string
 *     responses:
 *       '200':
 *         description: สำเร็จ
 *       '400':
 *         description: ข้อมูลไม่ถูกต้อง
 *       '500':
 *         description: เกิดข้อผิดพลาดที่ไม่คาดคิด
 */

/**
 * @swagger
 * /api/customers/edit/{id}:
 *   patch:
 *     summary: แก้ไขข้อมูลของลูกค้า
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: รหัสของลูกค้าที่ต้องการแก้ไข
 *       - in: body
 *         name: body
 *         required: true
 *         description: ข้อมูลที่ต้องการแก้ไขของลูกค้า
 *         schema:
 *           type: object
 *           properties:
 *             FirstName:
 *               type: string
 *             LastName:
 *               type: string
 *             Email:
 *               type: string
 *             Phone:
 *               type: string
 *             Address:
 *               type: string
 *     responses:
 *       '200':
 *         description: สำเร็จ
 *       '400':
 *         description: ข้อมูลไม่ถูกต้อง
 *       '500':
 *         description: เกิดข้อผิดพลาดที่ไม่คาดคิด
 */

}