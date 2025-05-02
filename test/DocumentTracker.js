const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DocumentTracker", function () {
  let documentTracker;
  let owner;
  let user;
  
  // Configuration initiale avant chaque test
  beforeEach(async function () {
    // Récupération des signers pour les tests
    [owner, user] = await ethers.getSigners();
    
    // Déploiement du contrat
    const DocumentTracker = await ethers.getContractFactory("DocumentTracker");
    documentTracker = await DocumentTracker.deploy();
  });

  it("Devrait enregistrer une action d'upload", async function () {
    const documentId = "doc123";
    const documentHash = "0x123456789abcdef";
    const metadata = "Contrat bancaire personnel";
    
    // Enregistrement d'une action d'upload
    await documentTracker.recordAction(
      documentId,
      0, // UPLOAD
      documentHash,
      metadata
    );
    
    // Vérification que l'historique contient l'action
    const history = await documentTracker.getDocumentHistory(documentId);
    
    expect(history.actionTypes[0]).to.equal(0); // ActionType.UPLOAD
    expect(history.documentHashes[0]).to.equal(documentHash);
    expect(history.actors[0]).to.equal(owner.address);
    expect(history.metadatas[0]).to.equal(metadata);
  });

  it("Devrait enregistrer plusieurs actions pour un même document", async function () {
    const documentId = "doc456";
    const uploadHash = "0xabcdef123456";
    const updateHash = "0xfedcba654321";
    
    // Enregistrement d'actions successives
    await documentTracker.recordAction(
      documentId,
      0, // UPLOAD
      uploadHash,
      "Version initiale"
    );
    
    await documentTracker.recordAction(
      documentId,
      1, // UPDATE
      updateHash,
      "Version mise à jour"
    );
    
    // Vérification de l'historique
    const history = await documentTracker.getDocumentHistory(documentId);
    
    expect(history.actionTypes.length).to.equal(2);
    expect(history.actionTypes[0]).to.equal(0); // UPLOAD
    expect(history.actionTypes[1]).to.equal(1); // UPDATE
    expect(history.documentHashes[0]).to.equal(uploadHash);
    expect(history.documentHashes[1]).to.equal(updateHash);
  });

  it("Devrait permettre à différents utilisateurs d'effectuer des actions", async function () {
    const documentId = "doc789";
    
    // Propriétaire fait un upload
    await documentTracker.recordAction(
      documentId,
      0, // UPLOAD
      "0xowner123",
      "Upload par propriétaire"
    );
    
    // Utilisateur fait une mise à jour
    await documentTracker.connect(user).recordAction(
      documentId,
      1, // UPDATE
      "0xuser456",
      "Mise à jour par utilisateur"
    );
    
    // Vérification que les actions sont enregistrées avec les bons acteurs
    const history = await documentTracker.getDocumentHistory(documentId);
    
    expect(history.actors[0]).to.equal(owner.address);
    expect(history.actors[1]).to.equal(user.address);
  });

  it("Devrait récupérer tous les IDs de documents", async function () {
    // Ajout de plusieurs documents
    await documentTracker.recordAction("doc1", 0, "0x1", "");
    await documentTracker.recordAction("doc2", 0, "0x2", "");
    await documentTracker.recordAction("doc3", 0, "0x3", "");
    
    // Récupération de tous les IDs
    const allIds = await documentTracker.getAllDocumentIds();
    
    expect(allIds.length).to.equal(3);
    expect(allIds).to.include("doc1");
    expect(allIds).to.include("doc2");
    expect(allIds).to.include("doc3");
  });
});