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
        hideOnSmallScreens: false,
    },
    {
        key: "grid",
        icon: "grid_view",
        label: "Team grid",
        hideOnSmallScreens: false,
    },
    {
        key: "list",
        icon: "list",
        label: "List View",
        hideOnSmallScreens: true,
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
        <section className="flex flex-col lg:flex-row items-center justify-between mb-8">
            <div className="items-left w-auto flex flex-row space-x-8">
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
                            ${control.hideOnSmallScreens ? "hidden md:flex" : "flex"}
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
                className="flex justify-end flex-1 items-center w-full mt-20 lg:mt-0"
            >
                <input
                    type="text"
                    placeholder="Search"
                    className="border-b w-full lg:w-128 text-left text-xl pb-2 pr-4 bg-transparent text-cloud-white placeholder:text-slate focus:outline-none"
                    onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                />
                <span className="material-icons">search</span>
            </div>
        </section>
    );
};

export default TeamsControls;