

					// equivalente a fn(x){return x.bla}
const getTotalKills = (kills, participant)=> kills + participant.stats.kills;
const getTotalDeaths = (deaths, participant)=> deaths + participant.stats.deaths;

// 1 Cantidad de Kills y Deaths de la partida
let gameTotalKills = LoLgame.participants.reduce(getTotalKills, 0);
console.log('Total kills: ' + gameTotalKills);

let gameTotalDeaths = LoLgame.participants.reduce(getTotalDeaths, 0);
console.log('Total deaths: ' + gameTotalDeaths);
console.log('');


LoLgame.teams.forEach((team, i)=> {
	let teamMates = LoLgame.participants.filter((participant)=> participant.teamId === team.teamId);
	
	i++;

	// 2 Cantidad de Kills y Deaths por cada equipo
	let teamTotalKills = teamMates.reduce(getTotalKills, 0);
	console.log(`Kills Team ${i}: ${teamTotalKills}`);

	let teamTotalDeaths = teamMates.reduce(getTotalDeaths, 0);
	console.log(`Deaths Team ${i}: ${teamTotalDeaths}`);
	console.log('');


	// 3 Del equipo que haya ganado, obtener un array con los participantes que hayan tenido 2 o más KillingSprees
	if (team.win === 'Win') {
		let spreeKillers = teamMates.filter((participant)=> participant.stats.killingSprees > 1);
		console.log('Spree Killers Team Winner: ');
		console.log(spreeKillers);
		console.log('');
	}


	// 4 El SummonerName del player que haya tenido más kills en cada equipo
	
	// primer approach
	// let teamKillsArray = teamMates.map((participant)=> participant.stats.kills);
	// let topTeamKills = Math.max.apply(null, teamKillsArray);
	// let topKillsPlayer = teamMates.find((participant)=> participant.stats.kills === topTeamKills);

	// segundo approach con reduce
	let topKillsPlayer = teamMates.reduce((topKiller, participant)=> {
		//if (!topKiller) return participant;
		return participant.stats.kills > topKiller.stats.kills ?participant :topKiller;
	}/*, null*/);

	let summonerName = LoLgame.participantIdentities.find((pIdentity)=> 
		pIdentity.participantId === topKillsPlayer.participantId).player.summonerName;

	console.log(`Top kills Team ${i}: ${topKillsPlayer.stats.kills}`);
	console.log(`Player: ${summonerName}`);
	console.log('');
});
