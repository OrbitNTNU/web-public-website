
const IntroSlide = () => {
    return (
        <div className="relative">
            <video
                src="/landing-video.mp4"
                autoPlay
                loop
                muted
                className="w-screen opacity-70"
            />
            <div className="hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 flex-col items-center">
                <span className="mt-2 text-cloudWhite">Scroll down</span>
                <span className="material-icons"> 
                    keyboard_double_arrow_down
                </span>
            </div>
        </div>
    );
};

export default IntroSlide;