"use client";

type BaseBallOutProps = Readonly<{
  base: [boolean, boolean, boolean];
  strike: number;
  ball: number;
  out: number;
}>;

const outToArray = (out: number) => {
  const out_ = [false, false, false];
  if (out === 1) {
    out_[0] = true;
  } else if (out === 2) {
    out_[0] = true;
    out_[1] = true;
  } else if (out === 3) {
    out_[0] = true;
    out_[1] = true;
    out_[2] = true;
  }
  return out_;
};

const BaseBallOut = ({ base, strike, ball, out }: BaseBallOutProps) => {
  return (
    <div>
      <svg
        className="w-[45px] h-[80px] dark:stroke-white fill-gray-400 dark:fill-gray-800"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* first base */}
        <polygon
          points="70,55 85,40 70,25 55,40"
          fill={base[0] ? "#FFD700" : "white"}
          strokeWidth="2"
          className={
            base[0]
              ? "dark:fill-yellow-400 dark:stroke-white stroke-gray-400"
              : "dark:fill-gray-800 dark:stroke-white stroke-gray-400"
          }
        />
        {/* second base */}
        <polygon
          points="50,35 65,20 50,5 35,20"
          fill={base[1] ? "#FFD700" : "white"}
          strokeWidth="2"
          className={
            base[1]
              ? "dark:fill-yellow-400 dark:stroke-white stroke-gray-400"
              : "dark:fill-gray-800 dark:stroke-white stroke-gray-400"
          }
        />
        {/* third base */}
        <polygon
          points="30,55 45,40 30,25 15,40"
          fill={base[2] ? "#FFD700" : "white"}
          strokeWidth="2"
          className={
            base[2]
              ? "dark:fill-yellow-400 dark:stroke-white stroke-gray-400"
              : "dark:fill-gray-800 dark:stroke-white stroke-gray-400"
          }
        />
        <circle
          cx="20"
          cy="75"
          r="8"
          stroke="black"
          strokeWidth="2"
          className={
            outToArray(out)[0]
              ? "dark:fill-white dark:stroke-white stroke-gray-400"
              : "dark:fill-gray-800 dark:stroke-white stroke-gray-400"
          }
        />
        <circle
          cx="50"
          cy="75"
          r="8"
          stroke="black"
          strokeWidth="2"
          className={
            outToArray(out)[1]
              ? "dark:fill-white dark:stroke-white stroke-gray-400"
              : "dark:fill-gray-800 dark:stroke-white stroke-gray-400"
          }
        />
        <circle
          cx="80"
          cy="75"
          r="8"
          stroke="black"
          strokeWidth="2"
          className={
            outToArray(out)[2]
              ? "dark:fill-white dark:stroke-white stroke-gray-400"
              : "dark:fill-gray-800 dark:stroke-white stroke-gray-400"
          }
        />
        <text
          x="50"
          y="115"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="35"
          className={`fill-black dark:fill-white`}
        >
          {ball} - {strike}
        </text>
      </svg>
    </div>
  );
};

export { BaseBallOut };
