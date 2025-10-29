import React from 'react';
import { Link } from 'react-router-dom';
import '../css/WorkPlaceStyles.css';

// 1. (ใหม่) Import ไลบรารีที่เพิ่งติดตั้ง
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

function WorkPlaceHierarchy() {
    return (
        <div className="page-container">
            <div className="page-top-bar">
                <Link to="/workplace" className="wpd-back-link">
                    &larr; ไปหน้ารายละเอียดสถานประกอบการ
                </Link>
                <Link to="/" className="wpd-hierarchy-link">
                    กลับไปหน้าหลัก &rarr;
                </Link>
            </div>

            <header className="page-header">
                <h1>ผังการบริหารองค์กร (Workplace Hierarchy)</h1>
                <p>แสดงโครงสร้างและลำดับการบริหารงานภายในสถานประกอบการ</p>
            </header>

            {/* 2. (แก้ไข) หุ้มรูปภาพของคุณด้วย Wrapper และ Component */}
            <div className="hierarchy-wrapper">

                <TransformWrapper>
                    <TransformComponent>
                        {/* 3. (คงเดิม) โค้ดรูปภาพของคุณยังอยู่เหมือนเดิม */}
                        <picture className="hierarchy-image">
                            <img
                                src="/pic/EgatOG.jpg"
                                alt="ผังการบริหารองค์กร"
                                className="responsive-image"
                            />
                        </picture>

                    </TransformComponent>
                </TransformWrapper>

            </div>
        </div>
    );
}

export default WorkPlaceHierarchy;