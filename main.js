'use strict';

// We are using fs to build a buffer for the Bitmap
const parseBitmap = buffer => {
  const WIDTH_OFFSET = 18;
//  If i use naked numbers in my code they are "magic numbers" as you need to be a wizard to understand them

  const bitmapWidth = buffer.readInt32LE(WIDTH_OFFSET);

};
