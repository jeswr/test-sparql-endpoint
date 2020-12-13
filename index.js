const { SparqlEndpointFetcher } = require('fetch-sparql-endpoint');
const { queries, endpoint } = require('./test.json')
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const results = [];

(async () => {
  for (const query of queries) {
    const f = new SparqlEndpointFetcher();
    console.log(`Testing ${query.description} (${query.query})`);
    try {
      const url = endpoint + '?query=' + encodeURIComponent(query.query);
      const start = Date.now();
      const res = await fetch(url);
      const end = Date.now();
      const resJson = await res.json();
      results.push({
        query: query.query,
        description: query.description,
        time: end - start,
        '#results': resJson.results.bindings.length
      })
    } catch (e) {
      console.log(e)
      results.push({
        query: query.query,
        description: query.description,
        time: "NA (Testing Error)",
        '#results': "NA (Testing Error)"
      })
    }

  }

  fs.writeFileSync(path.join(__dirname, 'results' + Date.now().toString() + '.json'), JSON.stringify({
    endpoint,
    results
  }, null, 2));
})();