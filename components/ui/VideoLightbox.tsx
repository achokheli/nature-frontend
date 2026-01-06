'use client';

import React, { useState } from 'react';
import { VideoLightboxProps } from '@/types';

/**
 * Video Lightbox Component
 * Displays a video in a modal overlay
 * All data and handlers are passed via props
 */
const VideoLightbox: React.FC<VideoLightboxProps> = ({
  videoUrl,
  thumbnailUrl,
  thumbnailAlt = 'Video thumbnail',
  isOpen: controlledIsOpen,
  onOpen,
  onClose,
  className = '',
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  // Use controlled or internal state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (value: boolean) => {
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(value);
    }
    if (value && onOpen) onOpen();
    if (!value && onClose) onClose();
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  if (!videoUrl && !thumbnailUrl) {
    return null;
  }

  return (
    <>
      {/* Video Thumbnail/Trigger */}
      {thumbnailUrl && (
        <div className={`relative ${className}`}>
          <button
            onClick={handleOpen}
            className="relative group"
            aria-label="Play video"
          >
            <img
              src={thumbnailUrl}
              alt={thumbnailAlt}
              className="w-full h-full object-cover"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-opacity">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-8 h-8 text-gray-900 ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={handleClose}
        >
          <div
            className="relative w-full h-full max-w-6xl max-h-[90vh] m-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Close video"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Video Player */}
            {videoUrl && (
              <div className="w-full h-full flex items-center justify-center">
                <iframe
                  src={videoUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Project video"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default VideoLightbox;
