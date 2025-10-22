import React from 'react';

// 1. Import the CSS file for this component
import '../css/Gallery.css';

// Supervision data is kept inside the component for simplicity
const supervisionData = [
    { "id": 1, "image_url": "/pic/1.jpg", "caption": "รูปที่1" },
    { "id": 2, "image_url": "/pic/2.jpg", "caption": "รูปที่2" },
    { "id": 3, "image_url": "/pic/3.jpg", "caption": "รูปที่3" },
    { "id": 4, "image_url": "/pic/4.jpg", "caption": "รูปที่4" },
    { "id": 5, "image_url": "/pic/25858.jpg", "caption": "รูปที่5" },
    { "id": 6, "image_url": "/pic/25859.jpg", "caption": "รูปที่6" },
    { "id": 7, "image_url": "/pic/25860.jpg", "caption": "รูปที่7" },
    { "id": 8, "image_url": "/pic/25861.jpg", "caption": "รูปที่8" },
    { "id": 9, "image_url": "/pic/25862.jpg", "caption": "รูปที่9" },
    { "id": 10, "image_url": "/pic/25863.jpg", "caption": "รูปที่10" },
    { "id": 11, "image_url": "/pic/25864.jpg", "caption": "รูปที่11" },
    { "id": 12, "image_url": "/pic/25865.jpg", "caption": "รูปที่12" },

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