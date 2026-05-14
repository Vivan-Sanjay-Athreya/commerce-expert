import { useState, useEffect, useCallback } from 'react';
import { ArrowLeftOutlinedIcon } from '@getgo/chameleon-icons/react';
import { IconButton } from '@getgo/chameleon-web-react-wrapper';

import './about-page.css';

interface AboutPageProps {
  onClose: () => void;
}

const SLIDES = [
  { id: 'intro', label: 'Intro' },
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'usecases', label: 'Use Cases' },
];

const SlideIntro = () => (
  <div className="slide slide--intro">
    <div className="slide__intro-bg" />
    <div className="slide__intro-content">
      <div className="slide__badge">AI Fair 2026</div>
      <h1 className="slide__hero-title">Commerce Expert</h1>
      <p className="slide__hero-eyebrow">ChatBot</p>
      <p className="slide__hero-subtitle">
        One AI-powered interface to rule them all —<br />
        Answer every question about the customer within split seconds.
      </p>
      <div className="slide__divider" />
      <div className="slide__team">
        <span className="slide__team-label">Built by</span>
        <div className="slide__team-members">
          {['Shishir', 'Abhinav', 'Vivan', 'Sahib', 'Raja'].map((name, i, arr) => (
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
    <h2 className="slide__title">The Problem</h2>
    <p className="slide__lead">
      Commerce support is complicated — <strong>information sources are scattered</strong>, causing delays and reducing
      efficiency.
    </p>
    <div className="slide__pain-list">
      {[
        {
          icon: '🔍',
          text: 'Manually looking up multiple systems',
          sub: 'Core Commerce, Tax, Invoice Service, OnePay, CoPas, and more',
        },
        {
          icon: '🔀',
          text: 'Context-switching between docs, databases, and external tools',
          sub: null,
        },
        {
          icon: '🙋',
          text: 'Heavy reliance on domain experts for every non-trivial question',
          sub: null,
        },
        {
          icon: '⏱️',
          text: 'Long response times that hurt productivity and customer experience',
          sub: null,
        },
      ].map(({ icon, text, sub }) => (
        <div key={text} className="slide__pain-row">
          <span className="slide__pain-icon">{icon}</span>
          <div>
            <div className="slide__pain-text">{text}</div>
            {sub && <div className="slide__pain-sub">{sub}</div>}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SlideSolution = () => (
  <div className="slide slide--solution">
    <div className="slide__slide-num">02</div>
    <h2 className="slide__title">The Solution</h2>
    <p className="slide__sol-tagline">The All-in-one Commerce Support Chatbot</p>
    <div className="slide__solution-cols">
      <div className="slide__sol-left">
        <p className="slide__sol-col-heading">What it provides</p>
        <div className="slide__provides-list">
          {[
            { icon: '🎯', text: 'Contextual, accurate, and actionable responses' },
            { icon: '💬', text: 'Natural language interaction' },
            { icon: '⚡', text: 'Reduced dependency on manual lookups' },
          ].map(({ icon, text }) => (
            <div key={text} className="slide__provides-row">
              <span>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
        <div className="slide__arch-cols">
          <div className="slide__arch-card">
            <p className="slide__arch-heading">Frontend</p>
            <p className="slide__arch-text">Chat-based UI for support reps and engineers</p>
            <p className="slide__arch-text">Natural language input · Structured response output</p>
          </div>
          <div className="slide__arch-card">
            <p className="slide__arch-heading">Backend</p>
            <p className="slide__arch-text">AI-powered service integrated with:</p>
            <p className="slide__arch-sub">Commerce docs · Operational databases · Tax · Titan · Sterling · Boss</p>
          </div>
        </div>
      </div>
      <div className="slide__sol-divider" />
      <div className="slide__sol-right">
        <p className="slide__sol-col-heading">How it works</p>
        <div className="slide__steps">
          {[
            { n: '1', text: 'User types a query in natural language' },
            { n: '2', text: 'AI resolves the intent and routes to the right data source' },
            { n: '3', text: 'Response is returned with context, data, and actionable next steps' },
          ].map(({ n, text }) => (
            <div key={n} className="slide__step">
              <span className="slide__step-num">{n}</span>
              <span className="slide__step-text">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SlideArchitecture = () => (
  <div className="slide slide--architecture">
    <div className="slide__slide-num">03</div>
    <h2 className="slide__title">Architecture</h2>
    <div className="slide__arch-diagram">
      <img
        src={`${process.env.PUBLIC_URL}/flow-diagram.png`}
        alt="Commerce Expert flow diagram"
        className="slide__arch-img"
      />
    </div>
  </div>
);

const CASES = [
  {
    service: 'Tax',
    color: '#3b82f6',
    icon: '🧾',
    query:
      '"Customer is not being taxed the right way — what is the tax number configured for them? What is the tax code for a particular SKU? What taxes are being exempted for a customer?"',
  },
  {
    service: 'Commerce Care',
    color: '#f59e0b',
    icon: '💳',
    query:
      '"Customer is not able to access the Billing section." "I am not able to validate the quote, or create quote is failing from SFDC side."',
  },
  {
    service: 'Amplitude',
    color: '#8b5cf6',
    icon: '📊',
    query:
      '"The customer is seeing \'Something went wrong. Please try again later\' error when trying to make a purchase."',
  },
  {
    service: 'Titan Commerce',
    color: '#10b981',
    icon: '🔄',
    query: '"Customer is not able to turn off auto-renew for a subscription from GoToAdmin."',
  },
];

const SlideUseCases = () => (
  <div className="slide slide--usecases">
    <div className="slide__slide-num">04</div>
    <h2 className="slide__title">What can we do today?</h2>
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

const SLIDE_COMPONENTS = [SlideIntro, SlideProblem, SlideSolution, SlideArchitecture, SlideUseCases];

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

      <div className="deck__progress-bar">
        <div className="deck__progress-fill" style={{ width: `${((current + 1) / SLIDES.length) * 100}%` }} />
      </div>

      <div className={`deck__stage deck__stage--${direction}${animating ? ' deck__stage--exit' : ''}`}>
        <SlideComponent />
      </div>

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
  );
};

export default AboutPage;
