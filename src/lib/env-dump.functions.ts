import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getSupabaseEnv = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async () => {
    const supabaseVars = Object.entries(process.env)
      .filter(([k]) => /supabase/i.test(k))
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => ({ name: k, value: v ?? "" }));
    return { vars: supabaseVars };
  });
