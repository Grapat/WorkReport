import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
// ✅ Import necessary modules
import { fileURLToPath } from 'url';
import path from 'path';

const prisma = new PrismaClient();

// ✅ Calculate __dirname using ES Module methods
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_JSON_PATH = path.resolve(__dirname, '../server/db.json'); // Find db.json in server

async function main() {
  console.log(`Reading data from ${DB_JSON_PATH}...`);
  const jsonData = JSON.parse(await fs.readFile(DB_JSON_PATH, 'utf-8'));

  console.log('Seeding Attendance...');
  const attendanceData = Object.entries(jsonData.attendance || {}).map(([date, status]) => ({
    date,
    status,
  }));
  if (attendanceData.length > 0) {
    // ล้างข้อมูลเก่าก่อน (ถ้าต้องการ)
    await prisma.attendance.deleteMany({});
    await prisma.attendance.createMany({ data: attendanceData });
  }

  console.log('Seeding Special Events...');
  const eventData = jsonData.specialEvents || [];
  if (eventData.length > 0) {
    await prisma.specialEvent.deleteMany({});
    // Prisma ต้องการให้ข้อมูลไม่มี id ถ้าเราให้มันสร้างเอง
    await prisma.specialEvent.createMany({
        data: eventData.map(ev => ({ date: ev.date, title: ev.title })) // เอาเฉพาะ date, title
    });
  }

  console.log('Seeding Todos...');
  const todoData = jsonData.todos || [];
  if (todoData.length > 0) {
    await prisma.todo.deleteMany({});
    // Prisma ต้องการให้ข้อมูลไม่มี id ถ้าเราให้มันสร้างเอง
    await prisma.todo.createMany({
        data: todoData.map(td => ({ text: td.text, completed: td.completed })) // เอาเฉพาะ text, completed
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });