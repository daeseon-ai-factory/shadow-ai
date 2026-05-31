// Speak an English string with the browser's built-in TTS (Web Speech API) — free, no
// network, no API key. Used in the drills so you can hear the model sentence and shadow it.

export function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function speak(text: string) {
  if (!canSpeak()) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = 0.95; // a touch slower — easier to shadow
  window.speechSynthesis.cancel(); // drop anything mid-utterance
  window.speechSynthesis.speak(u);
}
