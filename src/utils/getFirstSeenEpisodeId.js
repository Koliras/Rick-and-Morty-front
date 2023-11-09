export const getFirstSeenEpisodeId = (character) => {
  const epUrlParts = character.episode[0].split('/');

  return +epUrlParts[epUrlParts.length - 1];
}
