import { useEffect, useState } from "react";
import {
  Bell,
  Search,
  Sparkles,
  Mail,
  MessageSquare,
  Calendar,
  FileText,
  GraduationCap,
  Clock3,
  CloudSun,
  TrendingUp,
  Newspaper,
  ArrowUpRight,
  MoreHorizontal,
  CheckCircle2,
} from "lucide-react";

function App() {

  const [weather, setWeather] = useState({
    value: "Loading...",
    detail: "Princeton",
    source: "Open-Meteo API",
  });

  const [market, setMarket] = useState({
    value: "Loading...",
    detail: "SPY market snapshot",
    source: "Yahoo Finance",
  });

  useEffect(() => {
    async function loadWeather() {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=40.3573&longitude=-74.6672&current=temperature_2m&temperature_unit=fahrenheit"
        );

        const data = await response.json();

        setWeather({
          value: `${Math.round(data.current.temperature_2m)}°F`,
          detail: "Princeton · Live weather",
          source: "Open-Meteo API",
        });
      } catch {
        setWeather({
          value: "Unavailable",
          detail: "Weather API error",
          source: "Open-Meteo API",
        });
      }
    }

    async function loadMarket() {
      try {
        const response = await fetch(
          "https://query1.finance.yahoo.com/v8/finance/chart/SPY?range=1d&interval=1m"
        );

        const data = await response.json();
        const result = data.chart.result[0];
        const meta = result.meta;

        const current = meta.regularMarketPrice;
        const previous = meta.previousClose;
        const changePercent = ((current - previous) / previous) * 100;

        setMarket({
          value: `SPY ${changePercent >= 0 ? "+" : ""}${changePercent.toFixed(2)}%`,
          detail: `$${current.toFixed(2)} · Live market snapshot`,
          source: "Yahoo Finance",
        });
      } catch {
        setMarket({
          value: "Unavailable",
          detail: "Market API error",
          source: "Yahoo Finance",
        });
      }
    }

    loadWeather();
    loadMarket();
  }, []);

  const primarySignals = [
    {
      source: "Teams",
      icon: MessageSquare,
      title: "Approval path needs clarification",
      detail:
        "Maya asked whether low-risk workflow exceptions need secondary approval. WorkHub recommends answering this before the 2 PM playback.",
      action: "Draft response",
    },
    {
      source: "SharePoint",
      icon: FileText,
      title: "Slide 14 changed yesterday",
      detail:
        "The workflow diagram was simplified, but the exception path still appears in the appendix. This may conflict with Maya’s question.",
      action: "Review slide",
    },
    {
      source: "Outlook",
      icon: Mail,
      title: "Client asked for pricing context",
      detail:
        "Jordan requested a concise explanation of how the workflow reduces manual triage effort. WorkHub prepared a draft response.",
      action: "Review draft",
    },
  ];

  const secondarySignals = [
    {
      source: "Word",
      icon: FileText,
      title: "Proposal comment needs decision",
      detail:
        "Priya tagged you in the operating model section asking whether governance should appear before the AI orchestration layer.",
      action: "Resolve comment",
    },
    {
      source: "Teams",
      icon: MessageSquare,
      title: "Narrative framing changed",
      detail:
        "Ravi suggested replacing automation-first with judgment-led AI to better fit the executive audience.",
      action: "View thread",
    },
  ];

  const dayPlan = [
    {
      time: "9:10",
      type: "Task",
      title: "Review Project Atlas Slide 14",
      detail:
        "This is first because both Maya’s approval-path question and Jordan’s pricing question depend on this workflow.",
      source: "SharePoint + Teams",
      action: "Review",
    },
    {
      time: "9:30",
      type: "Task",
      title: "Send pricing response",
      detail:
        "AI drafted a short response explaining how the workflow reduces manual triage.",
      source: "Outlook",
      action: "Send",
    },
    {
      time: "11:30",
      type: "Task",
      title: "Submit timesheet",
      detail:
        "6.5 missing hours were matched to Project Atlas meetings and design prep.",
      source: "Workday",
      action: "Submit",
    },
    {
      time: "1:15",
      type: "Focus",
      title: "Tighten proposal narrative",
      detail:
        "Use this open block to refine the governance and judgment-led AI storyline.",
      source: "Calendar + Word",
      action: "Start",
    },
    {
      time: "2:00",
      type: "Meeting",
      title: "Client playback",
      detail:
        "Project Atlas playback with client stakeholders. Slide review should happen before this.",
      source: "Calendar",
      action: "Join",
    },
  ];

const widgets = [
    {
      icon: CloudSun,
      title: "Weather",
      value: weather.value,
      detail: weather.detail,
      source: weather.source,
    },
    {
      icon: TrendingUp,
      title: "Stocks",
      value: market.value,
      detail: market.detail,
      source: market.source,
    },
    {
      icon: Newspaper,
      title: "News",
      value: "3 AI headlines",
      detail: "Enterprise AI updates",
      source: "Mock data",
    },
  ];

  return (
    <div className="workhub">
     <header className="topNav">
  <div className="brandArea">
    <div className="brandMark">W</div>
    <div className="brandName">WorkHub</div>
  </div>

  <nav className="timeNav">
    <button className="active">Today</button>
    <button>Week</button>
    <button>Month</button>
    <button>Custom</button>
  </nav>

  <div className="navActions">
    <div className="searchPill">
      <Search size={16} />
      <span>Search across work</span>
    </div>
    <button className="circleButton">
      <Bell size={16} />
    </button>
    <div className="avatar">AR</div>
  </div>
</header>

      <div className="workspace">
        <main className="canvas">
          <section className="startHere">
            <p className="eyebrow">Start Here</p>
            <h1>Review Project Atlas Slide 14.</h1>
            <p>
              Client playback starts in 3 hours. Maya’s approval-path question
              and Jordan’s pricing question both depend on the workflow shown in
              this slide.
            </p>

            <div className="startMeta">
              <span>Estimated effort: 7 min</span>
              <span>Impact: High</span>
              <span>Due before: 2 PM</span>
            </div>

            <button className="primaryAction">
              Start review <ArrowUpRight size={15} />
            </button>
          </section>

          <section className="primaryFocus">
            <div className="sectionHeader">
              <div>
                <p className="eyebrow">Primary Focus</p>
                <h2>Project Atlas</h2>
              </div>
              <button className="softButton">
                Open workspace <ArrowUpRight size={14} />
              </button>
            </div>

            <div className="focusSummary">
              <div>
                <span>Status</span>
                <strong>On track, one decision risk</strong>
              </div>
              <div>
                <span>Next milestone</span>
                <strong>Client playback · 2:00 PM today</strong>
              </div>
              <div>
                <span>AI recommendation</span>
                <strong>Review Slide 14 before responding to Maya</strong>
              </div>
            </div>

            <div className="signals">
              {primarySignals.map((signal, index) => {
                const Icon = signal.icon;
                return (
                  <article className="signalCard" key={index}>
                    <div className="signalIcon">
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="sourceLabel">{signal.source}</div>
                      <h3>{signal.title}</h3>
                      <p>{signal.detail}</p>
                      <button>{signal.action}</button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="secondaryFocus">
            <div className="sectionHeader">
              <div>
                <p className="eyebrow">Secondary Focus</p>
                <h2>Invesco Proposal</h2>
              </div>
              <button className="iconButton">
                <MoreHorizontal size={17} />
              </button>
            </div>

            <p className="secondaryCopy">
              WorkHub grouped six related conversations into one proposal
              thread. The next best move is to sharpen the governance and
              judgment-led AI storyline before tomorrow’s internal review.
            </p>

            <div className="compactSignals">
              {secondarySignals.map((signal, index) => {
                const Icon = signal.icon;
                return (
                  <article className="compactSignal" key={index}>
                    <Icon size={16} />
                    <div>
                      <span>{signal.source}</span>
                      <h3>{signal.title}</h3>
                      <p>{signal.detail}</p>
                    </div>
                    <button>{signal.action}</button>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="widgets">
            <div className="sectionHeader compact">
              <div>
                <p className="eyebrow">Personal Widgets</p>
                <h2>Weather, Market and News</h2>
              </div>
              <button className="softButton">Customize</button>
            </div>

            <div className="widgetGrid">
              {widgets.map((widget) => {
                const Icon = widget.icon;
                return (
                  <div className="widget" key={widget.title}>
                    <Icon size={18} />
                    <div>
                      <span>{widget.title}</span>
                      <strong>{widget.value}</strong>
                      <p>{widget.detail}</p>
                      <small>{widget.source}</small>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>

        <aside className="dayPanel">
          <div className="dayHeader">
            <p className="eyebrow">AI Orchestrated</p>
            <h2>Your Day</h2>
            <p>Sequenced by urgency, meetings and available focus windows.</p>
          </div>

          <div className="dayTabs">
            <button className="active">All</button>
            <button>Tasks</button>
            <button>Meetings</button>
          </div>

          <div className="dayList">
            {dayPlan.map((item, index) => (
              <article className="dayItem" key={index}>
                <div className="dayTime">{item.time}</div>
                <div className="dayContent">
                  <div className="dayMeta">
                    <span>{item.type}</span>
                    {index === 0 && <span className="recommended">Recommended</span>}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                  <div className="daySource">{item.source}</div>
                  <button>
                    {item.action}
                    <ArrowUpRight size={13} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="dayFooter">
            <CheckCircle2 size={16} />
            <span>WorkHub prepared 5 next actions for you.</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;