import { FC, useEffect, useRef, useState } from "react";
import useRefArray from "../../hooks/useRefArray";

const DesktopSlider: FC<{
  items: string[];
}> = ({ items }) => {
  const itemRefs = useRefArray<HTMLDivElement | null>(items.length);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [itemWidth, setItemWidth] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    setItemWidth(itemRefs[0]?.current?.clientWidth ?? 0);
    setContainerWidth(containerRef?.current?.clientWidth ?? 0);
  }, [itemRefs, containerRef]);

  return (
    <div className="w-full hidden flex-col gap-4 lg:flex">
      <div
        ref={containerRef}
        style={{
          transform: `translateX(${(containerWidth - itemWidth) / 2}px)`,
        }}
        className={`w-full h-[400px] flex preserve-3d perspective-1200px cursor-grab`}
      >
        {items.map((item, index) => (
          <div
            ref={itemRefs[index]}
            onClick={() => setActiveIndex(index)}
            style={{
              zIndex:
                activeIndex === index
                  ? items.length
                  : items.length - Math.abs(index - activeIndex),
              transform: `translate3d(calc(${14 * (index - activeIndex)}% - ${
                itemWidth * index
              }px), 0px, ${-100 * Math.abs(index - activeIndex)}px)`,
            }}
            key={item}
            className={`${
              activeIndex === index ? "bg-blue-300" : "bg-blue-500"
            } border-blue-200 border w-[80%] max-w-[730px] h-full hover:bg-blue-400 backface rounded-[20px] flex-none preserve-3d transition-all duration-500`}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-5">
        {activeIndex !== 0 ? (
          <span
            onClick={() =>
              setActiveIndex((prev) => (prev <= 0 ? prev : prev - 1))
            }
            className="bg-blue-300 w-[40px] h-[40px] rounded-[50%] flex items-center justify-center cursor-pointer"
          >
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 25 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.75852 12.2593L7.31467 12.2593C7.31467 12.2593 6.31026 10.1483 3.92477 8.59202C1.53929 7.03575 0.0169702 6.86625 0.0169702 6.86625L0.0169703 5.74142C0.0169703 5.74142 1.94733 5.5257 4.25435 3.66126C6.56136 1.79681 7.31467 0.379215 7.31467 0.379215L8.75852 0.379215C8.75852 0.379215 7.14204 3.95402 5.49417 5.3408L24.5938 5.3408L24.5938 7.17443L5.50987 7.17442C5.50987 7.17442 7.89535 9.6244 8.77421 12.2439L8.75852 12.2593Z"
                fill="currentColor"
              ></path>
            </svg>
          </span>
        ) : null}
        {activeIndex !== items.length - 1 ? (
          <span
            onClick={() =>
              setActiveIndex((prev) => (prev >= items.length ? prev : prev + 1))
            }
            className="bg-blue-300 w-[40px] h-[40px] rounded-[50%] flex items-center justify-center cursor-pointer"
          >
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 26 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.3218 0.781009L17.7656 0.781009C17.7656 0.781009 18.7701 2.89199 21.1555 4.44827C23.541 6.00454 25.0634 6.17403 25.0634 6.17403L25.0634 7.29886C25.0634 7.29886 23.133 7.51459 20.826 9.37903C18.519 11.2435 17.7656 12.6611 17.7656 12.6611L16.3218 12.6611C16.3218 12.6611 17.9383 9.08627 19.5862 7.69949L0.486571 7.69948L0.486571 5.86586L19.5705 5.86586C19.5705 5.86586 17.185 3.41589 16.3061 0.796417L16.3218 0.781009Z"
                fill="currentColor"
              ></path>
            </svg>
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default DesktopSlider;
