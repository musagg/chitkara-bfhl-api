/**
 * Sanitizes user input for AI processing by removing potentially harmful characters
 * @param input - Raw user input string
 * @returns Sanitized string with only safe characters
 */
function sanitizeInput(input: string): string {
  // Allow only: letters, numbers, spaces, ?, ., ,, ', -
  return input.replace(/[^a-zA-Z0-9 ?,.'"-]/g, "");
}

/**
 * Strips all whitespace and punctuation from AI response to get single word
 * @param text - Raw AI response
 * @returns Clean single word answer
 */
function cleanResponse(text: string): string {
  return text.replace(/[\s\n\r.,;:!?'"()-]/g, "").trim();
}

/**
 * Queries the Gemini AI API with a question and returns a single-word answer
 * @param question - The question to ask the AI
 * @returns A single word answer from the AI
 * @throws Error if the AI service is unavailable or returns an error
 */
export async function queryGemini(question: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY not configured");
  }

  const sanitizedQuestion = sanitizeInput(question);

  const prompt = `Answer the following question with exactly one word only. No punctuation, no explanation, no extra text. Just one word.

Question: ${sanitizedQuestion}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();

    if (
      !data.candidates ||
      !data.candidates[0] ||
      !data.candidates[0].content ||
      !data.candidates[0].content.parts ||
      !data.candidates[0].content.parts[0] ||
      !data.candidates[0].content.parts[0].text
    ) {
      throw new Error("Invalid response structure from Gemini API");
    }

    const rawAnswer = data.candidates[0].content.parts[0].text;
    const cleanedAnswer = cleanResponse(rawAnswer);

    return cleanedAnswer;
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("AI service unavailable");
  }
}
