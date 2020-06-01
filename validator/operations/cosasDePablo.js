
const capacity = { "max": 10000, "period": "secondly" };

function jslog(o) { console.log(JSON.stringify(o, null, 2)); }

function normalizedPeriod(p) {
    switch (p) {
    case "secondly": return 1;
    case "minutely": return 60;
    case "hourly": return (60 * 60);
    case "dayly": return (60 * 60 * 24);
    case "weekly": return (60 * 60 * 24 * 7);
    case "monthly": return (60 * 60 * 24 * 7 * 4);
    }
}

//Percentage of Usage
function PU(limit) {
    return limit.max / capacity.max;
}

var limits = [
    { "max": 100, "period": "weekly" },
    { "max": 10, "period": "dayly" },
    { "max": 1, "period": "minutely" },

];

jslog(limits);

jslog(consistent(limits[0], limits[1]));

function consistent(l1, l2) {

    console.log(l1.max + "," + PU(l1) + "," + l2.max + "," + PU(l2));


    if (normalizedPeriod(l1.period) > normalizedPeriod(l2.period)) {
        console.log(PU(l1) + ">" + PU(l2));
        return PU(l1) > PU(l2);

    } else {
        console.log(PU(l1) + "<" + PU(l2));
        return PU(l1) < PU(l2);
    }
}


function pairCombinations(array) {
    var pairs = [];

    for (let i = 0; i < array.length - 1; i++) {
        for (let j = i + 1; j < array.length; j++) {
            pairs.push([array[i], array[j]]);
        }
    }

    return pairs;

}

jslog(pairCombinations(limits));

var result = pairCombinations(limits).reduce((c, pair) => {
    return c && consistent(pair[0], pair[1]);
}, true);

jslog(result);