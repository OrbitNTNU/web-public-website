'use client';
import Link from "next/link";
import React from "react";
import { FaInstagram, FaYoutube, FaLinkedin, FaFacebook } from "react-icons/fa";

export const Footer = () => {
    const year = new Date().getFullYear();

    const pages = [
        { title: "Home", url: "/" },
        { title: "About", url: "/about" },
        { title: "Projects", url: "/projects" },
        { title: "Team", url: "/team" },
        { title: "Contact", url: "/contact" },
        { title: "Sponsors", url: "/sponsors" },
    ];

    return (
        <>
            <div className="cursor-pointer flex flex-col items-center mb-8" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <p
                    className="material-icons"
                    style={{ fontSize: '3rem' }}
                    >
                    keyboard_arrow_up
                </p>
                <p>Go back to the top of the page</p>
            </div>
            <footer className="bg-moonlight text-cloud-white py-12">
                <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Logo + Info */}
                    <div className="text-center md:text-left">
                        <h2 className="text-xl font-semibold mb-1">Orbit NTNU</h2>
                        <p className="text-sm">contact@orbitntnu.com</p>
                        <p className="text-sm">O.S Bragstad Plass 2B, Elektro D</p>
                        <p className="text-sm">7034, Trondheim</p>
                    </div>

                    {/* Navigation Links */}
                    <ul className="flex flex-wrap justify-center gap-6 text-sm">
                        {pages.map((link) => (
                            <li key={link.title}>
                                <Link
                                    href={link.url}
                                    className="hover:text-laser-lemon transition-colors"
                                >
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Social Icons */}
                    <div className="flex gap-6 text-xl">
                        <a
                            href="https://www.instagram.com/orbitntnu/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="hover:text-pink-blast transition-colors"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://www.youtube.com/@orbitntnu"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="YouTube"
                            className="hover:text-red-600 transition-colors"
                        >
                            <FaYoutube />
                        </a>
                        <a
                            href="https://www.linkedin.com/company/orbit-ntnu"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="hover:text-berry-blast transition-colors"
                        >
                            <FaLinkedin />
                        </a>
                        <a
                            href="https://www.facebook.com/OrbitNTNU/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            className="hover:text-berry-blast transition-colors"
                        >
                            <FaFacebook />
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <p className="text-center text-slate mt-8">
                    &copy; {year} Orbit NTNU. All rights reserved.
                </p>
            </footer>
        </>

    );
};
