export default function getHash(str: string): string {
  var hash: number = 0,
    chr;
  if (str.length === 0) return hash.toString();

  if (str.substr(str.length - 1) !== "/") {
    str += "/";
  }

  for (var i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString();
}
