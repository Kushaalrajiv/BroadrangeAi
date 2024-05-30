const { ethers } = require("hardhat");
const fs = require("fs");
const csv = require("csv-parser");
const mysql = require("mysql2/promise");

async function fetchDataFromDatabase() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'GTAvicecity123!',
    database: 'db',
  });

  const [rows] = await connection.execute('SELECT company_name,id,ComplianceStatus,SummaryText FROM compliance_data');

  return rows;
}

async function main() {
  console.log('Script started');

  const dataFromDatabase = await fetchDataFromDatabase();
  const data = dataFromDatabase.map(row => ({ companyId: row.id, companyname: row.company_name, complianceStatus: row.ComplianceStatus,summaryText: row.SummaryText }));

  const ComplianceCheck = await ethers.getContractFactory('ComplianceCheck');

  const ids = data.map(({ companyId }) => companyId);
  const names = data.map(({companyname}) => companyname);
  const statuses = data.map(({ complianceStatus }) => complianceStatus);
  const summary = data.map(({ summaryText }) => summaryText)

  const company = await ComplianceCheck.deploy(ids,names, statuses, summary);
  setTimeout(() => process.exit(0), 2000); 
  console.log("Contract deployed to:", await company.getAddress());
  console.log('Script completed successfully');
}

main().catch(error => {
  console.error('An error occurred:', error.message);
  process.exit(1);
});
