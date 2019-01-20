//Data From Ruby Tag
data.forEach((d) => {
    const dat = parseDateString(d.date);
    d.date = new Date(dat[0], dat[1], dat[2]);
    d.starts = parseInt(d.starts, 10) * 1000;
})

const getStartsByDate = date => {
    return data.filter(item => testDateEquality(item.date, date));
}

const getStartsByYear = yr => {
    return data.filter(item => item.date.getFullYear() === yr);
}

//Data
const reElectionTerms = [
    {
        president: "John Kennedy / Lyndon Johnson",
        startDate: new Date(1961, 0, 20),
        endDate: new Date(1965, 0, 20),
        electionDate: new Date(1964, 10, 3),
        electoralVote: 486,
        opponentVote: 52,
        imgPage: 'johnson.jpg'
    },
    {
        president: "Richard Nixon",
        startDate: new Date(1969, 0, 20),
        endDate: new Date(1973, 0, 20),
        electionDate: new Date(1972, 10, 7),
        electoralVote: 520,
        opponentVote: 17,
        imgPage: 'nixon.jpg'
    },
    {
        president: "Richard Nixon / Gerald Ford",
        startDate: new Date(1973, 0, 20),
        endDate: new Date(1977, 0, 20),
        electionDate: new Date(1976, 10, 7),
        electoralVote: 240,
        opponentVote: 297,
        imgPage: 'ford.jpg'
    },
    {
        president: "Jimmy Carter",
        startDate: new Date(1977, 0, 20),
        endDate: new Date(1981, 0, 20),
        electionDate: new Date(1980, 10, 4),
        electoralVote: 49,
        opponentVote: 489,
        imgPage: 'carter.jpg'
    },
    {
        president: "Ronald Reagan",
        startDate: new Date(1981, 0, 20),
        endDate: new Date(1985, 0, 20),
        electionDate: new Date(1984, 10, 6),
        electoralVote: 525,
        opponentVote: 17,
        imgPage: 'reagan.jpg'
    },
    {
        president: "George H.W. Bush",
        startDate: new Date(1989, 0, 20),
        endDate: new Date(1993, 0, 20),
        electionDate: new Date(1992, 10, 3),
        electoralVote: 168,
        opponentVote: 370,
        imgPage: 'bush.jpg'
    },
    {
        president: "Bill Clinton",
        startDate: new Date(1993, 0, 20),
        endDate: new Date(1997, 0, 20),
        electionDate: new Date(1996, 10, 5),
        electoralVote: 379,
        opponentVote: 159,
        imgPage: 'clinton.jpg'
    },
    {
        president: "George W. Bush",
        startDate: new Date(2001, 0, 20),
        endDate: new Date(2005, 0, 20),
        electionDate: new Date(2004, 10, 2),
        electoralVote: 286,
        opponentVote: 251,
        imgPage: 'wbush.jpg'
    },
    {
        president: "Barack Obama",
        startDate: new Date(2009, 0, 20),
        endDate: new Date(2013, 0, 20),
        electionDate: new Date(2012, 10, 6),
        electoralVote: 332,
        opponentVote: 206,
        imgPage: 'obama.jpg'
    },
    {
        president: "Donald Trump",
        startDate: new Date(2016, 0, 20),
        endDate: new Date(2020, 0, 20),
        electionDate: new Date(2020, 10, 3),
        imgPage: 'donald-trump.jpg'
    }
];

//Background For Hero
const partyInOffice = 'Republican';
const heroContainer = document.querySelector('.hero-container');
heroContainer.style.background = partyInOffice === 'Republican' ? 'linear-gradient(to right, rgb(223, 0, 5), #ef473a)' : 'linear-gradient(to right, rgb(0, 60, 170), rgb(0, 124, 202))';

//Create President Cards
const cards = reElectionTerms.slice(0, reElectionTerms.length - 1).map((obj) =>{
    const testDateStart = formatMonthDate(obj.startDate);
    const testDateEnd = formatMonthDate(obj.electionDate);
    const housingStart = getStartsByDate(testDateStart);
    const housingEnd = getStartsByDate(testDateEnd);
    //const housingYrStart = getStartsByYear(obj.startDate.getFullYear()).reduce((sum, obj) => sum += obj.starts, 0)
    //const housingYrEnd = getStartsByYear(obj.electionDate.getFullYear()).reduce((sum, obj) => sum += obj.starts, 0)
    return createPresidentCard(obj, housingStart[0], housingEnd[0]);
});

const presidentContent = document.querySelector('.president-content');
presidentContent.innerHTML = cards.join("");
const currentContent = document.querySelector('.current-data');
currentContent.innerHTML = createCurrentPresidentCard(reElectionTerms[reElectionTerms.length - 1]);
const startTable = document.querySelector('.starts-table tbody');
startTable.innerHTML = startsRow.join("");

function createCurrentPresidentCard(obj) {
    const testDateStart = formatMonthDate(obj.startDate);
    const housingStart = getStartsByDate(testDateStart)[0];
    const housingNow = data[data.length - 1];
    const img = obj.imgPage;
    const termPresident = obj.president;
    const startsDiff = housingNow.starts - housingStart.starts;
    const text = startsDiff >= 0 ? "higher" : "lower";
    const winLose = startsDiff >= 0 ? "WIN" : "LOSE";
    const electionYr = obj.electionDate.getFullYear()

    return `
        <p>
            Monthly housing starts are <span class='fade-in'>${commaSeparateNumber(startsDiff.toFixed(0))}</span> ${text} than when the president entered office
        </p>
        <div>
            <img src="/images/${img}">
            <h2>
                ${termPresident}
            </h2>
        </div>
        <p>
            is predicted to <span class='fade-in'>${winLose}</span> the ${electionYr} election.
        </p>
    `
}
   
function createPresidentCard(obj, housingStart, housingEnd) {
    const startDate = formatFullDate(obj.startDate);
    const endDate = formatFullDate(obj.electionDate);
    const termPresident = obj.president;
    const electionYear = obj.electionDate.getFullYear();
    const lastName = termPresident.split(" ").pop()
    const wonLost = obj.electoralVote > obj.opponentVote ? 'won' : 'lost';
    const high = obj.electoralVote > obj.opponentVote ? obj.electoralVote : obj.opponentVote;
    const low = obj.electoralVote < obj.opponentVote ? obj.electoralVote : obj.opponentVote;
    const img = obj.imgPage;
    const startsDiff = housingEnd.starts - housingStart.starts;
    const symbol = startsDiff >= 0 ? "+" : "";
    const diffColor = startsDiff >= 0 ? "green" : "red";
    const resultString = `President ${lastName} <span class='results-bold ${diffColor}'>${wonLost}</span> ${electionYear} election <span class='results-bold'>${high}</span> to <span class='results-bold'>${low}</span>.`

   return  `<div class="president-card">
        <div class="president-card-info">
            <div class="president-term">
                <div>
                    ${startDate}
                </div>
                <div>
                    to
                </div>
                <div>
                    ${endDate}
                </div>
            </div>
            <div class="president-data">
                <div class="president-name-wrapper">
                    <div class="president-img">
                        <img src="/images/${img}">
                    </div>
                    <div class="president-name">
                        ${termPresident}
                    </div>
                </div>
            </div>
        </div>
        <div class="president-starts-results">
            <table class="results-table">
                <tbody>
                    <tr>
                        <td>Housing Starts At Month Start</td>
                        <td>${commaSeparateNumber(housingStart.starts.toFixed(0))}</td>
                    </tr>
                    <tr>
                        <td>Housing Starts At Month End</td>
                        <td>${commaSeparateNumber(housingEnd.starts.toFixed(0))}</td>
                    </tr>
                    <tr>
                        <td>Difference</td>
                        <td class="results-difference ${diffColor}">${symbol}${commaSeparateNumber(startsDiff)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="president-election-results">
            <div>
               ${resultString}
            </div>
        </div>
    </div>`;
}

//Helpers
function monthname(index) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[index];
} 
function formatMonthDate(date) {
    const startMn = date.getMonth();
    const startYr = date.getFullYear();
    return new Date(startYr, startMn, 1);
}
function formatFullDate(date) {
    var day = date.getDate();
    var mon = monthname(date.getMonth());
    var yr = date.getFullYear();
    return `${mon} ${day}, ${yr}`; 
}
function testDateEquality(dateOne, dateTwo) {
    if(dateOne.getTime() === dateTwo.getTime()) {
        return true;
    }
    return false;
}
function commaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
}
function parseDateString(str) {
    var arr = str.split('-').map(item => parseInt(item, 10));
    arr[1] = arr[1] - 1;
    return arr;
}