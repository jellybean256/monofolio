export interface DeveloperProfile {
  name: string;
  role: string;
  location: string;
  avatarUrl: string;
  bio: string;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  handle: string;
  icon: 'github' | 'linkedin' | 'twitter' | 'mail';
  ariaLabel: string;
}

export interface ProjectLink {
  label: 'Live Demo' | 'Repository' | 'Project Page' | 'Overview';
  url: string;
  type: 'demo' | 'repo' | 'page' | 'overview';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'public' | 'closed';
  status: string;
  technologies?: string[];
  links?: ProjectLink[];
  privateDetails?: {
    badge: string;
    notice: string;
  };
  highlightMetric?: string;
}

export interface WorkSubProject {
  name: string;
  type: string;
  url?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  current?: boolean;
  companyUrl?: string;
  domain?: string;
  description?: string;
  technologies?: string[];
  projects?: WorkSubProject[];
}

export interface Article {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime?: string;
  url: string;
  tag?: string;
}

export const developerProfile: DeveloperProfile = {
  name: "Julian Vance",
  role: "Staff Systems & Full-Stack Engineer",
  location: "San Francisco, CA",
  avatarUrl: "/Lee Han Yoil.jpg",
  bio: "Specializing in distributed systems, real-time sync engines, and developer infrastructure. Building deep-module software with zero unnecessary latency and rigorous ergonomics.",
};

export const socialLinks: SocialLink[] = [
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/julianvance",
    handle: "@julianvance",
    icon: "github",
    ariaLabel: "Julian Vance's GitHub Profile",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://linkedin.com/in/julianvance",
    handle: "/in/julianvance",
    icon: "linkedin",
    ariaLabel: "Connect with Julian Vance on LinkedIn",
  },
  {
    id: "twitter",
    name: "X / Twitter",
    url: "https://x.com/julianvance",
    handle: "@julianvance",
    icon: "twitter",
    ariaLabel: "Follow Julian Vance on X",
  },
  {
    id: "email",
    name: "Email",
    url: "mailto:julian.vance@engineer.dev",
    handle: "julian.vance@engineer.dev",
    icon: "mail",
    ariaLabel: "Send an email to Julian Vance",
  },
];

export const publicProjects: Project[] = [
  {
    id: "vortex-kv",
    title: "Vortex KV",
    description: "Distributed in-memory key-value engine with Raft consensus, lock-free ring buffers, and sub-millisecond p99 latency.",
    category: "public",
    status: "Active",
    technologies: ["Rust", "Tokio", "Raft", "gRPC", "Prometheus"],
    highlightMetric: "1.4M ops/s @ p99 < 1.1ms",
    links: [
      { label: "Live Demo", url: "https://vortex-kv-demo.dev", type: "demo" },
      { label: "Repository", url: "https://github.com/julianvance/vortex-kv", type: "repo" },
      { label: "Overview", url: "https://vortex-kv-demo.dev/architecture", type: "overview" },
    ],
  },
  {
    id: "hypertrace-agent",
    title: "HyperTrace APM",
    description: "Zero-overhead distributed kernel probe telemetry agent extracting RPC flows and TCP latency without application bytecode changes.",
    category: "public",
    status: "Production",
    technologies: ["Go", "eBPF", "OpenTelemetry", "ClickHouse", "React"],
    highlightMetric: "<0.2% CPU runtime overhead",
    links: [
      { label: "Live Demo", url: "https://hypertrace-demo.dev", type: "demo" },
      { label: "Repository", url: "https://github.com/julianvance/hypertrace", type: "repo" },
    ],
  },
  {
    id: "lattice-engine",
    title: "Lattice UI Kit",
    description: "Ultra-compact headless component engine engineered specifically for dense single-screen dashboards and terminal-style tools.",
    category: "public",
    status: "Beta",
    technologies: ["TypeScript", "Astro", "Tailwind CSS", "Web Components"],
    highlightMetric: "100% WCAG AAA Compliant",
    links: [
      { label: "Project Page", url: "https://lattice-ui.dev", type: "page" },
      { label: "Repository", url: "https://github.com/julianvance/lattice-ui", type: "repo" },
    ],
  },
];

export const closedProjects: Project[] = [
  {
    id: "aegis-settlement",
    title: "Aegis Core Settlement Engine",
    description: "High-throughput financial ledger handling multi-asset clearing and atomic settlement under strict regulatory requirements.",
    category: "closed",
    status: "Proprietary",
    technologies: ["Go", "Kafka", "PostgreSQL", "AWS KMS", "HSM"],
    highlightMetric: "$4.8B daily clearing volume",
    privateDetails: {
      badge: "Proprietary Banking Infrastructure",
      notice: "Closed-source financial core subject to enterprise NDA and regulatory controls. Source code not available.",
    },
    links: [
      { label: "Overview", url: "https://aegis-case-study.dev/architecture-summary", type: "overview" },
    ],
  },
  {
    id: "sentinel-telemetry-grid",
    title: "Sentinel Fleet Telemetry Mesh",
    description: "Autonomous edge vehicle telemetry aggregator streaming encrypted CAN bus metrics from 50,000+ connected industrial units.",
    category: "closed",
    status: "Internal Engine",
    technologies: ["Rust", "MQTT", "TimescaleDB", "Kubernetes", "gRPC"],
    highlightMetric: "50,000 active edge units",
    privateDetails: {
      badge: "Enterprise Fleet System",
      notice: "Air-gapped telemetry infrastructure. Internal deployment only. Source code restricted.",
    },
  },
  {
    id: "chronos-queue",
    title: "Chronos Queue",
    description: "Distributed delayed job scheduler with millisecond precision and Raft replication.",
    category: "public",
    status: "Production",
    technologies: ["Go", "Raft", "Redis"],
    links: [{ label: "Repository", url: "https://github.com/julianvance/chronos", type: "repo" }],
  },
  {
    id: "strata-storage",
    title: "Strata Storage",
    description: "Tiered columnar cold-storage format optimized for fast analytical range queries.",
    category: "closed",
    status: "Internal Engine",
    technologies: ["Rust", "Arrow", "Parquet"],
  },
  {
    id: "prism-proxy",
    title: "Prism Proxy",
    description: "Low-latency TLS terminating mesh gateway with zero-copy packet forwarding.",
    category: "public",
    status: "Active",
    technologies: ["C", "eBPF", "OpenSSL"],
    links: [{ label: "Repository", url: "https://github.com/julianvance/prism", type: "repo" }],
  },
  {
    id: "nexus-rpc",
    title: "Nexus RPC",
    description: "Zero-copy serialization protocol and IPC framework for embedded microservices.",
    category: "public",
    status: "Active",
    technologies: ["Rust", "Cap'n Proto"],
    links: [{ label: "Repository", url: "https://github.com/julianvance/nexus", type: "repo" }],
  },
  {
    id: "orion-inference-router",
    title: "Orion Dynamic Inference Gateway",
    description: "Adaptive tensor batching gateway and GPU load distributor routing millions of tokens per second with priority queues.",
    category: "closed",
    status: "Production",
    technologies: ["Python", "C++", "Triton Server", "Redis", "CUDA"],
    highlightMetric: "16ms median dispatch latency",
    privateDetails: {
      badge: "Confidential Enterprise ML",
      notice: "Proprietary high-frequency routing algorithm. Internal enterprise access only.",
    },
  },
];

export const allProjects: Project[] = [...publicProjects, ...closedProjects];

export const workHistory: WorkExperience[] = [
  {
    id: "vortex-labs",
    company: "Vortex Labs",
    role: "Staff Systems Architect",
    period: "2023 — Present",
    current: true,
    companyUrl: "https://github.com/julianvance/vortex-kv",
    domain: "Distributed Systems",
    description: "Leading core engine architecture for low-latency consensus, Raft replication, and lock-free state machines. Reduced tail latency across global clusters by 42%.",
    technologies: ["Rust", "Tokio", "Raft", "eBPF", "Prometheus"],
    projects: [
      { name: "Vortex KV Engine", type: "Key-Value Store", url: "https://vortex-kv-demo.dev" },
      { name: "Raft Consensus Core", type: "Protocol", url: "https://github.com/julianvance/vortex-kv" },
      { name: "Cluster Rebalancer", type: "Distributed Ops" },
    ],
  },
  {
    id: "aegis-financial",
    company: "Aegis Financial",
    role: "Senior Staff Infrastructure Engineer",
    period: "2021 — 2023",
    current: false,
    companyUrl: "https://aegis-case-study.dev/architecture-summary",
    domain: "Fintech Core",
    description: "Engineered multi-asset clearing and atomic settlement ledger handling $4.8B in daily transactional volume with deterministic audit guarantees.",
    technologies: ["Go", "Kafka", "PostgreSQL", "AWS KMS", "HSM"],
    projects: [
      { name: "Aegis Settlement Engine", type: "Core Ledger" },
      { name: "Idempotent Event Stream", type: "Streaming Pipeline" },
      { name: "HSM Multi-Sig Vault", type: "Security" },
    ],
  },
  {
    id: "hypertrace-telemetry",
    company: "HyperTrace Systems",
    role: "Principal Systems Engineer",
    period: "2018 — 2021",
    current: false,
    companyUrl: "https://github.com/julianvance/hypertrace",
    domain: "Kernel & APM",
    description: "Pioneered zero-overhead Linux eBPF kernel probes extracting TCP socket latency and distributed RPC spans without application bytecode modification.",
    technologies: ["Go", "C", "eBPF", "ClickHouse", "OpenTelemetry"],
    projects: [
      { name: "HyperTrace Agent", type: "Kernel APM", url: "https://hypertrace-demo.dev" },
      { name: "ClickHouse Spans Sink", type: "Data Storage" },
      { name: "eBPF Socket Filter", type: "Kernel Module" },
    ],
  },
  {
    id: "lattice-networks",
    company: "Lattice Networks",
    role: "Senior Full-Stack Engineer",
    period: "2015 — 2018",
    current: false,
    companyUrl: "https://lattice-ui.dev",
    domain: "Developer Tooling",
    description: "Built real-time telemetry dashboards and reactive state-synchronization protocols for enterprise network operators and reliability teams.",
    technologies: ["TypeScript", "React", "Node.js", "WebSockets", "Docker"],
    projects: [
      { name: "Lattice UI Components", type: "UI Kit", url: "https://lattice-ui.dev" },
      { name: "Network Mesh Visualizer", type: "Web Canvas" },
    ],
  },
  {
    id: "cloudscale-core",
    company: "CloudScale Core",
    role: "Infrastructure Systems Engineer",
    period: "2014 — 2015",
    current: false,
    domain: "Cloud Infrastructure",
    description: "Automated distributed container scheduling and virtual overlay network routing.",
    technologies: ["Python", "Linux", "Open vSwitch"],
  },
  {
    id: "kernelworks",
    company: "KernelWorks",
    role: "Distributed Systems Developer",
    period: "2013 — 2014",
    current: false,
    domain: "Storage & Kernels",
    description: "Contributed to distributed file systems and asynchronous disk I/O schedulers.",
    technologies: ["C", "Linux", "POSIX"],
  },
  {
    id: "bitstream-labs",
    company: "BitStream Labs",
    role: "Software Engineer Intern",
    period: "2012 — 2013",
    current: false,
    domain: "Networking",
    description: "Built TCP throughput benchmarking test harnesses and visualization pipelines.",
    technologies: ["Python", "C++", "D3.js"],
  },
];

export const writingArticles: Article[] = [
  {
    id: "taste-is-a-skill",
    title: "Taste Is a Skill",
    description: "Why good software feels different.",
    date: "Aug 30, 2026",
    readTime: "5 min read",
    url: "#taste-is-a-skill",
    tag: "Philosophy",
  },
  {
    id: "more-than-a-portfolio",
    title: "A little more than a portfolio",
    description: "Why this site exists work, experiments, ideas, and things I'm learning along the way.",
    date: "Aug 28, 2026",
    readTime: "4 min read",
    url: "#more-than-a-portfolio",
    tag: "Reflections",
  },
  {
    id: "zero-overhead-ebpf",
    title: "Zero-Overhead Profiling with Linux eBPF",
    description: "Extracting TCP latency, socket queuing, and CPU scheduler contention directly from kernel probes.",
    date: "Aug 14, 2026",
    readTime: "8 min read",
    url: "#zero-overhead-ebpf",
    tag: "Systems",
  },
  {
    id: "ergonomics-zero-copy",
    title: "The ergonomics of zero-copy systems",
    description: "Eliminating allocations without killing API readability or developer ergonomics.",
    date: "Jul 14, 2026",
    readTime: "6 min read",
    url: "#ergonomics-zero-copy",
    tag: "Architecture",
  },
  {
    id: "immediate-software",
    title: "Software should feel immediate",
    description: "Thoughts on latency budgets, perceived responsiveness, and physical interfaces.",
    date: "Jun 02, 2026",
    readTime: "4 min read",
    url: "#immediate-software",
    tag: "Design",
  },
];


