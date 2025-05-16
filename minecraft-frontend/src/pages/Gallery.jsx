import React, { useState } from "react";
import "./Gallery.css";

const images = [
  { src: "https://via.placeholder.com/600x400", className: "col-span-2" },
  { src: "https://via.placeholder.com/400x600", className: "row-span-2" },
  { src: "https://via.placeholder.com/600x400", className: "" },
  { src: "https://via.placeholder.com/400x400", className: "" },
  { src: "https://via.placeholder.com/400x600", className: "row-span-2" },
  { src: "https://via.placeholder.com/600x400", className: "col-span-2" },
  { src: "https://via.placeholder.com/600x400", className: "" },
  { src: "https://via.placeholder.com/600x400", className: "" },
  { src: "https://via.placeholder.com/600x400", className: "" },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="gallery-wrapper">
      <header className="gallery-header">
        <h1>GALERIA</h1>
      </header>

      <div className="gallery-grid">
        {images.map(({ src, className }, index) => (
          <div
            key={index}
            className={`gallery-item ${className}`}
            onClick={() => setSelectedImage(src)}
          >
            <img src={src} alt={`Gallery ${index + 1}`} />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Full" />
            <button onClick={() => setSelectedImage(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
