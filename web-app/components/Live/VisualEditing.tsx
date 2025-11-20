"use client";
import { SanityLive } from "@/sanity/live/live";
import {VisualEditing} from "next-sanity/visual-editing";

export default function SanityVisualEditing() {
    return (
        <>
            <SanityLive />
            <VisualEditing />
        </>
    );
}
