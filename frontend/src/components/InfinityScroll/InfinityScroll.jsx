import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const InfinityScroll = ({ getNextPage, children, offset = 10 }) => {
  const contentRef = useRef();
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handler = useCallback(async () => {
    const content = contentRef.current;
    if (!content) return;
    const { height, top } = content.getBoundingClientRect();
    const remainingSpaceAtBottom = window.innerHeight + top * -1 - height;
    const isReachedBottom = remainingSpaceAtBottom > offset;
    if (isReachedBottom && !isFinished && !isLoading) {
      setIsLoading(true);
      const length = await getNextPage();
      if (!length) setIsFinished(true);
      setIsLoading(false);
    }
  }, [isLoading, isFinished, offset, getNextPage]);

  useEffect(() => {
    document.addEventListener("scroll", handler);
    return () => document.removeEventListener("scroll", handler);
  }, [handler]);

  return (
    <div>
      <div ref={contentRef}>
        {children}
        {!isFinished && isLoading && <CircularProgress />}
      </div>
    </div>
  );
};

export default InfinityScroll;
