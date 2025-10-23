export default function Hero() {
    return (
        <section className="w-screen relative top-0 left-0 h-screen">
            <video
                src="/landing-video.mp4"
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
            >
                Your browser does not support the video tag.
            </video>
        </section>
    );
}
