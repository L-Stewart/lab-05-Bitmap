'use strict';

const fs = require('fs');

/**
 * Bitmap -- receives a file name, used in the transformer to note the new buffer
 * @param filePath
 * @constructor
 */
function Bitmap(filePath) {
  this.file = filePath;
}

/**
 * Parser -- accepts a buffer and will parse through it, according to the specification, creating object properties for each segment of the file
 * @param buffer
 */
Bitmap.prototype.parse = function(buffer) {
  this.buffer = buffer;
  this.type = buffer.toString('utf-8', 0, 2); // Lorin - Defining file type -- Ours is BM
  this.height = buffer.readInt32LE(22); // Lorin - This is 125 for baldy.bmp
  this.width = buffer.readInt32LE(18); // Lorin - This is 110 for baldy.bmp
  this.rasterSize = buffer.readInt32LE(34); // Lorin - This is 14000 for baldy.bmp
  this.fileSize = buffer.readInt32LE(2); // Lorin - This is 15146 for baldy.bmp
  this.fileHeader = buffer.readInt32LE(14); // Lorin - 'BITMAPINFOHEADER SIZE' 108
  this.bitsPerPixel = buffer.readInt16LE(28); // Erin - bits per pixle 8
  this.offset = buffer.readInt32LE(10);
  this.colorArray = buffer.slice(54, this.offset); // Lorin - The entire color array
  this.pixelArray = buffer.slice(54); // Lorin - the entire array off pixels that make up the picture
  //... and so on
};

/**
 * Transform a bitmap using some set of rules. The operation points to some function, which will operate on a bitmap instance
 * @param operation
 */
Bitmap.prototype.transform = function(operation) {
  // This is really assumptive and unsafe
  transforms[operation](this);
  this.newFile = this.file.replace(/\.bmp/, `.${operation}.bmp`);
};

/**
 * Sample Transformer (greyscale)
 * Would be called by Bitmap.transform('greyscale')
 * Pro Tip: Use "pass by reference" to alter the bitmap's buffer in place so you don't have to pass it around ...
 * @param bmp
 */
const transformGreyscale = (bmp) => {

  console.log('Transforming bitmap into greyscale', bmp);

  //TODO: Figure out a way to validate that the bmp instance is actually valid before trying to transform it

  //TODO: alter bmp to make the image greyscale ...

};

const doTheInversion = (bmp) => {
  bmp = {};
}

/**
 * A dictionary of transformations
 * Each property represents a transformation that someone could enter on the command line and then a function that would be called on the bitmap to do this job
 */
const transforms = {
  greyscale: transformGreyscale,
  invert: doTheInversion
};

// ------------------ GET TO WORK ------------------- //

function transformWithCallbacks() {

  fs.readFile(`${__dirname}/assets/baldy.bmp`, (err, buffer) => {

    if (err) {
      throw err;
    }

    bitmap.parse(buffer);

    bitmap.transform(operation);

    // Note that this has to be nested!
    // Also, it uses the bitmap's instance properties for the name and thew new buffer
    fs.writeFile(bitmap.newFile, bitmap.buffer, (err, out) => {
      if (err) {
        throw err;
      }
      console.log(`Bitmap Transformed: ${bitmap.newFile}`);
    });

  });
}

// TODO: Explain how this works (in your README)
const [file, operation] = process.argv.slice(2);

let bitmap = new Bitmap(file);

transformWithCallbacks();

