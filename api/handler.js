import express from 'express';

// (สมมติว่าคุณแยกไฟล์ routes ไว้ในโฟลเดอร์ server เดิม)
// import userRoutes from '../server/routes/users'; 
// import postRoutes from '../server/routes/posts';

const app = express();

// --- ใช้ Middleware เดิมของคุณได้เลย ---
app.use(express.json());

// --- ใช้ Routes เดิมของคุณได้เลย ---
// (ตัวอย่าง)
app.get('/api/test', (req, res) => {
    res.send('Hello from Vercel Serverless Function!');
});

// (ตัวอย่างการ import routes เดิมจากโฟลเดอร์ server)
// app.use('/api/users', userRoutes);
// app.use('/api/posts', postRoutes);

// (ข้อควรระวัง)
// ลบบรรทัด 'app.listen()' ออกจากไฟล์ server.js เดิมของคุณ
// เพราะ Vercel จะจัดการเรื่องนี้เอง

// --- (นี่คือส่วนที่สำคัญที่สุด) ---
// Export 'app' ออกไปทั้งก้อน
export default app;