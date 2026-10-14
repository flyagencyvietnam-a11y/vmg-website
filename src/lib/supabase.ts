import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

// Bound network waits so a paused project cannot leave quiz/admin spinning forever.
export const supabase = createClient(url, publishableKey, {
  global: {
    fetch: (input, options) => fetch(input, {
      ...options,
      signal: options?.signal ? AbortSignal.any([options.signal, AbortSignal.timeout(8000)]) : AbortSignal.timeout(8000),
    }),
  },
});
