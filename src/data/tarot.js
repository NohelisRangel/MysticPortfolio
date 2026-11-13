// ✦ The 22 Major Arcana ✦
// Each card has its traditional astrological correspondence as a glyph,
// a playful one-liner (`fun`), and an upright and a reversed meaning. Edit the wording freely.

export const MAJOR_ARCANA = [
  {
    numeral: "0", name: "The Fool", glyph: "♅",
    fun: "New adventure unlocked! Packing list: snacks, curiosity and absolutely zero plans.",
    upright: "A fresh start is calling, and you don’t need every answer before you leap. Trust your curiosity and take the first step with an open heart.",
    reversed: "Excitement may be outrunning planning right now. Pause long enough to look where you’re stepping, then go.",
  },
  {
    numeral: "I", name: "The Magician", glyph: "☿",
    fun: "You have every tool you need. Yes, even the ones hiding in your 47 open browser tabs.",
    upright: "You already hold every tool you need. Focus your skills and intention, and ideas turn into something real.",
    reversed: "Scattered energy or self-doubt is keeping your talent idle. Pick one thing and give it your full attention.",
  },
  {
    numeral: "II", name: "The High Priestess", glyph: "☽",
    fun: "Your gut already knows the answer. It’s just waiting for you to stop googling it.",
    upright: "Your intuition knows more than it’s saying out loud. Get quiet, listen inward and trust what surfaces.",
    reversed: "You may be tuning out your inner voice in favour of outside noise. Step back and reconnect with what you sense to be true.",
  },
  {
    numeral: "III", name: "The Empress", glyph: "♀",
    fun: "Water your plants, water your ideas, and maybe drink some water yourself.",
    upright: "This is a season of growth, creativity and abundance. Nurture what you’re building and let beauty into the process.",
    reversed: "You may be pouring into others and running on empty. Creativity returns when you care for yourself first.",
  },
  {
    numeral: "IV", name: "The Emperor", glyph: "♈",
    fun: "Make the plan. Colour-code the plan. Become the plan.",
    upright: "Structure and steady leadership will carry you forward. Set clear boundaries and build on solid ground.",
    reversed: "Rigid control, from you or someone else, is stifling progress. Loosen the grip and let the plan breathe.",
  },
  {
    numeral: "V", name: "The Hierophant", glyph: "♉",
    fun: "Read the instructions this time. Then you’ve earned the right to break the rules.",
    upright: "There’s wisdom in tradition, mentorship and proven paths. Learn the rules well, then you’ll know which ones to keep.",
    reversed: "You’re ready to question convention and find your own way. Trust that a less familiar path can still be the right one.",
  },
  {
    numeral: "VI", name: "The Lovers", glyph: "♊",
    fun: "A match made in the stars, or at least in the same time zone.",
    upright: "A meaningful connection or an important choice is in front of you. Choose what aligns with your values, not just what’s easy.",
    reversed: "Something feels out of sync, in a relationship or within yourself. Honest conversation helps restore the balance.",
  },
  {
    numeral: "VII", name: "The Chariot", glyph: "♋",
    fun: "Full speed ahead! Mind the potholes, but don’t stop for them.",
    upright: "Determination and focus will drive you to victory. Steer with confidence and keep your opposing pulls working together.",
    reversed: "You might be pushing hard in too many directions at once. Regain control by deciding where you actually want to go.",
  },
  {
    numeral: "VIII", name: "Strength", glyph: "♌",
    fun: "Gentle wins. Pet the lion; don’t wrestle it.",
    upright: "Real strength is quiet: patience, compassion and courage. Lead with a steady heart and challenges soften.",
    reversed: "Self-doubt is making you feel smaller than you are. Be gentle with yourself; your inner fire hasn’t gone out.",
  },
  {
    numeral: "IX", name: "The Hermit", glyph: "♍",
    fun: "Do-not-disturb mode: officially approved by the cosmos.",
    upright: "Step away from the noise to find your own answers. Solitude and reflection will light the next part of the path.",
    reversed: "Retreat has tipped into isolation. Let someone in; connection can bring clarity, too.",
  },
  {
    numeral: "X", name: "Wheel of Fortune", glyph: "♃",
    fun: "Plot twist incoming. Buckle up, it’s a good one.",
    upright: "The wheel is turning in your favour, and change is in motion. Stay open; opportunity often arrives unannounced.",
    reversed: "Things feel out of your hands for now. Focus on what you can control and trust that cycles always turn again.",
  },
  {
    numeral: "XI", name: "Justice", glyph: "♎",
    fun: "The universe keeps receipts. Make yours good ones.",
    upright: "Truth, fairness and clear decisions are favoured. Act with integrity, and outcomes will reflect it.",
    reversed: "Something feels unbalanced or unaccounted for. Take honest ownership of your part and the scales begin to even out.",
  },
  {
    numeral: "XII", name: "The Hanged Man", glyph: "♆",
    fun: "Try looking at it upside down. New perspective, same Wi‑Fi.",
    upright: "A pause isn’t a failure; it’s a new vantage point. Let go of forcing things and see the situation from another angle.",
    reversed: "You may be stalling to avoid a decision you already know you need to make. It’s time to move.",
  },
  {
    numeral: "XIII", name: "Death", glyph: "♏",
    fun: "Not the spooky kind! Just one chapter ending, and you get to write the next.",
    upright: "One chapter is closing so another can begin. Release what’s run its course and make room for transformation.",
    reversed: "Holding on to something finished is keeping you stuck. Change is easier once you stop resisting it.",
  },
  {
    numeral: "XIV", name: "Temperance", glyph: "♐",
    fun: "One part chaos, one part calm. Stir gently and serve.",
    upright: "Balance, patience and moderation bring things together. Blend opposites thoughtfully and let the process unfold.",
    reversed: "Life feels lopsided or rushed. Recalibrate and return to a pace you can actually sustain.",
  },
  {
    numeral: "XV", name: "The Devil", glyph: "♑",
    fun: "That “just one more episode”? The Devil sees you. No judgement. Okay, a little.",
    upright: "Notice the habits or attachments that quietly hold you back. Naming them is the first step to loosening their grip.",
    reversed: "You’re breaking free from something that has had a hold on you. Keep going; the chains are looser than they look.",
  },
  {
    numeral: "XVI", name: "The Tower", glyph: "♂",
    fun: "Surprise renovation! Good thing you’re brilliant at rebuilding.",
    upright: "A sudden shake-up clears away what was built on shaky ground. It can feel jarring, but it makes space for something truer.",
    reversed: "A needed change is being delayed or resisted. Facing it now may be gentler than waiting for it to arrive on its own.",
  },
  {
    numeral: "XVII", name: "The Star", glyph: "♒",
    fun: "Make a wish. The universe is officially taking requests.",
    upright: "Hope, healing and renewed inspiration are on their way. Keep your eyes on your guiding light; you’re on the right path.",
    reversed: "Your spark feels dim right now. Small acts of faith in yourself will help it glow again.",
  },
  {
    numeral: "XVIII", name: "The Moon", glyph: "♓",
    fun: "A little foggy out there, which is perfect weather for intuition.",
    upright: "Not everything is as it seems, and that’s okay. Move slowly, trust your instincts and let clarity arrive in its own time.",
    reversed: "Confusion is lifting and hidden things are coming to light. Trust what you now see clearly.",
  },
  {
    numeral: "XIX", name: "The Sun", glyph: "☉",
    fun: "Main-character energy, fully charged. Don’t forget the sunscreen.",
    upright: "Joy, success and warmth shine on what you’re doing. Celebrate it and let yourself be seen.",
    reversed: "The light is still there, just partly behind clouds. Reconnect with simple joys and your optimism will return.",
  },
  {
    numeral: "XX", name: "Judgement", glyph: "♇",
    fun: "This is your sign. Literally. You just drew it.",
    upright: "A moment of awakening asks you to rise to your calling. Reflect honestly, forgive the past and answer the call.",
    reversed: "Self-criticism is drowning out the call. Be kinder to yourself so you can hear what’s next.",
  },
  {
    numeral: "XXI", name: "The World", glyph: "♄",
    fun: "Level complete! Take a victory lap before the next quest begins.",
    upright: "A cycle is complete and you’ve earned this sense of wholeness. Celebrate how far you’ve come before the next journey begins.",
    reversed: "You’re close to the finish line but something feels unresolved. Tie up the loose ends and claim your completion.",
  },
];
