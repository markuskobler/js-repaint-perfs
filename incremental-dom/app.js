var elementOpen = IncrementalDOM.elementOpen;
var elementClose = IncrementalDOM.elementClose;
var elementVoid = IncrementalDOM.elementVoid;
var text = IncrementalDOM.text;
var patch = IncrementalDOM.patch;

var TABLE_STATICS = ['class', 'table table-striped latest-data'];
var DBNAME_STATICS = ['class', 'dbname'];
var QC_STATICS = ['class', 'query-count'];
var POPOVER_STATICS = ['class', 'popover left'];
var POPOVER_CONTENT_STATICS = ['class', 'popover-content'];
var POPOVER_ARROW_STATICS = ['class', 'arrow'];

function render(dbs) {
  elementOpen('table', null, TABLE_STATICS);
    elementOpen('tbody');
    for (var i = 0; i < dbs.length; i++) {
      var db = dbs[i];
      var lastSample = db.lastSample;
      var topFiveQueries = lastSample.topFiveQueries;

      elementOpen('tr', db.id);

        // name
        elementOpen('td', null, DBNAME_STATICS);
          text(db.dbname);
        elementClose('td');

        // count
        elementOpen('td', null, QC_STATICS);
          elementOpen('span', null, null, 'class', lastSample.countClassName);
            text(lastSample.queries.length);
          elementClose('span');
        elementClose('td');

        // queries
        for (var j = 0; j < topFiveQueries.length; j++) {
          var q = topFiveQueries[j];

          elementOpen('td', null, null, 'class', 'Query ' + q.elapsedClassName);
            text(q.formatElapsed);

            elementOpen('div', null, POPOVER_STATICS);
              elementOpen('div', null, POPOVER_CONTENT_STATICS);
                text(q.query);
              elementClose('div');

              elementVoid('div', null, POPOVER_ARROW_STATICS);
            elementClose('div');

          elementClose('td');
        }
      elementClose('tr');
    }
    elementClose('tbody');
  elementClose('table');
}

var el = document.getElementById('dbmon');
function update() {
    patch(el, render, ENV.generateData().toArray());
    Monitoring.renderRate.ping();
    setTimeout(update, ENV.timeout);
}

update();
