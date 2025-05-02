# Tatweer-Blockchain (ReportStorage Contract)

This is a simple Solidity smart contract for storing and retrieving reports on the Ethereum blockchain that we've integrated with our solution in Tatweer Event as we need a secure and publuc non changable place to store our reports. It allows users to add reports with a timestamp and content, and retrieve reports by their ID. The contract emits events whenever a report is added.

## Hosted Contract

The contract is deployed at the following address:

- **Contract Address**: [0x98e9EF3E3EA80Dd570861201da4EA8B6C8871819](https://sepolia.etherscan.io/address/0x98e9EF3E3EA80Dd570861201da4EA8B6C8871819)

## Features

- **Add Report**: Allows users to add a new report with a timestamp and content.
- **Retrieve Report**: Allows users to fetch a report's content and timestamp by providing the report's ID.
- **Get Report Count**: Allows users to fetch the total number of reports stored.
- **Event Logging**: The contract emits an event whenever a new report is added.

## Contract Structure

### Struct: `Report`
The `Report` struct stores the details of a report, including:

- `timestamp`: The time when the report was added (in Unix timestamp format).
- `content`: The textual content of the report.

### Array: `reports`
An array of `Report` structs that holds all the stored reports.

### Event: `ReportAdded`
This event is emitted when a new report is added. It contains the following parameters:

- `id`: The index of the newly added report in the `reports` array.
- `timestamp`: The timestamp when the report was added.
- `content`: The content of the newly added report.

### Functions

#### `addReport(string memory _content) public`
Adds a new report with the specified content. The report's timestamp is automatically set to the current block timestamp. Emits the `ReportAdded` event.

- **Input**: 
  - `_content`: The content of the report to be added (string).
- **Output**: None

#### `getReport(uint256 _id) public view returns (uint256 timestamp, string memory content)`
Retrieves the report by its ID. Returns the timestamp and content of the report.

- **Input**: 
  - `_id`: The ID of the report to retrieve (uint256).
- **Output**:
  - `timestamp`: The timestamp when the report was created.
  - `content`: The content of the report.

#### `getReportCount() public view returns (uint256)`
Returns the total number of reports stored in the contract.

- **Output**: 
  - The number of reports stored (uint256).

## Deployment

### Prerequisites
To deploy and interact with this contract, you will need:

- [Node.js](https://nodejs.org/) (v12 or above)
- [Hardhat](https://hardhat.org/) for development and deployment.
- [MetaMask](https://metamask.io/) or any other Ethereum wallet to interact with the contract.

### Setup

1. Install dependencies:
   ```bash
   npm install

2. Deploy the contract using Hardhat:
    ```bash
    npx hardhat run scripts/deploy.js --network <your_network>
    ```

3. After deployment, you can interact with the contract via Hardhat or a front-end interface.

### Usage

Once deployed, you can call the contract's functions to add and retrieve reports.

#### Add a Report

To add a report, call the `addReport` function with the content:
```js
await contract.addReport("Report Content");
```

#### Get a Report by ID

To get a report by its ID, call the `getReport` function:
```js
const [timestamp, content] = await contract.getReport(0);
console.log("Timestamp:", timestamp);
console.log("Content:", content);
```

#### Get the Total Number of Reports

To get the number of reports stored:
```js
const count = await contract.getReportCount();
console.log("Total Reports:", count);
```

### License
This project is licensed under the MIT License - see the LICENSE file for details.
