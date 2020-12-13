# test-sparql-endpoint
Gets basic test statistics for a SPARQL endpoint.

# Usage
Modify `test.json` to contain the endpoint and queries you want to test.

Run `npm install` and then `node index.js` to run the test queries and get timing/count statisitcs. 

This only supports statistics for `SELECT` queries.
