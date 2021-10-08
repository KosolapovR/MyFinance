async function sleep(ms: number = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default sleep;
