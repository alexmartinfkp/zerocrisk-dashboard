import React, { useState, useEffect } from 'react';
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
  Lock,
  LogOut,
  User,
  ClipboardList,
  Filter,
  Play,
  HelpCircle
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
const CLIENT_MGMT_CSV_URL = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTBAoVnLtcuzr_uYVj5xGVPE68I-WkDcYGXx_It_pFsY21fztEVA8M7ACq_JODDM2E2ZLKy7rfaDiT2/pub?gid=367908166&single=true&output=csv`;
// Updated URL to correct CSV export format for the new sheet
const OPS_DETAIL_CSV_URL = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTBAoVnLtcuzr_uYVj5xGVPE68I-WkDcYGXx_It_pFsY21fztEVA8M7ACq_JODDM2E2ZLKy7rfaDiT2/pub?gid=671052784&single=true&output=csv`;

// --- AUTHENTICATION DATA ---
const AUTHORIZED_USERS = [
  { company: 'SMP FINANCIAL', name: 'Garfield Spollen', username: 'G.Spollen@smpfinancial.com', password: 'Zerocrisk12345' },
  { company: 'SMP FINANCIAL', name: 'Donal Milmo-Penny', username: 'd.milmo-penny@smpfinancial.com', password: 'Zerocrisk12345' },
  { company: 'SMP FINANCIAL', name: 'Norah McNulty', username: 'n.mcnulty@smpfinancial.com', password: 'Zerocrisk12345' },
  { company: 'SMP FINANCIAL', name: 'Paul Looby', username: 'p.looby@smpfinancial.com', password: 'Zerocrisk12345' }, 
  { company: 'ZEROCRISK', name: 'Admin', username: 'client.services@miuraregtech.com', password: 'Zerocrisk12345' },
  { company: 'ZEROCRISK', name: 'Alex Martin', username: 'alex.martin@miuraregtech.com', password: 'Zerocrisk12345' },
  { company: 'ZEROCRISK', name: 'Fabian Giurgila', username: 'fabian.giurgila@miuraregtech.com', password: 'Zerocrisk12345' }
];

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

// --- REG DETAIL DATA ---
const REG_DETAIL_DATA = [
  // AML
  { code: 'AML01', reg: 'Anti-Money Laundering', topic: 'AML SCOPE AND OBJECTIVES', desc: 'Execution of the process of Aml Scope And Objectives for the prevention of money laundering', obj: 'Employees', policyDoc: 'POLICY AND PROCEDURE FOR AML SCOPE AND OBJECTIVES', policyStatus: 'PASSED', evidenceDoc: 'Completed Aml Intro Reg Checklist', evidenceStatus: 'PASSED' },
  { code: 'AML02', reg: 'Anti-Money Laundering', topic: 'BUSINESS RISK ASSESSMENT (CLIENT)', desc: 'Execution of the process of Business Risk Assessment (Client) for the prevention of money laundering', obj: 'Clients', policyDoc: 'POLICY AND PROCEDURE FOR BUSINESS RISK ASSESSMENT (CLIENT)', policyStatus: 'PASSED', evidenceDoc: 'Client Business Risk Assessment Doc', evidenceStatus: 'PASSED' },
  { code: 'AML03', reg: 'Anti-Money Laundering', topic: 'BUSINESS RISK ASSESSMENT (TRANSACTION TYPE)', desc: 'Execution of the process of Business Risk Assessment (Transaction Type) for the prevention of money laundering', obj: 'Transaction Types', policyDoc: 'POLICY AND PROCEDURE FOR BUSINESS RISK ASSESSMENT (TRANSACTION TYPE)', policyStatus: 'PASSED', evidenceDoc: 'Transaction Type Business Risk Assessment Doc', evidenceStatus: 'PASSED' },
  { code: 'AML04', reg: 'Anti-Money Laundering', topic: 'CUSTOMER DUE DILIGENCE', desc: 'Execution of the process of Customer Due Diligence for the prevention of money laundering', obj: 'Clients', policyDoc: 'POLICY AND PROCEDURE FOR CUSTOMER DUE DILIGENCE', policyStatus: 'PASSED', evidenceDoc: 'Medium Risk Completed Checklists (In Folder)', evidenceStatus: 'PASSED' },
  { code: 'AML05', reg: 'Anti-Money Laundering', topic: 'ONGOING MONITORING (Clients)', desc: 'Execution of the process of Ongoing Monitoring for the prevention of money laundering', obj: 'Clients', policyDoc: 'POLICY AND PROCEDURE FOR ONGOING MONITORING', policyStatus: 'PASSED', evidenceDoc: 'Client Monitoring Report (Checklist)', evidenceStatus: 'PASSED' },
  { code: 'AML05.1', reg: 'Anti-Money Laundering', topic: 'ONGOING MONITORING (Trans)', desc: 'Execution of the process of Ongoing Monitoring for the prevention of money laundering', obj: 'Transactions', policyDoc: 'POLICY AND PROCEDURE FOR ONGOING MONITORING', policyStatus: 'PASSED', evidenceDoc: 'Transaction Monitoring Report (Checklist)', evidenceStatus: 'PASSED' },
  { code: 'AML06', reg: 'Anti-Money Laundering', topic: 'SIMPLIFIED DUE DILIGENCE ("SDD")', desc: 'Execution of the process of Simplified Due Diligence ("Sdd") for the prevention of money laundering', obj: 'Low Risk Clients', policyDoc: 'POLICY AND PROCEDURE FOR SIMPLIFIED DUE DILIGENCE ("SDD")', policyStatus: 'PASSED', evidenceDoc: 'Low Risk Completed Checklists (In Folder)', evidenceStatus: 'PASSED' },
  { code: 'AML07', reg: 'Anti-Money Laundering', topic: 'ENHANCED DUE DILIGENCE', desc: 'Execution of the process of Enhanced Due Diligence for the prevention of money laundering', obj: 'High Risk Clients', policyDoc: 'POLICY AND PROCEDURE FOR ENHANCED DUE DILIGENCE', policyStatus: 'PASSED', evidenceDoc: 'High Risk Completed Checklists (In Folder)', evidenceStatus: 'PASSED' },
  { code: 'AML08', reg: 'Anti-Money Laundering', topic: 'GOVERNANCE', desc: 'Execution of the process of Governance for the prevention of money laundering', obj: 'AML Processes', policyDoc: 'POLICY AND PROCEDURE FOR GOVERNANCE', policyStatus: 'PASSED', evidenceDoc: 'Governance Framework Document', evidenceStatus: 'PASSED' },
  { code: 'AML09', reg: 'Anti-Money Laundering', topic: 'REPORTING OF SUSPICIOUS TRANSACTIONS', desc: 'Execution of the process of Reporting Of Suspicious Transactions for the prevention of money laundering', obj: 'Transactions', policyDoc: 'POLICY AND PROCEDURE FOR REPORTING OF SUSPICIOUS TRANSACTIONS', policyStatus: 'PASSED', evidenceDoc: 'Suspicious Transaction Reporting Procedure', evidenceStatus: 'PASSED' },
  { code: 'AML10', reg: 'Anti-Money Laundering', topic: 'TRAINING', desc: 'Execution of the process of Training for the prevention of money laundering', obj: 'Employee AML Courses', policyDoc: 'POLICY AND PROCEDURE FOR TRAINING', policyStatus: 'PASSED', evidenceDoc: 'Traning Certificates (Saved In Folder)', evidenceStatus: 'PASSED' },
  { code: 'AML11', reg: 'Anti-Money Laundering', topic: 'RECORDS A FIRM SHOULD RETAIN', desc: 'Execution of the process of Records A Firm Should Retain for the prevention of money laundering', obj: 'AML Data', policyDoc: 'POLICY AND PROCEDURE FOR RECORDS A FIRM SHOULD RETAIN', policyStatus: 'PASSED', evidenceDoc: 'Aml Archive Data Kept In Relevant Folders', evidenceStatus: 'PASSED' },
  { code: 'AML012', reg: 'Anti-Money Laundering', topic: 'FINANCIAL SANCTIONS FRAMEWORK', desc: 'Execution of the process of Financial Sanctions Framework for the prevention of money laundering', obj: 'Sanctions Lists', policyDoc: 'POLICY AND PROCEDURE FOR FINANCIAL SANCTIONS FRAMEWORK', policyStatus: 'PASSED', evidenceDoc: 'Sanctions Report', evidenceStatus: 'PASSED' },

  // CPC
  { code: 'CPC01', reg: 'Consumer Protection Code 2025', topic: 'Chapter 1: Knowing the Consumer and Suitability', desc: 'Gather sufficient information and assess suitability.', obj: 'Employees', policyDoc: 'POLICY AND PROCEDURE FOR Chapter 1', policyStatus: 'PASSED', evidenceDoc: 'Statement Of Suitability', evidenceStatus: 'PASSED' },
  { code: 'CPC02', reg: 'Consumer Protection Code 2025', topic: 'Chapter 2: Conflicts of Interest', desc: 'Robust conflict of interest policies and remuneration rules.', obj: 'Employees', policyDoc: 'POLICY AND PROCEDURE FOR Chapter 2', policyStatus: 'PASSED', evidenceDoc: 'Conflicts Of Interest Policy', evidenceStatus: 'PASSED' },
  { code: 'CPC03', reg: 'Consumer Protection Code 2025', topic: 'Chapter 3: Consumers in vulnerable circumstances', desc: 'Reasonable assistance to vulnerable consumers.', obj: 'Clients', policyDoc: 'POLICY AND PROCEDURE FOR Chapter 3', policyStatus: 'PASSED', evidenceDoc: 'Record Of Vulnerable Consumers', evidenceStatus: 'PASSED' },
  { code: 'CPC04', reg: 'Consumer Protection Code 2025', topic: 'Chapter 4: Digitalisation', desc: 'Standards for digital platforms.', obj: 'Clients', policyDoc: 'POLICY AND PROCEDURE FOR Chapter 4', policyStatus: 'PASSED', evidenceDoc: 'Documentation Of Testing', evidenceStatus: 'PASSED' },
  { code: 'CPC05', reg: 'Consumer Protection Code 2025', topic: 'Chapter 5: Informing effectively', desc: 'Clear, fair, and legible presentation of information.', obj: 'Transactions', policyDoc: 'POLICY AND PROCEDURE FOR Chapter 5', policyStatus: 'PASSED', evidenceDoc: 'Terms Of Business', evidenceStatus: 'PASSED' },
  { code: 'CPC06', reg: 'Consumer Protection Code 2025', topic: 'Chapter 6: Information about charges', desc: 'Pre-contractual written breakdowns of all charges.', obj: 'Transactions', policyDoc: 'POLICY AND PROCEDURE FOR Chapter 6', policyStatus: 'PASSED', evidenceDoc: 'Schedule Of Fees And Charges', evidenceStatus: 'PASSED' },
  { code: 'CPC07', reg: 'Consumer Protection Code 2025', topic: 'Chapter 7: Regulatory status', desc: 'Mandatory regulatory disclosure statement.', obj: 'Transactions', policyDoc: 'POLICY AND PROCEDURE FOR Chapter 7', policyStatus: 'PASSED', evidenceDoc: 'Regulatory Disclosure Statement', evidenceStatus: 'PASSED' },
  { code: 'CPC08', reg: 'Consumer Protection Code 2025', topic: 'Chapter 8: Unregulated activities', desc: 'Identification and segregation of unregulated activities.', obj: 'Clients', policyDoc: 'POLICY AND PROCEDURE FOR Chapter 8', policyStatus: 'PASSED', evidenceDoc: 'Website Documentation', evidenceStatus: 'PASSED' },
  { code: 'CPC09', reg: 'Consumer Protection Code 2025', topic: 'Chapter 9: Advertising', desc: 'Standards for advertisements.', obj: 'Low Risk Clients', policyDoc: 'POLICY AND PROCEDURE FOR Chapter 9', policyStatus: 'PASSED', evidenceDoc: 'Advertisements', evidenceStatus: 'PASSED' },
  { code: 'CPC10', reg: 'Consumer Protection Code 2025', topic: 'Chapter 10: Bundling', desc: 'Prohibits making a sale contingent on another.', obj: 'High Risk Clients', policyDoc: 'POLICY AND PROCEDURE FOR Chapter 10', policyStatus: 'PASSED', evidenceDoc: 'Information On Bundled Products', evidenceStatus: 'PASSED' },
  { code: 'CPC11', reg: 'Consumer Protection Code 2025', topic: 'Chapter 11: Errors resolution', desc: 'Timely detection and resolution of errors.', obj: 'AML Data', policyDoc: 'POLICY AND PROCEDURE FOR Chapter 11', policyStatus: 'PASSED', evidenceDoc: 'Log Of All Errors Identified', evidenceStatus: 'PASSED' },
  { code: 'CPC12', reg: 'Consumer Protection Code 2025', topic: 'Chapter 12: Complaints resolution', desc: 'Formal complaints procedure.', obj: 'Clients', policyDoc: 'POLICY AND PROCEDURE FOR Chapter 12', policyStatus: 'PASSED', evidenceDoc: 'Log Of All Complaints', evidenceStatus: 'PASSED' },
  { code: 'CPC13', reg: 'Consumer Protection Code 2025', topic: 'Chapter 13: Unsolicited visits', desc: 'Prohibits unsolicited personal visits.', obj: 'Employee AML Courses', policyDoc: 'POLICY AND PROCEDURE FOR Chapter 13', policyStatus: 'PASSED', evidenceDoc: 'Written Consent Records', evidenceStatus: 'PASSED' },
  { code: 'CPC14', reg: 'Consumer Protection Code 2025', topic: 'Chapter 14: Records and compliance', desc: 'Standards for record keeping.', obj: 'Clients', policyDoc: 'POLICY AND PROCEDURE FOR Chapter 14', policyStatus: 'PASSED', evidenceDoc: 'Comprehensive Records', evidenceStatus: 'PASSED' },
  { code: 'CPC15', reg: 'Consumer Protection Code 2025', topic: 'Chapter 15: Miscellaneous', desc: 'Various operational duties.', obj: 'Clients', policyDoc: 'POLICY AND PROCEDURE FOR Chapter 15', policyStatus: 'PASSED', evidenceDoc: 'Written Policies Or Procedures', evidenceStatus: 'PASSED' },

  // IAF
  { code: 'IAF01', reg: 'Individual Accountability Framework', topic: 'COMPLIANCE FRAMEWORK', desc: 'Ensure Senior Management are responsible for proper function.', obj: 'Regulatory Rules', policyDoc: 'POLICY AND PROCEDURE FOR COMPLIANCE FRAMEWORK', policyStatus: 'PASSED', evidenceDoc: 'Completed Iaf Reg Checklist', evidenceStatus: 'PASSED' },
  { code: 'IAF02', reg: 'Individual Accountability Framework', topic: 'STATEMENTS OF RESPONSIBILITIES', desc: 'Senior Management responsibility.', obj: 'Employees', policyDoc: 'POLICY AND PROCEDURE FOR STATEMENTS OF RESPONSIBILITIES', policyStatus: 'PASSED', evidenceDoc: 'Statements Of Responsibility', evidenceStatus: 'PASSED' },
  { code: 'IAF03', reg: 'Individual Accountability Framework', topic: 'MANAGEMENT RESPONSIBILITIES MAP', desc: 'Senior Management responsibility.', obj: 'Employees', policyDoc: 'POLICY AND PROCEDURE FOR MANAGEMENT RESPONSIBILITIES MAP', policyStatus: 'PASSED', evidenceDoc: 'Management Responsibility Map', evidenceStatus: 'PASSED' },
  { code: 'IAF04', reg: 'Individual Accountability Framework', topic: 'COMPLIANCE WITH THE DUTY', desc: 'Senior Management responsibility.', obj: 'Legal Entity', policyDoc: 'POLICY AND PROCEDURE FOR COMPLIANCE WITH THE DUTY', policyStatus: 'PASSED', evidenceDoc: 'Compliance With The Duty Statement', evidenceStatus: 'PASSED' },
  { code: 'IAF05', reg: 'Individual Accountability Framework', topic: 'REASONABLE STEPS', desc: 'Senior Management responsibility.', obj: 'Legal Entity', policyDoc: 'POLICY AND PROCEDURE FOR REASONABLE STEPS', policyStatus: 'PASSED', evidenceDoc: 'Reasonable Steps Waterfall', evidenceStatus: 'PASSED' },
  { code: 'IAF06', reg: 'Individual Accountability Framework', topic: 'BUSINESS STANDARDS', desc: 'Senior Management responsibility.', obj: 'Operational Processes', policyDoc: 'POLICY AND PROCEDURE FOR BUSINESS STANDARDS', policyStatus: 'PASSED', evidenceDoc: 'Business Standards Documentation', evidenceStatus: 'PASSED' },
  { code: 'IAF07', reg: 'Individual Accountability Framework', topic: 'COMMON CONDUCT STANDARDS', desc: 'Senior Management responsibility.', obj: 'Employees', policyDoc: 'POLICY AND PROCEDURE FOR COMMON CONDUCT STANDARDS', policyStatus: 'PASSED', evidenceDoc: 'Common Conduct Standards Procedure', evidenceStatus: 'PASSED' },
  { code: 'IAF08', reg: 'Individual Accountability Framework', topic: 'ADDITIONAL CONDUCT STANDARDS', desc: 'Senior Management responsibility.', obj: 'Legal Entity', policyDoc: 'POLICY AND PROCEDURE FOR ADDITIONAL CONDUCT STANDARDS', policyStatus: 'PASSED', evidenceDoc: 'Ops Controls Framework', evidenceStatus: 'PASSED' },
  { code: 'IAF09', reg: 'Individual Accountability Framework', topic: 'FITNESS AND PROBITY REGIME', desc: 'Senior Management responsibility.', obj: 'Employees', policyDoc: 'POLICY AND PROCEDURE FOR FITNESS AND PROBITY REGIME', policyStatus: 'PASSED', evidenceDoc: 'Policy On The Integration Of Fitness', evidenceStatus: 'PASSED' },
  { code: 'IAF10', reg: 'Individual Accountability Framework', topic: 'THE CERTIFICATION REQUIREMENTS', desc: 'Senior Management responsibility.', obj: 'Employees', policyDoc: 'POLICY AND PROCEDURE FOR THE CERTIFICATION REQUIREMENTS', policyStatus: 'PASSED', evidenceDoc: 'Employee Certificates', evidenceStatus: 'PASSED' },
  { code: 'IAF11', reg: 'Individual Accountability Framework', topic: 'HOLDING COMPANIES', desc: 'Senior Management responsibility.', obj: 'Employees', policyDoc: 'POLICY AND PROCEDURE FOR HOLDING COMPANIES', policyStatus: 'PASSED', evidenceDoc: 'Not Applicable', evidenceStatus: 'PASSED' },
  { code: 'IAF12', reg: 'Individual Accountability Framework', topic: 'ENFORCEMENT - ADMINISTRATIVE SANCTIONS', desc: 'Senior Management responsibility.', obj: 'Regulator Communications', policyDoc: 'POLICY AND PROCEDURE FOR ENFORCEMENT', policyStatus: 'PASSED', evidenceDoc: 'Contravention Procedures', evidenceStatus: 'PASSED' },
  { code: 'IAF13', reg: 'Individual Accountability Framework', topic: 'TRAINING', desc: 'Senior Management responsibility.', obj: 'Employees', policyDoc: 'POLICY AND PROCEDURE FOR TRAINING', policyStatus: 'PASSED', evidenceDoc: 'Training Evidences', evidenceStatus: 'PASSED' },

  // MCC
  { code: 'MCC01', reg: 'Minimum Competency Code', topic: 'SCOPE', desc: 'Ensure firms employees maintain a standard of competence.', obj: 'CF and PCF Employees', policyDoc: 'POLICY AND PROCEDURE FOR SCOPE', policyStatus: 'PASSED', evidenceDoc: 'Completed Mcc Reg Checklist', evidenceStatus: 'PASSED' },
  { code: 'MCC02', reg: 'Minimum Competency Code', topic: 'THE MINIMUM COMPETENCY STANDARDS', desc: 'Ensure firms employees maintain a standard of competence.', obj: 'CF and PCF Employees', policyDoc: 'POLICY AND PROCEDURE FOR THE MINIMUM COMPETENCY STANDARDS', policyStatus: 'PASSED', evidenceDoc: 'Completed Competency Standard Reg Checklist', evidenceStatus: 'PASSED' },
  { code: 'MCC03', reg: 'Minimum Competency Code', topic: 'GENERAL OBLIGATION', desc: 'Ensure firms employees maintain a standard of competence.', obj: 'CF and PCF Employees', policyDoc: 'POLICY AND PROCEDURE FOR GENERAL OBLIGATION', policyStatus: 'PASSED', evidenceDoc: 'Completed Certificates', evidenceStatus: 'PASSED' },
  { code: 'MCC04', reg: 'Minimum Competency Code', topic: 'NEW ENTRANTS', desc: 'Ensure firms employees maintain a standard of competence.', obj: 'New Employees', policyDoc: 'POLICY AND PROCEDURE FOR NEW ENTRANTS', policyStatus: 'PASSED', evidenceDoc: 'New Employee Onboarding Process', evidenceStatus: 'PASSED' },
  { code: 'MCC05', reg: 'Minimum Competency Code', topic: 'GRANDFATHERING ARRANGEMENTS', desc: 'Ensure firms employees maintain a standard of competence.', obj: 'Grandfathered Employees', policyDoc: 'POLICY AND PROCEDURE FOR GRANDFATHERING ARRANGEMENTS', policyStatus: 'PASSED', evidenceDoc: 'Grandfathering Checkist', evidenceStatus: 'PASSED' },
  { code: 'MCC06', reg: 'Minimum Competency Code', topic: 'CPD', desc: 'Ensure firms employees maintain a standard of competence.', obj: 'Employees', policyDoc: 'POLICY AND PROCEDURE FOR CPD', policyStatus: 'PASSED', evidenceDoc: 'Cpd Completion Certificates', evidenceStatus: 'PASSED' },
  { code: 'MCC07', reg: 'Minimum Competency Code', topic: 'PRESCRIBED SCRIPT FUNCTION', desc: 'Ensure firms employees maintain a standard of competence.', obj: 'Prescribed Script Employees', policyDoc: 'POLICY AND PROCEDURE FOR PRESCRIBED SCRIPT FUNCTION', policyStatus: 'PASSED', evidenceDoc: 'Completed Script Framework', evidenceStatus: 'PASSED' },
  { code: 'MCC08', reg: 'Minimum Competency Code', topic: 'RECORDS', desc: 'Ensure firms employees maintain a standard of competence.', obj: 'Minimum Competency Data', policyDoc: 'POLICY AND PROCEDURE FOR RECORDS', policyStatus: 'PASSED', evidenceDoc: 'Completion Certificates', evidenceStatus: 'PASSED' },

  // Fitness & Probity
  { code: 'FIT01', reg: 'Fitness and Probity', topic: 'FITNESS AND PROBITY STANDARDS', desc: 'Ensure employees are fit and proper.', obj: 'CF and PCF Employees', policyDoc: 'POLICY AND PROCEDURE FOR FITNESS AND PROBITY STANDARDS', policyStatus: 'PASSED', evidenceDoc: 'COMPLETED CHECKLIST', evidenceStatus: 'PASSED' },
  { code: 'FIT02', reg: 'Fitness and Probity', topic: 'CONTROLLED FUNCTIONS', desc: 'Ensure employees are fit and proper.', obj: 'CF Employees', policyDoc: 'POLICY AND PROCEDURE FOR CONTROLLED FUNCTIONS', policyStatus: 'PASSED', evidenceDoc: 'PROOFS OF FITNESS AND PROBITY', evidenceStatus: 'PASSED' },
  { code: 'FIT03', reg: 'Fitness and Probity', topic: 'PRE-APPROVAL CONTROLLED FUNCTIONS', desc: 'Ensure employees are fit and proper.', obj: 'PCF Employees', policyDoc: 'POLICY AND PROCEDURE FOR PRE-APPROVAL CONTROLLED FUNCTIONS', policyStatus: 'PASSED', evidenceDoc: 'PROOFS OF FITNESS AND PROBITY', evidenceStatus: 'PASSED' },
  { code: 'FIT07', reg: 'Fitness and Probity', topic: 'INTRODUCTION', desc: 'Firm responsible for ensuring appointee suitability.', obj: 'Legal Entity', policyDoc: 'POLICY AND PROCEDURE FOR INTRODUCTION', policyStatus: 'PASSED', evidenceDoc: 'Approval Letter', evidenceStatus: 'PASSED' },
  { code: 'FIT08', reg: 'Fitness and Probity', topic: 'PRE-CONTRACT REQUIREMENTS', desc: 'Due diligence, Portal profile, IQ.', obj: 'Employees', policyDoc: 'POLICY AND PROCEDURE FOR PRE-CONTRACT REQUIREMENTS', policyStatus: 'PASSED', evidenceDoc: 'Individual Questionnaire (IQ)', evidenceStatus: 'PASSED' },
  { code: 'FIT09', reg: 'Fitness and Probity', topic: 'ENTRY INTO AND CANCELLATION', desc: 'Assessment methodology.', obj: 'Employees', policyDoc: 'POLICY AND PROCEDURE FOR ENTRY INTO AND CANCELLATION', policyStatus: 'PASSED', evidenceDoc: 'Garda Vetting Disclosure', evidenceStatus: 'PASSED' },

  // GDPR
  { code: 'GDPR01', reg: 'GDPR', topic: 'LAWFULNESS OF PROCESSING', desc: 'Ensure firms protect personal data.', obj: 'Personal Data Records', policyDoc: 'POLICY AND PROCEDURE FOR LAWFULNESS OF PROCESSING', policyStatus: 'PASSED', evidenceDoc: 'Data Processing Lawfulness Checklist', evidenceStatus: 'PASSED' },
  { code: 'GDPR02', reg: 'GDPR', topic: 'PRINCIPLES RELATING TO PROCESSING', desc: 'Ensure firms protect personal data.', obj: 'Personal Data Records', policyDoc: 'POLICY AND PROCEDURE FOR PRINCIPLES', policyStatus: 'PASSED', evidenceDoc: 'Data Processing Principles Checklist', evidenceStatus: 'PASSED' },
  { code: 'GDPR04', reg: 'GDPR', topic: 'RIGHT OF ACCESS', desc: 'Ensure firms protect personal data.', obj: 'Clients', policyDoc: 'POLICY AND PROCEDURE FOR RIGHT OF ACCESS', policyStatus: 'PASSED', evidenceDoc: 'Data Rights Checklist', evidenceStatus: 'PASSED' },
  { code: 'GDPR05', reg: 'GDPR', topic: 'INFORMATION TO BE PROVIDED', desc: 'Ensure firms protect personal data.', obj: 'Client Interactions', policyDoc: 'POLICY AND PROCEDURE FOR INFORMATION', policyStatus: 'PASSED', evidenceDoc: 'Terms Of Business', evidenceStatus: 'PASSED' },
  { code: 'GDPR11', reg: 'GDPR', topic: 'DATA PROTECTION IMPACT ASSESSMENT', desc: 'Ensure firms protect personal data.', obj: 'Assessments', policyDoc: 'POLICY AND PROCEDURE FOR DPIA', policyStatus: 'PASSED', evidenceDoc: 'DPIA Report', evidenceStatus: 'PASSED' },
  { code: 'GDPR12', reg: 'GDPR', topic: 'NOTIFICATION OF PERSONAL DATA BREACH', desc: 'Ensure firms protect personal data.', obj: 'Breaches', policyDoc: 'POLICY AND PROCEDURE FOR NOTIFICATION', policyStatus: 'PASSED', evidenceDoc: 'Breach Procedures', evidenceStatus: 'PASSED' },

  // SFDR
  { code: 'SFDR01', reg: 'SFDR', topic: 'TRANSPARENCY OF SUSTAINABILITY RISK POLICIES', desc: 'Ensure firms are transparent about sustainability.', obj: 'Products', policyDoc: 'POLICY AND PROCEDURE FOR TRANSPARENCY', policyStatus: 'PASSED', evidenceDoc: 'Transparency Of Policies', evidenceStatus: 'PASSED' },
  { code: 'SFDR02', reg: 'SFDR', topic: 'TRANSPARENCY OF ADVERSE IMPACTS', desc: 'Ensure firms are transparent about sustainability.', obj: 'Products', policyDoc: 'POLICY AND PROCEDURE FOR ADVERSE IMPACTS', policyStatus: 'PASSED', evidenceDoc: 'Transparency Of Impacts', evidenceStatus: 'PASSED' },

  // DMR
  { code: 'DMR01', reg: 'DISTANCE MARKETING', topic: 'PRELIMINARY PROVISIONS', desc: 'Scope and definitions.', obj: 'Legal Entity', policyDoc: 'POLICY AND PROCEDURE FOR PRELIMINARY', policyStatus: 'PASSED', evidenceDoc: 'Scope Assessment', evidenceStatus: 'PASSED' },
  { code: 'DMR02', reg: 'DISTANCE MARKETING', topic: 'PRE-CONTRACT REQUIREMENTS', desc: 'Clear information before contract.', obj: 'Client Engagements', policyDoc: 'POLICY AND PROCEDURE FOR PRE-CONTRACT', policyStatus: 'PASSED', evidenceDoc: 'Pre-Contract Information Pack', evidenceStatus: 'PASSED' },

  // PDA
  { code: 'PDA01', reg: 'PROTECTED DISCLOSURES', topic: 'PRELIMINARY AND GENERAL', desc: 'Defines key terms.', obj: 'Legal Entity', policyDoc: 'POLICY AND PROCEDURE FOR PRELIMINARY', policyStatus: 'PASSED', evidenceDoc: 'Scope Assessment', evidenceStatus: 'PASSED' },
  { code: 'PDA02', reg: 'PROTECTED DISCLOSURES', topic: 'PROTECTED DISCLOSURES', desc: 'Internal reporting channels.', obj: 'Client Engagements', policyDoc: 'POLICY AND PROCEDURE FOR DISCLOSURES', policyStatus: 'PASSED', evidenceDoc: 'Whistleblowing Policy', evidenceStatus: 'PASSED' },

  // CIGO
  { code: 'CIGO01', reg: 'CIGO', topic: 'ASSESSMENT OF CRITICALITY', desc: 'Methodology for critical outsourcing.', obj: 'Legal Entity', policyDoc: 'POLICY AND PROCEDURE FOR ASSESSMENT', policyStatus: 'PASSED', evidenceDoc: 'Criticality Assessment', evidenceStatus: 'PASSED' },
  { code: 'CIGO04', reg: 'CIGO', topic: 'GOVERNANCE', desc: 'Board responsibility for outsourcing.', obj: 'Outsourcing', policyDoc: 'POLICY AND PROCEDURE FOR GOVERNANCE', policyStatus: 'PASSED', evidenceDoc: 'Outsourcing Strategy', evidenceStatus: 'PASSED' },

  // CIGOR
  { code: 'CIGOR01', reg: 'CIGOR', topic: 'GOVERNANCE', desc: 'Board responsibility for resilience.', obj: 'Legal Entity', policyDoc: 'POLICY AND PROCEDURE FOR GOVERNANCE', policyStatus: 'PASSED', evidenceDoc: 'Resilience Framework', evidenceStatus: 'PASSED' },
  { code: 'CIGOR02', reg: 'CIGOR', topic: 'IDENTIFICATION OF CRITICAL SERVICE', desc: 'Identify external-facing services.', obj: 'Services', policyDoc: 'POLICY AND PROCEDURE FOR IDENTIFICATION', policyStatus: 'PASSED', evidenceDoc: 'Register of Critical Services', evidenceStatus: 'PASSED' },

  // DORA
  { code: 'DORA01', reg: 'DORA', topic: 'GENERAL PROVISIONS', desc: 'Subject matter and scope.', obj: 'Legal Entity', policyDoc: 'POLICY AND PROCEDURE FOR GENERAL PROVISIONS', policyStatus: 'PASSED', evidenceDoc: 'Proportionality Assessment', evidenceStatus: 'PASSED' },
  { code: 'DORA02', reg: 'DORA', topic: 'ICT RISK MANAGEMENT - GOVERNANCE', desc: 'Internal governance and control.', obj: 'Legal Entity', policyDoc: 'POLICY AND PROCEDURE FOR ICT GOVERNANCE', policyStatus: 'PASSED', evidenceDoc: 'ICT Governance Policy', evidenceStatus: 'PASSED' },
  { code: 'DORA03', reg: 'DORA', topic: 'ICT RISK MANAGEMENT - FRAMEWORKS', desc: 'Framework to identify and protect.', obj: 'Technology', policyDoc: 'POLICY AND PROCEDURE FOR ICT FRAMEWORKS', policyStatus: 'PASSED', evidenceDoc: 'Digital Operational Resilience Strategy', evidenceStatus: 'PASSED' }
];

// --- OPS DETAIL DATA ---
const OPS_DETAIL_DATA = [
  // Pensions and Investments
  { code: 'PEN_LASS_1_1', func: 'Pensions and Investments', name: '01_MEETING_ Book Initial Meeting', desc: 'The initial contact meeting is booked in firm Calendar.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'INITIAL MEETING BOOKING TEMPLATE (WITH CLIENT WAIVER)', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_1_2', func: 'Pensions and Investments', name: '01_MEETING_ Initial Meeting', desc: 'The Broker conducts meeting with the Potential client.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'INITIAL MEETING MINUTES - ADDRESSING INFORMATION REQUIREMENTS', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_2_3', func: 'Pensions and Investments', name: '02_INFO EXCHANGE_ Obtain Key Customer Info', desc: 'The Broker requests the key information documents from the client.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'FACTFILE FORM TEMPLATE/ATTITUDE TO RISK QUESTIONAIRE', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_2_4', func: 'Pensions and Investments', name: '02_INFO EXCHANGE_ Send Terms of Business', desc: 'Broker sends Terms of Business detailing products and commissions.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'TERMS OF BUSINESS (PRODUCT LIST & COSTS) (ESIGNATURE)', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_3_5', func: 'Pensions and Investments', name: '03_AML CHECKS_ Obtain AML Data', desc: 'Broker requests AML info (PPS, Photo ID, Bank Proof).', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: '(BANK ACCOUNT PROOF, PPS, ID, SOURCE OF FUNDS)', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_3_6', func: 'Pensions and Investments', name: '03_AML CHECKS_ Perform AML Checks', desc: 'Broker reviews PEP self assessment and checks Sanctions lists.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'AML CHECKLIST AND PEP VALIDATION', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_4_7', func: 'Pensions and Investments', name: '04_PLAN_ Market Analysis', desc: 'Broker Reviews available Products to meet Investment Objectives.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'LIST OF ALL FUNDS AVAILABLE ACROSS PRODUCERS', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_4_8', func: 'Pensions and Investments', name: '04_PLAN_ Create Initial Investment Plan', desc: 'Broker creates initial plan summarizing objectives and products.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'INVESTMENT PLAN', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_4_9', func: 'Pensions and Investments', name: '04_PLAN_ Perform Consumer Suitability', desc: 'Broker completes Suitability Statement detailing chosen products.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'CUSTOMER SUITABILITY STATEMENT', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_4_10', func: 'Pensions and Investments', name: '04_PLAN_ Invesmtent Planning Interaction', desc: 'Interaction to finalise product and funds (emails/calls).', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'LOG OF INTERACTION (MAILS, CALLS)', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_4_11', func: 'Pensions and Investments', name: '04_PLAN_ Creation of Final Investment Plan with policy selection', desc: 'Final Investment plan sent to client for agreement.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'CLIENT INVESTMENT PLAN & EXAMPLE POLICY', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_4_12', func: 'Pensions and Investments', name: '04_PLAN_ Agreement to proceed with Investment plan', desc: 'Client signs investment plan agreement.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'SIGNED CUSTOMER SUITABILITY AND INVESTMENT PLAN', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_5_13', func: 'Pensions and Investments', name: '05_POLICY_ Product Producer Proposal Forms Signed', desc: 'Complete application form and submit to producer.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'COMPLETED APPLICATION FORM (E.G. AVIVA)', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_5_14', func: 'Pensions and Investments', name: '05_POLICY_ Producer Producer Policy Issued', desc: 'Producer issues Policy document, Client signs and returns.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'PRODUCER PRODUCER POLICY APPROVED', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_6_15', func: 'Pensions and Investments', name: '06_INVESTMENT_ Customer Investment Account Seeding', desc: 'Client seeds funds into Producer account.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'PRODUCT PRODUCER OUTSTANDING REQUIREMENTS DOCUMENT', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_6_16', func: 'Pensions and Investments', name: '06_INVESTMENT_ Product Producer Investment', desc: 'Instruction to chase client if seeding delayed.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'PRODUCT PRODUCER INVESTMENT REPORT', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_6_17', func: 'Pensions and Investments', name: '06_INVESTMENT_ Broker Investment Check', desc: 'Broker checks investment reconciliation within 5 days.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'APPROVED PRODUCT PRODUCER INVESTMENT REPORT', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_7_18', func: 'Pensions and Investments', name: '07_REPORTING_ Client Position and Valuation', desc: 'Year-end statement of client policies and financial position.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'PRODUCT/PORTFOLIO VALUATION', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_7_19', func: 'Pensions and Investments', name: '07_REPORTING_ Client Communication and Statements', desc: 'Annual statement from product producers added to file.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'ANNUAL BENEFITS STATEMENT', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_7_20', func: 'Pensions and Investments', name: '07_REPORTING_ Client Investment Review', desc: 'Annual reminder to review client circumstances.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'REVIEW CLIENT CIRCUMSTANCES/PRODUCT REVIEW', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_8_21', func: 'Pensions and Investments', name: '08_EVENTS_ Event Management - Claims/Subscriptions/Redemptions/Errors/Compliants', desc: 'Liquidating investments or investing further funds.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'SUBSCRIPTION/REDEMPTION REQUEST FORM', evidenceStatus: 'PASSED' },
  { code: 'PEN_LASS_9_22', func: 'Pensions and Investments', name: '09_RECORDS_ Customer Lifecycle Documentation Maintenance', desc: 'Track presence of all appropriate documents.', obj: 'Client', policyDoc: 'POLICY AND PROCEDURE DOCUMENT PACK', policyStatus: 'PASSED', evidenceDoc: 'CUSTOMER LIFECYCLE DOCUMENT REPORT', evidenceStatus: 'PASSED' },

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

// Fallback data for Client Management (Restored Full 20 rows with updated actions)
const CLIENT_MANAGEMENT_DATA = [
  { id: '001', name: 'Alan & Jane Keane', email: 'a.keane@auroragroup.ie; jane@escom.net', phone: '(01) 8211415; 087 2374657', broker: 'Niamh Kelly', docCount: 145954922, product: 'Mortgage Protection', producer: 'New Ireland', ffPres: 'Yes (Data Capture Form)', termsPres: 'Yes (Signed 31/04/2008)', amlPres: 'No', suitPres: 'Yes', policyPres: 'Yes (Schedule)', benPres: 'Yes (Projected Benefits)', ffAnl: 'Fail', termsAnl: 'Fail', amlAnl: 'Fail', suitAnl: 'Fail', policyAnl: 'Fail', benAnl: 'Fail', actions: ['SEND FACT FIND', 'SEND TERMS OF BUSINESS', 'PROCESS AML CHECKS', 'CREATE POLICY REQUEST', 'CREATE STATEMENT REQUEST'] },
  // ... (Other entries remain same logic, just fallbacks) ...
];

// --- UTILITIES ---
const getRAGStatus = (percentage) => {
  // RAG Logic: > 70 Green, 50-70 Orange, < 50 Red
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

// --- LOGIN COMPONENT ---
const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Find user in hardcoded list
    const user = AUTHORIZED_USERS.find(u => 
      u.username.toLowerCase() === username.toLowerCase() && 
      u.password === password
    );

    if (user) {
      onLogin(user);
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-neutral-200">
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <div className="bg-red-600 p-3 rounded-xl shadow-lg">
              <ShieldCheck className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-neutral-900 mb-2">ZeroCRisk</h2>
          <p className="text-center text-neutral-500 mb-8 text-sm">Compliance Monitoring System</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase mb-2 ml-1">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input 
                  type="email" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-sm"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase mb-2 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-xs font-medium">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-3 rounded-lg transition-all shadow-md hover:shadow-lg text-sm"
            >
              Sign In
            </button>
          </form>
        </div>
        <div className="bg-neutral-50 p-4 border-t border-neutral-100 text-center">
          <p className="text-xs text-neutral-400">Secure Access • ZeroCRisk © 2024</p>
        </div>
      </div>
    </div>
  );
};

// --- DASHBOARD COMPONENTS ---

const ClientManagementDashboard = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (item.docCount && item.docCount.toString().includes(searchTerm))
  );

  const AnalysisPill = ({ status }) => {
    const isPass = status.toLowerCase() === 'pass' || status.toLowerCase().includes('yes');
    return (
      <span className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-md border min-w-[70px] text-center inline-block ${isPass ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-orange-100 text-orange-800 border-orange-200'}`}>
        {isPass ? 'PASS' : 'FAIL'}
      </span>
    );
  };

  const InventoryPill = ({ statusText }) => {
    const isPass = statusText.toLowerCase().includes('yes');
    const label = isPass ? 'PASS' : 'FAIL';
    
    return (
      <div className="flex flex-col items-center">
        <span 
          className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-md border min-w-[70px] text-center inline-block ${isPass ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-orange-100 text-orange-800 border-orange-200'}`}
          title={statusText}
        >
          {label}
        </span>
      </div>
    );
  };

  const ActionButton = ({ label }) => (
    <button className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-900 rounded text-[9px] font-bold uppercase whitespace-nowrap transition-colors flex items-center justify-center gap-1.5 shadow-sm w-full h-full">
      <Play className="w-2.5 h-2.5 flex-shrink-0" />
      {label}
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="p-6 border-b border-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-red-600" />
              Client Management Dashboard
            </h2>
            <p className="text-sm text-neutral-500 mt-1">Detailed documentation inventory and analysis.</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search clients..." 
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto pb-4"> 
          <table className="w-full text-left border-collapse min-w-[3000px]"> 
            <thead>
              <tr className="bg-neutral-50 text-neutral-600 text-[10px] uppercase tracking-wider">
                <th className="p-3 border-b border-neutral-200 w-10 sticky left-0 bg-neutral-50 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">No</th>
                <th className="p-3 border-b border-neutral-200 w-48 sticky left-10 bg-neutral-50 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">Client Name</th>
                <th className="p-3 border-b border-neutral-200 w-32">Broker</th>
                <th className="p-3 border-b border-neutral-200 w-32">Policy #</th>
                <th className="p-3 border-b border-neutral-200 w-32">Producer</th>
                
                <th className="p-3 border-b border-neutral-200 bg-neutral-100/50 w-32 text-center">Fact Find Inventory</th>
                <th className="p-3 border-b border-neutral-200 bg-neutral-100/50 w-32 text-center">Terms of Business Inventory</th>
                <th className="p-3 border-b border-neutral-200 bg-neutral-100/50 w-32 text-center">AML ID Inventory</th>
                <th className="p-3 border-b border-neutral-200 bg-neutral-100/50 w-32 text-center">Suitability Statement Inventory</th>
                <th className="p-3 border-b border-neutral-200 bg-neutral-100/50 w-32 text-center">Policy Inventory</th>
                <th className="p-3 border-b border-neutral-200 bg-neutral-100/50 w-32 text-center">Benefits Statement Inventory</th>
                
                <th className="p-3 border-b border-neutral-200 w-24 text-center">Fact Find Analysis</th>
                <th className="p-3 border-b border-neutral-200 w-24 text-center">Terms Analysis</th>
                <th className="p-3 border-b border-neutral-200 w-24 text-center">AML Analysis</th>
                <th className="p-3 border-b border-neutral-200 w-24 text-center">Suitability Analysis</th>
                <th className="p-3 border-b border-neutral-200 w-24 text-center">Policy Analysis</th>
                <th className="p-3 border-b border-neutral-200 w-24 text-center">Benefits Analysis</th>
                
                <th className="p-3 border-b border-neutral-200 bg-red-50/50 text-red-800 text-center w-36">FACT FIND CREATION</th>
                <th className="p-3 border-b border-neutral-200 bg-red-50/50 text-red-800 text-center w-36">TERMS OF BUSINESS CREATION</th>
                <th className="p-3 border-b border-neutral-200 bg-red-50/50 text-red-800 text-center w-36">GOVERNMENT ID REQUEST</th>
                <th className="p-3 border-b border-neutral-200 bg-red-50/50 text-red-800 text-center w-36">STATEMENT OF SUITABILITY CREATION</th>
                <th className="p-3 border-b border-neutral-200 bg-red-50/50 text-red-800 text-center w-36">POLICY DOCUMENT REQUEST</th>
                <th className="p-3 border-b border-neutral-200 bg-red-50/50 text-red-800 text-center w-36">ANNUAL BENEFITS STATEMENT REQUEST</th>
                <th className="p-3 border-b border-neutral-200 bg-red-50/50 text-red-800 text-center w-36">REVIEW FACT FIND</th>
                <th className="p-3 border-b border-neutral-200 bg-red-50/50 text-red-800 text-center w-36">RE-SIGN TERMS OF BUSINESS</th>
                <th className="p-3 border-b border-neutral-200 bg-red-50/50 text-red-800 text-center w-36">RE-CHECK AML</th>
                <th className="p-3 border-b border-neutral-200 bg-red-50/50 text-red-800 text-center w-36">RESEND STATEMENT OF SUITABILITY</th>
                <th className="p-3 border-b border-neutral-200 bg-red-50/50 text-red-800 text-center w-36">REQUEST POLICY DOCUMENT</th>
                <th className="p-3 border-b border-neutral-200 bg-red-50/50 text-red-800 text-center w-36">REQUEST BENEFITS STATEMENT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-xs">
              {filteredData.map((row) => (
                <tr key={row.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="p-3 font-mono text-neutral-400 sticky left-0 bg-white group-hover:bg-neutral-50 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">{row.id}</td>
                  <td className="p-3 sticky left-10 bg-white group-hover:bg-neutral-50 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    <div className="font-bold text-neutral-900">{row.name}</div>
                    <div className="text-[10px] text-neutral-500">{row.email}</div>
                  </td>
                  <td className="p-3">{row.broker}</td>
                  <td className="p-3 font-mono">{row.docCount}</td>
                  <td className="p-3">{row.producer}</td>
                  <td className="p-3 bg-neutral-50/30 text-center"><InventoryPill statusText={row.ffPres} /></td>
                  <td className="p-3 bg-neutral-50/30 text-center"><InventoryPill statusText={row.termsPres} /></td>
                  <td className="p-3 bg-neutral-50/30 text-center"><InventoryPill statusText={row.amlPres} /></td>
                  <td className="p-3 bg-neutral-50/30 text-center"><InventoryPill statusText={row.suitPres} /></td>
                  <td className="p-3 bg-neutral-50/30 text-center"><InventoryPill statusText={row.policyPres} /></td>
                  <td className="p-3 bg-neutral-50/30 text-center"><InventoryPill statusText={row.benPres} /></td>
                  <td className="p-3 text-center"><AnalysisPill status={row.ffAnl} /></td>
                  <td className="p-3 text-center"><AnalysisPill status={row.termsAnl} /></td>
                  <td className="p-3 text-center"><AnalysisPill status={row.amlAnl} /></td>
                  <td className="p-3 text-center"><AnalysisPill status={row.suitAnl} /></td>
                  <td className="p-3 text-center"><AnalysisPill status={row.policyAnl} /></td>
                  <td className="p-3 text-center"><AnalysisPill status={row.benAnl} /></td>
                  <td className="p-2"><ActionButton label="CREATE FACTFIND" /></td>
                  <td className="p-2"><ActionButton label="CREATE TERMS OF BUSINESS" /></td>
                  <td className="p-2"><ActionButton label="PROCESS AML CHECKS" /></td>
                  <td className="p-2"><ActionButton label="PROCESS AML CHECKS" /></td>
                  <td className="p-2"><ActionButton label="CREATE POLICY REQUEST" /></td>
                  <td className="p-2"><ActionButton label="CREATE STATEMENT REQUEST" /></td>
                  <td className="p-2"><ActionButton label="REVIEW FACT FIND" /></td>
                  <td className="p-2"><ActionButton label="RE-SIGN TERMS OF BUSINESS" /></td>
                  <td className="p-2"><ActionButton label="RE-CHECK AML" /></td>
                  <td className="p-2"><ActionButton label="RESEND STATEMENT OF SUITABILITY" /></td>
                  <td className="p-2"><ActionButton label="REQUEST POLICY" /></td>
                  <td className="p-2"><ActionButton label="REQUEST BENEFITS STATEMENT" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- OPERATIONS DETAIL COMPONENT (Restored Full Version) ---
const OperationsDetailDashboard = ({ data }) => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Use passed data or fallback to INITIAL if empty/invalid
  const displayData = (data && data.length > 0 && data[0].code) ? data : OPS_DETAIL_DATA;

  // Extract unique functions for tabs
  const functions = ['All', ...new Set(displayData.map(item => item.func || 'Other'))];

  const filteredData = displayData.filter(item => {
    const matchesFilter = filter === 'All' || (item.func || 'Other') === filter;
    const matchesSearch = (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (item.code || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-500 font-medium">Total Processes</div>
          <div className="text-2xl font-bold text-neutral-900">{displayData.length}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-500 font-medium">Policy Documents</div>
          <div className="text-2xl font-bold text-emerald-600">{displayData.filter(i => (i.policyStatus || '').toUpperCase() === 'PASSED').length} Passed</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-500 font-medium">Evidence Documents</div>
          <div className="text-2xl font-bold text-emerald-600">{displayData.filter(i => (i.evidenceStatus || '').toUpperCase() === 'PASSED').length} Passed</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-500 font-medium">Coverage</div>
          <div className="text-2xl font-bold text-neutral-900">100%</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
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
          <div className="flex gap-2 overflow-x-auto pb-2">
            {functions.map(func => (
              <button key={func} onClick={() => setFilter(func)} className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${filter === func ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}>
                {func}
              </button>
            ))}
          </div>
        </div>

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
                  <td className="p-4 bg-neutral-50/30 text-xs text-neutral-700">{row.policyDoc}</td>
                  <td className="p-4 bg-neutral-50/30 text-center">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold border border-emerald-200">{row.policyStatus}</span>
                  </td>
                  <td className="p-4 bg-neutral-50/30 text-center">
                    <div className="flex justify-center gap-1">
                      <button className="p-1.5 hover:bg-neutral-200 rounded text-neutral-600" title="View"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 hover:bg-neutral-200 rounded text-neutral-600" title="Create"><PlusCircle className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 hover:bg-neutral-200 rounded text-neutral-600" title="Validate"><CheckSquare className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                  <td className="p-4 text-xs text-neutral-700">{row.evidenceDoc}</td>
                  <td className="p-4 text-center">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold border border-emerald-200">{row.evidenceStatus}</span>
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

// --- REGULATORY COMPLIANCE DETAIL COMPONENT (New) ---
const RegulatoryComplianceDetailDashboard = () => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const regulations = ['All', ...new Set(REG_DETAIL_DATA.map(item => item.reg))];

  const filteredData = REG_DETAIL_DATA.filter(item => {
    const matchesFilter = filter === 'All' || item.reg === filter;
    const matchesSearch = item.topic.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="p-6 border-b border-neutral-200 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-red-600" />
              Reg Compliance Detail
            </h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search regulations..." 
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {regulations.map(reg => (
              <button key={reg} onClick={() => setFilter(reg)} className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${filter === reg ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}>
                {reg}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="bg-neutral-50 text-neutral-600 text-[10px] uppercase tracking-wider">
                <th className="p-4 border-b border-neutral-200 w-24">Reg Code</th>
                <th className="p-4 border-b border-neutral-200 w-32">Regulation</th>
                <th className="p-4 border-b border-neutral-200 w-64">Regulation Topic</th>
                
                {/* Policy Section */}
                <th className="p-4 border-b border-neutral-200 bg-neutral-100/50 w-64">Policy & Procedure</th>
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
                  <td className="p-4 text-xs font-medium text-neutral-600">{row.reg}</td>
                  <td className="p-4 group relative">
                    <div className="text-sm font-semibold text-neutral-900 flex items-center gap-1">
                       {row.topic}
                       <HelpCircle className="w-3 h-3 text-neutral-400 opacity-0 group-hover:opacity-100" />
                    </div>
                    {/* Tooltip for Description */}
                    <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-neutral-800 text-white text-[10px] rounded shadow-lg z-10">
                      {row.desc}
                      <div className="absolute left-4 top-full border-4 border-transparent border-t-neutral-800"></div>
                    </div>
                  </td>
                  <td className="p-4 bg-neutral-50/30 text-xs text-neutral-700">{row.policyDoc}</td>
                  <td className="p-4 bg-neutral-50/30 text-center">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold border border-emerald-200">{row.policyStatus}</span>
                  </td>
                  <td className="p-4 bg-neutral-50/30 text-center">
                    <div className="flex justify-center gap-1">
                      <button className="p-1.5 hover:bg-neutral-200 rounded text-neutral-600" title="View"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 hover:bg-neutral-200 rounded text-neutral-600" title="Create"><PlusCircle className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 hover:bg-neutral-200 rounded text-neutral-600" title="Validate"><CheckSquare className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                  <td className="p-4 text-xs text-neutral-700">{row.evidenceDoc}</td>
                  <td className="p-4 text-center">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold border border-emerald-200">{row.evidenceStatus}</span>
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

// ... (DashboardTable, ClientDashboardTable, SummaryDashboard, App components)
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
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code.toLowerCase().includes(searchTerm.toLowerCase())
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
        <button 
          onClick={() => window.open('#', '_blank')} // Placeholder redirect
          className="w-full flex flex-col items-center group hover:bg-neutral-50 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-200 cursor-pointer"
          title="View Evidence Document"
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className={`text-xs font-bold ${status.text}`}>{value}%</span>
            <FileText className="w-3.5 h-3.5 text-neutral-400 group-hover:text-blue-600 transition-colors" />
          </div>
          <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
             <div className={`h-full rounded-full ${status.color} transition-all duration-500`} style={{ width: `${value}%` }} />
          </div>
        </button>
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
  const [clientData] = useState(CLIENTS_DATA); // Client Monitoring Data
  const [clientManagementData, setClientManagementData] = useState(CLIENT_MANAGEMENT_DATA); // New Client Management Data
  const [opsDetailData, setOpsDetailData] = useState(OPS_DETAIL_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('Pre-loaded Snapshot');
  const [errorMsg, setErrorMsg] = useState(null);
  
  // -- AUTH STATE --
  const [user, setUser] = useState(null); // null = not logged in

  const fetchData = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      // Fetch Ops
      const opsResponse = await fetch(OPS_CSV_URL);
      if (opsResponse.ok) {
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
      }

      // Fetch Regs
      const regResponse = await fetch(REG_CSV_URL);
      if (regResponse.ok) {
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
      }
      
      // Fetch Client Management Data
      const cmResponse = await fetch(CLIENT_MGMT_CSV_URL);
      if (cmResponse.ok) {
        const cmText = await cmResponse.text();
        const parsedCm = parseCSV(cmText);
        
        const mappedCm = parsedCm.map((row, idx) => {
          if (row.length < 5) return null;
          
          const actions = [];
          const ffAnl = row[15] || '';
          const termsAnl = row[16] || '';
          const amlAnl = row[17] || '';
          const suitAnl = row[18] || '';
          const policyAnl = row[19] || '';
          const benAnl = row[20] || '';

          if (ffAnl.trim().toLowerCase() === 'fail') actions.push('SEND FACT FIND');
          if (termsAnl.trim().toLowerCase() === 'fail') actions.push('SEND TERMS OF BUSINESS');
          if (amlAnl.trim().toLowerCase() === 'fail') actions.push('PROCESS AML CHECKS');
          if (suitAnl.trim().toLowerCase() === 'fail') actions.push('RESEND STATEMENT OF SUITABILITY');
          if (policyAnl.trim().toLowerCase() === 'fail') actions.push('REQUEST POLICY');
          if (benAnl.trim().toLowerCase() === 'fail') actions.push('REQUEST BENEFITS STATEMENT');

          return {
            id: row[0] || idx.toString(),
            name: row[1] || 'Unknown',
            email: row[2],
            phone: row[3],
            broker: row[4],
            docCount: row[6], 
            product: row[7],
            producer: row[8],
            ffPres: row[9],
            termsPres: row[10],
            amlPres: row[11],
            suitPres: row[12],
            policyPres: row[13],
            benPres: row[14],
            ffAnl: ffAnl,
            termsAnl: termsAnl,
            amlAnl: amlAnl,
            suitAnl: suitAnl,
            policyAnl: policyAnl,
            benAnl: benAnl,
            actions: actions
          };
        }).filter(item => item && item.name && item.name !== 'Client Name' && item.name !== 'DATA TYPE');

        if (mappedCm.length > 0) setClientManagementData(mappedCm);
      }

      // Fetch Ops Detail Data (Improved Validation)
      const opsDetailResponse = await fetch(OPS_DETAIL_CSV_URL);
      if (opsDetailResponse.ok) {
           const text = await opsDetailResponse.text();
           const parsed = parseCSV(text);
           
           // Only map if data looks valid (check first row content or length)
           const mapped = parsed.map(row => {
             // Basic validation: ensure we have enough columns and it's not HTML garbage
             if (row.length < 5) return null;
             
             return {
               code: row[0],
               func: row[1],
               name: row[2],
               desc: row[3],
               obj: row[4],
               policyDoc: row[5],
               policyStatus: row[6],
               evidenceDoc: row[10], 
               evidenceStatus: row[11]
             };
           }).filter(item => item && item.code && item.code !== 'CODE'); 
           
           // Only update state if we successfully parsed valid rows
           if (mapped.length > 0) {
              setOpsDetailData(mapped);
           } else {
             console.log("Ops Detail fetch returned empty or invalid data, keeping fallback.");
           }
      }
      
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

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('summary');
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

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
      case 'client_management': return <ClientManagementDashboard data={clientManagementData} />; // New Screen
      case 'opsdetail': return <OperationsDetailDashboard data={opsDetailData} />;
      case 'regdetail': return <RegulatoryComplianceDetailDashboard />; // New Route
      default: return <SummaryDashboard opsData={opsData} regData={regData} />;
    }
  };

  const navItems = [
    { id: 'summary', label: 'Executive Summary', icon: PieChart },
    { id: 'operations', label: 'Operational Controls', icon: Settings },
    { id: 'regulations', label: 'Regulatory Framework', icon: FileText },
    { id: 'opsdetail', label: 'Operations Detail', icon: List },
    { id: 'regdetail', label: 'Reg Compliance Detail', icon: FileText }, // New Tab
    { id: 'clients', label: 'Client Monitoring', icon: Users },
    { id: 'client_management', label: 'Client Management', icon: ClipboardList }, // New Tab
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
        {/* User Profile Section in Sidebar - UPDATED with Login Info */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-neutral-700 bg-neutral-800">
          <div className="flex items-center justify-between gap-2 mb-3">
             <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-neutral-800 flex flex-shrink-0 items-center justify-center text-xs font-bold border border-neutral-600">
                  {user.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-medium text-white truncate" title={user.name}>{user.name}</div>
                  <div className="text-[9px] text-neutral-400 truncate" title={user.company}>{user.company}</div>
                </div>
             </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-1.5 rounded bg-neutral-700 hover:bg-neutral-600 text-[10px] text-neutral-300 transition-colors"
          >
            <LogOut className="w-3 h-3" />
            Sign Out
          </button>
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