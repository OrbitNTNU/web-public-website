'use client'

import { useEffect, useState } from "react"
import { fetchLandingPage } from "@/sanity/queries/landingPage"
import { LandingPage, LandingPageSection } from "@/sanity/types/landingPage"

import Hero from "@/app/landing/Hero"
import LargeQuote from "@/components/General/LargeQuote"
import LargeImage from "@/components/General/LargeImage"
import SpanningText from "@/components/General/SpanningText"
import DoubleImages from "@/components/General/DoubleImages"
import Projects from "@/components/General/Projects"
import { imageBuilder } from "@/sanity/utils/imageBuilder"
import { Loading } from "@/components/Loading"
import SubOrbital from "@/components/General/SubOrbital"
import InstagramEmbed from "@/components/General/InstagramEmbed"
// import NavPanel from "./landing/NavPanel"
// import InstagramEmbed from "./landing/InstagramEmbed"

export default function Home() {
  const [landingPage, setLandingPage] = useState<LandingPage | null>(null)

  useEffect(() => {
    void fetchLandingPage().then((data) => {
      setLandingPage(data || null)
    })
  }, [])

  if (!landingPage) {
    return <Loading />
  }

  return (
    <>
      <Hero />
      {landingPage.sections?.map((section: LandingPageSection) => {
        switch (section._type) {
          case "largeQuote":
            return (
              <LargeQuote key={section._key} text={section.quote} />
            )

          case "largeImage":
            return (
              <LargeImage
                key={section._key}
                src={imageBuilder(section.image)}
                alt={"Large Image"}
                caption={section.caption}
              />
            )

          case "spanningText":
            return (
              <SpanningText
                key={section._key}
                text={section.text}
              />
            )

          case "doubleImage":
            return (
              <DoubleImages
                key={section._key}
                variant={section.variant}
                src1={imageBuilder(section.image1)}
                alt1={section.alt1 ?? ""}
                title1={section.title1}
                caption1={section.caption1}
                link1={section.link1}
                src2={imageBuilder(section.image2)}
                alt2={section.alt2 ?? ""}
                title2={section.title2}
                caption2={section.caption2}
                link2={section.link2}
              />
            )

          case "doubleImageCollage":
            return (
              <section key={section._key} className="flex flex-col gap-12">
                {section.items?.map((item) => (
                  <DoubleImages
                    key={item._key || Math.random().toString()}
                    variant={item.variant}
                    src1={imageBuilder(item.image1)}
                    alt1={item.alt1 ?? ""}
                    title1={item.title1}
                    caption1={item.caption1}
                    link1={item.link1}
                    src2={imageBuilder(item.image2)}
                    alt2={item.alt2 ?? ""}
                    title2={item.title2}
                    caption2={item.caption2}
                    link2={item.link2}
                  />
                ))}
              </section>
            )

          case "projectsShowcase":
            return <Projects key={section._key} projects={section.bigProjects} />

          case "subOrbitalShowcase":
            return <SubOrbital key={section._key} />

          case "instagramEmbed":
            return <InstagramEmbed key={section._key} />

          default:
            return null
        }
      })}
      <footer className="w-full py-8 text-center text-sm text-cloud-white italic">
        &copy; {new Date().getFullYear()} Orbit NTNU. All rights reserved.
      </footer> 
    </>
  )
}
