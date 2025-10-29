import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';


const app = express();
const prisma = new PrismaClient();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- API Endpoints ---
app.get('/api/data', async (req, res) => {
  try {
    // ดึงข้อมูลจาก 3 ตารางพร้อมกันด้วย Prisma
    const attendanceRecords = await prisma.attendance.findMany();
    const specialEvents = await prisma.specialEvent.findMany();
    const todos = await prisma.todo.findMany({
      orderBy: { id: 'asc' } // เรียงตาม id
    });

    // แปลง attendance ให้อยู่ในรูปแบบ { "date": "status" }
    const attendanceData = {};
    attendanceRecords.forEach(record => {
      attendanceData[record.date] = record.status;
    });

    res.json({
      attendance: attendanceData,
      specialEvents: specialEvents,
      todos: todos
    });
  } catch (error) {
    console.error('Error fetching data with Prisma:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

/** [POST] /api/attendance (แก้ไขใหม่ด้วย Prisma) */
app.post('/api/attendance', async (req, res) => {
  const attendanceData = req.body; // { "2025-10-29": "present", ... }

  try {
    // ใช้ Transaction ของ Prisma
    await prisma.$transaction(async (tx) => {
      // 1. ล้างข้อมูลเก่าทิ้ง
      await tx.attendance.deleteMany({});

      // 2. เตรียมข้อมูลใหม่สำหรับ createMany
      const dataToCreate = Object.entries(attendanceData).map(([date, status]) => ({
        date: date,
        status: status,
      }));

      // 3. Insert ข้อมูลใหม่ทั้งหมดในครั้งเดียว
      if (dataToCreate.length > 0) {
        await tx.attendance.createMany({
          data: dataToCreate,
          skipDuplicates: true, // ถ้ามี date ซ้ำ ให้ข้ามไป (เผื่อไว้)
        });
      }
    }); // จบ Transaction

    console.log('Attendance data updated via Prisma!');
    res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error('Error writing attendance with Prisma:', error);
    res.status(500).json({ message: 'Error writing attendance' });
  }
});

/** [POST] /api/todos (แก้ไขใหม่ด้วย Prisma) */
app.post('/api/todos', async (req, res) => {
  const todosData = req.body; // Array of todo objects [{id?, text, completed}, ...]

  try {
    await prisma.$transaction(async (tx) => {
      // 1. ล้างข้อมูล todos เก่า (ถ้าต้องการเริ่มใหม่ทุกครั้ง)
      // await tx.todo.deleteMany({}); // หรือจะใช้วิธี update/create ทีละตัวก็ได้

      // 2. Update หรือ Create todos ทีละรายการ
      // (Prisma ไม่มี upsertMany โดยตรง ต้องวนลูปทำ)
      for (const todo of todosData) {
        if (todo.id) { // ถ้ามี id คือการ update
          await tx.todo.update({
            where: { id: todo.id },
            data: { text: todo.text, completed: todo.completed },
          });
        } else { // ถ้าไม่มี id คือการ create
          await tx.todo.create({
            data: { text: todo.text, completed: todo.completed },
          });
        }
      }
      // หมายเหตุ: การลบ todo ที่หายไปจาก req.body ต้องทำแยกต่างหาก
    });

    console.log('Todos data updated via Prisma!');
    res.status(200).json({ message: 'Todos updated successfully' });
  } catch (error) {
    console.error('Error writing todos with Prisma:', error);
    res.status(500).json({ message: 'Error writing todos' });
  }
});


/** [POST] /api/events (แก้ไขใหม่ด้วย Prisma) */
app.post('/api/events', async (req, res) => {
  try {
    const { date, title } = req.body;
    if (!date || !title) {
      return res.status(400).json({ message: 'Event must have a date and title' });
    }

    // ใช้ create เพื่อเพิ่ม event ใหม่
    const newEvent = await prisma.specialEvent.create({
      data: {
        date: date,
        title: title,
      },
    });

    console.log('New event added via Prisma:', newEvent);
    res.status(201).json(newEvent);
  } catch (error) {
    // Prisma จะมี error code P2002 ถ้าพยายามสร้าง date ที่ซ้ำ (ถ้า date เป็น @id)
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'Event with this date already exists' });
    }
    console.error('Error adding event with Prisma:', error);
    res.status(500).json({ message: 'Error adding event' });
  }
});

/** [PUT] /api/events/:date (แก้ไขใหม่ด้วย Prisma) */
app.put('/api/events/:date', async (req, res) => {
  try {
    const eventDateToEdit = req.params.date;
    const { title, date: newDate } = req.body; // รับ title และ date ใหม่

    if (!title || !newDate) {
      return res.status(400).json({ message: 'Updated event must have date and title' });
    }

    // ใช้ update เพื่อแก้ไข event ที่มี date ตรงกัน
    const updatedEvent = await prisma.specialEvent.update({
      where: { date: eventDateToEdit }, // หา event จาก date เดิม
      data: {
        date: newDate, // อัปเดต date ใหม่ (ถ้าต้องการเปลี่ยน)
        title: title,   // อัปเดต title ใหม่
      },
    });

    console.log('Event updated via Prisma:', updatedEvent);
    res.status(200).json(updatedEvent);

  } catch (error) {
    // Prisma จะมี error code P2025 ถ้าหา date ไม่เจอ
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Event not found' });
    }
    console.error('Error updating event with Prisma:', error);
    res.status(500).json({ message: 'Error updating event' });
  }
});

/** [DELETE] /api/events/:date (แก้ไขใหม่ด้วย Prisma) */
app.delete('/api/events/:date', async (req, res) => {
  try {
    const eventDateToDelete = req.params.date;

    // ใช้ delete เพื่อลบ event ที่มี date ตรงกัน
    await prisma.specialEvent.delete({
      where: { date: eventDateToDelete },
    });

    console.log('Event deleted via Prisma:', eventDateToDelete);
    res.status(200).json({ message: 'Event deleted successfully' }); // หรือ 204

  } catch (error) {
    // Prisma จะมี error code P2025 ถ้าหา date ไม่เจอ
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Event not found to delete' });
    }
    console.error('Error deleting event with Prisma:', error);
    res.status(500).json({ message: 'Error deleting event' });
  }
});


// --- Export 'app' สำหรับ Vercel (เหมือนเดิม) ---
export default app;