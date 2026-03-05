export default function HighLevelSpecification() {
    const boxes = [
        {
            title: "Data Acquisition",
            gradient:
                "bg-[linear-gradient(135deg,rgba(2,126,226,0.5),rgba(0,255,200,0.2))]",
            spec: "Collects biological sensor data from onboard instruments."
        },
        {
            title: "Processing",
            gradient:
                "bg-[linear-gradient(135deg,rgba(63,202,63,0.5),rgba(180,255,120,0.2))]",
            spec: "Pre-processes raw signals for filtering and calibration."
        },
        {
            title: "Analytics",
            gradient:
                "bg-[linear-gradient(135deg,rgba(10,40,35,0.6),rgba(0,220,150,0.25))]",
            spec: "Applies algorithms to extract insights and patterns."
        },
        {
            title: "Visualization",
            gradient:
                "bg-[linear-gradient(135deg,rgba(254,170,2,0.5),rgba(255,230,120,0.25))]",
            spec: "Displays results through dashboards and graphical outputs."
        },
    ];

    return (
        <section className="w-full py-16 px-32">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
                {boxes.map((box, i) => (
                    <div
                        key={i}
                        className={`
                            ${box.gradient}
                            backdrop-blur-3xl
                            p-8
                            h-40
                            flex flex-col justify-center
                        `}
                    >
                        <h3 className="text-lg text-white">
                            {box.title}
                        </h3>

                        <p className="text-sm text-white/70 mt-2">
                            {box.spec}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}