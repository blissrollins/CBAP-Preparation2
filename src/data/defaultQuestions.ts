import { Question } from '../types';

export const defaultQuestions: Question[] = [
  {
    id: "default-q1",
    number: 1,
    topic: "Solution Evaluation",
    text: "What is the term used to describe the cost of the solution after the solution has been implemented in production by a vendor?",
    options: {
      A: "Total ownership costing",
      B: "Lifecycle maintenance fees",
      C: "Sustainability fees",
      D: "Total cost of ownership"
    },
    correctAnswer: "D",
    explanation: "Total Cost of Ownership (TCO) is a financial estimate intended to help buyers and owners determine the direct and indirect costs of a product or system, representing the compilation of all costs of a solution after its implementation.",
    babokSection: "Chapter 8: Solution Evaluation, Section 8.4"
  },
  {
    id: "default-q2",
    number: 2,
    topic: "Strategy Analysis",
    text: "Enterprise analysis (now part of Strategy Analysis in BABOK V3) creates just five outputs. Which one of the following is an output of the enterprise analysis tasks?",
    options: {
      A: "Assumptions and constraints",
      B: "Stakeholder concerns",
      C: "Solution performance assessment",
      D: "Solution approach"
    },
    correctAnswer: "D",
    explanation: "The solution approach is one of the classic outputs of enterprise analysis, defining the general approach to be taken to create or acquire the new capabilities required to meet the business need.",
    babokSection: "Chapter 6: Strategy Analysis, Section 6.2"
  },
  {
    id: "default-q3",
    number: 3,
    topic: "Requirements Life Cycle Management",
    text: "All of the following stakeholders participate in the prioritization of requirements except for which one?",
    options: {
      A: "Implementation subject matter expert",
      B: "Project team",
      C: "Domain subject matter expert",
      D: "Project manager"
    },
    correctAnswer: "B",
    explanation: "While the project manager, implementation SME, and domain SME have direct responsibilities and input into requirement priorities, the 'Project Team' as a generic whole is not explicitly listed as a primary stakeholder in requirements prioritization tasks.",
    babokSection: "Chapter 5: Requirements Life Cycle Management, Section 5.3"
  },
  {
    id: "default-q4",
    number: 4,
    topic: "Requirements Analysis and Design Definition",
    text: "You are the business analyst for your organization. Management has asked that you create a model of the requirements so the stakeholders can better understand the requirements and the project as a whole. Which of the following statements best describes a model?",
    options: {
      A: "Models are slices of the project solution.",
      B: "Models simplify the requirements for common stakeholders.",
      C: "Models are statistics for the return on investment, time saved, and other mathematics.",
      D: "Models abstract and simplify reality."
    },
    correctAnswer: "D",
    explanation: "A model is a representation of a system, a process, or a domain. Its primary purpose is to abstract and simplify reality so that complexity is reduced and the system is easier to analyze and understand.",
    babokSection: "Chapter 7: Requirements Analysis and Design Definition, Section 7.1"
  },
  {
    id: "default-q5",
    number: 5,
    topic: "Business Analysis Planning and Monitoring",
    text: "What plan will describe the stakeholder groups, communication needs, and the level of formality that is appropriate for the requirements?",
    options: {
      A: "Requirements management plan",
      B: "Project management plan",
      C: "Scope management plan",
      D: "Business analysis communication plan"
    },
    correctAnswer: "D",
    explanation: "The Business Analysis Communication Plan (or Information Management Approach in BABOK v3) identifies the stakeholders, their communication requirements, and how business analysis information will be distributed and processed.",
    babokSection: "Chapter 3: Business Analysis Planning and Monitoring, Section 3.3"
  },
  {
    id: "default-q6",
    number: 6,
    topic: "Requirements Life Cycle Management",
    text: "You are the business analyst for a smaller project where there are few requirements. Management would still like you to create a method to trace the few requirements for this project. What type of matrix would be best in this instance?",
    options: {
      A: "Roles and responsibility matrix",
      B: "RACI matrix",
      C: "Coverage matrix",
      D: "Requirements trace matrix"
    },
    correctAnswer: "C",
    explanation: "A coverage matrix is a high-level table used to track relationship completeness, useful on smaller projects where a lightweight tracing solution is sufficient.",
    babokSection: "Chapter 5: Requirements Life Cycle Management, Section 5.1"
  },
  {
    id: "default-q7",
    number: 7,
    topic: "Requirements Analysis and Design Definition",
    text: "You are the business analyst for your organization and have many solutions available to an identified problem. You would like a way to quickly and fairly determine which solution is the best choice for your organization. Which of the following approaches would allow you to determine the top-rated solutions for your organization?",
    options: {
      A: "Scoring system",
      B: "Acceptance and evaluation criteria",
      C: "Vendor assessment",
      D: "Voting system"
    },
    correctAnswer: "A",
    explanation: "A scoring system assigns numerical values to criteria and weights based on importance, allowing objective rating and fair comparison of divergent solution alternatives.",
    babokSection: "Chapter 7: Requirements Analysis and Design Definition, Section 7.6"
  },
  {
    id: "default-q8",
    number: 8,
    topic: "Business Analysis Planning and Monitoring",
    text: "When an organization is using a change-driven approach to business analysis, how are communications managed?",
    options: {
      A: "Communications in a change-driven approach to business analysis focus more on the frequency of communication.",
      B: "Communications in a change-driven approach typically use face-to-face channels.",
      C: "Communications in a change-driven approach focus more on formal communications.",
      D: "Communications in a change-driven approach are all ad hoc."
    },
    correctAnswer: "A",
    explanation: "In change-driven (agile) environments, communication is structured around fixed intervals, emphasizing ongoing high frequency over heavy formal documentation.",
    babokSection: "Chapter 3: Business Analysis Planning and Monitoring, Section 3.1"
  },
  {
    id: "default-q9",
    number: 9,
    topic: "Requirements Life Cycle Management",
    text: "You are the business analyst for your organization. Management has asked that you create a method to store the project requirements including those under development, under review, and the requirements which have been approved. What is management asking you to create?",
    options: {
      A: "A change management system",
      B: "A repository",
      C: "A project scope statement",
      D: "A requirements register"
    },
    correctAnswer: "B",
    explanation: "A requirements repository is a centralized secure tool of record or physical folders used to manage, track, and retain requirements lifecycle states from elicitation to final closure.",
    babokSection: "Chapter 5: Requirements Life Cycle Management, Section 5.2"
  },
  {
    id: "default-q10",
    number: 10,
    topic: "Requirements Analysis and Design Definition",
    text: "You are the business analyst for your organization and working with Tim to identify the assumptions within the business solution. Which one of the following is an assumption?",
    options: {
      A: "The vendor believes the hardware should arrive by December 1",
      B: "The software must be compatible with Windows Vista",
      C: "The software must cost less than $99 per license",
      D: "The hardware must cost less than $450 per unit"
    },
    correctAnswer: "A",
    explanation: "An assumption is a premise considered true but not yet verified. Statements stating 'believes' represent unconfirmed conditions, whereas 'must cost' or 'must be' represents constraints.",
    babokSection: "Chapter 7: Requirements Analysis and Design Definition, Section 7.2"
  },
  {
    id: "default-q11",
    number: 11,
    topic: "Business Analysis Planning and Monitoring",
    text: "Terry wants to know why it's so important to identify stakeholders so early in the business analysis duties. Which statement best addresses the need to identify stakeholders early?",
    options: {
      A: "So the business analyst knows who to report to.",
      B: "So the business analyst knows who to bill for the project.",
      C: "So the business analyst can help ensure the timely delivery of the requirements deliverables.",
      D: "So the stakeholders know who the business analyst is."
    },
    correctAnswer: "C",
    explanation: "Early identification and engagement of stakeholders is critical to establishing their responsibilities, understanding their availability, and securing commitments to ensure requirements deliverables are delivered on schedule.",
    babokSection: "Chapter 3: Business Analysis Planning and Monitoring, Section 3.2"
  },
  {
    id: "default-q12",
    number: 12,
    topic: "Requirements Life Cycle Management",
    text: "Nancy has asked you to trace a particular requirement for her. What does 'to trace a requirement' mean?",
    options: {
      A: "Tracing links risk, cost, quality, and scope elements to other artifacts.",
      B: "Tracing links business requirements to stakeholder and solution requirements, to other artifacts, and to solution components.",
      C: "Tracing means linking business requirements to the project work breakdown structure.",
      D: "Tracing is tracking all historical issues, risks, costs, and defect metrics for a requirement."
    },
    correctAnswer: "B",
    explanation: "Requirement traceability establishes relationship linkages between business requirements, stakeholder requirements, solution requirements, design artifacts, and implementation components to ensure coverage.",
    babokSection: "Chapter 5: Requirements Life Cycle Management, Section 5.1"
  },
  {
    id: "default-q13",
    number: 13,
    topic: "Strategy Analysis",
    text: "When do change requests generally increase in a project?",
    options: {
      A: "During the project's launch.",
      B: "Towards the beginning of the project.",
      C: "During the project scope management processes.",
      D: "Towards the end of the project."
    },
    correctAnswer: "D",
    explanation: "Change requests typically rise towards the end of a project as the code develops into functional states and users interact with mockups, revealing unarticulated needs or design gaps.",
    babokSection: "Chapter 6: Strategy Analysis, Section 6.4"
  },
  {
    id: "default-q14",
    number: 14,
    topic: "Requirements Analysis and Design Definition",
    text: "Ben is currently working on a solution to improve a laser printer. He has taken the laser printer apart, identified each component, and documented each component's purpose. What requirements organization pattern is Ben using?",
    options: {
      A: "Process modeling",
      B: "Data modeling",
      C: "Functional decomposition",
      D: "Scope modeling"
    },
    correctAnswer: "C",
    explanation: "Functional Decomposition involves breaking down a large system, product, or process into smaller self-contained modules to understand their structure and unique contributions.",
    babokSection: "Chapter 10: Techniques, Section 10.22"
  },
  {
    id: "default-q15",
    number: 15,
    topic: "Business Analysis Planning and Monitoring",
    text: "Fred's organization is using a plan-driven approach for the business analysis deliverables. In this approach, how will the requirements be captured?",
    options: {
      A: "At the discretion of the business analysis team.",
      B: "Using the project management information system.",
      C: "Using whatever forms are most convenient.",
      D: "Fred will use standardized templates."
    },
    correctAnswer: "D",
    explanation: "Plan-driven methodologies require a high level of formality, utilizing highly standardized templates to document requirements and ensure consistent validation, approval, and audit trails.",
    babokSection: "Chapter 3: Business Analysis Planning and Monitoring, Section 3.1"
  },
  {
    id: "default-q100",
    number: 100,
    topic: "Requirements Life Cycle Management",
    text: "Your organization uses the MoSCoW approach to requirements prioritization. What does MoSCoW stand for?",
    options: {
      A: "Must, Should, Could, Would",
      B: "Must, Should, Could, Won't",
      C: "Mission, Schedule, Cost, Willingness",
      D: "Must not, Should not, Could not, Will not"
    },
    correctAnswer: "B",
    explanation: "MoSCoW stands for: Must have, Should have, Could have, and Won't have (this time). It is a standard techniques for categorizing requirement priority.",
    babokSection: "Chapter 10: Techniques, Section 10.33"
  },
  {
    id: "default-q300",
    number: 300,
    topic: "Requirements Analysis and Design Definition",
    text: "A team is working on a user privilege and access control system. A business analyst selects use cases as the technique for requirements specification. What is the relationship between use cases 'Create a role' and 'Find a role' when there is a high level of formality?",
    options: {
      A: "Validate",
      B: "Derive",
      C: "Necessity",
      D: "Satisfy"
    },
    correctAnswer: "C",
    explanation: "The 'Necessity' relationship exists when a requirement can only be fulfilled if another is implemented first. To create a role, finding whether it exists ('Find a role') is a prerequisite.",
    babokSection: "Chapter 5: Requirements Life Cycle Management, Section 5.1"
  },
  {
    id: "default-q301",
    number: 301,
    topic: "Strategy Analysis",
    text: "A BA works for a financial institution that wants to acquire new systems and migrate all future business operations to the new systems. The BA is responsible for performing a gap analysis and has reviewed the current state of systems. What is the next task that the BA needs to do to complete the gap analysis?",
    options: {
      A: "Identify performance measures",
      B: "Define the future state capabilities",
      C: "Categorize risks factors",
      D: "Select the stakeholder engagement approach"
    },
    correctAnswer: "B",
    explanation: "To perform a gap analysis, after assessing the current state, the BA must define the desired future state capabilities. The gap is the difference between current capabilities and future state capabilities.",
    babokSection: "Chapter 6: Strategy Analysis, Section 6.2"
  },
  {
    id: "default-q302",
    number: 302,
    topic: "Requirements Life Cycle Management",
    text: "A BA has completed the prioritization of requirements with various risk-averse stakeholder groups. Several requirements conflict with a regulatory requirement that, if not implemented, will result in a fine. What should the BA do?",
    options: {
      A: "Measure the value of the other requirements against the penalty.",
      B: "Compare the regulatory requirement to the recommended solution.",
      C: "Determine a means to work around the regulatory requirement.",
      D: "Inform the stakeholders that the regulatory requirement takes precedence over other requirements."
    },
    correctAnswer: "C",
    explanation: "In risk-averse environments with regulatory defaults, the BA must assess ways to meet the requirement or mitigate findings, often finding a workaround to resolve conflicts.",
    babokSection: "Chapter 5: Requirements Life Cycle Management, Section 5.3"
  },
  {
    id: "default-q310",
    number: 310,
    topic: "Solution Evaluation",
    text: "A healthcare provider installed a solution coordinating patient recovery. The BA, while analyzing performance against value, uncovers some threats in the solution which could hamper its performance and erode its value. Which technique enables the BA to record and handle these on an ongoing basis?",
    options: {
      A: "Risk Analysis and Management",
      B: "Root Cause Analysis",
      C: "Solution Performance Analysis",
      D: "Solution Scope"
    },
    correctAnswer: "A",
    explanation: "Risk Analysis and Management allows the business analyst to identify, assess, record, and monitor threats/issues on an ongoing basis, developing mitigation strategies to safeguard solution value.",
    babokSection: "Chapter 10: Techniques, Section 10.37"
  }
];
