function randomInt(a, b) {
  return Math.floor(a + Math.random() * (b - a));
}

function randomChoice(list) {
  const id = randomInt(0, list.length);
  return list[id];
}

function isEqual(a, b) {
  if (a instanceof Array && b instanceof Array) {
    if (a.length != b.length)
      return false;
    for (let i = 0; i < a.length; ++i)
      if (a[i] !== b[i])
        return false;
    return true;
  }
  return a === b;
}