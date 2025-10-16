import React from 'react';

// Supervision data is now inside the component
const supervisionData = [
  { "id": 1, "image_url": "https://placehold.co/600x400/1e293b/94a3b8?text=Supervision+1", "caption": "อาจารย์นิเทศให้คำแนะนำ" },
  { "id": 2, "image_url": "https://placehold.co/600x400/1e293b/94a3b8?text=Supervision+2", "caption": "บรรยากาศในชั้นเรียน" },
  { "id": 3, "image_url": "https://placehold.co/600x400/1e293b/94a3b8?text=Supervision+3", "caption": "การนำเสนอผลงาน" }
];

function Gallery() {
    return (
        <div className="h-full overflow-hidden">
            <div className="flex gap-4 h-full overflow-x-auto pb-4">
                {supervisionData.map(photo => (
                    <div key={photo.id} className="flex-shrink-0 w-2/3 md:w-1/3 h-full">
                        <img
                            src={photo.image_url}
                            alt={photo.caption}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Gallery;
