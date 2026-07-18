// src/utils/standings.js

function createTeam(name) {
  return {
    name,
    played: 0,
    won: 0,
    lost: 0,
    points: 0,

    pf: 0,
    pa: 0,
    pd: 0,
  };
}

function updateTeamStats(table, match) {
  const p1 = match.participant1Name;
  const p2 = match.participant2Name;

  if (!table[p1]) table[p1] = createTeam(p1);
  if (!table[p2]) table[p2] = createTeam(p2);

  if (match.status !== "completed") return;

  const s1 = match.score1?.[0] ?? 0;
  const s2 = match.score2?.[0] ?? 0;

  table[p1].played++;
  table[p2].played++;

  table[p1].pf += s1;
  table[p1].pa += s2;

  table[p2].pf += s2;
  table[p2].pa += s1;

  if (match.winner === p1) {
    table[p1].won++;
    table[p1].points++;

    table[p2].lost++;
  } else {
    table[p2].won++;
    table[p2].points++;

    table[p1].lost++;
  }
}

function calculateTieStats(matches, teams) {
  const stats = {};

  teams.forEach((team) => {
    stats[team.name] = {
      pf: 0,
      pa: 0,
      pd: 0,
      won: 0,
    };
  });

  matches.forEach((match) => {
    if (match.status !== "completed") return;

    const p1 = match.participant1Name;
    const p2 = match.participant2Name;

    if (!(p1 in stats) || !(p2 in stats)) return;

    const s1 = match.score1?.[0] ?? 0;
    const s2 = match.score2?.[0] ?? 0;

    stats[p1].pf += s1;
    stats[p1].pa += s2;

    stats[p2].pf += s2;
    stats[p2].pa += s1;

    if (match.winner === p1) stats[p1].won++;
    else stats[p2].won++;
  });

  Object.values(stats).forEach((team) => {
    team.pd = team.pf - team.pa;
  });

  return stats;
}

function headToHead(matches, teamA, teamB) {
  const match = matches.find(
    (m) =>
      m.status === "completed" &&
      ((m.participant1Name === teamA.name &&
        m.participant2Name === teamB.name) ||
        (m.participant1Name === teamB.name &&
          m.participant2Name === teamA.name)),
  );

  if (!match) return 0;

  if (match.winner === teamA.name) return -1;

  if (match.winner === teamB.name) return 1;

  return 0;
}

function basicSort(a, b) {
  if (b.points !== a.points) return b.points - a.points;

  if (b.pd !== a.pd) return b.pd - a.pd;

  if (b.pf !== a.pf) return b.pf - a.pf;

  return a.name.localeCompare(b.name);
}

function buildTieGroups(standings) {
  const groups = [];

  let current = [];

  standings.forEach((team) => {
    if (current.length === 0) {
      current.push(team);
      return;
    }

    const first = current[0];

    if (first.points === team.points && first.won === team.won) {
      current.push(team);
    } else {
      groups.push(current);
      current = [team];
    }
  });

  if (current.length) groups.push(current);

  return groups;
}

function resolveTieGroups(standings, matches) {
  const tieGroups = buildTieGroups(standings);

  const finalStandings = [];

  tieGroups.forEach((teams) => {
    // No tie
    if (teams.length === 1) {
      finalStandings.push(...teams);
      return;
    }

    // -----------------------------
    // 2-Team Tie -> Head-to-head
    // -----------------------------
    if (teams.length === 2) {
      const [a, b] = teams;

      const result = headToHead(matches, a, b);

      if (result < 0) {
        finalStandings.push(a, b);
      } else if (result > 0) {
        finalStandings.push(b, a);
      } else {
        finalStandings.push(...teams.sort(basicSort));
      }

      return;
    }

    // -----------------------------
    // 3+ Team Tie
    // -----------------------------
    const tieStats = calculateTieStats(matches, teams);

    teams.sort((a, b) => {
      const ta = tieStats[a.name];
      const tb = tieStats[b.name];

      // wins among tied teams
      if (tb.won !== ta.won) return tb.won - ta.won;

      // point difference among tied teams
      if (tb.pd !== ta.pd) return tb.pd - ta.pd;

      // points for among tied teams
      if (tb.pf !== ta.pf) return tb.pf - ta.pf;

      // overall point difference
      if (b.pd !== a.pd) return b.pd - a.pd;

      // overall points for
      if (b.pf !== a.pf) return b.pf - a.pf;

      return a.name.localeCompare(b.name);
    });

    finalStandings.push(...teams);
  });

  return finalStandings;
}

export function calculateStandings(groupMatches) {
  const table = {};

  groupMatches.forEach((match) => {
    updateTeamStats(table, match);
  });

  const standings = Object.values(table);

  // overall PD
  standings.forEach((team) => {
    team.pd = team.pf - team.pa;
  });

  // first sort by overall stats
  standings.sort(basicSort);

  // resolve all ties
  return resolveTieGroups(standings, groupMatches);
}
