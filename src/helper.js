// Check if string starts OR ends with *
export function checkHeading(str) {
  return /^\*.*\*$/.test(str.trim());
}

// Remove * from start and end
export function replaceHeadingStars(str) {
  return str.trim().replace(/^\*+|\*+$/g, '');
}