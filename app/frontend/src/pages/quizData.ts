export interface Domain {
  id: string;
  title: string;
  short: string;
  description: string;
  weight: string;
  color: string;
}

export interface Question {
  id: string;
  domainId: string;
  topic: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface AnswerRecord {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
}

export interface Attempt {
  date: string;
  domainId: string;
  correct: number;
  total: number;
  weakTopics: string[];
}

export const domains: Domain[] = [
  {
    id: 'cloud',
    title: 'Cloud concepts',
    short: 'Cloud concepts',
    description: 'Build your foundation. Explore cloud models, benefits, and service types.',
    weight: '25–30%',
    color: 'purple',
  },
  {
    id: 'architecture',
    title: 'Azure architecture & services',
    short: 'Architecture & services',
    description: 'Get to know Azure. Discover compute, networking, storage, and more.',
    weight: '35–40%',
    color: 'teal',
  },
  {
    id: 'management',
    title: 'Azure management & governance',
    short: 'Management & governance',
    description: 'Take control. Understand costs, governance, and monitoring tools.',
    weight: '30–35%',
    color: 'orange',
  },
];

export const questions: Question[] = [
  // ==========================================
  // CLOUD CONCEPTS (10 Questions)
  // ==========================================
  {
    id: 'c1',
    domainId: 'cloud',
    topic: 'Cloud models',
    text: 'A company uses its own datacenter and Azure resources together. Which cloud model is this?',
    options: ['Public cloud', 'Private cloud', 'Hybrid cloud', 'Software as a service'],
    correctIndex: 2,
    explanation: 'A hybrid cloud combines on-premises infrastructure (private cloud) with public cloud resources, allowing data and applications to be shared across environments.',
  },
  {
    id: 'c2',
    domainId: 'cloud',
    topic: 'Service types',
    text: 'Which cloud service model gives you the most control over the operating system and installed software stack?',
    options: ['Software as a service (SaaS)', 'Platform as a service (PaaS)', 'Infrastructure as a service (IaaS)', 'Serverless computing'],
    correctIndex: 2,
    explanation: 'IaaS provides virtualized computing resources where you control and manage the OS, networking runtime, and installed software, while the provider manages physical servers.',
  },
  {
    id: 'c3',
    domainId: 'cloud',
    topic: 'Cloud benefits',
    text: 'An application automatically adds computing power during sudden traffic spikes and scales down when traffic drops. What does this demonstrate?',
    options: ['Elasticity', 'Fixed capital expense', 'Private cloud isolation', 'Fault tolerance only'],
    correctIndex: 0,
    explanation: 'Elasticity is the ability of a cloud platform to automatically allocate and deallocate resources dynamically to match changing demand.',
  },
  {
    id: 'c4',
    domainId: 'cloud',
    topic: 'Shared responsibility',
    text: 'When using a SaaS product (such as Microsoft 365), which responsibility always remains solely with the customer?',
    options: ['Maintaining physical datacenter hardware', 'Patching the underlying guest OS', 'Securing and classifying client data and user access', 'Replacing failed disk drives'],
    correctIndex: 2,
    explanation: 'Under the shared responsibility model, the customer always retains responsibility for securing their information, data, and access credentials across all cloud deployment models.',
  },
  {
    id: 'c5',
    domainId: 'cloud',
    topic: 'Cloud benefits',
    text: 'Which cloud characteristic guarantees that an application continues running with minimum downtime even if a hardware component fails?',
    options: ['Agility', 'High availability', 'Predictability', 'Scalability'],
    correctIndex: 1,
    explanation: 'High availability ensures services remain accessible and operational over extended periods with minimal disruption, often using redundant hardware and clustering.',
  },
  {
    id: 'c6',
    domainId: 'cloud',
    topic: 'Financial models',
    text: 'Moving from a private on-premises datacenter with server purchases to a pay-as-you-go public cloud model shifts expenditure from:',
    options: ['CapEx to OpEx', 'OpEx to CapEx', 'Variable cost to Fixed cost', 'SaaS to IaaS'],
    correctIndex: 0,
    explanation: 'Cloud adoption transitions upfront hardware spending (Capital Expenditure or CapEx) into recurring pay-as-you-go operational spending (Operational Expenditure or OpEx).',
  },
  {
    id: 'c7',
    domainId: 'cloud',
    topic: 'Cloud benefits',
    text: 'Adding more CPU and memory to an existing virtual machine is an example of which scaling approach?',
    options: ['Horizontal scaling (scale out)', 'Vertical scaling (scale up)', 'Elastic scaling out', 'Geographic distribution'],
    correctIndex: 1,
    explanation: 'Vertical scaling (scaling up) involves increasing the capacity of a single resource (e.g., adding RAM/CPU), whereas horizontal scaling (scaling out) adds more resource instances.',
  },
  {
    id: 'c8',
    domainId: 'cloud',
    topic: 'Cloud models',
    text: 'Which deployment model is exclusively used by a single organization and offers total physical isolation?',
    options: ['Public cloud', 'Hybrid cloud', 'Private cloud', 'Multi-tenant community cloud'],
    correctIndex: 2,
    explanation: 'A private cloud consists of cloud computing resources dedicated exclusively to one business or organization, hosted on-premises or by a third-party service provider.',
  },
  {
    id: 'c9',
    domainId: 'cloud',
    topic: 'Service types',
    text: 'Azure App Service provides a managed environment for deploying web apps without worrying about OS configuration or hardware maintenance. Which model is this?',
    options: ['Infrastructure as a service (IaaS)', 'Platform as a service (PaaS)', 'Software as a service (SaaS)', 'Bare metal hosting'],
    correctIndex: 1,
    explanation: 'PaaS provides a managed framework and runtime environment where developers focus solely on application code and business logic without managing the OS or underlying hardware.',
  },
  {
    id: 'c10',
    domainId: 'cloud',
    topic: 'Cloud benefits',
    text: 'Which cloud feature allows an organization to recover data and resume operations quickly after a catastrophic event?',
    options: ['Disaster recovery', 'Dynamic elasticity', 'Horizontal agility', 'Total cost of ownership'],
    correctIndex: 0,
    explanation: 'Disaster recovery relies on cloud redundancy, backup services, and geo-replication to restore critical systems and maintain business continuity following major disasters.',
  },

  // ==========================================
  // AZURE ARCHITECTURE & SERVICES (10 Questions)
  // ==========================================
  {
    id: 'a1',
    domainId: 'architecture',
    topic: 'Azure regions',
    text: 'What is an Azure Availability Zone?',
    options: [
      'A billing boundary for enterprise subscriptions',
      'One or more physically separate datacenters with independent power, cooling, and networking within a region',
      'A pair of regions located 300+ miles apart',
      'A global content delivery endpoint',
    ],
    correctIndex: 1,
    explanation: 'Availability Zones are unique physical locations with independent power, cooling, and networking inside an Azure region, designed to protect workloads from datacenter-level failures.',
  },
  {
    id: 'a2',
    domainId: 'architecture',
    topic: 'Azure storage',
    text: 'Which Azure storage tier or service is specifically designed for storing unstructured binary objects like videos, backups, and images?',
    options: ['Azure Blob Storage', 'Azure Files', 'Azure Table Storage', 'Azure Queue Storage'],
    correctIndex: 0,
    explanation: 'Azure Blob Storage is optimized for massive amounts of unstructured object data, such as images, video streaming, system backups, and logs.',
  },
  {
    id: 'a3',
    domainId: 'architecture',
    topic: 'Compute',
    text: 'You need to execute short-lived, event-driven code without configuring or maintaining server instances. Which Azure service should you select?',
    options: ['Azure Virtual Machines', 'Azure Virtual Desktop', 'Azure Functions', 'Azure Dedicated Host'],
    correctIndex: 2,
    explanation: 'Azure Functions is a serverless compute service that executes event-driven code blocks on demand, abstracting server infrastructure and billing only for execution time.',
  },
  {
    id: 'a4',
    domainId: 'architecture',
    topic: 'Identity',
    text: 'What is Microsoft Entra ID (formerly Azure Active Directory)?',
    options: [
      'A virtual firewall service',
      'A cloud-based identity and access management service',
      'A relational database management system',
      'A software deployment pipeline',
    ],
    correctIndex: 1,
    explanation: 'Microsoft Entra ID is Microsoft cloud identity and access solution, providing authentication, single sign-on (SSO), and conditional access policies across cloud resources.',
  },
  {
    id: 'a5',
    domainId: 'architecture',
    topic: 'Networking',
    text: 'Which Azure service connects multiple on-premises branch offices directly to an Azure Virtual Network over an encrypted IPSec VPN tunnel across the public internet?',
    options: ['Azure ExpressRoute', 'Azure VPN Gateway', 'Azure Traffic Manager', 'Azure Bastion'],
    correctIndex: 1,
    explanation: 'Azure VPN Gateway sends encrypted traffic between an Azure Virtual Network and an on-premises location over the public Internet using Site-to-Site (IPSec/IKE) connections.',
  },
  {
    id: 'a6',
    domainId: 'architecture',
    topic: 'Azure storage',
    text: 'Which Azure storage access tier is most cost-effective for archiving data that is rarely accessed and can tolerate a retrieval latency of several hours?',
    options: ['Hot tier', 'Cool tier', 'Cold tier', 'Archive tier'],
    correctIndex: 3,
    explanation: 'The Archive tier has the lowest storage cost but the highest access cost and requires several hours of rehydration latency to read data.',
  },
  {
    id: 'a7',
    domainId: 'architecture',
    topic: 'Compute',
    text: 'Which Azure service allows you to run containerized microservices and web apps without orchestrating underlying Kubernetes clusters?',
    options: ['Azure Container Apps', 'Azure Virtual Machines', 'Azure Spring Cloud', 'Azure Front Door'],
    correctIndex: 0,
    explanation: 'Azure Container Apps is a managed serverless container platform built on Kubernetes that allows running microservices and containerized apps without managing cluster infrastructure.',
  },
  {
    id: 'a8',
    domainId: 'architecture',
    topic: 'Networking',
    text: 'What is the primary role of a Network Security Group (NSG) in Azure?',
    options: [
      'Encrypting data at rest on managed disks',
      'Filtering inbound and outbound network traffic to Azure resources in a virtual network',
      'Translating human-readable domain names into IP addresses',
      'Distributing web traffic across multiple geographic regions',
    ],
    correctIndex: 1,
    explanation: 'An NSG contains security rules that allow or deny inbound network traffic to, or outbound network traffic from, several types of Azure resources.',
  },
  {
    id: 'a9',
    domainId: 'architecture',
    topic: 'Databases',
    text: 'Which fully managed Azure database service provides globally distributed, multi-model NoSQL capabilities with single-digit millisecond latency SLAs?',
    options: ['Azure SQL Database', 'Azure Database for PostgreSQL', 'Azure Cosmos DB', 'Azure Synapse Analytics'],
    correctIndex: 2,
    explanation: 'Azure Cosmos DB is a globally distributed, multi-model NoSQL database service built for scalable, low-latency, and high-performance applications.',
  },
  {
    id: 'a10',
    domainId: 'architecture',
    topic: 'Azure hierarchy',
    text: 'Which scope sits directly above Azure Subscriptions and provides governance, policy enforcement, and access control across multiple subscriptions?',
    options: ['Resource Groups', 'Management Groups', 'Tenant Root Storage', 'Availability Sets'],
    correctIndex: 1,
    explanation: 'Management groups are containers that help you manage access, policy, and compliance across multiple Azure subscriptions systematically.',
  },

  // ==========================================
  // AZURE MANAGEMENT & GOVERNANCE (10 Questions)
  // ==========================================
  {
    id: 'm1',
    domainId: 'management',
    topic: 'Governance',
    text: 'Which Azure governance service evaluates resources for compliance and prevents deployment of resources that violate corporate standards (such as disallowed VM sizes)?',
    options: ['Azure Policy', 'Microsoft Defender for Cloud', 'Azure Monitor', 'Azure Advisor'],
    correctIndex: 0,
    explanation: 'Azure Policy enforces rules and effects over your resources so those resources stay compliant with corporate standards and service-level agreements.',
  },
  {
    id: 'm2',
    domainId: 'management',
    topic: 'Cost management',
    text: 'Which tool should you use to estimate monthly costs before provisioning any resources in Azure?',
    options: ['Azure Pricing Calculator', 'Total Cost of Ownership (TCO) Calculator', 'Azure Cost Analysis', 'Azure Budgets'],
    correctIndex: 0,
    explanation: 'The Azure Pricing Calculator allows you to configure and estimate the upfront and monthly operational costs of Azure services prior to deployment.',
  },
  {
    id: 'm3',
    domainId: 'management',
    topic: 'Monitoring',
    text: 'Which service collects, analyzes, and acts on telemetry data from your cloud and on-premises environments (including Application Insights and Log Analytics)?',
    options: ['Azure Service Health', 'Azure Monitor', 'Azure Advisor', 'Azure Bastion'],
    correctIndex: 1,
    explanation: 'Azure Monitor maximizes application availability and performance by delivering a comprehensive solution for collecting, analyzing, and acting on telemetry from cloud and on-prem assets.',
  },
  {
    id: 'm4',
    domainId: 'management',
    topic: 'Resource management',
    text: 'What happens when a "ReadOnly" lock is applied to a resource group?',
    options: [
      'Authorized users can read resources, but cannot modify or delete them',
      'All users are blocked from even reading the resource data',
      'Only tenant administrators can modify the resources',
      'The resources in the group are automatically shut down',
    ],
    correctIndex: 0,
    explanation: 'A ReadOnly lock allows authorized users to read resource configurations and data, but prevents them from updating or deleting the resources.',
  },
  {
    id: 'm5',
    domainId: 'management',
    topic: 'Access control',
    text: 'Which mechanism implements the principle of least privilege by granting specific permissions (such as Owner, Contributor, or Reader) to users and service principals?',
    options: ['Azure Policy definitions', 'Azure Role-Based Access Control (Azure RBAC)', 'Resource Locks', 'Azure Blueprints'],
    correctIndex: 1,
    explanation: 'Azure RBAC enables fine-grained access management by segregating duties and granting only the amount of access that users need to perform their jobs.',
  },
  {
    id: 'm6',
    domainId: 'management',
    topic: 'Infrastructure as code',
    text: 'Which declarative, domain-specific language developed by Microsoft simplifies authoring Infrastructure as Code (IaC) templates for Azure Resource Manager?',
    options: ['Azure PowerShell', 'Bicep', 'Ansible playbooks', 'JSON Schema v1'],
    correctIndex: 1,
    explanation: 'Bicep is a domain-specific language (DSL) that uses declarative syntax to deploy Azure resources, providing simpler syntax and cleaner code than standard ARM JSON templates.',
  },
  {
    id: 'm7',
    domainId: 'management',
    topic: 'Service health',
    text: 'Which personalized dashboard provides notifications regarding major Azure service outages, planned maintenance, and health advisories affecting your specific subscription?',
    options: ['Azure Status Page (global)', 'Azure Service Health', 'Azure Monitor Alerts', 'Azure Resource Graph'],
    correctIndex: 1,
    explanation: 'Azure Service Health provides personalized alerts and guidance when Azure service issues, planned maintenance, or changes affect your specific resources and subscriptions.',
  },
  {
    id: 'm8',
    domainId: 'management',
    topic: 'Best practices',
    text: 'Which free tool analyzes your resource telemetry and configurations to provide actionable recommendations across Cost, Security, Reliability, Performance, and Operational Excellence?',
    options: ['Azure Advisor', 'Microsoft Sentinel', 'Azure Network Watcher', 'Azure Service Fabric'],
    correctIndex: 0,
    explanation: 'Azure Advisor analyzes your configurations and usage telemetry to help optimize costs, improve performance, enhance reliability, and strengthen cloud security.',
  },
  {
    id: 'm9',
    domainId: 'management',
    topic: 'Cost management',
    text: 'Which Azure Cost Management feature allows administrators to configure automated email alerts or action groups when spending crosses a predefined percentage threshold?',
    options: ['Azure Budgets', 'Pricing Tier Sizer', 'Invoice Automator', 'Cost Allocation Rules'],
    correctIndex: 0,
    explanation: 'Azure Budgets helps you plan for and drive organizational accountability by creating spending thresholds that trigger proactive notifications when costs reach configured percentages.',
  },
  {
    id: 'm10',
    domainId: 'management',
    topic: 'Governance',
    text: 'You need to assign metadata (such as Environment: Production, CostCenter: 1042) to Azure resources to aggregate billing and simplify resource categorization. What feature should you use?',
    options: ['Resource tags', 'Management Locks', 'Entra ID Claims', 'Service Endpoints'],
    correctIndex: 0,
    explanation: 'Tags are name-value pairs applied to Azure resources, resource groups, and subscriptions to logically organize them into a taxonomy for cost tracking and operational categorization.',
  },
];

export function selectQuestions(domainId: string): Question[] {
  const selected = questions.filter(q => domainId === 'all' || q.domainId === domainId);
  for (let i = selected.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [selected[i], selected[j]] = [selected[j], selected[i]];
  }
  return selected;
}

export const historyKey = 'cloudquest-africa-attempts-v1';

export function loadHistory(): Attempt[] {
  try {
    const data: unknown = JSON.parse(localStorage.getItem(historyKey) || '[]');
    if (!Array.isArray(data)) return [];
    return data
      .filter(
        (a): a is Attempt =>
          !!a &&
          typeof a.date === 'string' &&
          typeof a.domainId === 'string' &&
          Number.isInteger(a.correct) &&
          Number.isInteger(a.total) &&
          a.total > 0 &&
          a.correct >= 0 &&
          a.correct <= a.total &&
          Array.isArray(a.weakTopics) &&
          a.weakTopics.every((t: unknown) => typeof t === 'string')
      )
      .slice(-50);
  } catch {
    return [];
  }
}