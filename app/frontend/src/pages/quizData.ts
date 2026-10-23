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
  {
    id: 'c11',
    domainId: 'cloud',
    topic: 'Cloud benefits',
    text: 'A media company needs to convert 5,000 video files. It launches 40 Azure VMs for 3 hours, then deletes them when done. Which cloud pricing benefit allows this without buying physical hardware?',
    options: ['Consumption-based model', 'Fixed asset depreciation', 'CapEx licensing', 'Single-tenant hosting'],
    correctIndex: 0,
    explanation: 'Consumption-based pricing allows you to spin up massive compute capacity on demand and pay strictly for the exact hours or seconds used, with zero upfront capital commitment.',
  },
  {
    id: 'c12',
    domainId: 'cloud',
    topic: 'Shared responsibility',
    text: 'In an Infrastructure as a Service (IaaS) deployment, which task is the sole responsibility of the customer?',
    options: ['Maintaining physical datacenter servers', 'Replacing faulty storage hardware', 'Patching the guest operating system', 'Maintaining physical power and cooling'],
    correctIndex: 2,
    explanation: 'With IaaS (such as Azure VMs), Microsoft manages the underlying physical infrastructure, while the customer is responsible for installing, configuring, and patching the guest operating system.',
  },
  {
    id: 'c13',
    domainId: 'cloud',
    topic: 'Cloud benefits',
    text: 'Which cloud attribute refers to the ability to rapidly develop, test, and launch new services in minutes instead of waiting months for physical hardware procurement?',
    options: ['Cloud agility', 'Vertical scaling', 'Predictive latency', 'Hardware redundancy'],
    correctIndex: 0,
    explanation: 'Agility is the ability to rapidly provision and deploy cloud services to innovate and respond quickly to market changes.',
  },
  {
    id: 'c14',
    domainId: 'cloud',
    topic: 'Financial models',
    text: 'Which scenario represents a Capital Expenditure (CapEx)?',
    options: ['Paying a monthly subscription for Azure resources', 'Purchasing $40,000 worth of physical servers and rack cooling upfront', 'Paying per gigabyte stored in Azure Blob Storage', 'Autoscaling an App Service plan for an evening event'],
    correctIndex: 1,
    explanation: 'CapEx is upfront spending on physical assets like servers, storage arrays, and network switches that are capitalized and depreciated over time.',
  },
  {
    id: 'c15',
    domainId: 'cloud',
    topic: 'Cloud models',
    text: 'An organization runs critical database workloads on-premises for compliance, while bursting customer-facing web traffic to Azure during peak seasons. Which deployment model is this?',
    options: ['Public cloud', 'Hybrid cloud', 'Private cloud', 'Multi-tenant cloud'],
    correctIndex: 1,
    explanation: 'Hybrid cloud combines private on-premises infrastructure with public cloud environments, allowing workloads and data to integrate across both.',
  },
  {
    id: 'c16',
    domainId: 'cloud',
    topic: 'Cloud benefits',
    text: 'Deploying an application to multiple Azure regions worldwide to reduce network latency for international users demonstrates which cloud benefit?',
    options: ['Geo-distribution', 'Vertical scaling', 'Disaster recovery only', 'CapEx optimization'],
    correctIndex: 0,
    explanation: 'Geo-distribution (global reach) enables applications and data to be placed in datacenters closest to end-users worldwide, minimizing latency.',
  },
  {
    id: 'c17',
    domainId: 'cloud',
    topic: 'Cloud concepts',
    text: 'Why does cloud computing benefit from "Economies of Scale"?',
    options: ['Because cloud providers purchase massive volumes of hardware, power, and bandwidth at lower per-unit costs and pass the savings on', 'Because smaller customers are charged higher rates than enterprise customers', 'Because all virtual machines share the same hard drive', 'Because cloud data is exempt from taxation'],
    correctIndex: 0,
    explanation: 'Economies of scale occur when large cloud providers like Microsoft operate at immense scale, resulting in greater efficiency and lower per-unit infrastructure costs.',
  },
  {
    id: 'c18',
    domainId: 'cloud',
    topic: 'Service types',
    text: 'Which cloud service model provides a ready-to-run software application accessed via a web browser where the provider handles all code, infrastructure, and updates?',
    options: ['IaaS', 'PaaS', 'SaaS', 'Serverless container instances'],
    correctIndex: 2,
    explanation: 'SaaS (like Microsoft 365 or Dynamics 365) provides a turnkey application managed entirely by the vendor; users simply consume the service.',
  },
  {
    id: 'c19',
    domainId: 'cloud',
    topic: 'Cloud benefits',
    text: 'What is the key difference between High Availability and Disaster Recovery?',
    options: ['High Availability prevents outages during localized failures; Disaster Recovery restores operations after catastrophic regional events', 'High Availability is for databases; Disaster Recovery is only for web apps', 'High Availability is customer-managed; Disaster Recovery is fully automated by Microsoft', 'There is no difference between the two'],
    correctIndex: 0,
    explanation: 'High Availability focuses on continuous uptime and resilience against localized component failures, while Disaster Recovery focuses on resuming business operations after major catastrophic events.',
  },
  {
    id: 'c20',
    domainId: 'cloud',
    topic: 'Cloud concepts',
    text: 'What happens to billing when an Azure Virtual Machine is placed in the "Stopped (Deallocated)" state?',
    options: ['Compute charges stop, but you still pay for allocated storage disks and static public IPs', 'All billing stops completely, including storage disks', 'You continue paying full price for compute and CPU', 'A deallocation cancellation fee is charged'],
    correctIndex: 0,
    explanation: 'Deallocating a VM releases its compute (CPU/RAM) resources so compute billing stops, but underlying persistent storage disks and reserved IPs continue to incur charges.',
  },
  {
    id: 'c21',
    domainId: 'cloud',
    topic: 'Service types',
    text: 'An event-driven compute model where developers write code blocks that execute only in response to triggers without managing server instances is called:',
    options: ['Serverless computing', 'Traditional IaaS', 'Bare-metal clustering', 'Dedicated hosting'],
    correctIndex: 0,
    explanation: 'Serverless computing abstracts infrastructure completely; servers execute code only when triggered, and billing occurs solely during active execution time.',
  },
  {
    id: 'c22',
    domainId: 'cloud',
    topic: 'Cloud benefits',
    text: 'An e-commerce store automatically adds 4 additional web front-end instances when CPU utilization crosses 80%. This is an example of:',
    options: ['Horizontal scaling (scaling out)', 'Vertical scaling (scaling up)', 'Disaster failover', 'Storage tiering'],
    correctIndex: 0,
    explanation: 'Horizontal scaling (scaling out) increases capacity by adding more compute instances to distribute the workload.',
  },
  {
    id: 'c23',
    domainId: 'cloud',
    topic: 'Shared responsibility',
    text: 'Under the shared responsibility model, who is responsible for physical datacenter security, power, and environmental controls in all cloud models?',
    options: ['The Customer', 'The Cloud Provider (Microsoft)', 'Shared equally', 'Local utility companies'],
    correctIndex: 1,
    explanation: 'In public cloud computing, physical datacenter security and environmental systems are always 100% Microsoft responsibility.',
  },
  {
    id: 'c24',
    domainId: 'cloud',
    topic: 'Cloud models',
    text: 'A company uses Microsoft Azure and Amazon Web Services (AWS) simultaneously to avoid vendor lock-in. What is this architecture called?',
    options: ['Private cloud', 'Multi-cloud', 'SaaS tenancy', 'Hyper-converged cloud'],
    correctIndex: 1,
    explanation: 'Multi-cloud describes an architecture where an organization utilizes services from two or more public cloud providers simultaneously.',
  },
  {
    id: 'c25',
    domainId: 'cloud',
    topic: 'Cloud benefits',
    text: 'Which cloud attribute allows systems to absorb hardware faults without any perceptible interruption in user service?',
    options: ['Fault tolerance', 'Elastic scaling out', 'CapEx investment', 'Predictive billing'],
    correctIndex: 0,
    explanation: 'Fault tolerance is built-in redundancy allowing a system to continue uninterrupted operation when a hardware or sub-system component fails.',
  },
  {
    id: 'c26',
    domainId: 'cloud',
    topic: 'Service types',
    text: 'When migrating a legacy application that requires custom kernel modifications and specific Windows registry settings, which cloud model should be chosen?',
    options: ['SaaS', 'PaaS', 'IaaS', 'Serverless'],
    correctIndex: 2,
    explanation: 'IaaS gives full administrative access to the operating system, allowing custom drivers, software packages, and OS registry configurations.',
  },
  {
    id: 'c27',
    domainId: 'cloud',
    topic: 'Financial models',
    text: 'Why do organizations favor OpEx-based cloud models over CapEx for unpredictable new business ventures?',
    options: ['OpEx eliminates the risk of purchasing expensive physical servers that might remain underutilized if the venture fails', 'OpEx guarantees zero operational cost', 'OpEx hardware can be resold at a profit', 'CapEx is illegal in most technology sectors'],
    correctIndex: 0,
    explanation: 'OpEx allows testing and experimenting with new ventures with zero upfront capital investment; if the project is discontinued, resources can be deallocated immediately.',
  },
  {
    id: 'c28',
    domainId: 'cloud',
    topic: 'Shared responsibility',
    text: 'In a PaaS environment (e.g., Azure App Service), who is responsible for securing customer account credentials and user access permissions?',
    options: ['Microsoft exclusively', 'The Customer', 'The local domain registrar', 'The hardware OEM'],
    correctIndex: 1,
    explanation: 'Customer identities, account credentials, and access permissions are always the customer responsibility across IaaS, PaaS, and SaaS.',
  },
  {
    id: 'c29',
    domainId: 'cloud',
    topic: 'Cloud benefits',
    text: 'Which concept refers to predictable performance and predictable cost management in Azure?',
    options: ['Predictability', 'Agility', 'Elasticity', 'Scalability'],
    correctIndex: 0,
    explanation: 'Predictability in the cloud encompasses performance predictability (ensuring SLA-backed latency and throughput) and cost predictability (accurate budgeting and forecasting).',
  },
  {
    id: 'c30',
    domainId: 'cloud',
    topic: 'Cloud models',
    text: 'Which deployment model requires the customer to purchase, house, power, and maintain all physical computing infrastructure in their own facility?',
    options: ['Public cloud', 'Private cloud (On-premises)', 'SaaS model', 'Hybrid burst cloud'],
    correctIndex: 1,
    explanation: 'A private cloud or on-premises deployment places the full burden of hardware procurement, real estate, cooling, electricity, and maintenance on the customer.',
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
  {
    id: 'a11',
    domainId: 'architecture',
    topic: 'Networking',
    text: 'Which Azure service provides a private, dedicated, high-speed connection between an on-premises datacenter and Azure that does NOT travel over the public internet?',
    options: ['Azure VPN Gateway', 'Azure ExpressRoute', 'Azure Bastion', 'Azure DNS Private Zones'],
    correctIndex: 1,
    explanation: 'Azure ExpressRoute establishes a direct, private fiber connection through a connectivity provider, bypassing the public internet for higher security, reliability, and speeds up to 100 Gbps.',
  },
  {
    id: 'a12',
    domainId: 'architecture',
    topic: 'Azure hierarchy',
    text: 'What is the correct hierarchical order of Azure governance scopes from highest to lowest?',
    options: [
      'Management Groups -> Subscriptions -> Resource Groups -> Resources',
      'Subscriptions -> Management Groups -> Resource Groups -> Resources',
      'Resource Groups -> Subscriptions -> Management Groups -> Resources',
      'Tenant -> Resource Groups -> Subscriptions -> Resources'
    ],
    correctIndex: 0,
    explanation: 'Azure governance hierarchy descends from Management Groups at the top, down to Subscriptions, then Resource Groups, and finally individual Resources.',
  },
  {
    id: 'a13',
    domainId: 'architecture',
    topic: 'Compute',
    text: 'Which service lets you deploy and manage containerized applications using the industry-standard Kubernetes orchestration platform without managing Kubernetes master nodes?',
    options: ['Azure Container Instances (ACI)', 'Azure Kubernetes Service (AKS)', 'Azure Virtual Machine Scale Sets', 'Azure App Service'],
    correctIndex: 1,
    explanation: 'Azure Kubernetes Service (AKS) is a managed container orchestration platform where Microsoft manages the Kubernetes control plane for free.',
  },
  {
    id: 'a14',
    domainId: 'architecture',
    topic: 'Azure storage',
    text: 'Which Azure storage redundancy option replicates data synchronously across three distinct Azure Availability Zones within a single region?',
    options: ['Locally Redundant Storage (LRS)', 'Zone-Redundant Storage (ZRS)', 'Geo-Redundant Storage (GRS)', 'Read-Access Geo-Redundant Storage (RA-GRS)'],
    correctIndex: 1,
    explanation: 'Zone-Redundant Storage (ZRS) copies data synchronously across three separate Availability Zones within the primary region to protect against datacenter failures.',
  },
  {
    id: 'a15',
    domainId: 'architecture',
    topic: 'Networking',
    text: 'You need to securely connect two separate Azure Virtual Networks (VNets) together so resources in both can communicate using private IP addresses. Which feature should you configure?',
    options: ['Virtual Network Peering', 'ExpressRoute Direct', 'Azure Front Door', 'Azure Traffic Manager'],
    correctIndex: 0,
    explanation: 'VNet Peering seamlessly connects two Azure Virtual Networks across the Microsoft backbone network, enabling low-latency private IP communication without gateways.',
  },
  {
    id: 'a16',
    domainId: 'architecture',
    topic: 'Azure regions',
    text: 'What is an Azure Region Pair?',
    options: [
      'Two Availability Zones inside the same datacenter building',
      'Two regions within the same geography situated at least 300 miles apart to ensure disaster recovery',
      'A primary subscription linked to a secondary subscription',
      'Two network subnets routed together'
    ],
    correctIndex: 1,
    explanation: 'Each Azure region is paired with another region within the same geography (typically 300+ miles away) to coordinate updates and provide geo-disaster recovery.',
  },
  {
    id: 'a17',
    domainId: 'architecture',
    topic: 'Compute',
    text: 'Which Azure compute resource provides identical, load-balanced virtual machines that automatically increase or decrease in count based on CPU or schedule metrics?',
    options: ['Azure Virtual Machine Scale Sets (VMSS)', 'Azure Batch', 'Azure Dedicated Host', 'Azure Cloud Services'],
    correctIndex: 0,
    explanation: 'Virtual Machine Scale Sets (VMSS) allow you to create and manage a group of load-balanced VMs that scale out or in automatically based on demand.',
  },
  {
    id: 'a18',
    domainId: 'architecture',
    topic: 'Databases',
    text: 'Which Azure database service offers a fully managed, evergreen relational database running the Microsoft SQL Server engine with 99.99% availability and automated patching?',
    options: ['Azure SQL Database', 'Azure Cosmos DB', 'Azure Cache for Redis', 'Azure Synapse Analytics'],
    correctIndex: 0,
    explanation: 'Azure SQL Database is a fully managed PaaS relational database that automatically handles upgrades, patching, backups, and high availability without downtime.',
  },
  {
    id: 'a19',
    domainId: 'architecture',
    topic: 'Compute',
    text: 'Which Azure service provides secure, seamless RDP and SSH connectivity to virtual machines directly through the Azure portal in a web browser, eliminating public IP addresses on the VMs?',
    options: ['Azure Bastion', 'Azure VPN Gateway', 'Azure Firewall', 'Network Security Group'],
    correctIndex: 0,
    explanation: 'Azure Bastion provides secure and seamless RDP/SSH connectivity to your VMs directly over TLS in the Azure portal without exposing public IP addresses on the target VMs.',
  },
  {
    id: 'a20',
    domainId: 'architecture',
    topic: 'Azure storage',
    text: 'Which Azure storage service supports standard SMB and NFS protocols, allowing on-premises and cloud servers to mount cloud file shares like a local network drive?',
    options: ['Azure Files', 'Azure Blob Storage', 'Azure Data Lake Storage', 'Azure Disk Storage'],
    correctIndex: 0,
    explanation: 'Azure Files provides fully managed file shares in the cloud accessible via industry-standard Server Message Block (SMB) and Network File System (NFS) protocols.',
  },
  {
    id: 'a21',
    domainId: 'architecture',
    topic: 'Networking',
    text: 'What is the function of Azure Virtual Network (VNet) Subnets?',
    options: [
      'Segmenting a virtual network address space into discrete IP ranges for security, routing, and organization',
      'Converting public IP addresses to domain names',
      'Billing different teams under separate invoices',
      'Backing up virtual hard disks to secondary regions'
    ],
    correctIndex: 0,
    explanation: 'Subnets allow you to segment a VNet into one or more smaller subnetworks and allocate a portion of the virtual network address space to each subnet.',
  },
  {
    id: 'a22',
    domainId: 'architecture',
    topic: 'Databases',
    text: 'An enterprise wants to migrate an existing on-premises PostgreSQL database to Azure with minimal operational overhead and automated backups. Which service should they choose?',
    options: ['Azure Database for PostgreSQL', 'Azure SQL Managed Instance', 'Azure Cosmos DB', 'Azure Storage Tables'],
    correctIndex: 0,
    explanation: 'Azure Database for PostgreSQL is a managed community-version PostgreSQL database service offering high availability, automated backups, and intelligent performance tuning.',
  },
  {
    id: 'a23',
    domainId: 'architecture',
    topic: 'Compute',
    text: 'Which Azure service runs isolated Docker containers in seconds without provisioning virtual machines or configuring Kubernetes clusters?',
    options: ['Azure Container Instances (ACI)', 'Azure App Service Plan', 'Azure Virtual Desktop', 'Azure Spring Apps'],
    correctIndex: 0,
    explanation: 'Azure Container Instances (ACI) is the fastest and simplest way to run a container in Azure without managing any virtual machines or orchestrators.',
  },
  {
    id: 'a24',
    domainId: 'architecture',
    topic: 'Azure storage',
    text: 'Which storage redundancy configuration replicates data to a secondary region hundreds of miles away to protect against regional disasters?',
    options: ['Geo-Redundant Storage (GRS)', 'Locally Redundant Storage (LRS)', 'Zone-Redundant Storage (ZRS)', 'Ephemeral Disk Storage'],
    correctIndex: 0,
    explanation: 'GRS copies your data synchronously three times within a single physical location in the primary region, and then asynchronously copies it to a secondary paired region.',
  },
  {
    id: 'a25',
    domainId: 'architecture',
    topic: 'Azure hierarchy',
    text: 'Can an Azure resource belong to more than one Resource Group at the same time?',
    options: ['No, each resource can belong to only one resource group at a time', 'Yes, up to 5 resource groups', 'Yes, if they are in different regions', 'Yes, for networking resources only'],
    correctIndex: 0,
    explanation: 'Each Azure resource must exist in one and only one Resource Group at any given time, although resources can be moved between resource groups.',
  },
  {
    id: 'a26',
    domainId: 'architecture',
    topic: 'Compute',
    text: 'Which service enables users to access virtualized Windows desktops and applications in the cloud from any device or operating system?',
    options: ['Azure Virtual Desktop (AVD)', 'Azure Bastion', 'Azure App Service', 'Azure Remote Storage'],
    correctIndex: 0,
    explanation: 'Azure Virtual Desktop is a desktop and app virtualization service that runs in Azure, providing multi-session Windows 10 and 11 environments.',
  },
  {
    id: 'a27',
    domainId: 'architecture',
    topic: 'Identity',
    text: 'What feature in Microsoft Entra ID enforces additional authentication checks (such as an authenticator app code or SMS) when accessing corporate resources?',
    options: ['Multifactor Authentication (MFA)', 'Single Sign-On (SSO)', 'Pass-Through Authentication', 'Self-Service Password Reset'],
    correctIndex: 0,
    explanation: 'Multifactor Authentication (MFA) requires two or more verification factors to gain access to resources, significantly reducing identity theft risk.',
  },
  {
    id: 'a28',
    domainId: 'architecture',
    topic: 'Networking',
    text: 'Which managed cloud service acts as a stateful firewall for an entire virtual network, inspecting inbound and outbound traffic with built-in high availability and cloud scalability?',
    options: ['Azure Firewall', 'Network Security Group (NSG)', 'Azure ExpressRoute', 'Application Gateway'],
    correctIndex: 0,
    explanation: 'Azure Firewall is a cloud-native, intelligent network firewall security service providing stateful packet inspection and threat intelligence filtering.',
  },
  {
    id: 'a29',
    domainId: 'architecture',
    topic: 'Hybrid Cloud',
    text: 'Which service extends Azure management and security capabilities to on-premises datacenters, AWS, and Google Cloud, allowing you to manage them from a single control plane?',
    options: ['Azure Arc', 'Azure DevOps', 'Azure Front Door', 'Azure Migrate'],
    correctIndex: 0,
    explanation: 'Azure Arc simplifies governance and management by delivering a consistent multi-cloud and on-premises management platform right from the Azure portal.',
  },
  {
    id: 'a30',
    domainId: 'architecture',
    topic: 'Compute',
    text: 'You have a web application written in Node.js and want to deploy it to Azure with auto-scaling, SSL, and custom domains without managing the underlying web server. What should you use?',
    options: ['Azure App Service', 'Azure Virtual Machines', 'Azure Blob Storage', 'Azure Logic Apps'],
    correctIndex: 0,
    explanation: 'Azure App Service is a fully managed HTTP-based PaaS service for hosting web applications, REST APIs, and mobile back ends across multiple programming languages.',
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
  {
    id: 'm11',
    domainId: 'management',
    topic: 'Cost management',
    text: 'A company is deciding whether to keep their on-premises datacenter or migrate to Azure. Which tool helps them compare the costs of both scenarios over a 3- to 5-year period?',
    options: ['Azure Pricing Calculator', 'Total Cost of Ownership (TCO) Calculator', 'Azure Cost Management', 'Azure Advisor'],
    correctIndex: 1,
    explanation: 'The TCO Calculator estimates the cost savings of migrating to Azure by comparing current on-premises infrastructure costs (power, cooling, hardware) against equivalent Azure services over time.',
  },
  {
    id: 'm12',
    domainId: 'management',
    topic: 'Governance',
    text: 'What is the primary difference between Azure Role-Based Access Control (RBAC) and Azure Policy?',
    options: [
      'RBAC focuses on user actions (who can do what), while Policy focuses on resource properties (what can be created and how)',
      'RBAC encrypts data, while Policy manages network routing',
      'RBAC is for on-premises, while Policy is for the cloud',
      'There is no difference; they are the exact same service'
    ],
    correctIndex: 0,
    explanation: 'RBAC controls access and permissions for users (e.g., who can delete a VM), whereas Azure Policy enforces rules on the resources themselves (e.g., all VMs must be in the UK South region).',
  },
  {
    id: 'm13',
    domainId: 'management',
    topic: 'Resource management',
    text: 'An administrator needs to ensure that a critical production database is not accidentally deleted by anyone, including other administrators. What should they do?',
    options: ['Apply a CanNotDelete resource lock', 'Remove everyone from the Owner role', 'Shut down the database', 'Use Azure Policy to deny all read access'],
    correctIndex: 0,
    explanation: 'A CanNotDelete (or Delete) resource lock prevents anyone, regardless of their RBAC permissions, from accidentally deleting the locked resource.',
  },
  {
    id: 'm14',
    domainId: 'management',
    topic: 'Security',
    text: 'Which Azure service provides a unified security management system that assesses your security posture, gives a secure score, and protects against threats across Azure, AWS, and on-premises?',
    options: ['Microsoft Defender for Cloud', 'Azure Key Vault', 'Microsoft Entra ID', 'Azure DDoS Protection'],
    correctIndex: 0,
    explanation: 'Microsoft Defender for Cloud (formerly Azure Security Center) is a Cloud Security Posture Management (CSPM) and Cloud Workload Protection Platform (CWPP) that secures hybrid cloud environments.',
  },
  {
    id: 'm15',
    domainId: 'management',
    topic: 'Monitoring',
    text: 'Which feature of Azure Monitor provides application performance monitoring (APM) for live web apps, including request rates, response times, and failure rates?',
    options: ['Application Insights', 'Azure Service Health', 'Network Watcher', 'Azure Log Analytics'],
    correctIndex: 0,
    explanation: 'Application Insights is an extensible APM service inside Azure Monitor used to monitor live web applications, detect performance anomalies, and diagnose issues.',
  },
  {
    id: 'm16',
    domainId: 'management',
    topic: 'Cost management',
    text: 'Which purchasing option provides the massive discounts (up to 72%) on virtual machines in exchange for a 1-year or 3-year upfront commitment?',
    options: ['Azure Reservations', 'Spot Instances', 'Pay-as-you-go', 'Azure Hybrid Benefit'],
    correctIndex: 0,
    explanation: 'Azure Reservations allow you to reserve compute capacity for a 1- or 3-year term, providing significant cost savings compared to pay-as-you-go prices.',
  },
  {
    id: 'm17',
    domainId: 'management',
    topic: 'Compliance',
    text: 'Where can a compliance officer download Microsoft’s official audit reports, ISO certifications, and regulatory compliance documents for Azure?',
    options: ['Service Trust Portal', 'Azure Support Center', 'Azure Cost Management', 'Microsoft Entra ID Dashboard'],
    correctIndex: 0,
    explanation: 'The Microsoft Service Trust Portal provides access to audit reports, compliance guides, and trust documents detailing how Microsoft protects data.',
  },
  {
    id: 'm18',
    domainId: 'management',
    topic: 'Cost management',
    text: 'What is Azure Spot Virtual Machines?',
    options: [
      'A service that lets you purchase unused Azure compute capacity at deep discounts, but the VMs can be evicted at any time if Azure needs the capacity back',
      'Virtual machines that are guaranteed to run 100% of the time with no downtime',
      'Virtual machines used strictly for storing backups',
      'A networking feature that blocks malicious traffic'
    ],
    correctIndex: 0,
    explanation: 'Spot VMs utilize unallocated Azure capacity at deep discounts, making them ideal for workloads that can handle interruptions, like batch processing or rendering.',
  },
  {
    id: 'm19',
    domainId: 'management',
    topic: 'Monitoring',
    text: 'Which service collects log data and metrics from various Azure resources into a central workspace where you can run complex query languages (KQL) to analyze the data?',
    options: ['Azure Log Analytics', 'Azure Resource Graph', 'Azure Cost Analysis', 'Azure Automation'],
    correctIndex: 0,
    explanation: 'Azure Log Analytics is the primary tool in the Azure portal used to edit and run log queries against data collected by Azure Monitor logs.',
  },
  {
    id: 'm20',
    domainId: 'management',
    topic: 'Governance',
    text: 'You have a team of developers who need to create virtual machines, but you want to enforce that they can only create affordable "Standard_B1s" size VMs to save money. What is the best way to enforce this?',
    options: ['Create and assign an Azure Policy', 'Send an email to the team asking them to comply', 'Set an Azure Budget of $0', 'Apply a CanNotDelete lock'],
    correctIndex: 0,
    explanation: 'Azure Policy is specifically designed to enforce rules and conventions on resources, such as restricting allowed virtual machine sizes to prevent budget overruns.',
  },
  {
    id: 'm21',
    domainId: 'management',
    topic: 'Cost management',
    text: 'Which of the following factors does NOT affect the cost of an Azure service?',
    options: ['The time of day the resource was created', 'The Azure Region where the resource is deployed', 'The tier/size of the resource', 'The resource type (e.g., VM vs Storage)'],
    correctIndex: 0,
    explanation: 'Resource costs are determined by type, size/tier, location (region), and usage duration. The time of day it was created does not change the billing rate.',
  },
  {
    id: 'm22',
    domainId: 'management',
    topic: 'Identity',
    text: 'A company wants to allow employees to log into Azure using their existing on-premises Active Directory passwords. Which technology allows this synchronization?',
    options: ['Microsoft Entra Connect (Azure AD Connect)', 'Azure ExpressRoute', 'Azure VPN Gateway', 'Azure Bastion'],
    correctIndex: 0,
    explanation: 'Microsoft Entra Connect synchronizes user identities and passwords between an on-premises Active Directory and the cloud-based Microsoft Entra ID.',
  },
  {
    id: 'm23',
    domainId: 'management',
    topic: 'Monitoring',
    text: 'Which part of Azure Monitor actively notifies you via email or SMS when a specific condition is met, such as CPU usage exceeding 90% for 5 minutes?',
    options: ['Azure Alerts', 'Azure Dashboards', 'Azure Advisor', 'Azure Workbooks'],
    correctIndex: 0,
    explanation: 'Azure Alerts proactively notify you or trigger automated actions when monitoring data indicates that a predefined threshold or condition has been met.',
  },
  {
    id: 'm24',
    domainId: 'management',
    topic: 'Identity',
    text: 'What feature of Microsoft Entra ID allows you to require MFA only when a user logs in from an unfamiliar location or non-compliant device?',
    options: ['Conditional Access', 'Role-Based Access Control', 'Azure Policy', 'Resource Locks'],
    correctIndex: 0,
    explanation: 'Conditional Access evaluates signals (like IP location, device state, or risk) and applies policies to enforce organizational rules, such as requiring MFA only when risk is detected.',
  },
  {
    id: 'm25',
    domainId: 'management',
    topic: 'Governance',
    text: 'What is the Microsoft Cloud Adoption Framework (CAF) for Azure?',
    options: [
      'A collection of documentation, best practices, and tools that provides guidance for the entire cloud migration and adoption journey',
      'A physical hardware appliance used to transfer terabytes of data to Azure',
      'A strict legal contract required to use Azure',
      'A pricing tier for enterprise customers'
    ],
    correctIndex: 0,
    explanation: 'The Cloud Adoption Framework provides proven guidance spanning Strategy, Plan, Ready, Adopt, Govern, and Manage phases to help organizations succeed in the cloud.',
  },
  {
    id: 'm26',
    domainId: 'management',
    topic: 'Cost management',
    text: 'A company has existing Windows Server and SQL Server licenses with active Software Assurance. How can they use these to significantly reduce the cost of Azure VMs?',
    options: ['Azure Hybrid Benefit', 'Azure Reservations', 'Spot Instances', 'Free Tier'],
    correctIndex: 0,
    explanation: 'Azure Hybrid Benefit allows you to bring your existing on-premises Windows Server and SQL Server licenses to Azure, significantly reducing the compute costs.',
  },
  {
    id: 'm27',
    domainId: 'management',
    topic: 'Monitoring',
    text: 'If you want to view the current and historical health of the specific Azure resources you have deployed (e.g., seeing if your specific VM host failed), which tool do you use?',
    options: ['Azure Resource Health', 'Azure Service Health', 'Azure Status Page', 'Azure Advisor'],
    correctIndex: 0,
    explanation: 'Azure Resource Health provides a dashboard tailored specifically to the health of your individual resources, unlike Service Health which tracks broader regional outages.',
  },
  {
    id: 'm28',
    domainId: 'management',
    topic: 'Security',
    text: 'Which principle is the foundation of the "Zero Trust" security model?',
    options: ['Never trust, always verify', 'Trust everyone inside the corporate network', 'Only trust devices with antivirus software', 'Passwords are the only required security measure'],
    correctIndex: 0,
    explanation: 'Zero Trust assumes breach and verifies every request as though it originates from an open network, using the mantra "Never trust, always verify."',
  },
  {
    id: 'm29',
    domainId: 'management',
    topic: 'Infrastructure as code',
    text: 'What is an ARM (Azure Resource Manager) Template?',
    options: [
      'A JSON file that defines the infrastructure and configuration for your project in a declarative way',
      'A graphical dashboard for viewing costs',
      'A command-line interface for Linux',
      'An automated backup schedule'
    ],
    correctIndex: 0,
    explanation: 'ARM templates use JSON syntax to define the resources you want to deploy, allowing you to implement Infrastructure as Code (IaC) reliably and repeatedly.',
  },
  {
    id: 'm30',
    domainId: 'management',
    topic: 'Governance',
    text: 'Which Azure feature allows you to execute PowerShell or Python scripts automatically to manage cloud operations, like turning off unused VMs at 6 PM every day?',
    options: ['Azure Automation', 'Azure Policy', 'Microsoft Entra ID', 'Azure Blueprints'],
    correctIndex: 0,
    explanation: 'Azure Automation delivers cloud-based automation and configuration capabilities, such as running runbooks (scripts) to automate frequent, time-consuming management tasks.',
  }
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