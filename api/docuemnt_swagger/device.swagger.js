export default {
/**
 * @swagger
 * /api/devices:
 *   get:
 *     summary: ดึงข้อมูลอุปกรณ์ทั้งหมด
 *     tags: [Devices]
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
 * /api/devices/search:
 *   get:
 *     summary: ค้นหาประวัติการแจ้งซ่อมของอุปกรณ์
 *     tags: [Devices]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: หน้าของผลลัพธ์ที่ต้องการแสดง
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: รหัสของลูกค้าที่เกี่ยวข้องกับอุปกรณ์
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
 * /api/devices/create:
 *   post:
 *     summary: ลงทะเบียนอุปกรณ์ใหม่
 *     tags: [Devices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CustomerId:
 *                 type: string
 *               Images:
 *                 type: string
 *               Brand:
 *                 type: string
 *               Model:
 *                 type: string
 *               SerialNumber:
 *                 type: string
 *               Description:
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
 * /api/devices/updateStatus/{id}:
 *   patch:
 *     summary: อัปเดตสถานะของอุปกรณ์
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: รหัสของอุปกรณ์ที่ต้องการอัปเดต
 *       - in: body
 *         name: body
 *         required: true
 *         description: ข้อมูลสถานะที่ต้องการอัปเดต
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
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
 * /api/payment/{RepairId}:
 *   patch:
 *     summary: อัปเดตการชำระเงินสำหรับการซ่อม หมายเหตุ status ประกอบไปด้วย ('เงินสด', 'โอน', 'บัตรเครดิต') 
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: RepairId
 *         schema:
 *           type: integer
 *         required: true
 *         description: รหัสการซ่อมที่ต้องการอัปเดตการชำระเงิน
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [เงินสด, โอน, บัตรเครดิต]
 *     responses:
 *       '200':
 *         description: อัปเดตการชำระเงินสำเร็จ
 *       '400':
 *         description: ข้อมูลไม่ถูกต้อง
 *       '500':
 *         description: เกิดข้อผิดพลาดที่ไม่คาดคิด
 */

/**
 * @swagger
 * /api/devices/uploadImage/{id}:
 *   patch:
 *     summary: อัปโหลดรูปภาพของอุปกรณ์
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: รหัสของอุปกรณ์ที่ต้องการอัปโหลดรูปภาพ
 *       - in: body
 *         name: body
 *         required: true
 *         description: ข้อมูลรูปภาพที่ต้องการอัปโหลด
 *         schema:
 *           type: object
 *           properties:
 *             Images:
 *               type: string
 *     responses:
 *       '200':
 *         description: สำเร็จ
 *       '400':
 *         description: ข้อมูลไม่ถูกต้อง
 *       '404':
 *         description: ไม่พบอุปกรณ์ที่ระบุ
 *       '500':
 *         description: เกิดข้อผิดพลาดที่ไม่คาดคิด
 */
/**
 * @swagger
 * /api/updateRepair/{deviceId}:
 *   patch:
 *     summary: อัปเดตข้อมูลการซ่อมของอุปกรณ์
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: deviceId
 *         schema:
 *           type: integer
 *         required: true
 *         description: รหัสของอุปกรณ์ที่ต้องการอัปเดตข้อมูลการซ่อม
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               Cost:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: อัปเดตข้อมูลการซ่อมสำเร็จ
 *       '400':
 *         description: ข้อมูลไม่ถูกต้อง
 *       '500':
 *         description: เกิดข้อผิดพลาดที่ไม่คาดคิด
 */

/**
 * @swagger
 * /api/devices/editDevice/{id}:
 *   patch:
 *     summary: แก้ไขข้อมูลของอุปกรณ์
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: รหัสของอุปกรณ์ที่ต้องการแก้ไข
 *       - in: body
 *         name: body
 *         required: true
 *         description: ข้อมูลที่ต้องการแก้ไขของอุปกรณ์
 *         schema:
 *           type: object
 *           properties:
 *             Brand:
 *               type: string
 *             Model:
 *               type: string
 *             SerialNumber:
 *               type: string
 *             Description:
 *               type: string
 *     responses:
 *       '200':
 *         description: สำเร็จ
 *       '400':
 *         description: ข้อมูลไม่ถูกต้อง
 *       '404':
 *         description: ไม่พบอุปกรณ์ที่ระบุ
 *       '500':
 *         description: เกิดข้อผิดพลาดที่ไม่คาดคิด
 */

/**
 * @swagger
 * /api/devices/technician/{id}:
 *   patch:
 *     summary: เพิ่มรหัสช่างที่ได้รับมอบหมายงาน
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: รหัสของอุปกรณ์ที่ต้องการเพิ่มรหัสช่าง
 *       - in: body
 *         name: body
 *         required: true
 *         description: ข้อมูลรหัสช่างที่ต้องการเพิ่ม
 *         schema:
 *           type: object
 *           properties:
 *             TechnicianID:
 *               type: string
 *     responses:
 *       '200':
 *         description: สำเร็จ
 *       '400':
 *         description: ข้อมูลไม่ถูกต้อง
 *       '404':
 *         description: ไม่พบอุปกรณ์ที่ระบุ
 *       '500':
 *         description: เกิดข้อผิดพลาดที่ไม่คาดคิด
 */

/**
 * @swagger
 * /api/devices/{id}:
 *   delete:
 *     summary: ลบข้อมูลอุปกรณ์
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: รหัสของอุปกรณ์ที่ต้องการลบ
 *     responses:
 *       '200':
 *         description: สำเร็จ
 *       '400':
 *         description: ข้อมูลไม่ถูกต้อง
 *       '404':
 *         description: ไม่พบอุปกรณ์ที่ระบุ
 *       '500':
 *         description: เกิดข้อผิดพลาดที่ไม่คาดคิด
 */

}