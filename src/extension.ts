import {
    ExtensionContext,
} from "coc.nvim";
import { GlobalContext } from "./globalContext";

export async function activate(context: ExtensionContext) {
  const ctx = new GlobalContext();
  await ctx.startServer();
  context.subscriptions.push(ctx);
}
