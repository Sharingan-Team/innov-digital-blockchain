// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ReportStorage {
    // Struct to store report details
    struct Report {
        uint256 timestamp;
        string content;
    }

    // Array to store all reports
    Report[] public reports;

    // Event to log report additions
    event ReportAdded(uint256 indexed id, uint256 timestamp, string content);

    // Function to add a report
    function addReport(string memory _content) public {
        uint256 timestamp = block.timestamp;
        reports.push(Report(timestamp, _content));
        emit ReportAdded(reports.length - 1, timestamp, _content);
    }

    // Function to get a report by ID
    function getReport(uint256 _id) public view returns (uint256 timestamp, string memory content) {
        require(_id < reports.length, "Report does not exist");
        Report memory report = reports[_id];
        return (report.timestamp, report.content);
    }

    // Function to get the total number of reports
    function getReportCount() public view returns (uint256) {
        return reports.length;
    }
}