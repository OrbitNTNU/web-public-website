import Image from "next/image";
import Link from "next/link";
import React from "react";

// Replace with actual image URLs (example Unsplash images)
const cards = [
    {
        title: "Projects",
        image: "/framsat.png",
        link: "/innovation",
    },
    {
        title: "organization",
        image: "/orbitluv.png",
        link: "/empowerment",
    },
    {
        title: "Our history",
        image: "/sattellite.png",
        link: "/connection",
    },
];

const NavPanel = () => {
    return (
        <div className="px-8 max-w-7xl mx-auto gap-8">
            <h1 className="mb-8 text-left">
                Europe&apos;s largest technical student organization.
            </h1>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((card) => (
                    <Link
                        key={card.title}
                        href={card.link}
                        className="overflow-hidden flex flex-col group"
                    >
                        <div className="w-full h-[300px] overflow-hidden rounded-md">
                            <Image
                                src={card.image}
                                alt={card.title}
                                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                                width={400}
                                height={300}
                                priority
                                style={{
                                    filter: "brightness(0.8)",
                                }}
                            />
                        </div>
                        <div className="flex flex-col flex-1">
                            <h2 className="mt-4">{card.title.toUpperCase()}</h2>
                            <span>
                                Learn more
                                <span className="material-icons align-middle">arrow_forward</span>
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NavPanel;
