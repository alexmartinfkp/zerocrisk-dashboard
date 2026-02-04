import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Settings, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Menu, 
  ChevronRight,
  PieChart,
  Search,
  RefreshCw,
  Users,
  Eye,
  PlusCircle,
  CheckSquare,
  List,
  Filter
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// --- CONFIGURATION ---
const OPS_CSV_URL = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTBAoVnLtcuzr_uYVj5xGVPE68I-WkDcYGXx_It_pFsY21fztEVA8M7ACq_JODDM2E2ZLKy7rfaDiT2/pub?gid=81945691&single=true&output=csv`;
const REG_CSV_URL = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTBAoVnLtcuzr_uYVj5xGVPE68I-WkDcYGXx_It_pFsY21fztEVA8M7ACq_JODDM2E2ZLKy7rfaDiT2/pub?gid=1678666116&single=true&output=csv`;

// --- INITIAL DATA (Fallbacks) ---
const INITIAL_OPERATIONS_DATA = [
  { id: 1, type: 'OPERATIONS', name: 'Client Services Workflow', code: '1100_CLIENT', policy: 0, evidence: 100 },
  { id: 2, type: 'OPERATIONS', name: 'Compliance Workflow', code: '1200_COMPLIANCE', policy: 77, evidence: 69 },
];

const INITIAL_REGULATIONS_DATA = [
  { id: 101, type: 'REGULATION', name: 'Anti-Money Laundering', code: '2010_AML', policy: 100, evidence: 92 },
  { id: 102, type: 'REGULATION', name: 'Consumer Protection Code', code: '2020_CPC', policy: 100, evidence: 93 },
];

const CLIENTS_DATA = [
  { id: 1, type: 'CLIENT', name: 'Donal Milmo-Penny', kyc: 100, terms: 100, aml: 100, suitability: 100, policy: 100, annual: 100 },
  { id: 2, type: 'CLIENT', name: 'Garfield Spollen', kyc: 100, terms: 100, aml: 100, suitability: 100, policy: 100, annual: 100 },
  { id: 3, type: 'CLIENT', name: 'Norah McNulty', kyc: 100, terms: 100, aml: 100, suitability: 100, policy: 100, annual: 100 },
  { id: 4, type: 'CLIENT', name: 'Paul Looby', kyc: 100, terms: 100, aml: 100, suitability: 100, policy: 100, annual: 100 },
  { id: 5, type: 'CLIENT', name: 'Stephen Morgan', kyc: 100, terms: 100, aml: 100, suitability: 100, policy: 100, annual: 100 },
  { id: 6, type: 'CLIENT', name: 'John English', kyc: 100, terms: 100, aml: 100, suitability: 100, policy: 100, annual: 100 },
];

// --- OPS DETAIL DATA ---
const OPS_DETAIL_DATA = [
  // Pensions and Investments
  { code: 'PEN_LASS_1_1', func: 'Pensions and Investments', name: '01. MEETING_ Book Initial Meeting', desc: 'The initial contact meeting is booked in firm Calendar.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'INITIAL MEETING BOOKING TEMPLATE (WITH CLIENT WAIVER)', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_1_2', func: 'Pensions and Investments', name: '01. MEETING_ Initial Meeting', desc: 'The Broker conducts meeting with the Potential client.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'INITIAL MEETING MINUTES - ADDRESSING INFORMATION REQUIREMENTS', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_2_3', func: 'Pensions and Investments', name: '02. INFO EXCHANGE_ Obtain Key Customer Info', desc: 'The Broker requests the key information documents from the client.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'FACTFILE FORM TEMPLATE/ATTITUDE TO RISK QUESTIONAIRE', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_2_4', func: 'Pensions and Investments', name: '02. INFO EXCHANGE_ Send Terms of Business', desc: 'Broker sends Terms of Business detailing products and commissions.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'TERMS OF BUSINESS (PRODUCT LIST & COSTS) (ESIGNATURE)', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_3_5', func: 'Pensions and Investments', name: '03. AML CHECKS_ Obtain AML Data', desc: 'Broker requests AML info (PPS, Photo ID, Bank Proof).', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: '(BANK ACCOUNT PROOF, PPS, ID, SOURCE OF FUNDS)', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_3_6', func: 'Pensions and Investments', name: '03. AML CHECKS_ Perform AML Checks', desc: 'Broker reviews PEP self assessment and checks Sanctions lists.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'AML CHECKLIST AND PEP VALIDATION', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_4_7', func: 'Pensions and Investments', name: '04. PLAN_ Market Analysis', desc: 'Broker Reviews available Products to meet Investment Objectives.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'LIST OF ALL FUNDS AVAILABLE ACROSS PRODUCERS', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_4_8', func: 'Pensions and Investments', name: '04. PLAN_ Create Initial Investment Plan', desc: 'Broker creates initial plan summarizing objectives and products.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'INVESTMENT PLAN', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_4_9', func: 'Pensions and Investments', name: '04. PLAN_ Perform Consumer Suitability', desc: 'Broker completes Suitability Statement detailing chosen products.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'CUSTOMER SUITABILITY STATEMENT', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_4_10', func: 'Pensions and Investments', name: '04. PLAN_ Invesmtent Planning Interaction', desc: 'Interaction to finalise product and funds (emails/calls).', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'LOG OF INTERACTION (MAILS, CALLS)', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_4_11', func: 'Pensions and Investments', name: '04. PLAN_ Final Investment Plan', desc: 'Final Investment plan sent to client for agreement.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'CLIENT INVESTMENT PLAN & EXAMPLE POLICY', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_4_12', func: 'Pensions and Investments', name: '04. PLAN_ Agreement to proceed', desc: 'Client signs investment plan agreement.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'SIGNED CUSTOMER SUITABILITY AND INVESTMENT PLAN', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_5_13', func: 'Pensions and Investments', name: '05. POLICY_ Proposal Forms Signed', desc: 'Complete application form and submit to producer.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'COMPLETED APPLICATION FORM (E.G. AVIVA)', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_5_14', func: 'Pensions and Investments', name: '05. POLICY_ Policy Issued', desc: 'Producer issues Policy document, Client signs and returns.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'PRODUCER PRODUCER POLICY APPROVED', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_6_15', func: 'Pensions and Investments', name: '06. INVESTMENT_ Account Seeding', desc: 'Client seeds funds into Producer account.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'PRODUCT PRODUCER OUTSTANDING REQUIREMENTS DOCUMENT', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_6_16', func: 'Pensions and Investments', name: '06. INVESTMENT_ Producer Investment', desc: 'Instruction to chase client if seeding delayed.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'PRODUCT PRODUCER INVESTMENT REPORT', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_6_17', func: 'Pensions and Investments', name: '06. INVESTMENT_ Broker Check', desc: 'Broker checks investment reconciliation within 5 days.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'APPROVED PRODUCT PRODUCER INVESTMENT REPORT', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_7_18', func: 'Pensions and Investments', name: '07. REPORTING_ Client Position', desc: 'Year-end statement of client policies and financial position.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'PRODUCT/PORTFOLIO VALUATION', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_7_19', func: 'Pensions and Investments', name: '07. REPORTING_ Statements', desc: 'Annual statement from product producers added to file.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'ANNUAL BENEFITS STATEMENT', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_7_20', func: 'Pensions and Investments', name: '07. REPORTING_ Investment Review', desc: 'Annual reminder to review client circumstances.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'REVIEW CLIENT CIRCUMSTANCES/PRODUCT REVIEW', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_8_21', func: 'Pensions and Investments', name: '08. EVENTS_ Claims/Redemptions', desc: 'Liquidating investments or investing further funds.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'SUBSCRIPTION/REDEMPTION REQUEST FORM', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_9_22', func: 'Pensions and Investments', name: '09. RECORDS_ Documentation Maintenance', desc: 'Track presence of all appropriate documents.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'CUSTOMER LIFECYCLE DOCUMENT REPORT', evidenceStatus: 'PASSED' },

  // Compliance
  { code: 'COMP_01', func: 'Compliance', name: 'Ops Controls Framework', desc: 'Process all the Operational Risk of the Firm.', obj: 'Operational Processes', policyDoc: 'Ops Controls Framework Policies', policyStatus: 'PASSED', evidenceDoc: 'OPERATIONAL CONTROLS FRAMEWORK', evidenceStatus: 'PASSED' },
  { code: 'COMP_02', func: 'Compliance', name: 'Reg Compliance Framework', desc: 'Evidence that the firm complies with all Regulations.', obj: 'Regulatory Rules', policyDoc: 'Reg Compliance Framework Policies', policyStatus: 'PASSED', evidenceDoc: 'COMPLIANCE FRAMEWORK DOCUMENT', evidenceStatus: 'PASSED' },
  { code: 'COMP_03', func: 'Compliance', name: 'Compliance Monitoring', desc: 'Validate that all documentation has been reviewed.', obj: 'Operational Processes', policyDoc: 'Compliance Monitoring Policies', policyStatus: 'PASSED', evidenceDoc: 'VALIDATION SCHEDULE', evidenceStatus: 'PASSED' },
  { code: 'COMP_04', func: 'Compliance', name: 'Compliance Testing', desc: 'Test that documentation is fit for purpose.', obj: 'Operational Processes', policyDoc: 'Compliance Testing Policies', policyStatus: 'PASSED', evidenceDoc: 'TESTING SCHEDULE', evidenceStatus: 'PASSED' },
  { code: 'COMP_05', func: 'Compliance', name: 'Document Template', desc: 'Maintain list of all Operational Processes evidence docs.', obj: 'Evidence Docs', policyDoc: 'Document Template Policies', policyStatus: 'PASSED', evidenceDoc: 'DOCUMENTATION MANAGEMENT REPORT', evidenceStatus: 'PASSED' },
  { code: 'COMP_06', func: 'Compliance', name: 'Horizon Scanning', desc: 'Review applicable future regulation.', obj: 'Regulations', policyDoc: 'Horizon Scanning Policies', policyStatus: 'PASSED', evidenceDoc: 'COMPLIANCE FRAMEWORK DOCUMENT', evidenceStatus: 'PASSED' },
  { code: 'COMP_07', func: 'Compliance', name: 'New Regulation Mgt', desc: 'Manage process of complying with new Regulation.', obj: 'Regulations', policyDoc: 'New Regulation Mgt Policies', policyStatus: 'PASSED', evidenceDoc: 'COMPLIANCE FRAMEWORK DOCUMENT', evidenceStatus: 'PASSED' },
  { code: 'COMP_08', func: 'Compliance', name: 'Compliance Reporting', desc: 'Create compliance report for board.', obj: '14 Compliance Roles', policyDoc: 'Compliance Reporting Policies', policyStatus: 'PASSED', evidenceDoc: 'COMPLIANCE REPORT TO THE BOARD', evidenceStatus: 'PASSED' },
  { code: 'COMP_09', func: 'Compliance', name: 'Anti-Money Laundering', desc: 'Investigating suspicious transactions.', obj: 'Events', policyDoc: 'AML Policies', policyStatus: 'PASSED', evidenceDoc: 'AML ONGOING MONITORING REPORTS', evidenceStatus: 'PASSED' },
  { code: 'COMP_10', func: 'Compliance', name: 'Regulatory Reporting', desc: 'Manage process of completing Regulatory Reports.', obj: 'Reports', policyDoc: 'Regulatory Reporting Policies', policyStatus: 'PASSED', evidenceDoc: 'REGULATORY REPORT TRACKING', evidenceStatus: 'PASSED' },
  { code: 'COMP_11', func: 'Compliance', name: 'Advising the Business', desc: 'Ensure employee training completed per Roles.', obj: 'Regulations', policyDoc: 'Advising Policies', policyStatus: 'PASSED', evidenceDoc: 'HIGH LEVEL TRAINING TALKS', evidenceStatus: 'PASSED' },
  { code: 'COMP_12', func: 'Compliance', name: 'Training', desc: 'Co-ordinate Training of all employees.', obj: 'Training Courses', policyDoc: 'Training Policies', policyStatus: 'PASSED', evidenceDoc: 'TRAINING CERTIFCATE', evidenceStatus: 'PASSED' },
  { code: 'COMP_13', func: 'Compliance', name: 'Product Training', desc: 'Co-ordinate training on new products.', obj: 'Training Courses', policyDoc: 'Training Policies', policyStatus: 'PASSED', evidenceDoc: 'CPD TRAINING LOG', evidenceStatus: 'PASSED' },
  { code: 'COMP_14', func: 'Compliance', name: 'Regulator Comms', desc: 'List of all correspondance with Regulator.', obj: 'Comms', policyDoc: 'Regulator Comms Policies', policyStatus: 'PASSED', evidenceDoc: 'REGULATOR CORRESPONDANCE LOG', evidenceStatus: 'PASSED' },

  // Sales & Marketing
  { code: 'SAL_01', func: 'Sales and Marketing', name: 'Sales Product', desc: 'Maintain list of products and value proposition.', obj: 'Products', policyDoc: 'SALES PRODUCTS & SERVICES LIST', policyStatus: 'PASSED', evidenceDoc: 'PRODUCTS & SERVICES LIST', evidenceStatus: 'PASSED' },
  { code: 'SAL_02', func: 'Sales and Marketing', name: 'Advertising', desc: 'Advertising Policy and example advertisment.', obj: 'Ads', policyDoc: 'ADVERTISING POLICY', policyStatus: 'PASSED', evidenceDoc: 'ADVERTISING POLICY & EXAMPLE', evidenceStatus: 'PASSED' },
  { code: 'SAL_03', func: 'Sales and Marketing', name: 'Prospect Campaign Design', desc: 'Design marketing Campaigns.', obj: 'Campaigns', policyDoc: 'MARKETING POLICY', policyStatus: 'PASSED', evidenceDoc: 'CAMPAIGN EXAMPLE', evidenceStatus: 'PASSED' },
  { code: 'SAL_04', func: 'Sales and Marketing', name: 'Prospect Campaign Execution', desc: 'Execute marketing campaigns.', obj: 'Campaigns', policyDoc: 'CUSTOMER EVENT PLAN', policyStatus: 'PASSED', evidenceDoc: 'CUSTOMER EVENT PLAN', evidenceStatus: 'PASSED' },
  { code: 'SAL_05', func: 'Sales and Marketing', name: 'Lead/Opportunity Mgt', desc: 'Creation of Sales Leads.', obj: 'Leads', policyDoc: 'CLIENT SALES PIPELINE POLICY', policyStatus: 'PASSED', evidenceDoc: 'CLIENT SALES PIPELINE DOCUMENT', evidenceStatus: 'PASSED' },

  // Finance
  { code: 'FIN_01', func: 'Finance', name: 'Financial Accounting', desc: 'List of Accounts, Records and Trial balance.', obj: 'Accounts', policyDoc: 'FINANCIAL ACCOUNTING POLICY', policyStatus: 'PASSED', evidenceDoc: 'BANK ACCOUNT CASH CHECKS', evidenceStatus: 'PASSED' },
  { code: 'FIN_02', func: 'Finance', name: 'Financial Statements', desc: 'Evidence that financial Statements created.', obj: 'Entities', policyDoc: 'FINANCIAL STATEMENT POLICY', policyStatus: 'PASSED', evidenceDoc: 'FINANCIAL STATEMENTS (AUDITED)', evidenceStatus: 'PASSED' },
  { code: 'FIN_03', func: 'Finance', name: 'Financial Compliance', desc: 'Ensuring firm complies with Financial Obligations.', obj: 'Compliance', policyDoc: 'FINANCIAL COMPLIANCE POLICY', policyStatus: 'PASSED', evidenceDoc: 'FINANCIAL STATEMENTS (SOLVENCY)', evidenceStatus: 'PASSED' },
  { code: 'FIN_04', func: 'Tax', name: 'Tax Administration', desc: 'Calculate and Submit Corporate Tax Return.', obj: 'Tax', policyDoc: 'TAX POLICY', policyStatus: 'PASSED', evidenceDoc: 'TAX RETURN', evidenceStatus: 'PASSED' },

  // Management
  { code: 'MGT_01', func: 'Management', name: 'Organisation Direction', desc: 'Creation of Business Plan.', obj: 'Strategy', policyDoc: 'BUSINESS PLAN CREATION', policyStatus: 'PASSED', evidenceDoc: 'BUSINESS PLAN', evidenceStatus: 'PASSED' },
  { code: 'MGT_02', func: 'Management', name: 'Business Unit Direction', desc: 'Committees and Terms of Reference.', obj: 'Governance', policyDoc: 'COMMITTEE MANAGEMENT', policyStatus: 'PASSED', evidenceDoc: 'LIST OF COMMITTEES', evidenceStatus: 'PASSED' },
  { code: 'MGT_03', func: 'Management', name: 'Correspondent Bank Relationships', desc: 'Maintain list of Corresponding Banks.', obj: 'Banks', policyDoc: 'COMPANY BANK ACCOUNT TERMS', policyStatus: 'PASSED', evidenceDoc: 'COMPANY BANK ACCOUNT TERMS', evidenceStatus: 'PASSED' },
  { code: 'MGT_04', func: 'Management', name: 'Product Broker Agreement', desc: 'Maintain list of Product Producers and Agreements.', obj: 'Producers', policyDoc: 'AGREEMENT MANAGEMENT', policyStatus: 'PASSED', evidenceDoc: 'PRODUCT PRODUCER AGREEMENTS', evidenceStatus: 'PASSED' },
  { code: 'MGT_05', func: 'Management', name: 'Contractor Supplier Agreement', desc: 'Maintain List of Suppliers and agreements.', obj: 'Suppliers', policyDoc: 'SUPPLIER CO-ORDINATION', policyStatus: 'PASSED', evidenceDoc: 'LIST OF SUPPLIERS', evidenceStatus: 'PASSED' },
  { code: 'MGT_06', func: 'Management', name: 'Company Billing', desc: 'Execution of Billing invoices.', obj: 'Billing', policyDoc: 'BILLING POLICY', policyStatus: 'PASSED', evidenceDoc: 'EXAMPLE PAID INVOICES', evidenceStatus: 'PASSED' },
  { code: 'MGT_07', func: 'Management', name: 'Building Maintenance', desc: 'Process for managing Buildings.', obj: 'Facilities', policyDoc: 'BUILDINGS MANAGEMENT', policyStatus: 'PASSED', evidenceDoc: 'BUILDINGS LEASE INFO', evidenceStatus: 'PASSED' },
  { code: 'MGT_08', func: 'Management', name: 'Employee Assignment', desc: 'Assign Roles.', obj: 'HR', policyDoc: 'EMPLOYEE ASSIGNMENT', policyStatus: 'PASSED', evidenceDoc: 'MANAGEMENT RESPONSIBILITY MAP', evidenceStatus: 'PASSED' },
  { code: 'MGT_09', func: 'Management', name: 'Payroll', desc: 'Process Payroll.', obj: 'HR', policyDoc: 'PAYROLL POLICY', policyStatus: 'PASSED', evidenceDoc: 'PAYROLL REPORT', evidenceStatus: 'PASSED' },
  { code: 'MGT_10', func: 'Management', name: 'Archive Services', desc: 'List of Corporate Policies.', obj: 'Archive', policyDoc: 'POLICY MANAGEMENT', policyStatus: 'PASSED', evidenceDoc: 'EXAMPLE POLICY', evidenceStatus: 'PASSED' },
  { code: 'MGT_11', func: 'Management', name: 'Management Manual', desc: 'List of Ops Processes and Procedures.', obj: 'Manuals', policyDoc: 'MANAGEMENT MANUAL', policyStatus: 'PASSED', evidenceDoc: 'EXAMPLE PROCEDURE', evidenceStatus: 'PASSED' },
  { code: 'MGT_12', func: 'Management', name: 'Employee Data', desc: 'Employee recruitment info.', obj: 'HR', policyDoc: 'EMPLOYEE DATA MGT', policyStatus: 'PASSED', evidenceDoc: 'EMPLOYEE DATA RECORD', evidenceStatus: 'PASSED' },
  { code: 'MGT_13', func: 'Management', name: 'Outsourcees', desc: 'List of outsourced processes.', obj: 'Outsourcing', policyDoc: 'OUTSOURCING CHECKLIST', policyStatus: 'PASSED', evidenceDoc: 'OUTSOURCING CHECKLIST', evidenceStatus: 'PASSED' },
  { code: 'MGT_14', func: 'Management', name: 'Employee Certification', desc: 'Evidence employees are certified.', obj: 'HR', policyDoc: 'EMPLOYEE CERTIFICATE', policyStatus: 'PASSED', evidenceDoc: 'EMPLOYEE CERTIFICATE', evidenceStatus: 'PASSED' },
  { code: 'MGT_15', func: 'Management', name: 'Employee Evaluation', desc: 'Fitness & Probity Assessments.', obj: 'HR', policyDoc: 'FITNESS & PROBITY REPORT', policyStatus: 'PASSED', evidenceDoc: 'FITNESS & PROBITY REPORT', evidenceStatus: 'PASSED' },
  { code: 'MGT_16', func: 'Management', name: 'Legal Compliance', desc: 'Actions requiring legal review.', obj: 'Legal', policyDoc: 'LEGAL REQUIREMENTS', policyStatus: 'PASSED', evidenceDoc: 'LEGAL ACTION LOG', evidenceStatus: 'PASSED' },

  // Operations
  { code: 'OPS_01', func: 'Operations', name: 'Financial Instrument Data', desc: 'Maintain list of Products and curve/index data.', obj: 'Data', policyDoc: 'DATA MANAGEMENT PROCEDURE', policyStatus: 'PASSED', evidenceDoc: 'LIST OF PRODUCTS', evidenceStatus: 'PASSED' },
  { code: 'OPS_02', func: 'Operations', name: 'Customer Reference Data', desc: 'Manage Customer documents.', obj: 'Data', policyDoc: 'CUSTOMER DATA MGT', policyStatus: 'PASSED', evidenceDoc: 'CLIENT TRACKING REPORT', evidenceStatus: 'PASSED' },
  { code: 'OPS_03', func: 'Operations', name: 'Corporate Events', desc: 'Manage Corporate Events.', obj: 'Events', policyDoc: 'CORPORATE EVENTS ADMIN', policyStatus: 'PASSED', evidenceDoc: 'TRACKING REPORT', evidenceStatus: 'PASSED' },
  { code: 'OPS_04', func: 'Operations', name: 'Valuation', desc: 'Valuation of Customer Policies.', obj: 'Valuation', policyDoc: 'VALUATION REPORTS', policyStatus: 'PASSED', evidenceDoc: 'PORTFOLIO VALUATIONS', evidenceStatus: 'PASSED' },
  { code: 'OPS_05', func: 'Operations', name: 'Payments Execution', desc: 'Ensure Accounts seeded correctly.', obj: 'Payments', policyDoc: 'PAYMENT MGT', policyStatus: 'PASSED', evidenceDoc: 'BANK STATEMENTS', evidenceStatus: 'PASSED' },
  { code: 'OPS_06', func: 'Operations', name: 'Customer Billing', desc: 'Ensure Commissions processed.', obj: 'Billing', policyDoc: 'CUSTOMER BILLING', policyStatus: 'PASSED', evidenceDoc: 'CUSTOMER STATEMENT', evidenceStatus: 'PASSED' },
  { code: 'OPS_07', func: 'Operations', name: 'Customer Position', desc: 'Maintain clients overall positions.', obj: 'Position', policyDoc: 'POSITION MANAGEMENT', policyStatus: 'PASSED', evidenceDoc: 'POLICY REPORT', evidenceStatus: 'PASSED' },
  { code: 'OPS_08', func: 'Operations', name: 'Custody Administration', desc: 'Manage Custody of Client Policies.', obj: 'Custody', policyDoc: 'CUSTODY ADMIN', policyStatus: 'PASSED', evidenceDoc: 'POLICY REPORT', evidenceStatus: 'PASSED' },

  // Technology
  { code: 'TECH_01', func: 'Technology', name: 'Systems Administration', desc: 'Tracking and Administration of systems.', obj: 'Systems', policyDoc: 'IT SYSTEMS ADMIN', policyStatus: 'PASSED', evidenceDoc: 'LIST OF IT SYSTEMS', evidenceStatus: 'PASSED' },
  { code: 'TECH_02', func: 'Technology', name: 'Systems Operations', desc: 'Maintain all IT Systems.', obj: 'Ops', policyDoc: 'IT SYSTEMS MGT', policyStatus: 'PASSED', evidenceDoc: 'IT SYSTEMS MANUAL', evidenceStatus: 'PASSED' },
  { code: 'TECH_03', func: 'Technology', name: 'Continuity Planning', desc: 'Business Continuity and Testing.', obj: 'BCP', policyDoc: 'BUSINESS CONTINUITY POLICY', policyStatus: 'PASSED', evidenceDoc: 'BCP REPORT', evidenceStatus: 'PASSED' },
  { code: 'TECH_04', func: 'Technology', name: 'Archive Services', desc: 'Storage of firm/client data.', obj: 'Archive', policyDoc: 'DATA ARCHIVING POLICY', policyStatus: 'PASSED', evidenceDoc: 'DATA ARCHIVING REPORT', evidenceStatus: 'PASSED' },
  { code: 'TECH_05', func: 'Technology', name: 'Voice Services', desc: 'List of Voice recordings.', obj: 'Voice', policyDoc: 'VOICE RECORDING POLICY', policyStatus: 'PASSED', evidenceDoc: 'VOICE RECORDING POLICY', evidenceStatus: 'PASSED' },
];

// --- UTILITIES ---
const getRAGStatus = (percentage) => {
  if (percentage > 70) return { color: 'bg-emerald-600', text: 'text-emerald-800', bg: 'bg-emerald-50', border: 'border-emerald-200', label: 'Compliant' };
  if (percentage >= 50) return { color: 'bg-orange-500', text: 'text-orange-800', bg: 'bg-orange-50', border: 'border-orange-200', label: 'At Risk' };
  return { color: 'bg-red-600', text: 'text-red-800', bg: 'bg-red-50', border: 'border-red-200', label: 'Critical' };
};

const parsePercentage = (val) => {
  if (val === null || val === undefined) return 0;
  const strVal = val.toString().replace('%', '').trim();
  const num = parseFloat(strVal);
  return isNaN(num) ? 0 : Math.round(num);
};

const parseCSV = (text) => {
  const rows = text.split(/\r?\n/).filter(row => row.trim() !== '');
  return rows.slice(1).map(row => {
    const values = [];
    let inQuote = false;
    let currentVal = '';
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      if (char === '"') {
        inQuote = !inQuote;
      } else if (char === ',' && !inQuote) {
        values.push(currentVal.trim());
        currentVal = '';
      } else {
        currentVal += char;
      }
    }
    values.push(currentVal.trim());
    return values;
  });
};

const ProgressBar = ({ value, showLabel = true }) => {
  const status = getRAGStatus(value);
  return (
    <div className="w-full flex items-center gap-2">
      <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${status.color} transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
      {showLabel && <span className={`text-[10px] font-bold w-7 text-right ${status.text}`}>{value}%</span>}
    </div>
  );
};

const StatusBadge = ({ pScore, eScore }) => {
  const avg = (pScore + eScore) / 2;
  const status = getRAGStatus(avg);
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${status.bg} ${status.text} ${status.border}`}>
      {status.label}
    </span>
  );
};

const StatCard = ({ title, value, subtext, icon: Icon, trend }) => (
  <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-neutral-500">{title}</p>
        <h3 className="text-2xl font-bold text-neutral-900 mt-2">{value}</h3>
      </div>
      <div className="p-2 bg-neutral-100 rounded-lg">
        <Icon className="w-6 h-6 text-red-600" />
      </div>
    </div>
    <div className="mt-4 flex items-center">
      {trend && (
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
          {trend === 'up' ? '▲ High' : '▼ Attention'}
        </span>
      )}
      <span className="text-sm text-neutral-500 ml-2">{subtext}</span>
    </div>
  </div>
);

// --- DASHBOARD COMPONENTS ---

const OperationsDetailDashboard = () => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Extract unique functions for tabs
  const functions = ['All', ...new Set(OPS_DETAIL_DATA.map(item => item.func))];

  const filteredData = OPS_DETAIL_DATA.filter(item => {
    const matchesFilter = filter === 'All' || item.func === filter;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-500 font-medium">Total Processes</div>
          <div className="text-2xl font-bold text-neutral-900">{OPS_DETAIL_DATA.length}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-500 font-medium">Policy Documents</div>
          <div className="text-2xl font-bold text-emerald-600">{OPS_DETAIL_DATA.filter(i => i.policyStatus === 'PASSED').length} Passed</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-500 font-medium">Evidence Documents</div>
          <div className="text-2xl font-bold text-emerald-600">{OPS_DETAIL_DATA.filter(i => i.evidenceStatus === 'PASSED').length} Passed</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-500 font-medium">Coverage</div>
          <div className="text-2xl font-bold text-neutral-900">100%</div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        {/* Controls */}
        <div className="p-6 border-b border-neutral-200 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
              <List className="w-5 h-5 text-red-600" />
              Operations Detail Dashboard
            </h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search processes..." 
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {functions.map(func => (
              <button
                key={func}
                onClick={() => setFilter(func)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                  filter === func 
                    ? 'bg-neutral-900 text-white' 
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {func}
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="bg-neutral-50 text-neutral-600 text-[10px] uppercase tracking-wider">
                <th className="p-4 border-b border-neutral-200 w-24">Code</th>
                <th className="p-4 border-b border-neutral-200 w-32">Function</th>
                <th className="p-4 border-b border-neutral-200 w-64">Process Name</th>
                
                {/* Policy Section */}
                <th className="p-4 border-b border-neutral-200 bg-neutral-100/50 w-64">Policy & Procedures</th>
                <th className="p-4 border-b border-neutral-200 bg-neutral-100/50 w-24 text-center">Status</th>
                <th className="p-4 border-b border-neutral-200 bg-neutral-100/50 w-32 text-center">Actions</th>

                {/* Evidence Section */}
                <th className="p-4 border-b border-neutral-200 w-64">Evidence Document</th>
                <th className="p-4 border-b border-neutral-200 w-24 text-center">Status</th>
                <th className="p-4 border-b border-neutral-200 w-32 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredData.map((row, idx) => (
                <tr key={idx} className="hover:bg-neutral-50 transition-colors">
                  <td className="p-4 text-[10px] font-mono text-neutral-500">{row.code}</td>
                  <td className="p-4 text-xs font-medium text-neutral-600">{row.func}</td>
                  <td className="p-4">
                    <div className="text-sm font-semibold text-neutral-900">{row.name}</div>
                    <div className="text-[10px] text-neutral-500 mt-1 line-clamp-2" title={row.desc}>{row.desc}</div>
                  </td>

                  {/* Policy Columns */}
                  <td className="p-4 bg-neutral-50/30 text-xs text-neutral-700">{row.policyDoc}</td>
                  <td className="p-4 bg-neutral-50/30 text-center">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold border border-emerald-200">
                      {row.policyStatus}
                    </span>
                  </td>
                  <td className="p-4 bg-neutral-50/30 text-center">
                    <div className="flex justify-center gap-1">
                      <button className="p-1.5 hover:bg-neutral-200 rounded text-neutral-600" title="View"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 hover:bg-neutral-200 rounded text-neutral-600" title="Create"><PlusCircle className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 hover:bg-neutral-200 rounded text-neutral-600" title="Validate"><CheckSquare className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>

                  {/* Evidence Columns */}
                  <td className="p-4 text-xs text-neutral-700">{row.evidenceDoc}</td>
                  <td className="p-4 text-center">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold border border-emerald-200">
                      {row.evidenceStatus}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-1">
                      <button className="p-1.5 hover:bg-neutral-200 rounded text-neutral-600" title="View"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 hover:bg-neutral-200 rounded text-neutral-600" title="Create"><PlusCircle className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 hover:bg-neutral-200 rounded text-neutral-600" title="Validate"><CheckSquare className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const DashboardTable = ({ title, data }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      <div className="p-6 border-b border-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            {data[0]?.type === 'OPERATIONS' ? <Settings className="w-5 h-5 text-neutral-600" /> : <ShieldCheck className="w-5 h-5 text-red-600" />}
            {title}
          </h2>
          <p className="text-sm text-neutral-500 mt-1">Monitoring compliance status across key areas.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 text-neutral-600 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold border-b border-neutral-200">Ref Code</th>
              <th className="p-4 font-semibold border-b border-neutral-200">Area</th>
              <th className="p-4 font-semibold border-b border-neutral-200 w-48">Policy</th>
              <th className="p-4 font-semibold border-b border-neutral-200 w-48">Evidence</th>
              <th className="p-4 font-semibold border-b border-neutral-200 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filteredData.map((row) => (
              <tr key={row.id} className="hover:bg-neutral-50 transition-colors">
                <td className="p-4 text-sm font-mono text-neutral-500">{row.code.split(' ')[0]}</td>
                <td className="p-4">
                  <div className="font-medium text-neutral-900">{row.name}</div>
                  <div className="text-xs text-neutral-400">{row.code}</div>
                </td>
                <td className="p-4">
                  <ProgressBar value={row.policy} />
                </td>
                <td className="p-4">
                  <ProgressBar value={row.evidence} />
                </td>
                <td className="p-4 text-center">
                  <StatusBadge pScore={row.policy} eScore={row.evidence} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredData.length === 0 && (
        <div className="p-8 text-center text-neutral-500 text-sm">
          No records found.
        </div>
      )}
    </div>
  );
};

const ClientDashboardTable = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper for small column headers
  const Th = ({ children }) => (
    <th className="p-3 font-semibold border-b border-neutral-200 w-32 text-center align-bottom">
      {children}
    </th>
  );

  // Helper for cells
  const Td = ({ value }) => {
    // Get correct RAG colors: <50 Red, 50-70 Orange, >70 Green
    const status = getRAGStatus(value);
    
    return (
      <td className="p-3 border-b border-neutral-100">
        <div className="flex flex-col items-center">
          <span className={`text-xs font-bold mb-1 ${status.text}`}>{value}%</span>
          <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
             <div className={`h-full rounded-full ${status.color} transition-all duration-500`} style={{ width: `${value}%` }} />
          </div>
        </div>
      </td>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      <div className="p-6 border-b border-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-red-600" />
            Client Monitoring Dashboard
          </h2>
          <p className="text-sm text-neutral-500 mt-1">Real-time status of client documentation and compliance.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search broker name..." 
            className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-neutral-50 text-neutral-600 text-[10px] uppercase tracking-wider leading-tight">
              <th className="p-4 font-semibold border-b border-neutral-200 w-48 text-left">Broker Name</th>
              <Th>KYC Fact Find</Th>
              <Th>Terms of Business</Th>
              <Th>AML ID</Th>
              <Th>Suitability Statement</Th>
              <Th>Signed Policy</Th>
              <Th>Annual Benefits</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filteredData.map((row) => (
              <tr key={row.id} className="hover:bg-neutral-50 transition-colors">
                <td className="p-4">
                  <div className="font-medium text-neutral-900 text-sm">{row.name}</div>
                  <div className="text-[10px] text-neutral-400 uppercase font-mono">ID: {row.id}</div>
                </td>
                <Td value={row.kyc} />
                <Td value={row.terms} />
                <Td value={row.aml} />
                <Td value={row.suitability} />
                <Td value={row.policy} />
                <Td value={row.annual} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SummaryDashboard = ({ opsData, regData }) => {
  const allData = [...opsData, ...regData];
  const totalItems = allData.length;
  
  const avgPolicy = totalItems ? Math.round(allData.reduce((acc, curr) => acc + curr.policy, 0) / totalItems) : 0;
  const avgEvidence = totalItems ? Math.round(allData.reduce((acc, curr) => acc + curr.evidence, 0) / totalItems) : 0;
  const totalCompliance = Math.round((avgPolicy + avgEvidence) / 2);

  const criticalItems = allData.filter(i => ((i.policy + i.evidence) / 2) < 50);
  const atRiskItems = allData.filter(i => {
    const avg = (i.policy + i.evidence) / 2;
    return avg >= 50 && avg <= 70; 
  });

  const chartData = [
    { 
      name: 'Operations', 
      policy: opsData.length ? Math.round(opsData.reduce((a, b) => a + b.policy, 0) / opsData.length) : 0, 
      evidence: opsData.length ? Math.round(opsData.reduce((a, b) => a + b.evidence, 0) / opsData.length) : 0
    },
    { 
      name: 'Regulation', 
      policy: regData.length ? Math.round(regData.reduce((a, b) => a + b.policy, 0) / regData.length) : 0, 
      evidence: regData.length ? Math.round(regData.reduce((a, b) => a + b.evidence, 0) / regData.length) : 0 
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Overall Compliance" value={`${totalCompliance}%`} subtext="Combined Average" icon={ShieldCheck} trend={totalCompliance > 80 ? 'up' : 'down'} />
        <StatCard title="Frameworks Monitored" value={totalItems} subtext={`${opsData.length} Ops, ${regData.length} Regs`} icon={LayoutDashboard} />
        <StatCard title="Critical Gaps" value={criticalItems.length} subtext="Items < 50% Compliant" icon={AlertTriangle} trend="down" />
        <StatCard title="Fully Compliant" value={allData.length - criticalItems.length - atRiskItems.length} subtext="Items > 70% Compliant" icon={CheckCircle2} trend="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
          <h3 className="text-lg font-bold text-neutral-900 mb-6">Compliance Gap Analysis</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#525252' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#525252' }} domain={[0, 100]} />
                <Tooltip cursor={{ fill: '#f5f5f5' }} />
                <Legend />
                <Bar dataKey="policy" name="Policy Readiness" fill="#dc2626" radius={[4, 4, 0, 0]} barSize={50} />
                <Bar dataKey="evidence" name="Evidence Gathering" fill="#6b7280" radius={[4, 4, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm overflow-hidden flex flex-col">
          <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Priority Attention
          </h3>
          <div className="flex-1 overflow-y-auto pr-2">
            <div className="space-y-3">
              {[...criticalItems, ...atRiskItems]
                .sort((a, b) => ((a.policy + a.evidence)/2) - ((b.policy + b.evidence)/2))
                .slice(0, 6)
                .map((item) => (
                <div key={item.id} className="p-3 bg-neutral-50 rounded-lg border border-neutral-100 hover:border-neutral-300 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-neutral-500 uppercase">{item.type}</span>
                    <span className="text-xs font-mono text-neutral-400">{item.code.split(' ')[0]}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-neutral-800 line-clamp-1">{item.name}</h4>
                  <div className="mt-2 flex gap-2 text-xs">
                    <span className={`px-2 py-1 rounded bg-white border ${item.policy < 50 ? 'text-red-700 border-red-200' : 'text-neutral-600 border-neutral-200'}`}>Policy: {item.policy}%</span>
                    <span className={`px-2 py-1 rounded bg-white border ${item.evidence < 50 ? 'text-red-700 border-red-200' : 'text-neutral-600 border-neutral-200'}`}>Evid: {item.evidence}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('summary');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [opsData, setOpsData] = useState(INITIAL_OPERATIONS_DATA);
  const [regData, setRegData] = useState(INITIAL_REGULATIONS_DATA);
  const [clientData] = useState(CLIENTS_DATA); // New static client data
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('Pre-loaded Snapshot');
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      // Fetch Ops
      const opsResponse = await fetch(OPS_CSV_URL);
      if (!opsResponse.ok) throw new Error(`Failed to fetch Ops Data: ${opsResponse.status}`);
      const opsText = await opsResponse.text();
      const parsedOps = parseCSV(opsText);
      const mappedOps = parsedOps.map((row, idx) => {
        if (row.length < 5) return null;
        return {
          id: idx + 1,
          type: 'OPERATIONS',
          name: row[2] || 'Unknown',
          code: row[4] || 'UNKNOWN',
          policy: parsePercentage(row[5]),
          evidence: parsePercentage(row[6])
        };
      }).filter(item => item && item.name && item.name !== 'BUSINESS WORKFLOW');
      
      if (mappedOps.length > 0) setOpsData(mappedOps);

      // Fetch Regs
      const regResponse = await fetch(REG_CSV_URL);
      if (!regResponse.ok) throw new Error(`Failed to fetch Reg Data: ${regResponse.status}`);
      const regText = await regResponse.text();
      const parsedReg = parseCSV(regText);
      const mappedReg = parsedReg.map((row, idx) => {
        if (row.length < 5) return null;
        return {
          id: 100 + idx,
          type: 'REGULATION',
          name: row[2] || 'Unknown',
          code: row[4] || 'UNKNOWN',
          policy: parsePercentage(row[5]),
          evidence: parsePercentage(row[6])
        };
      }).filter(item => item && item.name && item.name !== 'REGULATION');

      if (mappedReg.length > 0) setRegData(mappedReg);
      
      setLastUpdated('Live Connected');
    } catch (error) {
      console.error("Data Fetch Error:", error);
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const path = window.location.pathname;
    if (path.includes('smpfinancial')) {
      setActiveTab('clients');
    }
  }, []);

  const renderContent = () => {
    if (errorMsg) {
       return (
         <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-800">
           <AlertTriangle className="w-5 h-5" />
           <div>
             <p className="font-bold">Error Loading Data</p>
             <p className="text-sm">{errorMsg}. Using pre-loaded snapshot.</p>
           </div>
         </div>
       );
    }
    
    switch (activeTab) {
      case 'summary': return <SummaryDashboard opsData={opsData} regData={regData} />;
      case 'operations': return <DashboardTable title="Operational Controls Framework" data={opsData} type="OPERATIONS" />;
      case 'regulations': return <DashboardTable title="Regulatory Compliance Framework" data={regData} type="REGULATION" />;
      case 'clients': return <ClientDashboardTable data={clientData} />;
      case 'opsdetail': return <OperationsDetailDashboard />; // New Route
      default: return <SummaryDashboard opsData={opsData} regData={regData} />;
    }
  };

  const navItems = [
    { id: 'summary', label: 'Executive Summary', icon: PieChart },
    { id: 'operations', label: 'Operational Controls', icon: Settings },
    { id: 'regulations', label: 'Regulatory Framework', icon: FileText },
    { id: 'opsdetail', label: 'Operations Detail', icon: List }, // New Tab
    { id: 'clients', label: 'Client Monitoring', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-neutral-100 flex text-neutral-900" style={{ fontFamily: '"Century Gothic", Futura, sans-serif' }}>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar - GREY (bg-neutral-800) */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-48 bg-neutral-800 text-white transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-4 border-b border-neutral-700">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 p-1.5 rounded-lg"><ShieldCheck className="w-5 h-5 text-white" /></div>
            <h1 className="font-bold text-sm leading-tight tracking-tight">ZeroCRisk</h1>
          </div>
        </div>
        <nav className="p-2 space-y-1 mt-4">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }} className={`w-full flex items-center justify-between p-2 rounded-lg transition-all duration-200 group ${activeTab === item.id ? 'bg-neutral-700 text-white shadow-lg' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'}`}>
              <div className="flex items-center gap-2">
                <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-red-100' : 'text-neutral-500 group-hover:text-neutral-300'}`} />
                <span className="font-medium text-xs text-left">{item.label}</span>
              </div>
              {activeTab === item.id && <ChevronRight className="w-3 h-3 text-red-200" />}
            </button>
          ))}
        </nav>
        {/* User Profile Section in Sidebar */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-neutral-700 bg-neutral-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-neutral-800 flex items-center justify-center text-xs font-bold border border-neutral-600">
              JD
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-medium text-white truncate">John Doe</div>
              <div className="text-[10px] text-neutral-400 truncate">Compliance Officer</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-neutral-200 h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 text-neutral-500 hover:bg-neutral-100 rounded-lg"><Menu className="w-6 h-6" /></button>
            <h2 className="text-lg font-semibold text-neutral-900 hidden sm:block">{navItems.find(i => i.id === activeTab)?.label}</h2>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={fetchData} className={`p-2 rounded-full hover:bg-neutral-100 text-neutral-500 transition-all ${isLoading ? 'animate-spin' : ''}`} title="Refresh Data"><RefreshCw className="w-4 h-4" /></button>
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${isLoading ? 'bg-neutral-100 text-neutral-500 border-neutral-200' : 'bg-neutral-100 text-neutral-700 border-neutral-200'}`}>
              <span className={`w-2 h-2 rounded-full ${isLoading ? 'bg-neutral-400' : 'bg-emerald-500 animate-pulse'}`}></span>
              {isLoading ? 'Syncing...' : 'System Active'}
            </div>
            <div className="text-sm text-neutral-500">Source: <span className="font-mono text-neutral-700">{lastUpdated}</span></div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}