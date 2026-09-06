export interface SocialLink {
  id: string;
  name: string;
  url: string;
  handle?: string;
  icon: 'github' | 'linkedin' | 'twitter' | 'mail';
  ariaLabel?: string;
}

export interface DeveloperProfile {
  name: string;
  role: string;
  location: string;
  avatarUrl: string;
  bio: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  year: string;
  url?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  url?: string;
}

export interface WritingItem {
  id: string;
  title: string;
  date: string;
  description: string;
  url?: string;
}

export interface FullPortfolioData {
  profile: DeveloperProfile;
  socials: SocialLink[];
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  writings: WritingItem[];
}

export const defaultPortfolioData: FullPortfolioData = {
  profile: {
    name: "Julian Vance",
    role: "Staff Systems & Full-Stack Engineer",
    location: "San Francisco, CA",
    avatarUrl: "/avatar.jpg",
    bio: "Specializing in distributed systems, real-time sync engines, and developer infrastructure. Building deep-module software with zero unnecessary latency and rigorous ergonomics.",
  },
  socials: [
    {
      id: "github",
      name: "GitHub",
      url: "https://github.com/julianvance",
      icon: "github",
      ariaLabel: "Julian Vance's GitHub Profile",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      url: "https://linkedin.com/in/julianvance",
      icon: "linkedin",
      ariaLabel: "Connect with Julian Vance on LinkedIn",
    },
    {
      id: "twitter",
      name: "X / Twitter",
      url: "https://x.com/julianvance",
      icon: "twitter",
      ariaLabel: "Follow Julian Vance on X",
    },
    {
      id: "email",
      name: "Email",
      url: "mailto:julian.vance@engineer.dev",
      icon: "mail",
      ariaLabel: "Send an email to Julian Vance",
    },
  ],
  projects: [
    {
      id: "vortex-kv",
      title: "Vortex KV",
      tagline: "Distributed key-value engine",
      year: "2024",
      url: "https://vortex-kv-demo.dev",
    },
    {
      id: "hypertrace-agent",
      title: "HyperTrace APM",
      tagline: "Kernel probe telemetry agent",
      year: "2023",
      url: "https://hypertrace-demo.dev",
    },
    {
      id: "lattice-engine",
      title: "Lattice UI Kit",
      tagline: "Headless component engine",
      year: "2023",
      url: "https://lattice-ui.dev",
    },
    {
      id: "aegis-settlement",
      title: "Aegis Settlement",
      tagline: "Financial ledger engine",
      year: "2022",
      url: "https://aegis-case-study.dev/architecture-summary",
    },
    {
      id: "sentinel-telemetry-grid",
      title: "Sentinel Mesh",
      tagline: "Edge vehicle telemetry",
      year: "2021",
    },
    {
      id: "chronos-queue",
      title: "Chronos Queue",
      tagline: "Delayed job scheduler",
      year: "2021",
      url: "https://github.com/julianvance/chronos",
    },
    {
      id: "strata-storage",
      title: "Strata Storage",
      tagline: "Columnar cold-storage format",
      year: "2020",
    },
    {
      id: "prism-proxy",
      title: "Prism Proxy",
      tagline: "Low-latency mesh gateway",
      year: "2020",
      url: "https://github.com/julianvance/prism",
    },
    {
      id: "nexus-rpc",
      title: "Nexus RPC",
      tagline: "Zero-copy serialization protocol",
      year: "2019",
      url: "https://github.com/julianvance/nexus",
    },
    {
      id: "orion-inference-router",
      title: "Orion Gateway",
      tagline: "GPU inference load distributor",
      year: "2019",
    },
  ],
  experiences: [
    {
      id: "vortex-labs",
      company: "Vortex Labs",
      role: "Staff Systems Architect",
      period: "2023 — Present",
      url: "https://github.com/julianvance/vortex-kv",
    },
    {
      id: "aegis-financial",
      company: "Aegis Financial",
      role: "Senior Staff Infrastructure Engineer",
      period: "2021 — 2023",
      url: "https://aegis-case-study.dev/architecture-summary",
    },
    {
      id: "hypertrace-telemetry",
      company: "HyperTrace Systems",
      role: "Principal Systems Engineer",
      period: "2018 — 2021",
      url: "https://github.com/julianvance/hypertrace",
    },
    {
      id: "lattice-networks",
      company: "Lattice Networks",
      role: "Senior Full-Stack Engineer",
      period: "2015 — 2018",
      url: "https://lattice-ui.dev",
    },
    {
      id: "cloudscale-core",
      company: "CloudScale Core",
      role: "Infrastructure Systems Engineer",
      period: "2014 — 2015",
    },
    {
      id: "kernelworks",
      company: "KernelWorks",
      role: "Distributed Systems Developer",
      period: "2013 — 2014",
    },
    {
      id: "bitstream-labs",
      company: "BitStream Labs",
      role: "Software Engineer Intern",
      period: "2012 — 2013",
    },
  ],
  writings: [
    {
      id: "taste-is-a-skill",
      title: "Taste Is a Skill",
      description: "Why good software feels different.",
      date: "Aug 30, 2026",
      url: "#taste-is-a-skill",
    },
    {
      id: "more-than-a-portfolio",
      title: "A little more than a portfolio",
      description: "Why this site exists work, experiments, ideas, and things I'm learning along the way.",
      date: "Aug 28, 2026",
      url: "#more-than-a-portfolio",
    },
    {
      id: "zero-overhead-ebpf",
      title: "Zero-Overhead Profiling with Linux eBPF",
      description: "Extracting TCP latency, socket queuing, and CPU scheduler contention directly from kernel probes.",
      date: "Aug 14, 2026",
      url: "#zero-overhead-ebpf",
    },
    {
      id: "ergonomics-zero-copy",
      title: "The ergonomics of zero-copy systems",
      description: "Eliminating allocations without killing API readability or developer ergonomics.",
      date: "Jul 14, 2026",
      url: "#ergonomics-zero-copy",
    },
    {
      id: "immediate-software",
      title: "Software should feel immediate",
      description: "Thoughts on latency budgets, perceived responsiveness, and physical interfaces.",
      date: "Jun 02, 2026",
      url: "#immediate-software",
    },
  ],
};
