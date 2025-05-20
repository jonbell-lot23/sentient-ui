import { useRef, useLayoutEffect } from "react";

// Simple hook to animate list reordering using the FLIP technique
export function useAutoAnimate<T>(deps: readonly T[]) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prevRects = useRef<Map<string, DOMRect>>(new Map());

  useLayoutEffect(() => {
    const parent = ref.current;
    if (!parent) return;

    const newRects = new Map<string, DOMRect>();
    Array.from(parent.children).forEach((el) => {
      const item = el as HTMLElement;
      const id = item.dataset.id as string;
      newRects.set(id, item.getBoundingClientRect());
    });

    prevRects.current.forEach((firstRect, id) => {
      const el = parent.querySelector<HTMLElement>(`[data-id="${id}"]`);
      if (!el) return;
      const lastRect = newRects.get(id);
      if (!lastRect) return;
      const deltaX = firstRect.left - lastRect.left;
      const deltaY = firstRect.top - lastRect.top;
      if (deltaX || deltaY) {
        el.animate(
          [
            { transform: `translate(${deltaX}px, ${deltaY}px)` },
            { transform: "translate(0, 0)" },
          ],
          { duration: 300, easing: "ease-out" }
        );
      }
    });

    // new elements
    newRects.forEach((rect, id) => {
      if (!prevRects.current.has(id)) {
        const el = parent.querySelector<HTMLElement>(`[data-id="${id}"]`);
        if (!el) return;
        el.animate(
          [
            { opacity: 0, transform: "scale(0.8)" },
            { opacity: 1, transform: "scale(1)" },
          ],
          { duration: 300, easing: "ease-out" }
        );
      }
    });

    prevRects.current = newRects;
  }, deps);

  return ref;
}
