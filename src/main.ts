const UPPERS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const LOWERS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const SPACES = [" ", "\n", "\t"];
const SYMBOLS = [
  "!",
  '"',
  "#",
  "$",
  "%",
  "&",
  "'",
  "(",
  ")",
  "*",
  "+",
  ",",
  "-",
  ".",
  "/",
  ":",
  ";",
  "<",
  "=",
  ">",
  "?",
  "@",
  "[",
  "\\",
  "]",
  "^",
  "`",
  "{",
  "|",
  "}",
  "~",
];
const ALL = [...UPPERS, ...LOWERS, ...DIGITS, " ", ...SYMBOLS, "_"];

const CLASSES = {
  d: DIGITS,
  D: [...UPPERS, ...LOWERS, ...SPACES, ...SYMBOLS, "_"],
  w: [...UPPERS, ...LOWERS, ...DIGITS, "_"],
  W: [...SPACES, ...SYMBOLS],
  t: ["\t"],
  n: ["\n"],
  v: ["\u000B"],
  f: ["\u000C"],
  r: ["\r"],
  s: SPACES,
  S: [...UPPERS, ...LOWERS, ...DIGITS, ...SYMBOLS, "_"],
  "0": ["\0"],
};

const REPETITION_TOKEN = ["*", "+", "?", "{"];

const getRandom = (min: number, max: number) => {
  const random = Math.floor(Math.random() * (max + 1 - min)) + min;

  return random;
};

const getRandomChar = (str: string): string => {
  const randomIndex = getRandom(0, str.length - 1);
  return str[randomIndex];
};

const isUpperCase = (char: string) => {
  if (char.length > 1) {
    return "error";
  }
  return /^[A-Z]$/.test(char);
};
const isLowerCase = (char: string) => {
  if (char.length > 1) {
    return "error";
  }
  return /^[a-z]$/.test(char);
};

const isAllUpperCase = (...chars: string[]) => {
  for (const char of chars) {
    if (isUpperCase(char)) {
      continue;
    }

    return false;
  }

  return true;
};
const isAllLowerCase = (...chars: string[]) => {
  for (const char of chars) {
    if (isLowerCase(char)) {
      continue;
    }

    return false;
  }

  return true;
};

export const getAlphabetBetween = (left: string, right: string) => {
  if (left.length > 1 || right.length > 1) {
    return "error";
  }

  if (isAllUpperCase(left, right)) {
    const leftIndex = UPPERS.indexOf(left);
    const rightIndex = UPPERS.indexOf(right);

    if (rightIndex - leftIndex < 0) {
      return "error";
    }

    return UPPERS[getRandom(leftIndex, rightIndex)];
  }

  if (isAllLowerCase(left, right)) {
    const leftIndex = LOWERS.indexOf(left);
    const rightIndex = LOWERS.indexOf(right);

    if (rightIndex - leftIndex < 0) {
      return "error";
    }

    return LOWERS[getRandom(leftIndex, rightIndex)];
  }

  return "error";
};

export const replaceRefExp = (char: string) => {
  if (char === "*") {
    const count = getRandom(0, 64)

    return getRandomChar(ALL.join("")).repeat(count)
  }

  return char;
}

export const factory = (pattern: RegExp) => {
  const sources = pattern.source.split("");
  let output = "";
  let bracket = false;

  let stack = "";
  for (const source of sources) {
    if (!bracket && source === "[") {
      bracket = true;
      continue
    }

    if (bracket && source === "]") {
      bracket = false;
      output = output + getRandomChar(stack)
      continue
    }

    if (bracket) {
      stack = stack + replaceRefExp(source);
      continue
    }

    if (!bracket) {
      output = output + replaceRefExp(source);
      continue;
    }
  }

  console.log(output)

  return output;
};
