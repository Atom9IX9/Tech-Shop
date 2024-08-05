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
    let observerRefValue: HTMLDivElement | null = null;
    const observer = new IntersectionObserver(callback);

    if (containerRef.current) {
      observer.observe(containerRef.current);
      observerRefValue = containerRef.current; 
    }

    return () => {
      if (observerRefValue) observer.unobserve(observerRefValue);
    }
  }, [containerRef, options]);

  return [containerRef, isIntersection];
};
