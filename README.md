# ✦ MysticPortfolio

The personal portfolio of Nohelis Rangel, junior software developer and UI/UX designer, mapped onto a birth chart. Built with React and Vite: Sun, Moon and Rising cards introduce who I am, skills appear as constellations, projects live in the Houses of the zodiac, and a tarot wheel lets visitors draw a card. Responsive, accessible and easy to update.

This is my personal portfolio, designed as a map of the night sky. I’m a developer and UI/UX designer, and I built this site to show both sides of my work: the design thinking and the code behind it.

The site is shaped like a birth chart. My Sun, Moon and Rising signs introduce what I do, what drives me and how I collaborate. My skills are drawn as constellations (Frontend & Mobile, Backend & Data, Design & Tools), each a group of connected stars. My projects are laid out as Houses of the zodiac, each with its own preview screen and tech stack.

At the end, a spinning wheel of all 22 Major Arcana invites visitors to draw a tarot card. Each card has its own gold line-art illustration, a playful message, and its upright or reversed meaning.

It’s built with React and Vite, with responsive layouts, accessible markup and hand-written CSS. No image files are used for the visuals: the starfield, cards and illustrations are all drawn with CSS, SVG and canvas.

## Run it

You need [Node.js](https://nodejs.org) (LTS). Then, in this folder:

```bash
npm install
npm run dev
```

Open the address it prints (usually http://localhost:5173).

## Make it yours

Almost everything you’ll want to change is in **`src/data/content.js`**:

| What | Where in `content.js` |
|---|---|
| Name, role, tagline, email, links | `profile` |
| Photo | put `me.jpg` in `/public`, then set `photo: "/me.jpg"` |
| Résumé | put `resume.pdf` in `/public` |
| Sun / Moon / Rising cards | `facets` |
| Skills (stars + lines) | `constellations`: `x`/`y` are 0–100 positions, `lines` join star numbers |
| Projects (the Houses) | `projects`: add `demo` and `source` links to show them on a card |
| Experience timeline | `experience` |

**Tarot cards:** names, fun messages and meanings are in `src/data/tarot.js`. Spin speed, reversed odds and timing are at the top of `src/components/Tarot.jsx`; colours and card size are at the top of `src/tarot.css`.

**Real project screenshots:** add an image to `/public` and give the project
`preview: { image: "/orbit.png" }` instead of the illustrated mock screen.

**Colours and fonts:** edit the variables at the top of `src/index.css`.

## Project structure

```
src/
  data/
    content.js           ← your content
    tarot.js             the 22 Major Arcana: meanings and fun messages
  components/
    Starfield.jsx        twinkling canvas background
    Nav.jsx              sticky nav, mobile menu
    Hero.jsx             "The Birth Chart"
    ZodiacWheel.jsx      the rotating chart illustration
    About.jsx            "Sun, Moon & Rising"
    Constellations.jsx   skills
    Houses.jsx           projects grid
    ProjectPreview.jsx   mini illustrated screens on project cards
    Experience.jsx       experience timeline
    Tarot.jsx            "Tap a card for tarot" spinning card wheel
    TarotArt.jsx         SVG illustrations for each tarot card
    Contact.jsx          "Let's build something stellar"
    Footer.jsx
  index.css              site styles + design tokens
  tarot.css              tarot wheel styles
```

## Deploy

```bash
npm run build
```

Import this repo on Vercel or Netlify: both detect Vite automatically and give you a free URL.
