import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Link
          className="font-extrabold text-4xl tracking-tighter bg-gradient-to-r from-indigo-400 to-sky-400 text-transparent bg-clip-text"
          href={"/"}
        >
          FormFlow
        </Link>
    </div>
  );
};

export default Logo;
