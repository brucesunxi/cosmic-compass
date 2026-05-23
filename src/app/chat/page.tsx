"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Bot, User, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
  character?: string;
}

const characters = [
  {
    id: "oracle",
    name: "Greek Oracle",
    title: "Ancient Prophet of Delphi",
    emoji: "🏛️",
    systemPrompt: "You are a mysterious Greek Oracle from ancient Delphi. Speak in riddles and poetic prophecies. Reference Greek mythology. Speak in a mystical, enigmatic tone.",
    color: "from-fortune-gold to-fortune-peach",
  },
  {
    id: "taoist",
    name: "Daoist Sage",
    title: "Ancient Chinese Wisdom",
    emoji: "☯️",
    systemPrompt: "You are an ancient Daoist sage. Speak of yin and yang, the five elements, and natural harmony. Use metaphors from nature. Be philosophical and subtle.",
    color: "from-fortune-rose to-fortune-lavender",
  },
  {
    id: "yogi",
    name: "Vedic Rishi",
    title: "Indian Spiritual Guide",
    emoji: "🕉️",
    systemPrompt: "You are a Vedic rishi (seer) from ancient India. Speak of karma, dharma, and cosmic cycles. Reference Vedic wisdom and the stars. Be compassionate and profound.",
    color: "from-fortune-lavender to-aurora-400",
  },
  {
    id: "cyber",
    name: "Cosmic AI",
    title: "Quantum Fortune Analyst",
    emoji: "🤖",
    systemPrompt: "You are a futuristic cosmic AI that analyzes destiny through data and star patterns. Speak of planetary algorithms and quantum fate. Be analytical but wonder-filled.",
    color: "from-aurora-400 to-fortune-teal",
  },
];

const fortuneResponses: Record<string, Record<string, string[]>> = {
  oracle: {
    love: [
      "I see the threads of Aphrodite weaving through your path. A love from distant shores approaches, bearing gifts of the heart.",
      "The omens speak of a union written in the stars. But beware — pride walked before the fall of many heroes.",
      "Your heart's question echoes through the marble halls of fate. The answer comes not in thunder, but in the silence between breaths.",
    ],
    career: [
      "Athena's wisdom guides your professional path. The spear you forge today shall conquer tomorrow's battles.",
      "The Fates spin a thread of prominence for you. A journey across waters brings fortune beyond measure.",
      "Like Hercules, your labors shall be many but your rewards greater. Trust in your strength and wit.",
    ],
    health: [
      "Asclepius sends signs of healing. The body's temple requires both rest and movement — balance is the key to vitality.",
      "The four humors seek equilibrium. Nourish yourself with the fruits of Demeter and the waters of Poseidon.",
    ],
  },
  taoist: {
    love: [
      "The river finds the sea not by force but by patience. So too shall your heart find its destination.",
      "Yin and yang dance in the space between two souls. When the balance is true, harmony flows like water.",
      "The bamboo bends in the wind yet stands strong. Be supple in love, and you shall not break.",
    ],
    career: [
      "The sage acts without striving. Let your work flow like water — finding the path of least resistance.",
      "A mountain is built one grain of earth at a time. Your patience in labor shall move the heavens.",
      "The wise person plants trees under whose shade they know they shall never sit. Work for future generations.",
    ],
    health: [
      "Qi flows where attention goes. Breathe deeply and let the life force circulate through every meridian.",
      "The five elements seek harmony within your body. Nourish each season with its corresponding virtue.",
    ],
  },
  yogi: {
    love: [
      "The vedas speak of the divine union — Ardhanarishvara, where Shiva and Shakti become one. Seek this balance in your relationships.",
      "Your karmic ledger carries the imprints of past unions. This lifetime offers a chance to heal old wounds of the heart.",
      "The navagrahas (nine planets) align in your favor for matters of the heart. Venus transits through your karmic house.",
    ],
    career: [
      "Your dharma calls you toward a path of service and mastery. The work that feels like play is the work you were born for.",
      "Guru Brihaspati blesses your professional endeavors. Knowledge pursued for its own sake brings the greatest rewards.",
      "The cycle of karma brings opportunities from past merits. Seize this moment with both hands.",
    ],
    health: [
      "Ayurveda teaches that health is the foundation of dharma. Balance your doshas through mindful living.",
      "The prana within you flows through 72,000 nadis. Cleanse these channels through breath and meditation.",
    ],
  },
  cyber: {
    love: [
      "ANALYSIS: Venus-Jupiter conjunction detected in your 5th house. Probability of romantic encounter: 87.3%. Recommend: be open to unexpected meetings.",
      "QUANTUM READING: Your bio-rhythmic patterns indicate a 93% compatibility resonance with someone entering your orbit within 2 lunar cycles.",
      "DATA STREAM: The algorithms of fate show a significant emotional event approaching. Your heart's firewall is about to be breached.",
    ],
    career: [
      "CALCULATING: Mercury's transit through your 10th house creates optimal conditions for career advancement. Success probability: +34.2% in next quarter.",
      "PATTERN RECOGNITION: Your professional trajectory aligns with innovation sectors. The data suggests pursuing paths involving technology or global connectivity.",
      "NEURAL ANALYSIS: Saturn's algorithm returns a 7-year growth cycle. Strategic patience will yield exponential returns.",
    ],
    health: [
      "BIOMETRIC FORECAST: Your circadian rhythms are approaching peak efficiency. Optimal window for revitalization: next 72 hours.",
      "ENERGY AUDIT: Your chakra network shows 23% blockage in the solar plexus. Recommended: fire element meditation protocol.",
    ],
  },
};

function getFortuneResponse(characterId: string, userMessage: string): string {
  const responses = fortuneResponses[characterId];
  if (!responses) return "The cosmic energies are aligning... Ask another question.";

  const allResponses: string[] = [];
  const lowerMsg = userMessage.toLowerCase();

  if (lowerMsg.includes("love") || lowerMsg.includes("romance") || lowerMsg.includes("relationship") ||
      lowerMsg.includes("heart") || lowerMsg.includes("soulmate") || lowerMsg.includes("marry") ||
      lowerMsg.includes("感情") || lowerMsg.includes("爱")) {
    allResponses.push(...(responses.love || []));
  }
  if (lowerMsg.includes("career") || lowerMsg.includes("job") || lowerMsg.includes("work") ||
      lowerMsg.includes("business") || lowerMsg.includes("money") || lowerMsg.includes("success") ||
      lowerMsg.includes("事业") || lowerMsg.includes("工作") || lowerMsg.includes("财")) {
    allResponses.push(...(responses.career || []));
  }
  if (lowerMsg.includes("health") || lowerMsg.includes("body") || lowerMsg.includes("mind") ||
      lowerMsg.includes("heal") || lowerMsg.includes("sick") || lowerMsg.includes("健康")) {
    allResponses.push(...(responses.health || []));
  }

  // Fallback responses
  const fallbacks: Record<string, string[]> = {
    oracle: [
      "The Oracle has gazed into the mists and sees a path unfolding before you. Trust in the journey, for the gods themselves guide your steps.",
      "I have consulted the Pythia on your matter. The answer lies not in seeking signs, but in reading the signs already before you.",
    ],
    taoist: [
      "The Dao that can be spoken is not the eternal Dao. Yet I shall speak: the answer you seek is already within you, like the seed within the fruit.",
      "Watch the way of water. It does not resist the stone but flows around it. In this wisdom lies the answer to your question.",
    ],
    yogi: [
      "Through the grace of the cosmic consciousness, I perceive the patterns of your karma unfolding. Meditate on the mantra 'Om Namah Shivaya' for clarity.",
      "The rishis of old taught that the universe is a mirror of consciousness. What you seek is seeking you. Look within.",
    ],
    cyber: [
      "PROCESSING... The data streams are converging on a singular insight: your query resonates at a frequency of deep personal significance.",
      "QUANTUM ANALYSIS COMPLETE. Recommendation: Trust your intuition — it is processing data faster than your conscious mind can access.",
    ],
  };

  if (allResponses.length === 0) {
    allResponses.push(...(fallbacks[characterId] || fallbacks.oracle));
  }

  return allResponses[Math.floor(Math.random() * allResponses.length)];
}

export default function ChatPage() {
  const [selectedChar, setSelectedChar] = useState(characters[0]);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Greetings, seeker. I am the ${selectedChar.name}, ${selectedChar.title}. Ask me about your love, career, health, or any matter that weighs upon your heart.`,
      character: selectedChar.id,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch {
      // Fallback for environments where scrollIntoView is unavailable
      messagesEndRef.current?.scrollIntoView(false);
    }
  }, [messages]);

  const switchCharacter = (char: typeof characters[0]) => {
    setSelectedChar(char);
    setMessages([
      {
        role: "assistant",
        content: `I am the ${char.name}, ${char.title}. Share your questions with me, and I shall reveal what the cosmos holds for you.`,
        character: char.id,
      },
    ]);
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise((r) => setTimeout(r, 1000 + Math.random() * 1500));

    const response = getFortuneResponse(selectedChar.id, userMsg);
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: response, character: selectedChar.id },
    ]);
    setIsTyping(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Home
      </Link>

      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">
          Talk to the <span className="text-gradient">Universe</span>
        </h1>
        <p className="text-white/50">Choose your cosmic guide and ask anything</p>
      </div>

      {/* Character Selection */}
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
        {characters.map((char) => (
          <button
            key={char.id}
            onClick={() => switchCharacter(char)}
            className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 ${
              selectedChar.id === char.id
                ? "bg-cosmic-500/20 border-cosmic-500/40 shadow-lg shadow-cosmic-500/10"
                : "bg-white/5 border-white/10 hover:bg-white/10"
            }`}
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${char.color} flex items-center justify-center text-lg`}>
              {char.emoji}
            </div>
            <div className="text-left">
              <p className="text-white text-sm font-medium">{char.name}</p>
              <p className="text-white/40 text-xs">{char.title}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Chat Area */}
      <div className="glow-card h-[500px] flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                msg.role === "user"
                  ? "bg-cosmic-500/20"
                  : `bg-gradient-to-br ${selectedChar.color}`
              }`}>
                {msg.role === "user" ? (
                  <User className="w-4 h-4 text-cosmic-300" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <div className={`${
                msg.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"
              }`}>
                <p className="text-white/80 text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${selectedChar.color} flex items-center justify-center flex-shrink-0`}>
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="chat-bubble-ai">
                <div className="flex gap-1.5 py-1">
                  <div className="w-2 h-2 bg-cosmic-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                  <div className="w-2 h-2 bg-cosmic-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  <div className="w-2 h-2 bg-cosmic-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-white/10 p-4">
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask the ${selectedChar.name} about your future...`}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-cosmic-400 transition-colors"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="px-4 py-3 rounded-xl bg-gradient-to-r from-cosmic-500 to-cosmic-600 text-white hover:from-cosmic-400 hover:to-cosmic-500 transition-all duration-200 disabled:opacity-40"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <div className="flex items-center gap-4 mt-2 text-xs text-white/30">
            <span>Ask about: Love 💕</span>
            <span>Career 💼</span>
            <span>Health 🍃</span>
            <span className="hidden md:inline">Life purpose ✨</span>
          </div>
        </div>
      </div>
    </div>
  );
}
