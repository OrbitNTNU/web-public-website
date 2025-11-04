"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loading } from "../../Loading";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa6";
import VideoPlayer from "./VideoPlayer";
import { InstagramPost, InstagramPostChild, InstagramProfile } from "./InstragramTypes";


export default function InstagramEmbed() {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<InstagramProfile | null>(null);
  const [visiblePosts, setVisiblePosts] = useState<InstagramPost[]>([]);
  const [carouselIndices, setCarouselIndices] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch("/api/instagram");
        if (response.ok) {
          const data = await response.json();
          setResponse(data);
        } else {
          console.error(`Error: Received status code ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };
    void fetchStatistics();
  }, []);

  useEffect(() => {
    if (!response?.posts) return;

    const updatePosts = () => {
      const width = window.innerWidth;

      if (width >= 1280) {
        // xl and up
        setVisiblePosts(response.posts.slice(0, 4));
      } else if (width >= 1024) {
        // lg
        setVisiblePosts(response.posts.slice(0, 3));
      } else if (width >= 640) {
        // sm and md
        setVisiblePosts(response.posts.slice(0, 4));
      } else {
        // default mobile
        setVisiblePosts(response.posts.slice(0, 3));
      }
    };

    updatePosts();
    window.addEventListener("resize", updatePosts);
    return () => window.removeEventListener("resize", updatePosts);
  }, [response]);

  if (loading) return <Loading />;

  const handlePrev = (postId: string) => {
    setCarouselIndices((prev) => ({
      ...prev,
      [postId]: Math.max((prev[postId] || 0) - 1, 0),
    }));
  };

  const handleNext = (postId: string, childrenLength: number) => {
    setCarouselIndices((prev) => ({
      ...prev,
      [postId]: Math.min((prev[postId] || 0) + 1, childrenLength - 1),
    }));
  };

  const renderPostMedia = (post: InstagramPost) => {
    const renderMedia = (media: InstagramPost | InstagramPostChild) => {
      const isVideo = media.mediaType === "VIDEO";
      const { width, height } = media.sizes.medium;

      return (
        <div
          style={{ aspectRatio: `${width} / ${height}` }}
          className="w-full relative overflow-hidden"
        >
          {isVideo ? (
            <VideoPlayer
              mediaUrl={media.mediaUrl}
              thumbnailUrl={media.thumbnailUrl}
            />
          ) : (
            <Image
              src={media.mediaUrl}
              alt={post.caption || "Instagram post"}
              fill
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
      );

    };

    if (post.mediaType === "CAROUSEL_ALBUM" && post.children && post.children.length > 0) {
      const childrenLength = post.children.length;
      const index = carouselIndices[post.id] || 0;
      const child = post.children[index];

      return (
        <div className="relative w-full">
          {renderMedia(child)}

          {index > 0 && (
            <button
              onClick={() => handlePrev(post.id)}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-cloud-white p-2 material-icons cursor-pointer"
            >
              chevron_left
            </button>
          )}
          {index < childrenLength - 1 && (
            <button
              onClick={() => handleNext(post.id, childrenLength)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-cloud-white p-2 material-icons cursor-pointer"
            >
              chevron_right
            </button>
          )}
        </div>
      );

    } else {
      return renderMedia(post);
    }
  };

  return (
    <section className="py-16">
      <motion.h3
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: "tween", stiffness: 200 }}
        className="px-4 md:px-12 mb-8 tracking-wider max-w-[2000px] mx-auto"
      >
        Our feed
      </motion.h3>

      {visiblePosts ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 md:px-12 max-w-[2000px] mx-auto auto-rows-min grid-flow-dense">
          {visiblePosts.map((post, index) => (
            <motion.div
              key={post.id}
              className="flex flex-col"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut",
                  },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-charcoal-light text-sm">
                  {new Date(post.timestamp).toLocaleDateString()}
                </span>
                <FaInstagram className="text-pink-500" />
              </div>

              {renderPostMedia(post)}

              {post.caption && (
                <span className="text-charcoal-light mt-4 whitespace-break-spaces">
                  {post.caption}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="px-4 md:px-12 max-w-[2000px] mx-auto">Failed to load Instagram feed.</p>
      )}
    </section>
  );
}