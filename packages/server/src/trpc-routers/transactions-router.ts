import { z } from "zod";

import { getTransactions } from "../queries/complex/transactions/transactions";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const transactionsRouter = createTRPCRouter({
  getTransactions: publicProcedure
    .input(
      z.object({
        address: z.string(),
        page: z.string().optional(),
        pageSize: z.string().optional(),
      })
    )
    .query(async ({ input: { address, page, pageSize }, ctx }) => {
      const res = await getTransactions({
        address,
        page,
        pageSize,
        assetLists: ctx.assetLists,
      });
      return res;
    }),
});
