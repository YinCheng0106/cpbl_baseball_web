"use client";

type BaseBallOutProps = Readonly<{
  base: [boolean, boolean, boolean];
  strike: number;
  ball: number;
  out: number;
}>;

const BaseBallOut = ({
  base,
  strike,
  ball,
  out,
}: BaseBallOutProps) => {
  return (
    <div>
      <svg
        className="w-[45px] h-[90px] dark:stroke-white fill-gray-400 dark:fill-gray-800"
        viewBox="0 -10 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* first base */}
        <polygon
        points="70,50 80,40 70,30 60,40"
        fill={base[0] ? "#FFD700" : "white"}
        strokeWidth="1.5"
        className={
          base[0]
          ? "dark:fill-yellow-400 dark:stroke-white stroke-gray-400"
          : "dark:fill-gray-800 dark:stroke-white stroke-gray-400"
        }
        />
        {/* second base */}
        <polygon
        points="50,30 60,20 50,10 40,20"
        fill={base[1] ? "#FFD700" : "white"}
        strokeWidth="1.5"
        className={
          base[1]
          ? "dark:fill-yellow-400 dark:stroke-white stroke-gray-400"
          : "dark:fill-gray-800 dark:stroke-white stroke-gray-400"
        }
        />
        {/* third base */}
        <polygon
        points="30,50 40,40 30,30 20,40"
        fill={base[2] ? "#FFD700" : "white"}
        strokeWidth="1.5"
        className={
          base[2]
          ? "dark:fill-yellow-400 dark:stroke-white stroke-gray-400"
          : "dark:fill-gray-800 dark:stroke-white stroke-gray-400"
        }
        />
      </svg>
    </div>
  )
};

export { BaseBallOut };