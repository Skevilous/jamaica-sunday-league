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

function renderLeader(table) {
  const leader = table[0];
  document.getElementById("leader-name").textContent = leader.team;
  document.getElementById("leader-record").textContent =
    `${leader.won}W ${leader.drew}D ${leader.lost}L from ${leader.played} played`;
  document.getElementById("leader-points").textContent = leader.points;
  document.getElementById("leader-gd").textContent =
    leader.goalDifference > 0 ? `+${leader.goalDifference}` : leader.goalDifference;
  document.getElementById("leader-gf").textContent = leader.goalsFor;
  document.getElementById("leader-swatch").style.background = leader.color;
}

function renderTable(table) {
  const tableBody = document.getElementById("league-table");
  tableBody.innerHTML = table.map((row) => `
    <tr>
      <td>
        <span class="team-cell">
          <span class="mini-swatch" style="background: ${row.color}"></span>
          ${row.team}
        </span>
      </td>
      <td>${row.played}</td>
      <td>${row.won}</td>
      <td>${row.drew}</td>
      <td>${row.lost}</td>
      <td>${row.goalsFor}</td>
      <td>${row.goalsAgainst}</td>
      <td>${row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}</td>
      <td>${row.points}</td>
    </tr>
  `).join("");
}

function formatScorers(scorers) {
  if (!scorers.length) {
    return "No scorers recorded";
  }

  return scorers
    .map((scorer) => `${scorer.player} (${scorer.team}) ${scorer.goals}`)
    .join(", ");
}

function renderResults() {
  const resultsList = document.getElementById("results-list");

  resultsList.innerHTML = leagueData.matches.map((match) => `
    <article class="matchday-card">
      <div class="matchday-header">
        <span>Week ${match.week}</span>
        <span>${match.date}</span>
      </div>
      <div class="match-row">
        <strong class="team-name" style="color: ${getTeamColor(match.homeTeam)}">${match.homeTeam}</strong>
        <span class="scoreline">
          <strong>${match.homeScore}</strong>
          <span>-</span>
          <strong>${match.awayScore}</strong>
        </span>
        <strong class="team-name away" style="color: ${getTeamColor(match.awayTeam)}">${match.awayTeam}</strong>
      </div>
      <div class="scorer-note">Scorers: ${formatScorers(match.scorers)}</div>
    </article>
  `).join("");
}

function renderScorers(scorers) {
  const scorersList = document.getElementById("scorers-list");

  scorersList.innerHTML = scorers.map((scorer) => `
    <li>
      <span class="mini-swatch" style="background: ${getTeamColor(scorer.team)}"></span>
      <span class="scorer-meta">
        <strong>${scorer.player}</strong>
        <span>${scorer.team}</span>
      </span>
      <strong class="scorer-goals">${scorer.goals}</strong>
    </li>
  `).join("");
}

function renderFixtures() {
  const fixturesList = document.getElementById("fixtures-list");

  if (!leagueData.fixtures.length) {
    fixturesList.innerHTML = `
      <div class="fixture-empty">
        <strong>Fixtures coming soon</strong>
        <p>Upcoming matchups can be added to the fixtures array when the next Sunday is locked in.</p>
        <span>Stay ready.</span>
      </div>
    `;
    return;
  }

  fixturesList.innerHTML = leagueData.fixtures.map((fixture) => `
    <article class="matchday-card">
      <div class="matchday-header">
        <span>Week ${fixture.week}</span>
        <span>${fixture.date}</span>
      </div>
      <div class="match-row">
        <strong class="team-name">${fixture.homeTeam}</strong>
        <span class="scoreline">vs</span>
        <strong class="team-name away">${fixture.awayTeam}</strong>
      </div>
    </article>
  `).join("");
}

function renderApp() {
  const table = calculateTable();
  const scorers = calculateScorers();
  const latestWeek = Math.max(...leagueData.matches.map((match) => match.week));

  document.getElementById("season-start").textContent = leagueData.seasonStart;
  document.getElementById("last-updated").textContent = `Week ${latestWeek}`;

  renderLeader(table);
  renderTable(table);
  renderResults();
  renderScorers(scorers);
  renderFixtures();
}

renderApp();
