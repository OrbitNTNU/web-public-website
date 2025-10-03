import React, { useEffect, useState } from "react";

interface TeamsControlsProps {
    viewMode: "grid" | "list" | "members";
    setViewMode: (mode: "grid" | "list" | "members") => void;
    setSearchTerm: (term: string) => void;
}

const controls = [
    {
        key: "members",
        icon: "people",
        label: "Members",
    },
    {
        key: "grid",
        icon: "grid_view",
        label: "Team grid",
    },
    {
        key: "list",
        icon: "list",
        label: "List View",
    },
] as const;

const TeamsControls = ({ viewMode, setViewMode, setSearchTerm }: TeamsControlsProps) => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        // Trigger animation after mount
        const timeout = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <section className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="flex space-x-8">
                {controls.map((control, idx) => (
                    <button
                        key={control.key}
                        type="button"
                        className={`cursor-pointer group gap-2 flex items-center hover:text-cloud-white transition-all duration-500
                            ${viewMode === control.key ? "text-cloud-white" : "text-slate"}
                            ${animate
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-10"
                            }
                        `}
                        style={{ transitionDelay: `${idx * 120}ms` }}
                        onClick={() => setViewMode(control.key)}
                    >
                        <span
                            className={`group-hover:text-cloud-white material-icons transition-colors
                                ${viewMode === control.key ? "text-cloud-white" : "text-slate"}
                            `}
                        >
                            {control.icon}
                        </span>
                        <span>{control.label}</span>
                    </button>
                ))}
            </div>
            <div
                className="flex justify-end flex-1 items-center"
            >
                <input
                    type="text"
                    placeholder="Search"
                    className="border-b w-128 text-left text-xl pb-2 pr-4 bg-transparent text-cloud-white placeholder:text-slate focus:outline-none"
                    onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                />
                <span className="material-icons">search</span>
            </div>
        </section>
    );
};

export default TeamsControls;