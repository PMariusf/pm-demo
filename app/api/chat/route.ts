import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 2000;

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Chat is not configured yet. Add OPENAI_API_KEY to the server environment." },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as { messages?: ChatMessage[] };
    const incoming = Array.isArray(body.messages) ? body.messages : [];

    const messages = incoming
      .filter(
        (message): message is ChatMessage =>
          (message?.role === "user" || message?.role === "assistant") &&
          typeof message?.content === "string" &&
          message.content.trim().length > 0,
      )
      .slice(-MAX_MESSAGES)
      .map((message) => ({
        role: message.role,
        content: message.content.trim().slice(0, MAX_MESSAGE_LENGTH),
      }));

    if (!messages.length || messages[messages.length - 1]?.role !== "user") {
      return NextResponse.json({ error: "A user message is required." }, { status: 400 });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-6-astra",
        instructions:
          "You are the conversational voice inside PM's music universe, centered on Ayline. Be warm, thoughtful, concise, and grounded. Talk naturally about music, lyrics, creativity, memories, feelings, and the meaning people find in songs. Never pretend to be the real artist or claim personal experiences. If someone seems in immediate danger or asks for professional medical or legal help, encourage appropriate real-world support rather than acting as a professional. Keep most replies under 180 words unless the user clearly asks for more.",
        input: messages,
        max_output_tokens: 500,
      }),
    });

    const data = (await response.json()) as {
      error?: { message?: string };
      output?: Array<{
        type?: string;
        content?: Array<{ type?: string; text?: string }>;
      }>;
    };

    if (!response.ok) {
      console.error("OpenAI chat error", response.status, data.error?.message);
      return NextResponse.json(
        { error: "The chat could not answer right now. Please try again." },
        { status: 502 },
      );
    }

    const reply =
      data.output
        ?.flatMap((item) => item.content ?? [])
        .filter((item) => item.type === "output_text" && typeof item.text === "string")
        .map((item) => item.text?.trim())
        .filter(Boolean)
        .join("\n\n") || "I’m here. Tell me what’s on your mind.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("PM chat route failed", error);
    return NextResponse.json(
      { error: "Something went wrong while sending your message." },
      { status: 500 },
    );
  }
}
