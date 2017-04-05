const fallCollection = require('./data/fall.json');
const raiseCollection = require('./data/raise.json');

const Analyse = {
    hasStarted: false,
    data: null,
    averageFallPosition: 0,
    averageRaisePosition: 0,
    init() {
      console.log('Fall');
        this.averageFallPosition = this.getAveragePosition(fallCollection);

        this.averageFallDownCounts = this.getAverageInCollection(fallCollection,'numberOfHistoricDowns',10);
        this.averageFallUpCounts = this.getAverageInCollection(fallCollection,'numberOfHistoricUps',10);
      console.log('\n\nRaise');
        this.averageRaisePosition = this.getAveragePosition(raiseCollection);
         this.averageFallDownCounts = this.getAverageInCollection(raiseCollection,'numberOfHistoricDowns',10);
        this.averageFallUpCounts = this.getAverageInCollection(raiseCollection,'numberOfHistoricUps',10);
    },
    start(_data) {
        if (this.hasStarted) return;
        this.hasStarted = true;
        this.data = _data;
        this.compare('down,up,down,up');
        this.hasStarted = false;
    },
    getAveragePosition(collection) {
       this.getAverageInCollection(collection,'startPricePosition');
    },
    getAverageInCollection(collection,key,lengthIncrement){
       let total = 0;
        collection.forEach(function(item) {
            total += Number(item[key]);
        });
        let len = (lengthIncrement ? collection.length * lengthIncrement: collection.length);
        console.log(len, collection.length,total);
        let average = total /  len; 
        console.log(key,average);
        return average;
    },
    compare(str) {
        this.data.fall.forEach(function(item) {
            console.log(str);
            let historicDirections = item.historicDirections.toString();
            console.log(this.levenshtein(str, historicDirections));
        }.bind(this));
    },
    levenshtein(a, b) {
        if (a.length == 0) return b.length;
        if (b.length == 0) return a.length;

        // swap to save some memory O(min(a,b)) instead of O(a)
        if (a.length > b.length) {
            var tmp = a;
            a = b;
            b = tmp;
        }

        var row = [];
        // init the row
        for (var i = 0; i <= a.length; i++) {
            row[i] = i;
        }

        // fill in the rest
        for (var i = 1; i <= b.length; i++) {
            var prev = i;
            for (var j = 1; j <= a.length; j++) {
                var val;
                if (b.charAt(i - 1) == a.charAt(j - 1)) {
                    val = row[j - 1]; // match
                } else {
                    val = Math.min(row[j - 1] + 1, // substitution
                        prev + 1, // insertion
                        row[j] + 1); // deletion
                }
                row[j - 1] = prev;
                prev = val;
            }
            row[a.length] = prev;
        }

        return row[a.length];
    }
}
Analyse.init();
module.exports = Analyse;