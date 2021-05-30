import { useEffect, useRef } from "react";

export default function InfiniteScroll({
  children,
  containerRef,
  loadMore,
  hasMore,
}) {
  const isScrollRequestActive = useRef();
  const page = useRef();
  const hasMoreRef = useRef();
  useEffect(() => (hasMoreRef.current = hasMore), [hasMore]);

  useEffect(() => {
    page.current = 0;
    const handleScroll = (e) => {
      if (!hasMoreRef.current) return;
      const container = containerRef.current;
      const top = container.scrollTop <= 50;

      //Because top scroll threshold is set to 50px, every scroll event fired after reaching gets counted.
      //So once the threshold is reached, we disable making requests for next 1 seconds.
      if (top && isScrollRequestActive.current !== true) {
        //Store the original height of the div.
        let oldScrollHeight = container.scrollHeight;
        //Set scroll request to active so that this does not get fired again.
        isScrollRequestActive.current = true;
        loadMore(page.current)
          .then(() => (page.current = page.current + 1))
          .finally(() => {
            if (page === 0)
              return (container.scrollTop = container.scrollHeight);
            //Restore the div to old scroll position.
            container.scrollTop = container.scrollHeight - oldScrollHeight;
            isScrollRequestActive.current = false;
          });
      }
    };

    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    handleScroll(0);

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return children;
}
