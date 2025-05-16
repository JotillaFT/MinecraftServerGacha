import React, { useState, useEffect } from "react";
import "./Gallery.css";

// Función para generar un número entero aleatorio entre min y max (inclusive)
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const spanClasses = ["", "col-span-2", "row-span-2"];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getRandomImages = () => {
      const imgs = [];
      for (let i = 0; i < 9; i++) {
        // Generamos ancho y alto aleatorio entre 300 y 700 px
        const width = randomInt(300, 700);
        const height = randomInt(300, 700);
        const src = `https://via.placeholder.com/${width}x${height}`;

        // Elegimos aleatoriamente la clase de span
        const className = spanClasses[Math.floor(Math.random() * spanClasses.length)];

        imgs.push({ src, className });
      }
      return imgs;
    };

    setImages(getRandomImages());
  }, []);

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
