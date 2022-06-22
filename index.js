import Client, { HTTP } from 'drand-client';
import fetch from 'node-fetch';
import AbortController from 'abort-controller';
import seedrandom from 'seedrandom';

global.fetch = fetch;
global.AbortController = AbortController;

const chainHash = '8990e7a9aaed2ffed73dbd7092123d6f289930540d7651336225dc172e51b2ce';
const urls = ['https://api.drand.sh'];
const options = { chainHash };

// Start client
const client = await Client.wrap(HTTP.forURLs(urls, chainHash), options);

// Get current round
const currentRound = client.roundAt(Date.now());

// Get randomness for current round
const result = await client.get(currentRound);

// Extract randomness
const randomness = result?.randomness;
if (!randomness) throw new Error('Could not get randomness');

// Generate random number with extracted randomness
const prng = seedrandom(randomness, { entropy: true });
const randomNumber = prng();

console.log(randomNumber);
process.exit();
