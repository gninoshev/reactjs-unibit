// src/components/CoolAnimation.js
import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

const CoolAnimation = () => {
    return (
        <div
            style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                width: '300px',
                height: '300px',
                zIndex: 10,
            }}
        >
            <Player
                autoplay
                loop
                src="https://assets10.lottiefiles.com/packages/lf20_jcikwtux.json"
                style={{ height: '100%', width: '100%' }}
            />
        </div>
    );
};

export default CoolAnimation;