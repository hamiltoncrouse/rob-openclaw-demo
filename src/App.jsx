import { useMemo, useState } from 'react'
import './App.css'

import robPhoto from './assets/rob.jpg'
import bg from './assets/bg.png'
import claw from './assets/claw.png'

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n))
}

function App() {
  const [ambition, setAmbition] = useState(55)
  const [dark, setDark] = useState(true)
  const [idea, setIdea] = useState('A one-page site that explains how OpenClaw turns WhatsApp messages into deploys')

  const tier = useMemo(() => {
    if (ambition < 34) return { label: 'Simple', desc: 'Static site, quick iteration, low ceremony.' }
    if (ambition < 67) return { label: 'Polished', desc: 'Great UI, responsive, images, and clean content.' }
    return { label: 'Deluxe', desc: 'Interactive widgets, charts, animations, and integrations.' }
  }, [ambition])

  const prompt = useMemo(() => {
    const mood = dark ? 'dark, high-contrast, modern' : 'light, clean, minimal'
    return `Build a ${tier.label.toLowerCase()} website. Mood: ${mood}. Idea: ${idea}. Make it responsive and production-ready.`
  }, [tier.label, dark, idea])

  return (
    <div className={dark ? 'app theme-dark' : 'app theme-light'} style={{ '--bg': `url(${bg})` }}>
      <header className="top">
        <div className="wrap nav">
          <div className="brand">
            <img className="brandMark" src={claw} alt="" aria-hidden="true" />
            <div>
              <div className="brandTitle">OpenClaw Demo</div>
              <div className="brandSub">A tiny interactive page for Rob Muscat</div>
            </div>
          </div>

          <div className="actions">
            <button className="pill" type="button" onClick={() => setDark((v) => !v)}>
              {dark ? 'Dark' : 'Light'} mode
            </button>
            <a className="pill pillGhost" href="https://github.com/hamiltoncrouse" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </header>

      <main className="wrap">
        <section className="hero">
          <div className="heroGrid">
            <div>
              <h1>Text a bot. Ship a site.</h1>
              <p className="muted">
                This is a small React demo that shows the vibe: you describe what you want, OpenClaw builds it,
                and deploys it automatically. Slide the ambition, tweak the idea, and watch the “build prompt” update.
              </p>
              <div className="chips">
                <span className="chip">WhatsApp → OpenClaw</span>
                <span className="chip">GitHub as source of truth</span>
                <span className="chip">Render auto-deploy</span>
              </div>
            </div>

            <div className="heroCard">
              <img className="avatar" src={robPhoto} alt="Rob Muscat" />
              <div className="heroCardBody">
                <div className="k">Rob Muscat</div>
                <div className="v">Here’s the kind of interactive “one-pager” we can spin up fast.</div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid">
          <article className="card">
            <h2>Ambition slider</h2>
            <p className="muted">A quick way to communicate scope without a 30-minute call.</p>

            <div className="range">
              <input
                type="range"
                min={0}
                max={100}
                value={ambition}
                onChange={(e) => setAmbition(clamp(Number(e.target.value), 0, 100))}
              />
              <div className="rangeMeta">
                <strong>{tier.label}</strong>
                <span className="muted">({ambition}/100)</span>
              </div>
              <div className="muted">{tier.desc}</div>
            </div>
          </article>

          <article className="card">
            <h2>Site idea</h2>
            <p className="muted">What should we build next?</p>
            <textarea value={idea} onChange={(e) => setIdea(e.target.value)} rows={5} />
            <div className="hint muted">Tip: paste a few bullet points or a rough outline.</div>
          </article>

          <article className="card cardWide">
            <h2>Generated “build prompt”</h2>
            <p className="muted">This is the kind of instruction I send in WhatsApp to produce a site.</p>
            <pre className="mono">{prompt}</pre>
            <div className="row">
              <button className="pill" type="button" onClick={() => navigator.clipboard?.writeText(prompt)}>
                Copy prompt
              </button>
              <span className="muted">(No worries if clipboard is blocked — you can still select & copy.)</span>
            </div>
          </article>
        </section>

        <footer className="footer">
          <div className="muted">
            Built with React + Vite. Deployed on Render via Blueprint.
          </div>
        </footer>
      </main>

      <div className="bg" aria-hidden="true" />
    </div>
  )
}

export default App
