"use client";
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
      <button
        className="w-full mx-auto flex flex-col items-center mb-8 pt-20 md:pt-40 "
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <p className="material-icons" style={{ fontSize: "3rem" }}>
          keyboard_arrow_up
        </p>
        <small>Go back to the top of the page</small>
      </button>
      <footer className="bg-moonlight text-cloud-white py-12  mx-auto px-4 md:px-12">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo + Info */}
          <div className="text-center md:text-left flex flex-col">
            <h3 className="font-semibold mb-1">Orbit NTNU</h3>
            <small>contact@orbitntnu.com</small>
            <small>O.S Bragstad Plass 2B, Elektro D</small>
            <small>7034, Trondheim</small>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-wrap justify-center gap-6">
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
        <p className="text-center text-charcoal-light mt-8">
          &copy; {year} Orbit NTNU. All rights reserved.
        </p>
      </footer>
    </>
  );
};
