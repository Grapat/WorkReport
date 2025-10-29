-- CreateTable
CREATE TABLE "Attendance" (
    "date" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("date")
);

-- CreateTable
CREATE TABLE "SpecialEvent" (
    "date" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "SpecialEvent_pkey" PRIMARY KEY ("date")
);

-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
