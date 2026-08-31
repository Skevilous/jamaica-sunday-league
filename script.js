const leagueData = {
  seasonStart: "May 31, 2026",
  teams: [
    { name: "Orange", color: "#f58220" },
    { name: "Green", color: "#0f8f3c" },
  ],
  matches: [
    {
      week: 1,
      date: "May 31, 2026",
      homeTeam: "Orange",
      awayTeam: "Green",
      homeScore: 7,
      awayScore: 3,
      scorers: [
        { player: "Big Boy", team: "Orange", goals: 2 },
        { player: "Chad", team: "Green", goals: 1 },
        { player: "Sleepy", team: "Green", goals: 1 },
        { player: "Kemar", team: "Green", goals: 1 },
      ],
    },
    {
      week: 2,
      date: "June 7, 2026",
      homeTeam: "Green",
      awayTeam: "Orange",
      homeScore: 1,
      awayScore: 0,
      scorers: [
        { player: "Chip", team: "Green", goals: 1 },
      ],
    },
    {
      week: 3,
      date: "June 14, 2026",
      homeTeam: "Orange",
      awayTeam: "Green",
      homeScore: 0,
      awayScore: 0,
      scorers: [],
    },
    {
      week: 4,
      date: "June 21, 2026",
      homeTeam: "Orange",
      awayTeam: "Green",
      homeScore: 2,
      awayScore: 0,
      scorers: [
        { player: "Reagy", team: "Orange", goals: 1 },
        { player: "Kellon", team: "Orange", goals: 1 },
      ],
    },
    {
      week: 5,
      date: "June 28, 2026",
      homeTeam: "Green",
      awayTeam: "Orange",
      homeScore: 2,
      awayScore: 1,
      scorers: [
        { player: "Simple", team: "Green", goals: 1 },
        { player: "Pepe", team: "Green", goals: 1 },
      ],
    },
    {
      week: 6,
      date: "July 5, 2026",
      homeTeam: "Green",
      awayTeam: "Orange",
      homeScore: 3,
      awayScore: 2,
      scorers: [
        { player: "Rallion", team: "Green", goals: 1 },
        { player: "Kicka", team: "Green", goals: 2 },
      ],
    },
    {
      week: 7,
      date: "July 12, 2026",
      homeTeam: "Green",
      awayTeam: "Orange",
      homeScore: 3,
      awayScore: 1,
      scorers: [
        { player: "Dougie", team: "Green", goals: 1 },
        { player: "Rallion", team: "Green", goals: 1 },
        { player: "Shampoo", team: "Green", goals: 1 },
      ],
    },
    {
      week: 8,
      date: "July 19, 2026",
      homeTeam: "Green",
      awayTeam: "Orange",
      homeScore: 3,
      awayScore: 1,
      scorers: [
        { player: "Kemar", team: "Green", goals: 2 },
        { player: "Simple", team: "Green", goals: 1 },
        { player: "Reagy", team: "Orange", goals: 1 },
      ],
    },
    {
      week: 9,
      date: "July 26, 2026",
      homeTeam: "Orange",
      awayTeam: "Green",
      homeScore: 4,
      awayScore: 0,
      scorers: [
        { player: "Reagy", team: "Orange", goals: 2 },
        { player: "Brown Yute", team: "Orange", goals: 1 },
        { player: "Piggy", team: "Orange", goals: 1 },
      ],
    },
    {
      week: 10,
      date: "August 2, 2026",
      homeTeam: "Orange",
      awayTeam: "Green",
      homeScore: 3,
      awayScore: 2,
      scorers: [
        { player: "Piggy", team: "Orange", goals: 1 },
        { player: "Scion", team: "Orange", goals: 1 },
        { player: "Next Yute", team: "Orange", goals: 1 },
        { player: "Simple", team: "Green", goals: 1 },
        { player: "Sleepy", team: "Green", goals: 1 },
      ],
    },
    {
      week: 11,
      date: "August 9, 2026",
      homeTeam: "Green",
      awayTeam: "Orange",
      homeScore: 3,
      awayScore: 2,
      scorers: [
        { player: "Chad", team: "Green", goals: 1 },
        { player: "Breadback", team: "Green", goals: 2 },
        { player: "Fry", team: "Orange", goals: 1 },
      ],
    },
    {
      week: 12,
      date: "August 16, 2026",
      homeTeam: "Green",
      awayTeam: "Orange",
      homeScore: 1,
      awayScore: 1,
      scorers: [
        { player: "Indian", team: "Green", goals: 1 },
        { player: "Kellon", team: "Orange", goals: 1 },
      ],
    },
    {
      week: 13,
      date: "August 30, 2026",
      homeTeam: "Orange",
      awayTeam: "Green",
      homeScore: 5,
      awayScore: 0,
      scorers: [],
    },
  ],
  fixtures: [],
};

const pointsForResult = {
  win: 3,
  draw: 1,
  loss: 0,
};

function getTeamColor(teamName) {
  return leagueData.teams.find((team) => team.name === teamName)?.color || "#ffffff";
}

function createInitialTable() {
  return leagueData.teams.map((team) => ({
    team: team.name,
    color: team.color,
    played: 0,
    won: 0,
    drew: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
  }));
}

function addResult(row, goalsFor, goalsAgainst) {
  row.played += 1;
  row.goalsFor += goalsFor;
  row.goalsAgainst += goalsAgainst;
  row.goalDifference = row.goalsFor - row.goalsAgainst;

  if (goalsFor > goalsAgainst) {
    row.won += 1;
    row.points += pointsForResult.win;
  } else if (goalsFor === goalsAgainst) {
    row.drew += 1;
    row.points += pointsForResult.draw;
  } else {
    row.lost += 1;
    row.points += pointsForResult.loss;
  }
}

function calculateTable() {
  const table = createInitialTable();

  leagueData.matches.forEach((match) => {
    const home = table.find((row) => row.team === match.homeTeam);
    const away = table.find((row) => row.team === match.awayTeam);

    addResult(home, match.homeScore, match.awayScore);
    addResult(away, match.awayScore, match.homeScore);
  });

  return table.sort((a, b) => (
    b.points - a.points ||
    b.goalDifference - a.goalDifference ||
    b.goalsFor - a.goalsFor ||
    a.team.localeCompare(b.team)
  ));
}

function calculateScorers() {
  const scorers = new Map();

  leagueData.matches.forEach((match) => {
    match.scorers.forEach((entry) => {
      const key = `${entry.player}|${entry.team}`;
      const existing = scorers.get(key) || {
        player: entry.player,
        team: entry.team,
        goals: 0,
      };

      existing.goals += entry.goals;
      scorers.set(key, existing);
    });
  });

  return Array.from(scorers.values()).sort((a, b) => (
    b.goals - a.goals ||
    a.player.localeCompare(b.player)
  ));
}

function renderTable(table) {
  const tableBody = document.getElementById("league-table");
  tableBody.innerHTML = table.map((row, index) => `
    <tr>
      <td class="rank-cell" style="--team-color: ${row.color}">${index + 1}</td>
      <td class="team-cell" style="--team-color: ${row.color}">${row.team}</td>
      <td>${row.played}</td>
      <td>${row.won}</td>
      <td>${row.drew}</td>
      <td>${row.lost}</td>
      <td class="table-detail">${row.goalsFor}</td>
      <td class="table-detail">${row.goalsAgainst}</td>
      <td>${row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}</td>
      <td class="points-cell" style="--team-color: ${row.color}">${row.points}</td>
    </tr>
  `).join("");
}

function shortDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date} 00:00:00 UTC`));
}

function formatTeamScorers(match, teamName) {
  const entries = match.scorers.filter((scorer) => scorer.team === teamName);
  return entries.length
    ? entries.map((scorer) => `${scorer.player} ${scorer.goals}`).join(", ")
    : "No scorer recorded";
}

function renderLatestResult() {
  const latestMatch = leagueData.matches.at(-1);
  const homeColor = getTeamColor(latestMatch.homeTeam);
  const awayColor = getTeamColor(latestMatch.awayTeam);

  document.getElementById("latest-week").textContent = latestMatch.week;
  document.getElementById("latest-date").textContent = shortDate(latestMatch.date);
  document.getElementById("latest-home-team").textContent = latestMatch.homeTeam;
  document.getElementById("latest-away-team").textContent = latestMatch.awayTeam;
  document.getElementById("latest-home-score").textContent = latestMatch.homeScore;
  document.getElementById("latest-away-score").textContent = latestMatch.awayScore;
  document.getElementById("latest-home-scorers").textContent =
    formatTeamScorers(latestMatch, latestMatch.homeTeam);
  document.getElementById("latest-away-scorers").textContent =
    formatTeamScorers(latestMatch, latestMatch.awayTeam);
  document.getElementById("latest-home-block").style.setProperty("--team-color", homeColor);
  document.getElementById("latest-away-block").style.setProperty("--team-color", awayColor);
}

function renderResults() {
  const resultsList = document.getElementById("results-list");
  const newestFirst = [...leagueData.matches].reverse();

  resultsList.innerHTML = newestFirst.map((match, index) => `
    <article class="result-row${index > 2 ? " is-extra" : ""}" aria-label="Week ${match.week}: ${match.homeTeam} ${match.homeScore}, ${match.awayTeam} ${match.awayScore}">
      <span class="result-week">Week ${match.week}</span>
      <strong class="result-team" style="--team-color: ${getTeamColor(match.homeTeam)}">${match.homeTeam}</strong>
      <strong class="result-score">${match.homeScore} - ${match.awayScore}</strong>
      <strong class="result-team away" style="--team-color: ${getTeamColor(match.awayTeam)}">${match.awayTeam}</strong>
      <time class="result-date">${shortDate(match.date)}</time>
    </article>
  `).join("");
}

function renderScorers(scorers) {
  const scorersList = document.getElementById("scorers-list");

  scorersList.innerHTML = scorers.map((scorer) => `
    <li class="scorer-row">
      <strong class="scorer-name">${scorer.player}</strong>
      <span class="scorer-team" style="--team-color: ${getTeamColor(scorer.team)}">${scorer.team}</span>
      <strong class="scorer-goals">${scorer.goals}</strong>
    </li>
  `).join("");
}

function renderFixtures() {
  const fixturesList = document.getElementById("fixtures-list");

  if (!leagueData.fixtures.length) {
    fixturesList.innerHTML = `
      <div class="fixture-empty">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M7 3v3m10-3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z"></path>
        </svg>
        <strong>Next Sunday</strong>
        <span>Fixture to be confirmed</span>
      </div>
    `;
    return;
  }

  fixturesList.innerHTML = leagueData.fixtures.map((fixture) => `
    <article class="fixture-row">
      <strong>${fixture.homeTeam}</strong>
      <span>vs<time>${shortDate(fixture.date)}</time></span>
      <strong>${fixture.awayTeam}</strong>
    </article>
  `).join("");
}

function bindInteractions() {
  const menuButton = document.getElementById("menu-button");
  const desktopNav = document.getElementById("desktop-nav");
  const resultsToggle = document.getElementById("results-toggle");
  const resultsList = document.getElementById("results-list");
  const navLinks = document.querySelectorAll(".desktop-nav a, .mobile-nav a");

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    desktopNav.classList.toggle("is-open", !isOpen);
  });

  desktopNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuButton.setAttribute("aria-expanded", "false");
      desktopNav.classList.remove("is-open");
    }
  });

  resultsToggle.addEventListener("click", () => {
    const isExpanded = resultsToggle.getAttribute("aria-expanded") === "true";
    resultsToggle.setAttribute("aria-expanded", String(!isExpanded));
    resultsToggle.textContent = isExpanded ? "View all" : "Show less";
    resultsList.classList.toggle("is-expanded", !isExpanded);
  });

  const updateActiveNav = (sectionId) => {
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${sectionId}`);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) updateActiveNav(visible.target.id);
  }, { rootMargin: "-20% 0px -65%", threshold: [0, 0.1, 0.5] });

  ["home", "table", "results", "scorers"].forEach((id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
}

function renderApp() {
  const table = calculateTable();
  const scorers = calculateScorers();
  const latestWeek = Math.max(...leagueData.matches.map((match) => match.week));

  document.getElementById("season-start").textContent = shortDate(leagueData.seasonStart);
  document.getElementById("last-updated").textContent = `After week ${latestWeek}`;

  renderLatestResult();
  renderTable(table);
  renderResults();
  renderScorers(scorers);
  renderFixtures();
  bindInteractions();
}

renderApp();
