// Import necessary modules
import fs from 'fs';
import { parse } from 'json2csv';
import { ArgumentParser } from 'argparse';

// Initialize argument parser
const parser = new ArgumentParser({
    description: 'Data Generator'
});

// Define command line arguments
parser.add_argument('--format', { choices: ['json', 'csv', 'both'], required: true });
parser.add_argument('--count', { type: 'int', required: true });

// Parse arguments
const args = parser.parse_args();

// Validate count argument
if (args.count < 0) {
    console.error('Count must be a non-negative integer.');
    process.exit(1);
}

// Instance RNG for deterministic output
const rng = new Math.seedrandom();

// Function to generate data
function generateData(count) {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push({ id: i, value: rng() });
    }
    return data;
}

// Function to write JSON and CSV files
function writeFiles(data) {
    if (args.format === 'json' || args.format === 'both') {
        fs.writeFileSync('output.json', JSON.stringify(data, null, 2));
    }
    if (args.format === 'csv' || args.format === 'both') {
        const csv = parse(data);
        fs.writeFileSync('output.csv', csv);
    }
}

// Main execution
const data = generateData(args.count);
writeFiles(data);
