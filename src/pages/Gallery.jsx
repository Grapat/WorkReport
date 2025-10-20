import React from 'react';

// 1. Import the CSS file for this component
import '../css/Gallery.css';

// Supervision data is kept inside the component for simplicity
const supervisionData = [
    { "id": 1, "image_url": "/pic/1.jpg", "caption": "รูปที่1" },
    { "id": 2, "image_url": "/pic/2.jpg", "caption": "รูปที่2" },
    { "id": 3, "image_url": "/pic/3.jpg", "caption": "รูปที่3" },
    { "id": 4, "image_url": "/pic/4.jpg", "caption": "รูปที่4" }
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