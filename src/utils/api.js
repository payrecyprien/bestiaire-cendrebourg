const API_ENDPOINT = "/api/generate";

const MODEL_PRICING = {
  "claude-sonnet-4-20250514": { input: 3.0, output: 15.0 },
  "claude-haiku-4-5-20251001": { input: 0.8, output: 4.0 },
};

function estimateCost(model, inputTokens, outputTokens) {
  const pricing = MODEL_PRICING[model] || MODEL_PRICING["claude-sonnet-4-20250514"];
  return (inputTokens * pricing.input + outputTokens * pricing.output) / 1_000_000;
}

function parseCreatureResponse(raw) {
  try {
    const cleaned = raw.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
    const parsed = JSON.parse(cleaned);

    // Sanitize SVG — basic check
    if (parsed.svg_portrait && !parsed.svg_portrait.startsWith("<svg")) {
      parsed.svg_portrait = null;
    }

    return { creature: parsed, error: null };
  } catch (e) {
    return { creature: null, error: `JSON parse error: ${e.message}` };
  }
}

export async function generateCreature({ model, temperature, systemPrompt, userMessage }) {
  const startTime = performance.now();

  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      max_tokens: 2500,
      temperature,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  const data = await response.json();
  const latency = Math.round(performance.now() - startTime);

  if (data.error) throw new Error(data.error);

  const rawContent = data.content?.map((b) => b.text || "").join("") || "";
  const inputTokens = data.usage?.input_tokens || 0;
  const outputTokens = data.usage?.output_tokens || 0;
  const cost = estimateCost(model, inputTokens, outputTokens);

  const { creature, error } = parseCreatureResponse(rawContent);

  return {
    creature,
    parseError: error,
    rawContent,
    meta: { latency, inputTokens, outputTokens, totalTokens: inputTokens + outputTokens, cost, model },
  };
}
