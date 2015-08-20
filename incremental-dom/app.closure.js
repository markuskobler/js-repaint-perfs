import {
  elementOpen,
  elementClose,
  elementVoid,
  text,
  patch
} from './idom/index'

function render(dbs) {
  elementOpen('table', null, ['class', 'table table-striped latest-data']);
    elementOpen('tbody');
    for (var i = 0; i < dbs.length; i++) {
      var db = dbs[i];
      var lastSample = db['lastSample'];
      var topFiveQueries = lastSample['topFiveQueries'];

      elementOpen('tr', db['id']);

        // name
        elementOpen('td', null, ['class', 'dbname']);
          text(db['dbname']);
        elementClose('td');

        // count
        elementOpen('td', null, ['class', 'query-count']);
          elementOpen('span', null, null, 'class', lastSample['countClassName']);
            text(lastSample['queries'].length);
          elementClose('span');
        elementClose('td');

        // queries
        for (var j = 0; j < topFiveQueries.length; j++) {
          var q = topFiveQueries[j];

          elementOpen('td', null, null, 'class', 'Query ' + q['elapsedClassName']);
            text(q['formatElapsed']);

            elementOpen('div', null, ['class', 'popover left']);
              elementOpen('div', null, ['class', 'popover-content']);
                text(q['query']);
              elementClose('div');

              elementVoid('div', null, ['class', 'arrow']);
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
