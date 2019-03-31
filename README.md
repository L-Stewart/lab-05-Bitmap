# Bitmap Transformer

[![Build Status]]

Group Authors: Connor Sihon

This is a command line application that transforms .bmp files.

## How To Use:

* You can run one of three transforms on the baldy.bmp asset.
* There are three options of transforms you can run:
1. `node index.js /assets/baldy.bmp goldenState`
2. `node index.js /assets/baldy.bmp randomize`
3. `node index.js /assets/baldy.bmp pinky`
4. `node index.js baldy.bmp blueman.bmp doTheInversion`
5. `node index.js /assets/baldy.bmp transformGreyscale`

by running these command line invocations within the lab-05-bitmap/lib/ folder, node will parse the invocation and our file will will set the filepath and desired operation by using process.argv.slice()


Once you have run a transform method, you can look inside the assets folder inside of __tests__ and view the output.