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
        preload="metadata" // important!
        style={{ minHeight: "100vh" }}
      >
        Your browser does not support the video tag.
      </video>

      {/* Arrow Down */}
      <div className="absolute bottom-10 w-full items-center justify-center animate-bounce flex">
        <p className="material-icons" style={{ fontSize: "3rem" }}>
          keyboard_arrow_down
        </p>
      </div>
    </section>
  );
}
