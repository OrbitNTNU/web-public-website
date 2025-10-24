import { MdKeyboardArrowDown } from "react-icons/md";

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

            {/* Arrow Down */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer flex">
                <p
                    className="material-icons"
                    style={{ fontSize: '3rem' }} 
                >
                    keyboard_arrow_down
                </p>
            </div>

        </section>
    );
}
