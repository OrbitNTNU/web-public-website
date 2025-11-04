import { useRef, useState } from "react";

interface VideoPlayerProps {
    mediaUrl: string;
    thumbnailUrl?: string;
}

const VideoPlayer = ({ mediaUrl, thumbnailUrl }: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = () => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play();
            setIsPlaying(true);
        }

    };

    return (<div className="w-full relative overflow-hidden cursor-pointer" onClick={handlePlayPause}>
        <video
            ref={videoRef}
            src={mediaUrl}
            poster={thumbnailUrl || ""}
            className="w-full h-full object-cover"
        />
        {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center"> 
                <span 
                    className="material-icons text-cloud-white" 
                    style={{ fontSize: "2.5rem" }}
                >
                    play_circle_outline
                </span> 
            </div>
        )} </div>
    );
};

export default VideoPlayer;
