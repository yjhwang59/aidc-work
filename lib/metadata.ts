import type { Metadata } from "next";
import { siteConfig } from "./site-data";

export function createPageMetadata(
  title: string,
  description?: string,
): Metadata {
  return {
    title: `${title} — AIDC.work`,
    description: description ?? siteConfig.description,
  };
}
