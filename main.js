const fs = require('fs');
const { Transform } = require('stream');

// Input and output file paths
const inputFilePath = 'input.txt';
const outputFilePath = 'output.txt';

// Create a read stream for the input file
const readStream = fs.createReadStream(inputFilePath, { encoding: 'utf8' });

// Create a write stream for the output file
const writeStream = fs.createWriteStream(outputFilePath);

// Define a transform stream for processing data
const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        // Convert chunk to string if it's a Buffer
        const chunkString = Buffer.isBuffer(chunk) ? chunk.toString('utf8') : chunk;
        
        // Process the data chunk (convert to uppercase)
        const processedChunk = chunkString.toUpperCase();
        
        // Pass the processed data to the next step in the pipeline
        callback(null, processedChunk);
    }
});

// Set up the pipeline: read -> transform -> write
readStream
    .pipe(transformStream)
    .pipe(writeStream)
    .on('finish', () => {
        console.log('Data processing completed and written to output.txt');
    })
    .on('error', (err) => {
        console.error('Error during processing:', err);
    });