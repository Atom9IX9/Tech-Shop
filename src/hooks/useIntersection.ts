import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

export const useIntersection = (options?: IntersectionObserverInit) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isIntersection, setIsIntersection] = useState(false);

  const callback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsIntersection(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback);
    if (containerRef.current) observer.observe(containerRef.current)

    return () => {
      if(containerRef.current) observer.unobserve(containerRef.current)
    }
  }, [containerRef, options]);

  return [containerRef, isIntersection];
};
