import fs from 'fs';
import path from 'path';
import { getMaintainerTrust } from '../utils/getMaintainerTrust';
import { getVulnerabilityScore } from '../utils/getVulnerabilityScore';

interface CheckResult {
  safe: boolean;
  details: {
    vulnerabilityScore: number;
    maintainerScore: number;
  };
}

/**
 * Checks the security of a dependency using vulnerability and maintainer trust scores.
 * @param pkg - The name of the package to check.
 * @returns An object containing the scores and a safety indicator.
 */
const checkDependency = async (pkg: string): Promise<CheckResult> => {
  const vulnerabilityScore = await getVulnerabilityScore(pkg);
  const maintainerScore = await getMaintainerTrust(pkg);

  return {
    safe: vulnerabilityScore < 7 && maintainerScore > 8,
    details: { vulnerabilityScore, maintainerScore }
  };
};

/**
 * Checks the security of all dependencies listed in the package.json file.
 */
const checkDependencies = async (): Promise<void> => {
  const packageJsonPath = path.resolve(__dirname, '../package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  const dependencies = Object.keys(packageJson.dependencies || {}).concat(Object.keys(packageJson.devDependencies || {}));

  for (const pkg of dependencies) {
    const result = await checkDependency(pkg);
    if (!result.safe) {
      console.error(`La dépendance ${pkg} n'est pas sûre :`, result.details);
      process.exit(1);
    }
  }
  console.log('Toutes les dépendances sont sûres.');
};

checkDependencies();