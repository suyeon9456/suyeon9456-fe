import { useEffect, useState } from 'react';

interface useIntersectionObserverProps {
  onIntersect: IntersectionObserverCallback;
}

const useIntersectionObserver = ({ onIntersect }: useIntersectionObserverProps) => {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);
  const [isNextGroup, setIsNextGroup] = useState<boolean>(true);

  useEffect(() => {
    if (!target) return;

    const observer: IntersectionObserver = new IntersectionObserver(
      onIntersect,
      { threshold: 1 }
    );
    console.log(target);
    if (!isNextGroup) {
      console.log(isNextGroup)
      observer.disconnect();
    } else {
      observer.observe(target);
    }

    return () => observer.unobserve(target);
  }, [onIntersect, target, isNextGroup]);

  return { setTarget, isNextGroup, setIsNextGroup };
};

export default useIntersectionObserver;
