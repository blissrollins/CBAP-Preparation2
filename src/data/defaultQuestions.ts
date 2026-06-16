import { Question } from '../types';

export const defaultQuestions: Question[] = [
  {
    id: "q300",
    number: 300,
    topic: "Requirements Analysis and Design Definition",
    text: "A team is working on a user privilege and access control system. A business analyst (BA) selects use cases as the technique for requirements specification. What is the relationship between use cases 'Create a role' and 'Find a role' when there is a high level of formality?",
    options: {
      A: "Validate",
      B: "Derive",
      C: "Necessity",
      D: "Satisfy"
    },
    correctAnswer: "C",
    babokSection: "Section 5.1: Trace Requirements",
    explanation: "According to BABOK v3, under Requirements Traceability (Section 5.1), the Necessity relationship is applied when a requirement is only functional or meaningful if another requirement is implemented. In a highly formal system, you cannot 'Create a role' without first being able to check if it already exists ('Find a role'), thus establishing a relationship of Necessity."
  },
  {
    id: "q301",
    number: 301,
    topic: "Strategy Analysis",
    text: "A business analyst (BA) works for a financial institution that wants to acquire new systems and migrate all future business operations to the new systems. The BA is responsible for performing a gap analysis and has reviewed the current state of systems. What is the next task that the BA needs to do to complete the gap analysis?",
    options: {
      A: "Identify performance measures",
      B: "Define the future state capabilities",
      C: "Categorize risks factors",
      D: "Select the stakeholder engagement approach"
    },
    correctAnswer: "B",
    babokSection: "Section 6.2: Define Future State",
    explanation: "According to BABOK v3, gap analysis is a direct comparison between the current state capabilities and the desired future state capabilities. Since the current state has already been reviewed, the next logical task for the BA is to define the future state capabilities (Section 6.2) to determine what gaps must be bridged."
  },
  {
    id: "q302",
    number: 302,
    topic: "Requirements Life Cycle Management",
    text: "A business analyst (BA) has completed the prioritization of requirements with various risk-averse stakeholder groups. Several requirements conflict with a regulatory requirement that, if not implemented, will result in a fine from a regulatory body. What should the BA do?",
    options: {
      A: "Measure the value of the other requirements against the penalty of not meeting the regulatory requirement",
      B: "Compare the regulatory requirement to the recommended solution",
      C: "Determine a means to work around the regulatory requirement",
      D: "Inform the stakeholders that the regulatory requirement takes precedence over other requirements"
    },
    correctAnswer: "C",
    babokSection: "Section 5.3: Prioritize Requirements",
    explanation: "According to BABOK v3 Section 5.3, when requirements conflict with regulatory requirements, BAs must collaborate with stakeholders to find acceptable workarounds or alternative options. Option C refers to finding a means to comply or work around conflicts, satisfying regulatory constraints without neglecting stakeholder needs."
  },
  {
    id: "q303",
    number: 303,
    topic: "Requirements Life Cycle Management",
    text: "A large company has thousands of geographically dispersed employees and dozens of IT systems. Multiple business analysts (BAs) work in parallel on various requirements with different stakeholders. When considered in isolation, the requirements look meaningful and valuable to those who approved them. However, when it comes to implementation, some of the requirements appear to be contradicting each other. A lead BA recognizes that adding some traceability information would help uncover such conflicts early in the process. To what should the BA trace the requirements?",
    options: {
      A: "Stakeholder tasks",
      B: "Business needs",
      C: "Organizational functions",
      D: "Solution components"
    },
    correctAnswer: "D",
    babokSection: "Section 5.1: Trace Requirements",
    explanation: "Traceability to solution components (Section 5.1) allows business analysts to detect conflicting demands on system elements. By tracing the requirements back to specific solution components, contradiction and redundancy across parallel teams can be identified before implementation."
  },
  {
    id: "q304",
    number: 304,
    topic: "Elicitation and Collaboration",
    text: "A multi-domain project has stakeholders with different technical backgrounds. The presentation prepared by the business analyst (BA) for domain 1 was also used for domain 2 but the presentation was not clear and caused concerns for stakeholders in domain 2. What can the BA do to alleviate the concerns of the stakeholders in domain 2?",
    options: {
      A: "Create a survey applicable for the stakeholders in domain 2.",
      B: "Produce an estimation applicable for the stakeholders in domain 2.",
      C: "Present a model applicable for the stakeholders in domain 2.",
      D: "Develop a backlog applicable for the stakeholders in domain 2."
    },
    correctAnswer: "C",
    babokSection: "Section 4.4: Manage Stakeholder Collaboration",
    explanation: "Under Section 4.4, when dealing with diverse groups, BAs must choose communication styles and visual formats that match the audience's interests and technical baseline. Presenting an appropriate requirements model (using common metaphors or domain-specific notation) helps clarify complexity and resolve stakeholder concerns."
  },
  {
    id: "q305",
    number: 305,
    topic: "Solution Evaluation",
    text: "The objective of a solution implemented was to increase the number of customer calls resolved per hour. When using basic statistical sampling concepts, what does the business analyst (BA) need to consider?",
    options: {
      A: "Metrics and Key Performance Indicators (KPIs)",
      B: "Frequency and Timing",
      C: "Financial Analysis",
      D: "Benchmarking and Market Analysis"
    },
    correctAnswer: "A",
    babokSection: "Section 8.1: Measure Solution Performance",
    explanation: "According to BABOK v3 Section 8.1, when measuring solution performance, measurements are collected using Metrics and Key Performance Indicators (KPIs). When applying basic statistical sampling, these formal indicators are defined to gauge output accuracy, volume, and latency correctly."
  },
  {
    id: "q306",
    number: 306,
    topic: "Strategy Analysis",
    text: "A sports wristwatch product manufacturer wants to add a blood sugar monitoring toolkit to the watch. Market research has confirmed that the most profitable segment of the manufacturer's target customer is looking for this feature. The business analyst (BA) worked with the product owner to finalize the set of requirements and design options and then defined multiple approaches for implementing the feature. At this point, the solutions' team agreed that they were unable to accurately assess the merits of each of the proposed solutions. What is the possible reason?",
    options: {
      A: "Requirements are not allocated to solution components",
      B: "Too many approaches are dividing the team",
      C: "Business needs are unclear to the team",
      D: "Requirements and design options are not detailed enough"
    },
    correctAnswer: "C",
    babokSection: "Section 6.1: Analyze Current State",
    explanation: "Under Section 6.1 and 6.2, if current-state business needs, values, and objectives are unclear or poorly defined, the solutions team cannot accurately prioritize or grade the merits of proposed design options. The core business needs drive solution assessment."
  },
  {
    id: "q307",
    number: 307,
    topic: "Business Analysis Planning and Monitoring",
    text: "The performance of the business analysis team has been reviewed by management to determine areas for improvement. The manager would like to help the business analysts (BAs) develop their skills and address the corrective actions. What is a technique that may help achieve this goal?",
    options: {
      A: "Lessons learned",
      B: "Team restructure",
      C: "Weekly meetings",
      D: "Team building"
    },
    correctAnswer: "A",
    babokSection: "Section 3.5: Identify Business Analysis Performance Improvements",
    explanation: "According to BABOK v3, under Section 3.5, the Lessons Learned technique is highly useful to identify performance improvement opportunities, document positive and negative experiences, and build skills through direct retrospectives."
  },
  {
    id: "q308",
    number: 305,
    topic: "Solution Evaluation",
    text: "The stakeholders are interested in ensuring that expected value is assessed prior to acceptance. To determine if the solution is providing expected value and ensure the accuracy of the measurements, the stakeholders and the business analyst (BA) determine that they need to measure __________.",
    options: {
      A: "benefits, penalties, and costs.",
      B: "strategy, solution, and scope.",
      C: "impacts, problems, and dependencies.",
      D: "performance, trends, and variances."
    },
    correctAnswer: "A",
    babokSection: "Section 8.1: Measure Solution Performance",
    explanation: "According to BABOK v3 Section 8.1, measuring benefits, penalties, and costs delivers a structured framework for stakeholders to evaluate if solutions are performing at expected levels and realizing projected business value prior to formal acceptance (value validation)."
  },
  {
    id: "q309",
    number: 309,
    topic: "Solution Evaluation",
    text: "A card printing solution is comprised of 4 stages: Loading, Printing, Packaging and Sorting. Loading and sorting of cards is done manually through operators, while printing and packaging are automated. The loading stage requires the operator to load 100 cards after an alarm is raised. Sorting requires an operator to distribute each package based on the printed address into the appropriate delivery box. Which stage should be assessed as the most likely to increase process inefficiencies?",
    options: {
      A: "Loading",
      B: "Packaging",
      C: "Sorting",
      D: "Printing"
    },
    correctAnswer: "C",
    babokSection: "Section 8.3: Assess Solution Limitations",
    explanation: "Sorting requires the manual parsing of printed address information to place cards into appropriate boxes. This human-centric task has higher complexity and variability than loading 100 on an alarm, and is therefore the bottleneck most likely to increase process inefficiencies."
  },
  {
    id: "q310",
    number: 310,
    topic: "Solution Evaluation",
    text: "A large health care provider has recently purchased and installed a solution that automates some of the activities that coordinate patient recovery activities. A business analyst (BA) is in the process of evaluating this solution and analyzing the performance measures against the value it brings. At this juncture, the BA has uncovered some threats in the solution which could hamper its performance and erode the value it brings. Which technique will enable the BA to record and handle these on an ongoing basis?",
    options: {
      A: "Risk Analysis and Management",
      B: "Root Cause Analysis",
      C: "Solution Performance Analysis",
      D: "Solution Scope"
    },
    correctAnswer: "A",
    babokSection: "Section 8.5: Recommend Actions to Increase Solution Value",
    explanation: "Risk Analysis and Management (Section 8.5) is the core technique used to continuously record, monitor, evaluate, and handle potential operational threats, errors, and risk factors that might erode overall solution value."
  },
  {
    id: "q311",
    number: 311,
    topic: "Strategy Analysis",
    text: "An insurance company has two actuarial teams: Life and Non-Life. The Life team has a specialized tool to make their calculations while the Non-life team performs calculations manually. Last year the company bought a single solution to support both groups. The Non-Life team continues to do certain calculations manually to conform to their processes. Which type of analysis was missed prior to purchasing a solution?",
    options: {
      A: "Operational assessment",
      B: "Organizational structure",
      C: "Stakeholder impact analysis",
      D: "Stakeholder location"
    },
    correctAnswer: "C",
    babokSection: "Section 6.4: Define Change Strategy",
    explanation: "Stakeholder impact analysis (Section 6.4) identifies how users perform daily work and what changes their actual workflows will undergo. Bypassing stakeholder impact analysis failed to identify that the Non-Life team's manual process would cause them to resist the new calculations tool."
  },
  {
    id: "q312",
    number: 312,
    topic: "Elicitation and Collaboration",
    text: "A business analyst (BA) is working on a stakeholder collaboration plan. The main goal is to select the approaches that work best to meet the needs of external and internal stakeholders. Which aspects should be taken into account?",
    options: {
      A: "Collaboration skills of BA",
      B: "Solution design",
      C: "Timing and frequency of collaboration",
      D: "Business governance plan"
    },
    correctAnswer: "C",
    babokSection: "Section 3.2: Plan Stakeholder Engagement",
    explanation: "Planning stakeholder engagement includes defining communication timelines, preferences, and the timing/frequency of workshops or touchpoints (Section 3.2). This ensures that collaborative pathways work effectively for both internal and external members."
  },
  {
    id: "q313",
    number: 313,
    topic: "Strategy Analysis",
    text: "While validating requirements for a software implementation project, the business analyst (BA) needs to identify scenarios that would alter the benefit delivered by a requirement. Which of the following techniques should the BA use to identify such scenarios?",
    options: {
      A: "Risk Analysis and Management",
      B: "Metrics and Key Performance Indicators",
      C: "Data Modeling",
      D: "Document Analysis"
    },
    correctAnswer: "A",
    babokSection: "Section 6.3: Assess Risks",
    explanation: "Risk Analysis and Management is utilized to identify and analyze scenarios that might alter, restrict, or completely eliminate the targeted benefit delivered by requirements (Section 6.3)."
  },
  {
    id: "q314",
    number: 314,
    topic: "Elicitation and Collaboration",
    text: "In a software implementation project, the designated business analyst (BA) has conducted all the elicitation activities and now needs to confirm the elicitation results. What is used by the BA Professional to guide which sources of information and which results are to be compared?",
    options: {
      A: "Information management approach",
      B: "Business analysis plan",
      C: "Elicitation activity plan",
      D: "Business analysis approach"
    },
    correctAnswer: "B",
    babokSection: "Section 4.3: Confirm Elicitation Results",
    explanation: "Under Section 4.3, BAs use their Business Analysis Plan to determine which sources of historical information, policy lists, or stakeholder results should be validated, compared, and checked for consistency."
  },
  {
    id: "q315",
    number: 315,
    topic: "Strategy Analysis",
    text: "A big construction company has grown into a group of 17 companies spread across the country. The rationale behind forming the group was to become more competitive in bidding for federal and regional government contracts. Another reason was to increase consolidated profitability by lowering the cost of materials and using combined assets more efficiently. Disjointed technological capabilities of the individual companies impede gathering the data needed to make decisions on both handling materials and allocating the resources. What improvement opportunity does this represent?",
    options: {
      A: "Create a business model canvas to outline business needs",
      B: "Deploy a new system across the companies",
      C: "Enhance access to the relevant information",
      D: "Develop a repository of information from each company"
    },
    correctAnswer: "C",
    babokSection: "Section 6.1: Analyze Current State",
    explanation: "Improving disjointed technological capabilities to compile combined analytics constitutes an opportunity to Enhance Access to Relevant Information (Section 6.1), allowing executives to drive better consolidation and material pricing strategies."
  },
  {
    id: "q316",
    number: 316,
    topic: "Requirements Analysis and Design Definition",
    text: "A software company has won a contract to implement its product for a client. As part of the implementation work, a business analyst (BA) is asked to compile information about the other client applications that will integrate with the new system and provide the information graphically. To establish the boundaries of the new system, the business leaders need to know the interfacing client applications and the type of information that will be exchanged between the existing and new systems. Which type of diagram should the BA use?",
    options: {
      A: "Process",
      B: "Sequence",
      C: "Activity",
      D: "Context"
    },
    correctAnswer: "D",
    babokSection: "Section 7.1: Specify and Model Requirements",
    explanation: "According to BABOK v3 Section 7.1, a Context Diagram (which is a type of scope model) graphically represents a system in its environment, showing the external interfacing entities and the core flows of information exchanged across boundaries."
  },
  {
    id: "q317",
    number: 317,
    topic: "Strategy Analysis",
    text: "Contracts are currently managed by more than 20 contract owners across the organization, each happily managing in their own way. A business analyst (BA) is tasked to elicit requirements for centrally managing software maintenance and license contracts. Which of the following does the BA need to carry out first?",
    options: {
      A: "Identify business requirements",
      B: "Identify future state conditions",
      C: "Recommend an off the shelf product",
      D: "Complete an enterprise readiness assessment"
    },
    correctAnswer: "A",
    babokSection: "Section 6.1: Analyze Current State",
    explanation: "Before defining any future state, recommending solutions, or auditing technical capacity, a business analyst must identify the overall high-level Business Requirements and strategic goals of the initiative (Section 6.1)."
  },
  {
    id: "q318",
    number: 318,
    topic: "Requirements Life Cycle Management",
    text: "An online stock trading system is under implementation. Which of the following events can be considered as a trigger for re-prioritization?",
    options: {
      A: "A team member has left the project and is being replaced",
      B: "A new initial public offering in the stock market is introduced",
      C: "Further dependencies among solution components are uncovered",
      D: "Number of reported quality defects is growing through phases"
    },
    correctAnswer: "C",
    babokSection: "Section 5.3: Prioritize Requirements",
    explanation: "Uncovering further dependencies (or discovering conflicts) among solution elements requires re-evaluating the sequence or feasibility of requirements, eliciting mandatory re-prioritization (Section 5.3)."
  },
  {
    id: "q319",
    number: 319,
    topic: "Elicitation and Collaboration",
    text: "The business sponsor of a project to automate a high risk, high profile process has expressed concerns that some activities people perform will be missed. The business analyst (BA) has already created a process flow with associated user stories. Which of the following actions will address the sponsor's concerns?",
    options: {
      A: "Record the concerns in the risk register",
      B: "Schedule a formal review with the stakeholders",
      C: "Demonstrate traceability to the business case",
      D: "Review the final approved elicitation results"
    },
    correctAnswer: "B",
    babokSection: "Section 4.4: Manage Stakeholder Collaboration",
    explanation: "Scheduling an elements/story walkthrough or a formal stakeholder review meeting (Section 4.4) is the best and most transparent collaborative asset to gain alignment, alleviate safety/functional concerns, and prove that no manual actions were missed."
  },
  {
    id: "q320",
    number: 320,
    topic: "Requirements Analysis and Design Definition",
    text: "Whilst working on business requirements to improve a process, a business analyst (BA) has created flowcharts from the viewpoint of several different users. The stakeholders have expressed some confusion because the flows seem inconsistent. What ensures that the process models relate to each other?",
    options: {
      A: "Roles and Permissions Matrix",
      B: "Organizational Model",
      C: "Future State Description",
      D: "Information Architecture"
    },
    correctAnswer: "A",
    babokSection: "Section 7.1: Specify and Model Requirements",
    explanation: "In process mapping, when different operators possess different lanes or viewpoints, a Roles and Responsibilities Matrix (or Access Matrix) clarifies the relative boundaries and ensures distinct flows connect accurately without contradiction."
  },
  {
    id: "q321",
    number: 312,
    topic: "Strategy Analysis",
    text: "The business analyst (BA) has been tasked with assessing and recommending the best solution that fits an organization's need for a new third-party sales tool. What technique would be used for identifying suitable options?",
    options: {
      A: "Balanced scorecard",
      B: "Decision analysis",
      C: "Vendor assessment",
      D: "Process analysis"
    },
    correctAnswer: "A",
    babokSection: "Section 6.4: Define Change Strategy",
    explanation: "According to BABOK v3 Section 6.4, when identifying potential solution approaches or opportunities, the Balanced Scorecard is specifically used to evaluate high-level strategic alignment and map strategic dimensions against options."
  },
  {
    id: "q322",
    number: 322,
    topic: "Business Analysis Planning and Monitoring",
    text: "A business analyst (BA) is defining the decision making process for changes raised during a project and wants to understand the decision making authorities within the company. What might the BA do to gather this information?",
    options: {
      A: "Market analysis",
      B: "Focus group",
      C: "Survey",
      D: "Cost benefit analysis"
    },
    correctAnswer: "B",
    babokSection: "Section 3.3: Plan Business Analysis Governance",
    explanation: "Focus groups (Section 3.3) and structured collaborative meetings with key managers are excellent to pinpoint corporate hierarchies, discover who has change approvals, and formalize decision-making roles for governance."
  },
  {
    id: "q323",
    number: 323,
    topic: "Elicitation and Collaboration",
    text: "A company wants to launch an existing product in another channel and the business analyst (BA) is starting to perform the stakeholder analysis. Legend: Influence/Impact 1 to 5 (1 = very limited: 5 = very high). What values for influence and impact will the BA assign to marketing?",
    options: {
      A: "Influence = 3 and impact = 3",
      B: "Influence = 1 and impact = 3",
      C: "Influence = 3 and impact = 1",
      D: "Influence = 5 and impact = 5"
    },
    correctAnswer: "D",
    babokSection: "Section 3.2: Plan Stakeholder Engagement",
    explanation: "Launching a product into a brand new sales channel has direct and paramount consequences on the marketing department, making marketing a key driver with very high influence (5) and maximum operational impact (5) (Section 3.2)."
  },
  {
    id: "q324",
    number: 324,
    topic: "Elicitation and Collaboration",
    text: "A business analyst (BA) facilitated elicitation activities with subject matter experts and end users using observation, workshops, and interviews. After comparing the results, how should the BA resolve the variations?",
    options: {
      A: "Identify a few key stakeholders to resolve the conflicts",
      B: "Set up additional activities to collaboratively resolve the issues",
      C: "Remove requirements that cause differences",
      D: "Weight the results from the observation because it is more reliable"
    },
    correctAnswer: "B",
    babokSection: "Section 4.3: Confirm Elicitation Results",
    explanation: "When elicitation techniques yield conflicting requirements or differing perspectives, Section 4.3 instructs BAs to hold collaborative workshops or focus groups to bring stakeholders together and resolve discrepancies."
  },
  {
    id: "q325",
    number: 325,
    topic: "Elicitation and Collaboration",
    text: "The business analyst (BA) is facilitating a requirements workshop with a large group of diverse stakeholders, some of whom are not entirely familiar with the goals and objectives of the project. The BA must understand the business domain, corporate culture, group dynamics, and expected outputs to adequately communicate the __________.",
    options: {
      A: "change strategy.",
      B: "requirements prioritization.",
      C: "elicitation scope.",
      D: "enterprise architecture."
    },
    correctAnswer: "C",
    babokSection: "Section 4.1: Prepare for Elicitation",
    explanation: "According to BABOK v3 Section 4.1, understanding domain culture, participant styles, and operational outputs allows BAs to establish and accurately communicate the Elicitation Scope to workshop attendees."
  },
  {
    id: "q326",
    number: 326,
    topic: "Requirements Analysis and Design Definition",
    text: "A business analyst (BA) has been writing requirements for a project that has several stakeholders with varying levels of product expertise. What must the BA take into consideration to meet stakeholder perspectives?",
    options: {
      A: "The competency of individual stakeholders",
      B: "The format of the requirements",
      C: "The types of diagrams produced",
      D: "The level of decomposition needed"
    },
    correctAnswer: "D",
    babokSection: "Section 7.1: Specify and Model Requirements",
    explanation: "Section 7.1 states that requirements must be decomposed and presented at varying levels of detail depending on the stakeholder's domain knowledge and expertise. Highly technical teams need deep decomposition, while business champions require high-level objectives."
  },
  {
    id: "q327",
    number: 327,
    topic: "Requirements Analysis and Design Definition",
    text: "A business analyst (BA) has been coordinating several meetings with stakeholders to reach consensus regarding the solution design to implement a global currency exchange system for an international bank. Consensus has not been reached yet, although BA has great communication skills and is trusted by all stakeholders. The stakeholders formally approved the business need initially. Why is there disagreement?",
    options: {
      A: "The requirements are interpreted differently by each stakeholder.",
      B: "The requirements are incorrectly traced.",
      C: "The approval authority for the solution is unclear.",
      D: "More solution alternatives need to be generated."
    },
    correctAnswer: "A",
    babokSection: "Section 7.2: Verify Requirements",
    explanation: "Under Section 7.2, disagreement often arises when requirements lack clarity or are ambiguous, leading stakeholders to interpret the requirements (and solution designs) in distinct, often conflicting ways, despite agreeing on the initial problem."
  },
  {
    id: "q328",
    number: 328,
    topic: "Business Analysis Planning and Monitoring",
    text: "As part of defining the business analysis approach for a project, the business analyst (BA) identifies the key stakeholders responsible for upcoming activities for the initial phase. The BA emails each of these stakeholders and asks when they can be finished. One stakeholder does not reply, one angrily comments that it is not their job and is too busy, and two respond saying that they do not understand what is being asked of them. What competencies can the BA draw on that would best assist with getting agreement from all these stakeholders?",
    options: {
      A: "Personal accountability, time management, demonstrated trustworthiness",
      B: "Negotiation, conflict resolution, effective communication",
      C: "Industry knowledge, solution knowledge, organization knowledge",
      D: "Learning, creative thinking, problem solving"
    },
    correctAnswer: "B",
    babokSection: "Chapter 9: Underlying Competencies",
    explanation: "This scenario highlights clear communication failures, active role disputes, and resistance. To resolve these friction points, the business analyst must draw upon Negotiation, Conflict Resolution, and Effective Communication (Chapter 9) to align minds."
  },
  {
    id: "q329",
    number: 329,
    topic: "Strategy Analysis",
    text: "A business analyst (BA) has engaged various groups from across the organization to define the business opportunity a potential project will address. The BA must consolidate the information collected from the groups. The BA should ensure the business needs __________.",
    options: {
      A: "are traceable to their source stakeholders.",
      B: "are articulated from the enterprise perspective.",
      C: "describe the potential solutions that they will satisfy.",
      D: "have minimal risk associated with them."
    },
    correctAnswer: "C",
    babokSection: "Section 6.1: Analyze Current State",
    explanation: "Under Section 6.1, a consolidated business need should describe the problem/opportunity clearly and state the potential solutions (and values) that they will satisfy to guarantee alignment across organizational domains."
  },
  {
    id: "q330",
    number: 330,
    topic: "Elicitation and Collaboration",
    text: "In requirements elicitation effort, the business analyst (BA) needs to define boundaries for business domains, categorize and create a hierarchy of items, and show data sources and their relationships for specific audiences. Which of the following modeling formats should the BA use?",
    options: {
      A: "Diagrams",
      B: "Graphics",
      C: "Matrices",
      D: "Prototype"
    },
    correctAnswer: "A",
    babokSection: "Section 7.1: Specify and Model Requirements",
    explanation: "Under Section 7.1, Diagrams are the core modeling format used to categorize hierarchies, establish functional organizational boundaries, and map out entity relationship structures clearly for diverse stakeholders."
  }
];
