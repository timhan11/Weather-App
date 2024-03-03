import React from 'react';
import backgroundVideo from "../assets/background.mp4";

const Background = () => {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden">
            <video autoPlay loop muted className="w-full h-full object-cover absolute inset-0 opacity-50 z-0">
                <source src={backgroundVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default Background;
