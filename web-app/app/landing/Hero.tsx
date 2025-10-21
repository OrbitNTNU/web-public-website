export default function Hero() {
    return (
        <section className="w-screen h-screen relative overflow-hidden">
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
