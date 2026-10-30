import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getSupabaseEnv } from "@/lib/env-dump.functions";

export const Route = createFileRoute("/env-dump")({ component: EnvDump });

function EnvDump() {
  const [vars, setVars] = useState<{ name: string; value: string }[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getSupabaseEnv()
      .then((r) => setVars(r.vars))
      .catch((e) => setError(String(e)));
  }, []);

  if (error) return <pre style={{ color: "red", padding: 24 }}>{error}</pre>;

  return (
    <pre style={{ padding: 24, fontSize: 13, fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
      {vars.length
        ? vars.map((v) => `${v.name}=${v.value}`).join("\n")
        : "Loading…"}
    </pre>
  );
}
