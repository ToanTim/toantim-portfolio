"use client";

import React, { useEffect, useState } from "react";
import PageLoader from "./PageLoader";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setShowLoader(true); // Only render loader on client
  }, []);

  return (
    <>
      {showLoader && (
        <PageLoader
          videoSrc="https://res.cloudinary.com/dkxe7c5qm/video/upload/v1768383935/create_video_look_funny_from_this_for_my_loading_page_seed4223423425_zajrrw.mp4"
          duration={3000}
        />
      )}
      {children}
    </>
  );
}
