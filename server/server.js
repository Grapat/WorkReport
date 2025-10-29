import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';

const app = express();
const PORT = 3001;
const DB_PATH = './db.json';

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Helper Function ---
// (ย้ายโค้ดอ่าน/เขียนไฟล์ DB มาไว้ที่นี่ เพื่อลดความซ้ำซ้อน)
async function readDB() {
  const data = await fs.readFile(DB_PATH, 'utf-8');
  return JSON.parse(data);
}
async function writeDB(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// --- API Endpoints ---

/** [GET] /api/data (เหมือนเดิม) */
app.get('/api/data', async (req, res) => {
  try {
    const dbData = await readDB();
    res.json({
        attendance: dbData.attendance || {},
        specialEvents: dbData.specialEvents || [],
        todos: dbData.todos || []
    });
  } catch (error) {
    console.error('Error reading database:', error);
    res.status(500).json({ message: 'Error reading database' });
  }
});

/** [POST] /api/attendance (เหมือนเดิม) */
app.post('/api/attendance', async (req, res) => {
  try {
    const dbData = await readDB();
    dbData.attendance = req.body;
    await writeDB(dbData);
    console.log('Attendance data updated!');
    res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error('Error writing attendance:', error);
    res.status(500).json({ message: 'Error writing attendance' });
  }
});

/** [POST] /api/todos (เหมือนเดิม) */
app.post('/api/todos', async (req, res) => {
  try {
    const dbData = await readDB();
    dbData.todos = req.body;
    await writeDB(dbData);
    console.log('Todos data updated!');
    res.status(200).json({ message: 'Todos updated successfully' });
  } catch (error) {
    console.error('Error writing todos:', error);
    res.status(500).json({ message: 'Error writing todos' });
  }
});

/** [POST] /api/events (เหมือนเดิม) */
app.post('/api/events', async (req, res) => {
  try {
    const newEvent = req.body;
    if (!newEvent.date || !newEvent.title) {
      return res.status(400).json({ message: 'Event must have a date and title' });
    }
    const dbData = await readDB();
    // (ทางเลือก) กำหนด ID ง่ายๆ ให้ Event ใหม่ (ถ้าต้องการ)
    // newEvent.id = Date.now().toString(); // หรือใช้ UUID
    dbData.specialEvents.push(newEvent);
    await writeDB(dbData);
    console.log('New event added:', newEvent);
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ message: 'Error adding event' });
  }
});

/**
 * (--- ใหม่ ---)
 * [PUT] /api/events/:date
 * แก้ไข Event ที่มีวันที่ตรงกับ :date
 */
app.put('/api/events/:date', async (req, res) => {
  try {
    const eventDateToEdit = req.params.date; // ดึงวันที่จาก URL
    const updatedEventData = req.body; // { title: 'New Title', date: 'New Date' }

    if (!updatedEventData.title || !updatedEventData.date) {
      return res.status(400).json({ message: 'Updated event must have date and title' });
    }

    const dbData = await readDB();
    
    // หา index ของ event ที่จะแก้ไข
    const eventIndex = dbData.specialEvents.findIndex(event => event.date === eventDateToEdit);

    if (eventIndex === -1) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // อัปเดตข้อมูล event ใน array
    dbData.specialEvents[eventIndex] = {
        ...dbData.specialEvents[eventIndex], // เก็บ ID เดิม (ถ้ามี)
        ...updatedEventData // ใส่ข้อมูลใหม่ทับ
    };

    await writeDB(dbData);
    console.log('Event updated:', dbData.specialEvents[eventIndex]);
    res.status(200).json(dbData.specialEvents[eventIndex]); // ส่ง event ที่อัปเดตแล้วกลับไป

  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Error updating event' });
  }
});

/**
 * (--- ใหม่ ---)
 * [DELETE] /api/events/:date
 * ลบ Event ที่มีวันที่ตรงกับ :date
 */
app.delete('/api/events/:date', async (req, res) => {
  try {
    const eventDateToDelete = req.params.date; // ดึงวันที่จาก URL
    const dbData = await readDB();

    // สร้าง array ใหม่ โดยกรองเอา event ที่จะลบออกไป
    const updatedEvents = dbData.specialEvents.filter(event => event.date !== eventDateToDelete);

    // เช็คว่ามีการลบเกิดขึ้นจริงหรือไม่ (เผื่อกรณีส่ง date ผิดมา)
    if (updatedEvents.length === dbData.specialEvents.length) {
      return res.status(404).json({ message: 'Event not found to delete' });
    }

    dbData.specialEvents = updatedEvents; // อัปเดต array ใน DB
    await writeDB(dbData);

    console.log('Event deleted:', eventDateToDelete);
    res.status(200).json({ message: 'Event deleted successfully' }); // หรือ 204 No Content

  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Error deleting event' });
  }
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});