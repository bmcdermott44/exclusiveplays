import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * Content Bret edits, read from files in this repo.
 *
 * Files rather than a database on purpose: the CMS writes them as commits to his own repo, so the
 * content is versioned, revertible, and owned by him with no extra service to keep paid for. The
 * cost is a rebuild per save, which for a site updated a few times a day is nothing.
 *
 * His RECORD is deliberately not here. It is read live from Nexfuse in lib/record.ts and must stay
 * that way -- the entire pitch is that those numbers are not hand-entered, so an editable copy
 * would quietly destroy the thing being sold.
 */

const DIR = path.join(process.cwd(), "content");

export interface SiteCopy {
  kicker: string;
  headlineBefore: string;
  headlineAfter: string;
  intro: string;
  pricingNote: string;
  priceLabel: string;
  whopCheckout: string;
  price: string;
}

export function getSite(): SiteCopy {
  return JSON.parse(fs.readFileSync(path.join(DIR, "site.json"), "utf8"));
}

export interface Package {
  slug: string;
  name: string;
  price: string;
  cadence: string;
  checkout: string;
  featured: boolean;
  order: number;
  bodyHtml: string;
}

export function getPackages(): Package[] {
  const dir = path.join(DIR, "packages");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith(".md"))
    .map(f => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
      return {
        slug: f.replace(/\.md$/, ""),
        name: String(data.name ?? "Package"),
        price: String(data.price ?? ""),
        cadence: String(data.cadence ?? "per month"),
        checkout: String(data.checkout ?? ""),
        featured: Boolean(data.featured),
        order: Number(data.order ?? 99),
        bodyHtml: marked.parse(content.trim()) as string,
      };
    })
    .sort((a, b) => a.order - b.order);
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  bodyHtml: string;
}

/** Newest first. A draft is simply a file he has not committed yet. */
export function getPosts(): Post[] {
  const dir = path.join(DIR, "posts");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith(".md"))
    .map(f => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
      const d = data.date instanceof Date ? data.date : new Date(String(data.date ?? ""));
      return {
        slug: f.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, ""),
        title: String(data.title ?? "Untitled"),
        date: isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10),
        summary: String(data.summary ?? ""),
        bodyHtml: marked.parse(content.trim()) as string,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  return getPosts().find(p => p.slug === slug) ?? null;
}

export const prettyDate = (iso: string) =>
  iso ? new Date(iso + "T12:00:00Z").toLocaleDateString("en-US",
    { year: "numeric", month: "long", day: "numeric" }) : "";
