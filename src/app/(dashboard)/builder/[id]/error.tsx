"use client";

import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

const error = ({ error }: { error: Error }) => {
  console.error(error);
  return (
    <div className="flex flex-col h-full w-full gap-4 justify-center items-center">
      <h2 className="text-3xl text-destructive font-semibold">
        Something went wrong!
      </h2>
      <Button variant="secondary" asChild>
        <Link href="/">Go back</Link>
      </Button>
    </div>
  );
};

export default error;
