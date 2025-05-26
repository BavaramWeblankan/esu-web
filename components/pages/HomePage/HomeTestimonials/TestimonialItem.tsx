import React, { useState } from "react";
import Image from "next/image";
import playButton from "@/public/images/play-button.png"; // Adjust the path as necessary
import { createPortal } from "react-dom";

type Props = {
  testimonialData: {
    id: string;
    title: string;
    slug: string;
    featuredImage: {
      node: {
        sourceUrl: string;
        altText: string;
      };
    };
    testimonials: {
      testimonialType: string[];
      testimonialVideo?: string;
      thumbnailImage?: {
        node: {
          sourceUrl: string;
        };
      };
      testimonialText?: string;
    };
  };
};

const TestimonialItem: React.FC<Props> = ({ testimonialData }) => {
  const { title, slug, testimonials, featuredImage } = testimonialData;

  const isText = testimonials.testimonialType?.includes("Text");
  const isVideo = testimonials.testimonialType?.includes("Video");
  const imageUrl = testimonials.thumbnailImage?.node?.sourceUrl;
  const videoUrl = testimonials?.testimonialVideo;
  const featuredImageUrl = featuredImage?.node?.sourceUrl;

  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const text = testimonials.testimonialText?.trim() || "";
  const MAX_CHARACTERS = 220;

  const shouldTruncate = text.length > MAX_CHARACTERS;
  const visibleText = expanded ? text : text.slice(0, MAX_CHARACTERS);

    const getYouTubeId = (url?: string) => {
    if (!url) return "";
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? match[1] : "";
  };

  const youtubeId = getYouTubeId(videoUrl);

  return (
    <div id="testimonial-item">
      <div className="t-item-inner">
        {/* Image + Name/Slug */}
        <div className="detail-wrapper">
          {featuredImageUrl && (
            <div className="image-contain">
              <Image
                src={featuredImageUrl}
                width={60}
                height={60}
                alt={featuredImage?.node?.altText || title}
              />
            </div>
          )}
          <div className="detail-contain">
            <h6 className="person-name">{title}</h6>
          </div>
        </div>

        {/* Text Testimonial */}
        {isText && text && (
            <div className="testimonial-content message">
            {text.split(/\r?\n/).map((line, i) => (
              <p key={i}>{line.trim()}</p>
            ))}
            </div>
        )}

        {/* Video Testimonial */}
        {isVideo && imageUrl && (
          <div className="testimonial-content-parent " >
          <div className="testimonial-content video" style={{ position: "relative" }}>
            <Image
              src={imageUrl}
              alt={`Testimonial Video Thumbnail - ${title}`}
              width={300}
              height={200}
              layout="responsive"
            />
           <img
              src="/images/play-button.png"
              alt="Play Video"
              className="video-play-btn"
              width={40}
              height={40}
            
              onClick={() => setShowModal(true)}
            />
          </div>
          </div>
        )}
        {showModal && youtubeId &&
          typeof window !== "undefined" &&
          createPortal(
            <div className="video-modal" onClick={() => setShowModal(false)}>
              <div className="video-modal-content" onClick={e => e.stopPropagation()}>
                <button
                  className="video-modal-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                >
                  &times;
                </button>
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
            </div>,
            document.body
          )
        }
      </div>
    </div>
  );
};

export default TestimonialItem;
