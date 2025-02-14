
// TODO : implement the getMaintainerTrust function to get the maintainer trust score
// import fs from 'fs';
// import path from 'path';
// import snyk from 'snyk';

interface Vulnerability {
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface SnykTestResult {
  vulnerabilities?: Vulnerability[];
}

// const getVulnerabilityScore = async (pkg: string): Promise<number> => {
//   try {
//     const result: SnykTestResult = await snyk.test(pkg);
//     const vulnerabilities: Vulnerability[] = result.vulnerabilities || [];
//     const highestSeverity = vulnerabilities.reduce((max, vuln) => {
//       const severityScore = {
//         low: 1,
//         medium: 4,
//         high: 7,
//         critical: 10
//       }[vuln.severity] || 0;
//       return Math.max(max, severityScore);
//     }, 0);
//     return highestSeverity;
//   } catch (error) {
//     console.error(`Erreur lors de la vérification des vulnérabilités pour ${pkg}:`, error);
//     return 10; // Considérer comme critique en cas d'erreur
//   }
// };

const getMaintainerTrust = async (pkg: string): Promise<number> => {
  // Implement the logic to get the maintainer trust score
  // For example, by using a security API
  // For this example, we will simulate a random score
  return Math.random() * 10; // Example of a random score
};

// const checkDependency = async (pkg: string) => {
//   const vulnerabilityScore = await getVulnerabilityScore(pkg);
//   const maintainerScore = await getMaintainerTrust(pkg);

//   return {
//     safe: vulnerabilityScore < 7 && maintainerScore > 8,
//     details: { vulnerabilityScore, maintainerScore }
//   };
// };

// const checkDependencies = async () => {
//   const packageJsonPath = path.resolve(__dirname, '../package.json');
//   const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
//   const dependencies = Object.keys(packageJson.dependencies || {}).concat(Object.keys(packageJson.devDependencies || {}));

//   for (const pkg of dependencies) {
//     const result = await checkDependency(pkg);
//     if (!result.safe) {
//       console.error(`La dépendance ${pkg} n'est pas sûre :`, result.details);
//       process.exit(1);
//     }
//   }
//   console.log('Toutes les dépendances sont sûres.');
// };

// checkDependencies();