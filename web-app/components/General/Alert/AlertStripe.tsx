"use client";

import { useState } from "react";
import { PortableText } from "next-sanity";
import { AlertStripe as AlertStripeType } from "@/sanity/types/alert/alertStripe";
import { alertIconMap } from "@/sanity/utils/alertIconMap";
import CloseIcon from "@mui/icons-material/Close";


interface AlertProps {
    data: AlertStripeType;
}

export default function AlertStripe({ data }: AlertProps) {
    const [visible, setVisible] = useState(true);

    const variantClasses: Record<string, { border: string; bg: string }> = {
        "laser-lemon": {
            border: "border-laser-lemon",
            bg: "bg-laser-lemon/10",
        },
        "emerald-fizz": {
            border: "border-emerald-fizz",
            bg: "bg-emerald-fizz/10",
        },
        "berry-blast": {
            border: "border-berry-blast",
            bg: "bg-berry-blast/10",
        },
        "sky-mint": {
            border: "border-sky-mint",
            bg: "bg-sky-mint/10",
        },
    };

    const buttonHoverClasses: Record<string, string> = {
        "laser-lemon": "bg-laser-lemon/20 hover:bg-laser-lemon",
        "emerald-fizz": "bg-emerald-fizz/20 hover:bg-emerald-fizz",
        "berry-blast": "bg-berry-blast/20 hover:bg-berry-blast",
        "sky-mint": "bg-sky-mint/20 hover:bg-sky-mint",
    };

    const buttonColors =
        buttonHoverClasses[data.variant] ??
        buttonHoverClasses["laser-lemon"];

    const colors =
        variantClasses[data.variant] ?? variantClasses["laser-lemon"];

    const IconComponent =
        alertIconMap[data.icon] || alertIconMap.WarningAmber;

    if (!visible) return null;

    return (
        <div
            className={`
        -mb-20 md:-mb-30 -mt-40
        sticky top-20 z-40
        mx-4 md:mx-12
        flex items-center justify-between
        px-3 md:px-6 py-2 md:py-4
        border-l-4 ${colors.border}
        ${colors.bg}
      `}
        >
            <div className="flex items-center gap-3 md:gap-4">
                <IconComponent
                    sx={{
                        fontSize: 28, // mobile
                    }}
                    className="md:!text-[40px]"
                    style={{ color: "var(--color-cloud-white)" }}
                />

                <div className="flex flex-col">
                    <h2 className="text-cloud-white font-semibold text-sm md:text-lg">
                        {data.title}
                    </h2>

                    <div className="text-cloud-white text-xs md:text-sm opacity-80">
                        <PortableText value={data.content} />
                    </div>
                </div>
            </div>

            <button
                onClick={() => setVisible(false)}
                className="md:hidden cursor-pointer ml-2"
            >
                <CloseIcon
                    sx={{ fontSize: 22, color: "var(--color-cloud-white)" }}
                />
            </button>

            <button
                onClick={() => setVisible(false)}
                className={`hidden md:inline-block px-4 py-2 rounded-sm cursor-pointer transition-colors duration-200 ${buttonColors} text-cloud-white`}
            >
                Dismiss
            </button>
        </div>
    );
}
