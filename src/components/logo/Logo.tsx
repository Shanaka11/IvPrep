"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

import LogoDark from "./LogoDark";
import LogoLight from "./LogoLight";

const Logo = () => {
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <LogoLight />;
  }
  return theme === "dark" ? <LogoDark /> : <LogoLight />;
};

export default Logo;
