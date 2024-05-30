// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract ComplianceCheck {
    struct Company {
        uint256 company_id;
        string company_name;
        string company_status;
        string summary_text;
    }

    Company[] public companies;
    uint256 public nextCompanyId;

    constructor(uint256[] memory ids, string[] memory c_names, string[] memory c_statuses, string[] memory c_summary) {
        require(ids.length == c_statuses.length, "Invalid input lengths");

        for (uint256 i = 0; i < ids.length; i++) {
            companies.push(Company(ids[i],c_names[i],c_statuses[i],c_summary[i])); 
            if (ids[i] >= nextCompanyId) {
                nextCompanyId = ids[i] + 1;
            }
        }
    }

    
    function addCompanies(uint256[] memory ids,string[] memory c_names, string[] memory c_statuses,string[] memory c_summary) public {
        require(ids.length == c_statuses.length, "Invalid input lengths");

        for (uint256 i = 0; i < ids.length; i++) {
            companies.push(Company(ids[i], c_names[i], c_statuses[i],c_summary[i])); 
            if (ids[i] >= nextCompanyId) {
                nextCompanyId = ids[i] + 1;
            }
        }
    }

    function returnData() public view returns (Company[] memory) {
        return companies;
    }
}
