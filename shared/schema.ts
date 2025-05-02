import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const algorithms = pgTable("algorithms", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  description: text("description").notNull(),
  keyLength: text("key_length").notNull(),
  security: text("security").notNull(),
  speed: text("speed").notNull(),
  useCases: text("use_cases").notNull(),
  steps: text("steps").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertAlgorithmSchema = createInsertSchema(algorithms).pick({
  name: true,
  type: true,
  description: true,
  keyLength: true,
  security: true,
  speed: true,
  useCases: true,
  steps: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertAlgorithm = z.infer<typeof insertAlgorithmSchema>;
export type Algorithm = typeof algorithms.$inferSelect;
