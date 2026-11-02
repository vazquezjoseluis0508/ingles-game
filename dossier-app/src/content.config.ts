import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const example = z.object({ en: z.string(), es: z.string() });

const gapItem = z.object({
  prompt: z.string(), // use a run of underscores (___) to mark the blank
  answers: z.array(z.string()).min(1),
  explanation: z.string(),
});

const choiceItem = z.object({
  prompt: z.string(),
  options: z.array(z.string()).min(2),
  answer: z.number().int().min(0),
  explanation: z.string(),
});

const translateItem = z.object({
  prompt: z.string(),
  model: z.string(),
  explanation: z.string(),
});

const section = z.discriminatedUnion("type", [
  z.object({ title: z.string(), type: z.literal("gap"), items: z.array(gapItem).min(1) }),
  z.object({ title: z.string(), type: z.literal("choice"), items: z.array(choiceItem).min(1) }),
  z.object({ title: z.string(), type: z.literal("translate"), items: z.array(translateItem).min(1) }),
]);

const lessons = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/lessons" }),
  schema: z.object({
    module: z.object({ number: z.number().int(), title: z.string() }),
    id: z.string(), // e.g. "1.1"
    title: z.string(),
    order: z.number(),
    examples: z.array(example),
    exercises: z.array(section),
  }),
});

export const collections = { lessons };
