// const hre = require("hardhat");

// async function main() {
//   const ReportStorage = await hre.ethers.getContractFactory("ReportStorage");
//   const reportStorage = await ReportStorage.deploy();

//   console.log("ReportStorage deployed to:");
//   console.log(reportStorage)

// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

// const hre = require("hardhat");

// async function main() {
//   console.log("Déploiement du contrat DocumentTracker...");

//   // Déploiement du contrat
//   const DocumentTracker = await hre.ethers.getContractFactory("DocumentTracker");
//   const documentTracker = await DocumentTracker.deploy();

//   await documentTracker.waitForDeployment();
  
//   const address = await documentTracker.getAddress();
//   console.log(`DocumentTracker déployé à l'adresse: ${address}`);
// }

// // Exécution du script
// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("Déploiement du contrat DocumentTracker...");

  // Déploiement du contrat
  const DocumentTracker = await hre.ethers.getContractFactory("DocumentTracker");
  const documentTracker = await DocumentTracker.deploy();

  await documentTracker.waitForDeployment();
  
  const address = await documentTracker.getAddress();
  console.log(`DocumentTracker déployé à l'adresse: ${address}`);

  // Sauvegarder l'adresse du contrat dans un fichier pour une utilisation ultérieure
  const deploymentInfo = {
    network: hre.network.name,
    contractAddress: address,
    deploymentTime: new Date().toISOString()
  };

  // Créer le répertoire si nécessaire
  const deploymentDir = path.join(__dirname, "../deployment");
  if (!fs.existsSync(deploymentDir)) {
    fs.mkdirSync(deploymentDir, { recursive: true });
  }

  // Écrire les informations dans un fichier
  fs.writeFileSync(
    path.join(deploymentDir, `${hre.network.name}-address.json`),
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log(`Informations de déploiement sauvegardées dans ${hre.network.name}-address.json`);
}

// Exécution du script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });