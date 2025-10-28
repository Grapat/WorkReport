import React from 'react';
import { Link } from 'react-router-dom';
// 1. Import CSS สำหรับหน้านี้
import '../css/WorkPlaceStyles.css';

// --- (สำคัญ) ข้อมูลตัวอย่างโครงสร้างองค์กร ---
// คุณสามารถแก้ไขข้อมูลตรงนี้ให้เป็นของจริงได้เลย
// "children" คือลูกน้องหรือแผนกที่อยู่ภายใต้คนนั้นๆ
const hierarchyData = {
    name: 'ผู้อำนวยการโรงเรียน',
    title: 'นาย ก. ผู้อำนวยการ',
    children: [
        {
            name: 'ฝ่ายวิชาการ',
            title: 'นาง ข. รองผู้อำนวยการ',
            children: [
                { name: 'กลุ่มสาระฯ คณิตศาสตร์', title: 'นาง ค. หัวหน้ากลุ่ม' },
                { name: 'กลุ่มสาระฯ วิทยาศาสตร์', title: 'นาย ง. หัวหน้ากลุ่ม' },
            ],
        },
        {
            name: 'ฝ่ายกิจการนักเรียน',
            title: 'นาย จ. รองผู้อำนวยการ',
            children: [
                { name: 'งานระดับชั้น', title: 'ครู ฉ.' },
                { name: 'งานแนะแนว', title: 'ครู ช.' },
            ],
        },
        {
            name: 'ฝ่ายบริหารทั่วไป',
            title: 'นาง ซ. รองผู้อำนวยการ',
        },
    ],
};

// --- คอมโพเนนต์สำหรับแสดง "โหนด" (แต่ละคน/แผนก) ---
// เราจะใช้เทคนิค "Recursive" คือเรียกตัวเองซ้ำๆ เพื่อแสดง children
const HierarchyNode = ({ node }) => {
    return (
        <div className="org-node">
            <div className="node-content">
                <div className="node-name">{node.name}</div>
                <div className="node-title">{node.title}</div>
            </div>
            {/* ถ้ามี children ให้แสดงผล */}
            {node.children && node.children.length > 0 && (
                <div className="node-children">
                    {node.children.map((childNode, index) => (
                        <HierarchyNode key={index} node={childNode} />
                    ))}
                </div>
            )}
        </div>
    );
};

// --- คอมโพเนนต์หลักของหน้า ---
function WorkPlaceHierarchy() {
    return (
        <div className="page-container">
            <div className="page-top-bar">
                <Link to="/workplace" className="wpd-back-link">
                    &larr; ไปหน้ารายละเอียดสถานประกอบการ
                </Link>
                <Link to="/" className="wpd-hierarchy-link"> {/* (แนะนำ) เปลี่ยน class เพื่อให้สไตล์ไม่ชนกัน */}
                    กลับไปหน้าหลัก &rarr; {/* (แนะนำ) เปลี่ยนลูกศรเพื่อให้ดูสมเหตุสมผล */}
                </Link>
            </div>

            <header className="page-header">
                <h1>ผังการบริหารองค์กร (Workplace Hierarchy)</h1>
                <p>แสดงโครงสร้างและลำดับการบริหารงานภายในสถานประกอบการ</p>
            </header>

            <div className="hierarchy-wrapper">
                <div className="org-chart">
                    {/* เริ่มต้น Render ที่โหนดบนสุด */}
                    <HierarchyNode node={hierarchyData} />
                </div>
            </div>
        </div>
    );
}

export default WorkPlaceHierarchy;