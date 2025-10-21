'use client';
import { useEffect, useRef } from 'react';

const embeds = [
    // Example post URLs
    'https://www.instagram.com/p/DPdFsPlDOQ5/',
    'https://www.instagram.com/p/DPdFsPlDOQ5/',
    'https://www.instagram.com/p/DPdFsPlDOQ5/',
    'https://www.instagram.com/p/DPdFsPlDOQ5/',
    'https://www.instagram.com/p/DPdFsPlDOQ5/',
    // 'https://www.instagram.com/p/Cq9F2eJPi5K/',
];

const InstagramPostEmbed = ({ postUrl }: { postUrl: string }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load Instagram embed script if not already present
        if (!document.getElementById('instagram-embed-script')) {
            const script = document.createElement('script');
            script.id = 'instagram-embed-script';
            script.src = '//www.instagram.com/embed.js';
            script.async = true;
            document.body.appendChild(script);
        } else if ((window as any).instgrm) {
            // Reparse embeds if script already loaded
            (window as any).instgrm.Embeds.process();
        }
    }, []);

    return (
        <div ref={ref} style={{ overflow: 'hidden', borderRadius: 8 }}>
            <blockquote
                className="instagram-media"
                data-instgrm-permalink={`${postUrl}?utm_source=ig_embed&amp;utm_campaign=loading`}
                data-instgrm-version="14"
                style={{
                    background: '#FFF',
                    border: 0,
                    borderRadius: 8,
                    boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                    margin: 0,
                    maxWidth: 540,
                    minWidth: 326,
                    padding: 0,
                    width: '100%',
                    height: 400,
                    overflow: 'hidden',
                }}
            >
                <a href={`${postUrl}?utm_source=ig_embed&amp;utm_campaign=loading`} target="_blank" rel="noopener noreferrer">
                    View this post on Instagram
                </a>
            </blockquote>
        </div>
    );
};

const InstagramEmbed = () => {
    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full max-w-7xl mx-auto px-4">
            {embeds.map((url) => (
                <InstagramPostEmbed key={url} postUrl={url} />
            ))}
        </div>
    );
};

export default InstagramEmbed;