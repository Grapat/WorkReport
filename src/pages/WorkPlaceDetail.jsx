import React from 'react';
import { Link } from 'react-router-dom';
import '../css/WorkPlaceDetail.css';

function WorkPlaceDetail() {
  return (
    <div className="wpd-container">
      {/* 3. ปุ่มย้อนกลับไปหน้าหลัก */}
      <Link to="/" className="wpd-back-link">
        &larr; กลับไปหน้าหลัก
      </Link>
      <Link to="/hierarchy" className="wpd-back-link">
        &larr; โครงสร้างการบริหาร
      </Link>
      <header className="wpd-header">
        <h1>การไฟฟ้าฝ่ายผลิตแห่งประเทศไทย (EGAT)</h1>
        <p>Electricity Generating Authority of Thailand</p>
      </header>

      <div className="wpd-content">
        <div className="wpd-image-container">
          {/* คุณสามารถเปลี่ยนรูปนี้เป็นรูปจริงของ กฟผ. ได้ */}
          <img
            src="https://placehold.co/1200x400/1e293b/38bdf8?text=EGAT"
            alt="EGAT Headquarters"
            className="wpd-hero-image"
          />
        </div>

        <section className="wpd-about-card">
          <h2>เกี่ยวกับ กฟผ.</h2>
          <p>
            การไฟฟ้าฝ่ายผลิตแห่งประเทศไทย (กฟผ.) เป็นรัฐวิสาหกิจด้านกิจการพลังงาน
            ภายใต้การกำกับดูแลของกระทรวงพลังงาน กระทรวงการคลัง
            มีหน้าที่หลักในการผลิต จัดหา และส่งจ่ายพลังงานไฟฟ้า
            ให้แก่การไฟฟ้านครหลวง (กฟน.) และการไฟฟ้าส่วนภูมิภาค (กฟภ.)
            รวมถึงผู้ใช้ไฟฟ้าโดยตรง และประเทศข้างเคียง
          </p>
        </section>

        <section className="wpd-details-grid">
          <div className="wpd-detail-item">
            <h3>ตำแหน่งงาน</h3>
            <p>นักศึกษาปฏิบัติงานสหกิจ (Student Trainee)</p>
          </div>
          <div className="wpd-detail-item">
            <h3>ที่อยู่ (สำนักงานใหญ่)</h3>
            <p>53 หมู่ 2 ถนนจรัญสนิทวงศ์ ตำบลบางกรวย อำเภอบางกรวย จังหวัดนนทบุรี 11130</p>
          </div>
          <div className="wpd-detail-item">
            <h3>เว็บไซต์</h3>
            <a href="https://www.egat.co.th/" target="_blank" rel="noopener noreferrer">
              www.egat.co.th
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default WorkPlaceDetail;