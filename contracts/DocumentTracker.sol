// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title DocumentTracker
 * @dev Contrat pour suivre les actions effectuées sur les documents bancaires
 */
contract DocumentTracker {
    enum ActionType { UPLOAD, DOWNLOAD, DELETE, VIEW }
    
    struct DocumentAction {
        string documentId;     
        ActionType actionType; 
        string documentHash;   
        uint256 timestamp;     
        address actor;         
    }
    
    mapping(string => DocumentAction[]) private documentActions;
    string[] private allDocumentIds;
    
    mapping(string => bool) private _documentExists;
    
    event ActionRecorded(
        string documentId,
        uint8 actionType,
        string documentHash,
        uint256 timestamp,
        address actor
    );
    
    /**
     * @dev Enregistre une action sur un document
     * @param _documentId Identifiant du document
     * @param _actionType Type d'action (0=Upload, 1=Download, 2=Delete, 3=View)
     * @param _documentHash Hash du document
     */
    function recordAction(
        string memory _documentId,
        ActionType _actionType,
        string memory _documentHash
    ) external {
        // Création de l'objet d'action
        DocumentAction memory newAction = DocumentAction({
            documentId: _documentId,
            actionType: _actionType,
            documentHash: _documentHash,
            timestamp: block.timestamp,
            actor: msg.sender
        });
        
        // Ajout de l'action à l'historique du document
        documentActions[_documentId].push(newAction);
        
        // Si c'est un nouveau document, ajoutez-le à la liste
        if (!_documentExists[_documentId]) {
            allDocumentIds.push(_documentId);
            _documentExists[_documentId] = true;
        }
        
        // Émission de l'événement pour notification
        emit ActionRecorded(
            _documentId,
            uint8(_actionType),
            _documentHash,
            newAction.timestamp,
            newAction.actor
        );
    }
    
    /**
    * @dev Récupère l'historique des actions pour un document spécifique
    * @param _documentId Identifiant du document
    * @return actionTypes Tableau des types d'actions effectuées
    * @return documentHashes Tableau des hash des documents
    * @return timestamps Tableau des horodatages des actions
    * @return actors Tableau des adresses ayant effectué les actions
    */
    function getDocumentHistory(string memory _documentId) external view 
        returns (
            ActionType[] memory actionTypes,
            string[] memory documentHashes,
            uint256[] memory timestamps,
            address[] memory actors
        ) 
    {
        DocumentAction[] memory actions = documentActions[_documentId];
        uint256 length = actions.length;
        
        documentHashes = new string[](length);
        actionTypes = new ActionType[](length);
        timestamps = new uint256[](length);
        actors = new address[](length);
        
        for (uint256 i = 0; i < length; i++) {
            actionTypes[i] = actions[i].actionType;
            documentHashes[i] = actions[i].documentHash;
            timestamps[i] = actions[i].timestamp;
            actors[i] = actions[i].actor;
        }
        
        return (actionTypes, documentHashes, timestamps, actors);
    }
    
    /**
     * @dev Récupère tous les IDs de documents enregistrés
     * @return Liste des IDs de documents
     */
    function getAllDocumentIds() external view returns (string[] memory) {
        return allDocumentIds;
    }
    
    /**
     * @dev Vérifie si un document existe
     * @param _documentId Identifiant du document
     * @return true si le document existe, false sinon
     */
    function documentExistsCheck(string memory _documentId) external view returns (bool) {
        return _documentExists[_documentId];
    }
}