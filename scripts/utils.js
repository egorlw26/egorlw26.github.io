function randomInt(a, b) {
  return Math.floor(a + Math.random() * (b - a));
}

function randomChoice(list) {
  const id = randomInt(0, list.length);
  return list[id];
}