import axios from 'axios';

export const getMaintainerTrust = async (pkg: string): Promise<number> => {
  try {
    const response = await axios.get(`https://api.npms.io/v2/package/${pkg}`);
    const { collected } = response.data as { collected: { github: { starsCount: number, forksCount: number, issues: { openCount: number }, contributorsCount: number }, metadata: { date: string } } };

    // Example criteria for calculating the trust score
    const stars = collected.github.starsCount || 0;
    const forks = collected.github.forksCount || 0;
    const issues = collected.github.issues.openCount || 0;
    const contributors = collected.github.contributorsCount || 0;
    const updated = new Date(collected.metadata.date).getTime();
    const now = Date.now();
    const daysSinceUpdate = (now - updated) / (1000 * 60 * 60 * 24);

    // Calculate a score based on the criteria
    let score = 0;
    score += stars / 100; // 1 point for every 100 stars
    score += forks / 50; // 1 point for every 50 forks
    score += contributors / 10; // 1 point for every 10 contributors
    score -= issues / 20; // -1 point for every 20 open issues
    score -= daysSinceUpdate / 30; // -1 point for every 30 days without an update

    // Limit the score between 0 and 10
    score = Math.max(0, Math.min(10, score));

    return score;
  } catch (error) {
    console.error(`Error retrieving information for package ${pkg}:`, error);
    return 0; // Return a score of 0 in case of error
  }
};