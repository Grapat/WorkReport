import React from 'react';

// 1. Import the CSS file for this component
import '../css/Gallery.css';

// Supervision data is kept inside the component for simplicity
const supervisionData = [
    { "id": 1, "image_url": "https://placehold.co/600x400/1e293b/94a3b8?text=Supervision+1", "caption": "อาจารย์นิเทศให้คำแนะนำ" },
    { "id": 2, "image_url": "https://placehold.co/600x400/1e293b/94a3b8?text=Supervision+2", "caption": "บรรยากาศในชั้นเรียน" },
    { "id": 3, "image_url": "https://placehold.co/600x400/1e293b/94a3b8?text=Supervision+3", "caption": "การนำเสนอผลงาน" },
    { "id": 4, "image_url": "https://placehold.co/600x400/1e293b/94a3b8?text=Supervision+4", "caption": "กิจกรรมกลุ่ม" }
];

function Gallery() {
    return (
        // 2. Use the class names defined in Gallery.css
        <div className="gallery-container">
            <div className="gallery-scroller">
                {supervisionData.map(photo => (
                    <div key={photo.id} className="gallery-item">
                        <img
                            src={photo.image_url}
                            alt={photo.caption}
                            className="gallery-image"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Gallery;