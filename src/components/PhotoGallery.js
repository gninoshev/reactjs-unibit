// src/components/PhotoGallery.js
import React, { useState } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';

const PhotoGallery = () => {
    // Define your initial set of photos.
    // Replace these sample URLs with your actual image URLs as needed.
    const initialPhotos = [
        { id: 1, src: 'https://picsum.photos/id/1018/600/400' },
        { id: 2, src: 'https://picsum.photos/id/1015/600/400' },
        { id: 3, src: 'https://picsum.photos/id/1019/600/400' },
        { id: 4, src: 'https://picsum.photos/id/1020/600/400' },
        { id: 5, src: 'https://picsum.photos/id/1021/600/400' },
        { id: 6, src: 'https://picsum.photos/id/1022/600/400' },
        // Add more photos as needed...
    ];

    const [photos, setPhotos] = useState(initialPhotos);

    // Shuffle the photos using the Fisher-Yates algorithm.
    const shufflePhotos = () => {
        const shuffled = [...photos];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setPhotos(shuffled);
    };

    return (
        // Outer full-page wrapper with a blue gradient background
        <div
            style={{
                minHeight: '100vh',
                width: '100%',
                background: 'linear-gradient(135deg, #1e3c72, #2a5298)', // Blue gradient
                padding: '1rem'
            }}
        >
            {/* Centered inner container with a white translucent background */}
            <div
                style={{
                    width: '100%',
                    maxWidth: '1200px',
                    margin: '2rem auto',
                    padding: '2rem',
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '12px',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#333' }}>
                    Photo Gallery
                </h2>
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <button
                        onClick={shufflePhotos}
                        style={{
                            padding: '0.75rem 1.5rem',
                            fontSize: '1rem',
                            background: 'var(--primary-color)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            transition: 'background 0.3s ease, transform 0.2s ease',
                        }}
                    >
                        Shuffle Photos
                    </button>
                </div>
                <Flipper flipKey={photos.map(photo => photo.id).join('')}>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '1rem',
                        }}
                    >
                        {photos.map((photo) => (
                            <Flipped key={photo.id} flipId={photo.id}>
                                <div style={{ width: '100%' }}>
                                    <img
                                        src={photo.src}
                                        alt={`Item ${photo.id}`}
                                        style={{
                                            display: 'block',
                                            borderRadius: '6px',
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                            width: 'auto',
                                            maxWidth: '100%',
                                            height: 'auto',
                                        }}
                                    />
                                </div>
                            </Flipped>
                        ))}
                    </div>
                </Flipper>
            </div>
        </div>
    );
};

export default PhotoGallery;