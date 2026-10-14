import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { addSubscriber, addContactSubmission } from "./queries/submissions";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),

  newsletter: createRouter({
    subscribe: publicQuery
      .input(
        z.object({
          email: z.string().trim().toLowerCase().email().max(320),
        }),
      )
      .mutation(async ({ input }) => {
        const inserted = await addSubscriber(input.email);
        return { ok: true as const, already: !inserted };
      }),
  }),

  contact: createRouter({
    submit: publicQuery
      .input(
        z.object({
          name: z.string().trim().min(1).max(120),
          email: z.string().trim().toLowerCase().email().max(320),
          type: z.enum(["demo", "booking", "press", "general"]),
          message: z.string().trim().min(1).max(5000),
        }),
      )
      .mutation(async ({ input }) => {
        await addContactSubmission(input);
        return { ok: true as const };
      }),
  }),
});

export type AppRouter = typeof appRouter;
