import React from 'react';
import { Link } from 'react-router-dom';
// (สำคัญ) ตรวจสอบว่าได้ import ไฟล์ CSS ที่มีสไตล์ใหม่นี้แล้ว
import '../css/FullGallery.css';

function FullGallery() {
    return (
        <div className="gallery-page-container">
            {/* --- Top Bar (Link back to home) --- */}
            <div className="page-top-bar">
                <Link to="/" className="back-link">
                    &larr; กลับหน้าหลัก
                </Link>
            </div>

            {/* --- Page Header --- */}
            <header className="page-header">
                <h1>Gallery</h1>
                <p>บันทึกการปฏิบัติงานและกิจกรรม</p>
            </header>

            {/* --- (สำคัญ) โครงสร้าง static ที่คุณขอ --- */}
            <div className="gallery-list">

                {/* =================================== */}
                {/* === รายการที่ 1 (ตัวอย่าง) === */}
                <div className="gallery-work-item">
                    <div className="item-timeline-line"></div>
                    <div className="item-content">

                        {/* 1. ส่วน 'date and work detail' */}
                        <div className="item-detail-box">
                            <p className="item-date-detail">
                                <strong>4 มิถุนายน 2025</strong><br />
                                วันแรกของการเริ่มฝึกงานที่ กฝผ. เริ่มเรียนรู้โครงสร้างขององค์กรในภาพกว้าง
                                จากการปฐมนิเทศ และเริ่มทำความเข้าใจกับ<strong> power automate</strong> งานชิ้นแรกที่ได้รับมอบหมาย
                                และได้ไปสังเกตการณ์ที่รถไฟฟ้ารับส่งพนักงานที่กำลังติดตั้งระบบแสกนใบหน้าด้วยเช่นกัน
                            </p>
                        </div>

                        {/* 2. ส่วน 'picture' */}
                        <div className="item-pictures-container">
                            <div className="item-picture-wrapper">
                                <img src="/pic/25858.jpg" className="item-picture" />
                            </div>
                            <div className="item-picture-wrapper">
                                <img src="/pic/25859.jpg" className="item-picture" />
                            </div>
                            <div className="item-picture-wrapper">
                                <img src="/pic/25860.jpg" className="item-picture" />
                            </div>
                            <div className="item-picture-wrapper">
                                <img src="/pic/25861.jpg" className="item-picture" />
                            </div>
                            <div className="item-picture-wrapper">
                                <img src="/pic/25863.jpg" className="item-picture" />
                            </div>
                        </div>

                    </div>
                </div>
                {/* === จบรายการที่ 1 === */}
                {/* =================================== */}


                {/* =================================== */}
                {/* === รายการที่ 2 (ตัวอย่าง) === */}
                <div className="gallery-work-item">
                    <div className="item-timeline-line"></div> {/* เส้นแนวตั้ง */}
                    <div className="item-content">

                        {/* 1. ส่วน 'date and work detail' */}
                        <div className="item-detail-box">
                            <p className="item-date-detail">
                                <strong>6 มิถุนายน 2025</strong><br />
                                เริ่มทำ project Fleet card ocr ด้วยการรวบรวมข้อมูลและศึกษาขั้นตอนการทำงาน
                                ของระบบเดิมที่ใช้อยู่ในปัจจุบัน และเริ่มทำความเข้าใจกับเทคโนโลยี OCR
                            </p>
                        </div>

                        {/* 2. ส่วน 'picture' (ตัวอย่างมี 1 รูป) */}
                        <div className="item-pictures-container">
                            <div className="item-picture-wrapper">
                                <img src="/pic/25866.jpg" className="item-picture" />
                            </div>
                            <div className="item-picture-wrapper">
                                <img src="/pic/25867.jpg" className="item-picture" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* === จบรายการที่ 2 === */}
                {/* =================================== */}


                {/* =================================== */}
                {/* === รายการที่ 3 (ตัวอย่างไม่มีรูป) === */}
                <div className="gallery-work-item">
                    <div className="item-timeline-line"></div> {/* เส้นแนวตั้ง */}
                    <div className="item-content">

                        {/* 1. ส่วน 'date and work detail' */}
                        <div className="item-detail-box">
                            <p className="item-date-detail">
                                <strong>10-14 มิถุนายน 2025</strong><br />
                                ลาไปค่าย
                            </p>
                        </div>

                        {/* 2. ส่วน 'picture' (เว้นว่างไว้ ถ้าไม่มีรูป) */}
                        {/* <div className="item-pictures-container">
            </div> 
            */}

                    </div>
                </div>
                {/* === จบรายการที่ 3 === */}
                {/* =================================== */}


                {/* =================================== */}
                {/* === รายการที่ 4 (ตัวอย่าง) === */}
                {/* คุณสามารถคัดลอกบล็อกนี้ไปวางเพื่อเพิ่มรายการใหม่ */}
                <div className="gallery-work-item">
                    <div className="item-timeline-line"></div> {/* เส้นแนวตั้ง */}
                    <div className="item-content">

                        {/* 1. ส่วน 'date and work detail' */}
                        <div className="item-detail-box">
                            <p className="item-date-detail">
                                <strong>16 มิถุนายน 2025</strong><br />
                                เริ่มทำ project fleet card ocr-backend โดยวันนี้ได้ทำการตั้งค่า
                                เซิร์ฟเวอร์เบื้องต้นสำหรับพัฒนา application ด้วย Node.js
                            </p>
                        </div>
                    </div>
                </div>
                {/* === จบรายการที่ 4 === */}
                {/* =================================== */}


                {/* =================================== */}
                {/* === รายการที่ 5 (ตัวอย่าง) === */}
                {/* คุณสามารถคัดลอกบล็อกนี้ไปวางเพื่อเพิ่มรายการใหม่ */}
                <div className="gallery-work-item">
                    <div className="item-timeline-line"></div> {/* เส้นแนวตั้ง */}
                    <div className="item-content">

                        {/* 1. ส่วน 'date and work detail' */}
                        <div className="item-detail-box">
                            <p className="item-date-detail">
                                <strong>23 มิถุนายน 2025</strong><br />
                                สังเกตการณ์การติดตั้งระบบแสกนหน้าพนักงานที่รถไฟฟ้ารับส่งพนักงาน
                            </p>
                        </div>

                        {/* 2. ส่วน 'picture' (ตัวอย่างมี 3 รูป) */}
                        <div className="item-pictures-container">
                            <div className="item-picture-wrapper">
                                <img src="/pic/25870_0.jpg" className="item-picture" />
                            </div>
                            <div className="item-picture-wrapper">
                                <img src="/pic/25871_0.jpg" className="item-picture" />
                            </div>
                            <div className="item-picture-wrapper">
                                <img src="/pic/25875_0.jpg" alt="Database Schema" className="item-picture" />
                            </div>
                        </div>

                    </div>
                </div>
                {/* === จบรายการที่ 5 === */}
                {/* =================================== */}

                {/* =================================== */}
                {/* === รายการที่ 6 (ตัวอย่าง) === */}
                {/* คุณสามารถคัดลอกบล็อกนี้ไปวางเพื่อเพิ่มรายการใหม่ */}
                <div className="gallery-work-item">
                    <div className="item-timeline-line"></div> {/* เส้นแนวตั้ง */}
                    <div className="item-content">

                        {/* 1. ส่วน 'date and work detail' */}
                        <div className="item-detail-box">
                            <p className="item-date-detail">
                                <strong>30 มิถุนายน 2025</strong><br />
                                ตรวจสอบการทำงานของระบบแสกนใบหน้าพนักงานที่รถไฟฟ้ารับส่งพนักงาน
                            </p>
                        </div>

                        {/* 2. ส่วน 'picture' (ตัวอย่างมี 3 รูป) */}
                        <div className="item-pictures-container">
                            <div className="item-picture-wrapper">
                                <img src="/pic/25879_0.jpg" className="item-picture" />
                            </div>
                            <div className="item-picture-wrapper">
                                <img src="/pic/25880_0.jpg" className="item-picture" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* === จบรายการที่ 6 === */}
                {/* =================================== */}


                {/* =================================== */}
                {/* === รายการที่ 7 (ตัวอย่าง) === */}
                {/* คุณสามารถคัดลอกบล็อกนี้ไปวางเพื่อเพิ่มรายการใหม่ */}
                <div className="gallery-work-item">
                    <div className="item-timeline-line"></div> {/* เส้นแนวตั้ง */}
                    <div className="item-content">

                        {/* 1. ส่วน 'date and work detail' */}
                        <div className="item-detail-box">
                            <p className="item-date-detail">
                                <strong>9 กรกฎาคม 2025</strong><br />
                                สังเกตการณ์การติดตั้งระบบแสกนหน้าพนักงานที่รถไฟฟ้ารับส่งพนักงาน
                            </p>
                        </div>

                        {/* 2. ส่วน 'picture' (ตัวอย่างมี 3 รูป) */}
                        <div className="item-pictures-container">
                            <div className="item-picture-wrapper">
                                <img src="/pic/25870_0.jpg" className="item-picture" />
                            </div>
                            <div className="item-picture-wrapper">
                                <img src="/pic/25871_0.jpg" className="item-picture" />
                            </div>
                            <div className="item-picture-wrapper">
                                <img src="/pic/25875_0.jpg" alt="Database Schema" className="item-picture" />
                            </div>
                        </div>

                    </div>
                </div>
                {/* === จบรายการที่ 7 === */}
                {/* =================================== */}


                {/* =================================== */}
                {/* === รายการที่ 8 (ตัวอย่าง) === */}
                {/* คุณสามารถคัดลอกบล็อกนี้ไปวางเพื่อเพิ่มรายการใหม่ */}
                <div className="gallery-work-item">
                    <div className="item-timeline-line"></div> {/* เส้นแนวตั้ง */}
                    <div className="item-content">

                        {/* 1. ส่วน 'date and work detail' */}
                        <div className="item-detail-box">
                            <p className="item-date-detail">
                                <strong>10-11 กรกฎาคม 2025</strong><br />
                                สังเกตการณ์การติดตั้งระบบแสกนหน้าพนักงานที่รถไฟฟ้ารับส่งพนักงาน
                            </p>
                        </div>

                        {/* 2. ส่วน 'picture' (ตัวอย่างมี 3 รูป) */}
                        <div className="item-pictures-container">
                            <div className="item-picture-wrapper">
                                <img src="/pic/25870_0.jpg" className="item-picture" />
                            </div>
                            <div className="item-picture-wrapper">
                                <img src="/pic/25871_0.jpg" className="item-picture" />
                            </div>
                            <div className="item-picture-wrapper">
                                <img src="/pic/25875_0.jpg" alt="Database Schema" className="item-picture" />
                            </div>
                        </div>

                    </div>
                </div>
                {/* === จบรายการที่ 8 === */}
                {/* =================================== */}


                {/* =================================== */}
                {/* === รายการที่ 9 (ตัวอย่าง) === */}
                {/* คุณสามารถคัดลอกบล็อกนี้ไปวางเพื่อเพิ่มรายการใหม่ */}
                <div className="gallery-work-item">
                    <div className="item-timeline-line"></div> {/* เส้นแนวตั้ง */}
                    <div className="item-content">

                        {/* 1. ส่วน 'date and work detail' */}
                        <div className="item-detail-box">
                            <p className="item-date-detail">
                                <strong>17 กรกฎาคม 2025</strong><br />
                                สังเกตการณ์การติดตั้งระบบแสกนหน้าพนักงานที่รถไฟฟ้ารับส่งพนักงาน
                            </p>
                        </div>

                        {/* 2. ส่วน 'picture' (ตัวอย่างมี 3 รูป) */}
                        <div className="item-pictures-container">
                            <div className="item-picture-wrapper">
                                <img src="/pic/25870_0.jpg" className="item-picture" />
                            </div>
                            <div className="item-picture-wrapper">
                                <img src="/pic/25871_0.jpg" className="item-picture" />
                            </div>
                            <div className="item-picture-wrapper">
                                <img src="/pic/25875_0.jpg" alt="Database Schema" className="item-picture" />
                            </div>
                        </div>

                    </div>
                </div>
                {/* === จบรายการที่ 9 === */}
                {/* =================================== */}
            </div >
            {/* --- จบ gallery-list --- */}

        </div >
    );
}

export default FullGallery;