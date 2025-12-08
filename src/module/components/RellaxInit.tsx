"use client"
import { useEffect } from "react";
import Rellax from "rellax";

export default function RellaxInit() {
  useEffect(() => {
    const rellax = new Rellax(".rellax");
    return () => {
      rellax.destroy();
    };
  }, []);
  return null;
}
