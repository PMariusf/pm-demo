"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const welcomeMessage: ChatMessage = {
  role: "assistant",
  content: "Hey — I’m here to talk music, lyrics, memories, or whatever a song has stirred up for you. What are you listening to or thinking about?",
};

const storageKey = "pm-demo-ayline-chat";

export default function CommunityChat() {
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (!saved) return;
      const parsed = JSON.parse(saved) as ChatMessage[];
      if (Array.isArray(parsed) && parsed.length) setMessages(parsed);
    } catch {
      // Ignore old or malformed local chat data.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(messages.slice(-20)));
    } catch {
      // Chat still works when local storage is unavailable.
    }

    requestAnimationFrame(() => {
      listRef.current?.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  }, [messages, loading]);

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setDraft("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = (await response.json()) as { reply?: string; error?: string };
      if (!response.ok || !data.reply) throw new Error(data.error || "Chat request failed");

      setMessages((previous) => [...previous, { role: "assistant", content: data.reply as string }]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "The chat could not answer right now.");
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    setMessages([welcomeMessage]);
    setDraft("");
    setError("");
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      // Nothing else to do.
    }
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-3xl rounded-2xl border border-white/15 bg-black/45 p-4 shadow-2xl backdrop-blur-md sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#d8ad72]/40 bg-[#d8ad72]/10 font-serif text-lg text-[#e8c08a]">
            A
          </div>
          <div>
            <p className="m-0 text-[11px] uppercase tracking-[0.3em] text-[#d9b77f]">PM’s · Ayline</p>
            <h3 className="mt-1 font-serif text-2xl text-white">Talk about what you feel</h3>
          </div>
        </div>
        <button
          type="button"
          onClick={clearChat}
          className="rounded-full border border-white/15 px-3 py-2 text-xs text-white/60 transition hover:border-white/30 hover:text-white"
        >
          New chat
        </button>
      </div>

      <div
        ref={listRef}
        className="max-h-[430px] min-h-[220px] space-y-4 overflow-y-auto pr-1"
        aria-live="polite"
        aria-busy={loading}
      >
        {messages.map((message, index) => {
          const isUser = message.role === "user";

          return (
            <div
              key={`${message.role}-${index}`}
              className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser && (
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#d8ad72]/30 bg-[#d8ad72]/10 font-serif text-sm text-[#e8c08a]">
                  A
                </div>
              )}
              <div className={`max-w-[86%] ${isUser ? "text-right" : "text-left"}`}>
                <span className="mb-1 block px-1 text-[10px] uppercase tracking-[0.18em] text-white/35">
                  {isUser ? "You" : "Ayline"}
                </span>
                <p
                  className={`m-0 whitespace-pre-wrap rounded-2xl px-4 py-3 text-left text-sm leading-6 shadow-lg sm:text-[15px] ${
                    isUser
                      ? "rounded-br-md bg-[#d8ad72] text-[#17100a] shadow-[#d8ad72]/10"
                      : "rounded-bl-md border border-white/10 bg-white/[0.07] text-white/85 shadow-black/20"
                  }`}
                >
                  {message.content}
                </p>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-end gap-2 justify-start">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#d8ad72]/30 bg-[#d8ad72]/10 font-serif text-sm text-[#e8c08a]">
              A
            </div>
            <div>
              <span className="mb-1 block px-1 text-[10px] uppercase tracking-[0.18em] text-white/35">Ayline is typing</span>
              <div className="flex w-fit items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.07] px-4 py-4" aria-label="Ayline is typing">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/55" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/55 [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/55 [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {error && <p className="mt-3 text-sm text-[#f0a7a7]">{error}</p>}

      <form onSubmit={send} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <label className="sr-only" htmlFor="community-chat-message">Write a message</label>
        <input
          id="community-chat-message"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          maxLength={2000}
          placeholder="Write something…"
          autoComplete="off"
          className="min-w-0 flex-1 rounded-xl border border-white/20 bg-[#090b0d]/90 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#d8ad72]"
        />
        <button
          type="submit"
          disabled={loading || !draft.trim()}
          className="rounded-xl bg-[#d8ad72] px-5 py-3 font-semibold text-[#17100a] transition hover:bg-[#ebc58f] disabled:cursor-not-allowed disabled:opacity-45"
        >
          {loading ? "Sending…" : "Send"}
        </button>
      </form>
      <p className="mb-0 mt-3 text-xs leading-5 text-white/35">Your recent chat is stored only in this browser so you can continue the conversation.</p>
    </div>
  );
}
