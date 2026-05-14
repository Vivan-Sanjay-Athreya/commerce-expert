import { useState, useEffect, useCallback } from 'react';
import { ArrowLeftOutlinedIcon } from '@getgo/chameleon-icons/react';
import { IconButton } from '@getgo/chameleon-web-react-wrapper';

import './about-page.css';

interface AboutPageProps {
  onClose: () => void;
}

const SLIDES = [
  {
    id: 'intro',
    label: 'Intro',
  },
  {
    id: 'problem',
    label: 'Problem',
  },
  {
    id: 'usecases',
    label: 'Use Cases',
  },
  {
    id: 'solution',
    label: 'Solution',
  },
];

const SlideIntro = () => (
  <div className="slide slide--intro">
    <div className="slide__intro-bg" />
    <div className="slide__intro-content">
      <div className="slide__badge">AI Fair 2026</div>
      <h1 className="slide__hero-title">Commerce Expert</h1>
      <p className="slide__hero-subtitle">
        A single natural-language interface across commerce services —<br />
        Tax, Titan, Sterling, Boss, and more.
      </p>
      <div className="slide__divider" />
      <div className="slide__team">
        <span className="slide__team-label">Built by</span>
        <div className="slide__team-members">
          {['Shishir', 'Abhinav', 'Vivan', 'Sahib'].map((name, i, arr) => (
            <span key={name} className="slide__team-row">
              <span className="slide__team-avatar">{name[0]}</span>
              <span className="slide__team-name">{name}</span>
              {i < arr.length - 1 && <span className="slide__team-arrow">→</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SlideProblem = () => (
  <div className="slide slide--problem">
    <div className="slide__slide-num">01</div>
    <h2 className="slide__title">Problem Statement</h2>
    <p className="slide__lead">
      Commerce teams today juggle <strong>multiple disconnected systems</strong> to answer a single
      question — switching between Tax portals, Titan dashboards, Sterling docs, and Boss tooling
      for every lookup.
    </p>
    <div className="slide__pain-grid">
      {[
        { icon: '⏱️', text: 'Slow response times on customer issues' },
        { icon: '🔀', text: 'Context-switching across 5+ platforms' },
        { icon: '📖', text: 'Documentation scattered and hard to query' },
        { icon: '🙋', text: 'Heavy reliance on subject-matter experts' },
      ].map(({ icon, text }) => (
        <div key={text} className="slide__pain-card">
          <span className="slide__pain-icon">{icon}</span>
          <span className="slide__pain-text">{text}</span>
        </div>
      ))}
    </div>
    <div className="slide__solution-blurb">
      <span className="slide__solution-pill">Our answer</span>
      One chatbot. Any commerce question. Instant answer.
    </div>
  </div>
);

const CASES = [
  {
    service: 'Tax',
    color: '#3b82f6',
    icon: '🧾',
    query:
      '"What tax number is configured for this customer? Which taxes are exempted and is the SKU tax code correct?"',
  },
  {
    service: 'Commerce Care',
    color: '#f59e0b',
    icon: '🎧',
    query:
      '"Customer can\'t access the Billing section. Quote validation is failing from the SFDC side — what\'s wrong?"',
  },
  {
    service: 'Amplitude',
    color: '#8b5cf6',
    icon: '📊',
    query:
      '"Customer sees \'Something went wrong\' during purchase. What do the event logs show?"',
  },
  {
    service: 'Titan Commerce',
    color: '#10b981',
    icon: '⚙️',
    query:
      '"Customer can\'t turn off auto-renew for their subscription from GoToAdmin — how do I fix this?"',
  },
];

const SlideUseCases = () => (
  <div className="slide slide--usecases">
    <div className="slide__slide-num">02</div>
    <h2 className="slide__title">Example Use Cases</h2>
    <div className="slide__cases-grid">
      {CASES.map(({ service, color, icon, query }) => (
        <div key={service} className="slide__case-card" style={{ '--case-color': color } as React.CSSProperties}>
          <div className="slide__case-header">
            <span className="slide__case-icon">{icon}</span>
            <span className="slide__case-service">{service}</span>
          </div>
          <p className="slide__case-query">{query}</p>
        </div>
      ))}
    </div>
  </div>
);

const SlideSolution = () => (
  <div className="slide slide--solution">
    <div className="slide__slide-num">03</div>
    <h2 className="slide__title">Solution &amp; Outcome</h2>
    <div className="slide__solution-cols">
      <div className="slide__sol-col">
        <p className="slide__sol-col-heading">Tools Planned</p>
        <div className="slide__tools-list">
          {[
            { icon: '💬', name: 'Chat UI', desc: 'Natural-language conversational interface' },
            { icon: '🤖', name: 'AI Backend', desc: 'LLM + RAG over commerce documentation' },
            { icon: '📚', name: 'Doc Integration', desc: 'Tax · Titan · Sterling · Boss docs' },
            { icon: '🗄️', name: 'Live Data', desc: 'Real-time queries to databases & systems' },
          ].map(({ icon, name, desc }) => (
            <div key={name} className="slide__tool-row">
              <span className="slide__tool-row-icon">{icon}</span>
              <div>
                <div className="slide__tool-row-name">{name}</div>
                <div className="slide__tool-row-desc">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="slide__sol-divider" />
      <div className="slide__sol-col">
        <p className="slide__sol-col-heading">Expected Outcome</p>
        <p className="slide__sol-outcome-text">
          A working prototype that helps <strong>PMs, care reps, and developers</strong> get instant
          answers on API integration, service behaviour, and operational data.
        </p>
        <div className="slide__outcome-pills">
          {[
            '⚡ Faster query resolution',
            '🔍 Reduced manual lookups',
            '🧠 Single knowledge interface',
            '💬 Natural language access to data',
          ].map((pill) => (
            <span key={pill} className="slide__outcome-pill">{pill}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SLIDE_COMPONENTS = [SlideIntro, SlideProblem, SlideUseCases, SlideSolution];

const AboutPage = ({ onClose }: AboutPageProps): JSX.Element => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (animating || index === current) return;
      setDirection(index > current ? 'next' : 'prev');
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 320);
    },
    [animating, current],
  );

  const prev = useCallback(() => goTo(Math.max(0, current - 1)), [goTo, current]);
  const next = useCallback(() => goTo(Math.min(SLIDES.length - 1, current + 1)), [goTo, current]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev, onClose]);

  const SlideComponent = SLIDE_COMPONENTS[current];

  return (
    <div className="deck">
      {/* Top bar */}
      <div className="deck__bar">
        <IconButton aria-label="Back to chat" onClick={onClose}>
          <ArrowLeftOutlinedIcon />
        </IconButton>
        <div className="deck__progress">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              className={`deck__pip${i === current ? ' deck__pip--active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={s.label}
            >
              <span className="deck__pip-label">{s.label}</span>
            </button>
          ))}
        </div>
        <span className="deck__counter">
          {current + 1} / {SLIDES.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="deck__progress-bar">
        <div
          className="deck__progress-fill"
          style={{ width: `${((current + 1) / SLIDES.length) * 100}%` }}
        />
      </div>

      {/* Slide area */}
      <div className={`deck__stage deck__stage--${direction}${animating ? ' deck__stage--exit' : ''}`}>
        <SlideComponent />
      </div>

      {/* Arrow nav */}
      <div className="deck__nav">
        <button
          className="deck__arrow deck__arrow--prev"
          onClick={prev}
          disabled={current === 0}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          className="deck__arrow deck__arrow--next"
          onClick={next}
          disabled={current === SLIDES.length - 1}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default AboutPage;
