export type ProjectScreenshot = {
  src: string;
  alt: string;
  badge: string;
};

export type Project = {
  id: string;
  title: string;
  blurb: string;
  tech: string[];
  tag: "Commercial / AI" | "Enterprise Operations" | "Internal / Production" | "Commercial POS" | "Automation / Data" | "Commercial / Web";
  year: string;
  featured?: boolean;
  coverImage?: string;
  screenshotMode?: "mobile" | "desktop" | "tablet";
  aspectRatio?: string;
  brandNote?: string;
  isNda?: boolean;
  screenshots?: ProjectScreenshot[];
  caseStudy: {
    problem: string;
    architecture: string;
    outcome: string;
    highlights: string[];
  };
};

export const projects: Project[] = [
  {
    id: "fragrance-storefront",
    title: "Luxury Fragrance Direct-to-Consumer Storefront",
    blurb:
      "A mobile-first direct-to-consumer fragrance boutique purveying 100% authentic perfumes. Crafted with an intentional minimalist black-and-white luxury design that puts verified flacons and olfactory craftsmanship at center stage, backed by tactile touch ergonomics and a direct WhatsApp checkout engine.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Editorial Minimalist UI", "WhatsApp Handoff"],
    tag: "Commercial / Web",
    year: "2026",
    featured: true,
    isNda: true,
    coverImage: "/projects/murjan/01-catalog-storefront.webp",
    screenshotMode: "mobile",
    brandNote:
      "Client trademark sanitized under confidentiality. Styled with a disciplined, high-contrast monochrome (black & white) editorial palette inspired by high-end luxury perfumeries. The deliberate restraint in color strips away visual noise to emphasize verified product authenticity, batch codes, and genuine fragrance formulations.",
    screenshots: [
      {
        src: "/projects/murjan/01-catalog-storefront.webp",
        alt: "Curated Fragrance Shelves & Floating Bag Bar",
        badge: "Mobile Storefront",
      },
      {
        src: "/projects/murjan/02-whatsapp-checkout.webp",
        alt: "WhatsApp Direct Fulfillment Checkout Drawer",
        badge: "WhatsApp Handoff",
      },
    ],
    caseStudy: {
      problem:
        "In the regional fragrance market, counterfeit scents and aggressive discount clones breed skepticism among discerning perfume enthusiasts, while standard e-commerce templates feel loud, cluttered, and cheap-diluting brand credibility. The client needed a digital storefront that conveys uncompromising product authenticity and luxury stature from the very first scroll, while circumventing the high abandonment rates of multi-step credit card gateways.",
      architecture:
        "Engineered an intentional, editorial black-and-white design system using React, Vite, and Tailwind CSS. The high-contrast monochrome palette, disciplined typography, and generous negative space emulate prestigious boutique perfumeries-letting authentic flacon photography, olfactory pyramid notes, and batch-code transparency command undivided attention. Integrated mobile-first touch ergonomics: a 64px compact header passing the 500px fold test, CSS snap-scrolling shelves, tactile quick-add buttons, and slide-up bottom sheets. To eliminate checkout friction, the bag drawer serializes order details, delivery specifics, and verified batch items directly into an encoded WhatsApp dispatch URL.",
      outcome:
        "Cultivated immediate consumer trust through calm, minimalist elegance. Shoppers browse certified genuine fragrances in an uncluttered luxury environment, completing orders in under 30 seconds via WhatsApp with zero gateway fees and full cash-on-delivery batch inspection.",
      highlights: [
        "Disciplined black-and-white editorial aesthetic establishing authentic luxury prestige",
        "Product authenticity emphasis: verified batch codes, olfactory notes, and genuine flacons",
        "Direct-to-WhatsApp checkout engine bypassing payment gateway friction entirely",
        "Strict mobile ergonomics: CSS snap-scrolling shelves, 44px+ touch targets, and fold-test compliance",
        "Slide-up bottom sheet product details with sticky thumb-friendly action bars",
        "Dynamic floating order bar with iOS safe-area inset adaptation (pb-safe)",
        "Client brand name and trademark sanitized throughout interface previews",
      ],
    },
  },
  {
    id: "market-dash",
    title: "On-Demand Hypermarket Delivery Platform",
    blurb:
      "A full-stack, on-demand grocery and multi-department ordering platform designed around the client's warm gold and charcoal brand identity. Features real-time catalog search, order dispatch pipelines, and Google Gemini AI product recommendations.",
    tech: ["React", "Node.js", "Express", "Prisma", "PostgreSQL", "Gemini AI", "Tailwind CSS"],
    tag: "Commercial / Web",
    year: "2026",
    featured: true,
    coverImage: "/projects/market-dash/01-home-produce.webp",
    screenshotMode: "mobile",
    brandNote: "Custom palette tailored to the company's brand identity: deep charcoal backdrop paired with warm gold and amber accents (#D4AF37 / #C5A059), delivering a premium supermarket feel.",
    screenshots: [
      { src: "/projects/market-dash/01-home-produce.webp", alt: "Storefront", badge: "Storefront" },
      { src: "/projects/market-dash/02-meat-seafood.webp", alt: "Storefront", badge: "Storefront" },
      { src: "/projects/market-dash/03-my-orders.webp", alt: "Orders History", badge: "Orders History" },
      { src: "/projects/market-dash/04-cart-drawer.webp", alt: "Cart Drawer", badge: "Cart Drawer" },
      { src: "/projects/market-dash/05-checkout.webp", alt: "Checkout", badge: "Checkout" },
    ],
    caseStudy: {
      problem:
        "A major commercial supermarket needed a dedicated, brand-first digital ordering and delivery platform to compete directly with third-party aggregator apps (like Toters), without losing margin to high commission fees or diluting its proprietary customer experience.",
      architecture:
        "Prototyped intelligent item categorization, fuzzy search heuristics, and AI shopping assistance powered by Google Gemini AI (@google/genai). Built out into a robust full-stack platform using React on the frontend, a high-throughput Node.js/Express REST API, and PostgreSQL orchestrated via Prisma ORM. The interface features a bottom-sheet cart drawer, stateful order tracking, and custom brand styling matching the company's gold and charcoal identity.",
      outcome:
        "Delivered a blazing-fast, mobile-first ordering experience with zero dependence on aggregator commission models. Customer checkout steps were reduced to under 45 seconds with instant dispatch notifications.",
      highlights: [
        "Gemini AI product recommendations & fuzzy search",
        "Tailored dark & warm-gold brand identity (#D4AF37 / #C5A059)",
        "Full-stack architecture: React + Node.js/Express + Prisma + PostgreSQL",
        "Sub-second sliding cart drawer, multi-address management, and live order tracking",
        "Localized payment integrations including Cash on Delivery and OMT Pay",
      ],
    },
  },
  {
    id: "field-dispatch",
    title: "Power Generator Fleet Operations & Field Dispatch Command Center",
    blurb:
      "A mission-critical fleet operations and dispatch platform built specifically for industrial diesel power generators (gensets) and standby energy infrastructure. Bridges office administration with on-the-ground technicians through algorithmic route optimization, multi-division schedule boards, GPS-tagged mobile field reporting, and automated SLA overdue tracking — designed to fully digitalize physical paper work orders.",
    tech: ["React 19", "Vite", "Supabase", "Leaflet / Geospatial", "Gemini AI (@google/genai)", "Postgres (RLS)", "Route Optimization", "ExcelJS"],
    tag: "Enterprise Operations",
    year: "2026",
    featured: true,
    coverImage: "/projects/field-dispatch/01-live-command-dashboard.webp",
    screenshotMode: "desktop",
    brandNote:
      "Client trademark and personnel identities sanitized under confidentiality. Built with a high-contrast Bento UI (Emerald & Slate) optimized for high-density dispatch monitors and mobile field use.",
    screenshots: [
      {
        src: "/projects/field-dispatch/01-live-command-dashboard.webp",
        alt: "Live Command Dashboard — Fleet Map, Today's Completion, Overdue Alerts & Crew Status",
        badge: "Command Dashboard",
      },
      {
        src: "/projects/field-dispatch/02-dispatch-schedule-board.webp",
        alt: "Dispatch Schedule Board — Mechanical & Electrical Divisions, Backlog & Auto-Assign",
        badge: "Dispatch Board",
      },
      {
        src: "/projects/field-dispatch/03-fleet-operations-routing.webp",
        alt: "Fleet Operations Map — Regional Multi-Technician Routes & Travel Duration Metrics",
        badge: "Fleet Routing",
      },
      {
        src: "/projects/field-dispatch/04-technician-route-optimizer.webp",
        alt: "Technician Route Optimizer — Sequenced Stops, Live Traffic Lines & Waypoint Navigation",
        badge: "Route Optimization",
      },
      {
        src: "/projects/field-dispatch/05-field-reports-geotag.webp",
        alt: "Pending Field Reports — Technician Mobile Photo Uploads with GPS Coordinates & Job Creation",
        badge: "Field Photo Reports",
      },
      {
        src: "/projects/field-dispatch/06-technician-fleet-management.webp",
        alt: "Technician Fleet Management — Division Skills Matrix (Mechanical, Electrical, Welders) & Workload",
        badge: "Technician Roster",
      },
      {
        src: "/projects/field-dispatch/07-completed-job-history.webp",
        alt: "Completed Jobs History — Searchable Machinery Maintenance Archive with Filters",
        badge: "Service History",
      },
      {
        src: "/projects/field-dispatch/08-customer-asset-mapping.webp",
        alt: "Customer Database — Geospatial Machine Installation Locations & Satellite Clustering",
        badge: "Customer Geolocation",
      },
    ],
    caseStudy: {
      problem:
        "Maintaining mission-critical diesel power generators (gensets across hospitals, banks, retail hubs, and industrial sites) was historically hindered by operational friction between office administration and field crews. Coordinators relied on phone calls, fragmented WhatsApp messages, and multi-carbon paper slips to assign emergency breakdowns and routine SLA visits. Office staff lacked real-time visibility into technician whereabouts, leading to crisscrossing driving routes, unbalanced workloads between mechanical and electrical crews, and delayed billing caused by lost or illegible handwritten maintenance slips.",
      architecture:
        "Engineered as a full-stack operational hub connecting administrative coordinators with mobile field technicians, built with React 19, Vite, Leaflet, and Supabase Postgres with strict Row-Level Security (RLS):\n\n1. Administrative Command Center: Live regional map tracking fleet distribution across Greater Beirut and Mount Lebanon, daily completion metrics, 111+ overdue SLA alerts, and real-time crew availability.\n2. Intelligent Dispatch & Load Balancing: Division-partitioned scheduling (Mechanical, Electrical, Welders) with daily backlog staging, drag-and-drop timeline reordering, and 1-click Auto-Assign / Re-Sequence algorithms factoring technician skills and locations.\n3. Geospatial Route Optimization: Calculates Haversine distance matrices and applies time-of-day traffic heuristics (morning/evening rush hour multipliers) to optimize multi-stop routes with return-to-HQ logic.\n4. Mobile Field-to-Office Bridge: Field technicians capture on-site generator photos with GPS coordinates; dispatchers can 1-click merge them into customer profiles or instantly spin up new service jobs.\n5. Genset Asset Registry & Digital Work Orders: Per-customer machinery records tracking KVA ratings, engine serials, alternator specs, and multi-point maintenance checklists (lubrication, cooling, electrical, ATS) to systematically replace paper slips with structured digital exports.\n\nIntegrated with Google Gemini AI (@google/genai) to analyze daily schedule summaries and provide automated workload balancing suggestions.",
      outcome:
        "Bridged the office-to-field communication divide with a unified live operations platform. Slashed technician travel hours and fuel waste through sequenced routing, gave administration instant oversight across 111+ overdue maintenance alerts before catastrophic equipment downtime, and established the architecture for completely paperless field operations.",
      highlights: [
        "Live administrative dashboard tracking fleet locations, daily completion rates, and critical priority alerts",
        "Division-partitioned dispatch board (Mechanical, Electrical, Welders) with 1-click Auto-Assign & Re-Sequence",
        "Algorithmic route optimizer with time-of-day traffic multipliers and multi-stop sequence planning",
        "GPS-verified mobile field reporting with photo proof, machinery location tags, and 1-click job creation",
        "Industrial genset asset tracking: customer KVA ratings, serial numbers, ATS panels, and service history",
        "Google Gemini AI assistant (@google/genai) for schedule analysis and workload recommendations",
        "Role-based Supabase Postgres architecture with Row-Level Security (RLS) and Google OAuth 2.0",
        "Roadmap: Google Maps API integration for real-time live traffic feeds and automated congestion rerouting",
        "Roadmap: Full paperless digital report workflow replacing carbon slips with in-app digital signatures & ERP sync",
      ],
    },
  },
  {
    id: "ula-claims",
    title: "Enterprise Claims & Document Review Portal",
    blurb:
      "Enterprise operations platform featuring multi-model AI API analysis, an adaptive agent brain & skill architecture that refines output over time, and interactive drag-and-drop workflow tracking. All proprietary branding and logos sanitized under NDA.",
    tech: ["React", "Vite", "AI Agent Brain", "LLM APIs", "@hello-pangea/dnd", "PostgreSQL", "Canvas"],
    tag: "Enterprise Operations",
    year: "2026",
    featured: true,
    screenshotMode: "desktop",
    brandNote: "Strict NDA protection: Client name, company trademark, and logo have been blurred and sanitized throughout all production interface views.",
    screenshots: [
      { src: "/projects/ula/01-management-dashboard.webp", alt: "Management Dashboard", badge: "Portfolio Release Control" },
      { src: "/projects/ula/02-ai-autonomous-agent.webp", alt: "AI Reporting Workspace", badge: "Autonomous AI Agent" },
      { src: "/projects/ula/03-fact-extraction-billing.webp", alt: "Fact Extraction & Billing", badge: "Fact Extraction & Readiness" },
      { src: "/projects/ula/04-annual-leave-control.webp", alt: "Annual Leave & Operations Calendar", badge: "Operations Calendar & Leave" },
    ],
    caseStudy: {
      problem:
        "Processing high-volume insurance and legal claims required manually reviewing complex multi-page evidence dossiers, managing multi-stage approval states across departments, and drafting standardized assessments under tight regulatory deadlines.",
      architecture:
        "Engineered an enterprise operational dashboard featuring AI model APIs paired with an agentic brain & skill memory system to extract structured evidence from raw files and continuously improve drafting quality. Built with React and @hello-pangea/dnd for fluid Kanban-style claim movement, high-precision canvas rendering, and strict role-based data security.",
      outcome:
        "Drastically accelerated claim review turnaround from days to minutes while establishing a unified digital audit trail for claims, evidence analysis, and staff administration.",
      highlights: [
        "Multi-model AI API integration with continuous agent brain & skills",
        "Interactive drag-and-drop workflow pipelines (@hello-pangea/dnd)",
        "Automated evidence file extraction and standardized report drafting",
        "Complete enterprise document management and leave tracking systems",
        "Strict NDA: proprietary branding and logos completely sanitized",
      ],
    },
  },
  {
    id: "case-file",
    title: "Legal Case Public Documentation Website",
    blurb:
      "A bilingual Arabic/English public-facing website built to document and present a legal and human rights case. Features a structured article archive, evidence and document library, video and audio testimony sections, chronological case updates, and a full Arabic RTL layout — all under a single branded identity.",
    tech: ["Lovable", "React", "TypeScript", "i18n / RTL", "Content Architecture", "Tailwind CSS"],
    tag: "Commercial / Web",
    year: "2026",
    featured: true,
    isNda: true,
    coverImage: "/projects/case-file/02-home.webp",
    screenshotMode: "desktop",
    brandNote: "Project was discontinued due to high risk. Case identity and subject name sanitized under confidentiality.",
    screenshots: [
      {
        src: "/projects/case-file/02-home.webp",
        alt: "Case Website — Hero Homepage with Navigation and Feature Sections",
        badge: "Homepage",
      },
      {
        src: "/projects/case-file/01-articles.webp",
        alt: "Articles & Analysis — Legal and Human Rights Article Archive",
        badge: "Articles Archive",
      },
    ],
    caseStudy: {
      problem:
        "Legal and human rights cases require a credible, organized public presence to present facts, documents, and analysis to journalists, legal observers, and the general public — in both Arabic and English — without relying on social media platforms that can suppress or remove content.",
      architecture:
        "Initiated on Lovable — an AI-assisted full-stack builder — then extended with custom bilingual support (Arabic RTL + English LTR toggle). Sections cover: a case overview with chronological timeline, an articles and legal analysis archive, a documents and evidence library, video testimony embeds, audio recordings, and a live updates feed. Navigation adapts fluidly between languages with proper RTL layout reflow. Clean, authoritative typography and a restrained navy/gold palette convey credibility and institutional trust.",
      outcome:
        "Delivered a permanent, self-hosted public record of the case — accessible in both languages, navigable by section, and resilient to platform takedowns.",
      highlights: [
        "Full bilingual Arabic (RTL) / English (LTR) with seamless language toggle",
        "Structured content sections: case overview, articles, documents, video, audio, updates",
        "Authoritative navy & gold design system conveying legal credibility",
        "Evidence and document library with organized archival presentation",
        "Chronological case update feed for ongoing developments",
        "Case identity and subject name sanitized under confidentiality",
      ],
    },
  },
  {
    id: "retail-pos",
    title: "Offline-First Multi-Vertical Retail POS",
    blurb:
      "A unified point-of-sale and inventory core, adapted across distinct retail trade verticals including grocery/supermarkets (Dukanji), footwear (ShoePOS), menswear (ZOROPOS), and specialized trade verticals under NDA. Features robust cash box logic with dual-currency (USD/LBP) shift reconciliation, dual retail/wholesale pricing, and hardware barcode integration.",
    tech: ["React", "Vite", "TypeScript", "Python (FastAPI)", "SQLite", "Cash Box Ledger", "Hardware Barcode"],
    tag: "Commercial POS",
    year: "2026",
    featured: true,
    coverImage: "/projects/retail-pos/01-store-dashboard.webp",
    screenshotMode: "desktop",
    brandNote:
      "Client brand names (including Khalifa) sanitized throughout the codebase. Features full multi-currency cash drawer management, live register analytics, and offline-first database resilience.",
    screenshots: [
      { src: "/projects/retail-pos/01-store-dashboard.webp", alt: "Dukanji - Live Store Register & Profit Analytics Dashboard", badge: "Store Analytics" },
      { src: "/projects/retail-pos/02-financial-cash-box.webp", alt: "Dukanji - Dual-Currency Cash Box & Shift Reconciliation Ledger", badge: "Cash Box & Ledger" },
      { src: "/projects/retail-pos/03-point-of-sale.webp", alt: "Dukanji - Point of Sale Register with Dual Retail/Wholesale & Currency Toggles", badge: "POS Checkout" },
      { src: "/projects/shopepos/dashboard.webp", alt: "ShoePOS - Owner Dashboard: Revenue, Cash Box, Receivables & Top Models", badge: "ShoePOS Dashboard" },
      { src: "/projects/shopepos/stock-screen.webp", alt: "ShoePOS - Size & Color Variant Matrix per Model", badge: "ShoePOS Stock Matrix" },
      { src: "/projects/shopepos/reports.webp", alt: "ShoePOS - Profit by Model, Sales by Size & Color", badge: "ShoePOS Reports" },
      { src: "/projects/retail-pos/zoropos-pos.webp", alt: "ZOROPOS - Menswear POS Register with Live-Switchable Brand Theme", badge: "ZOROPOS Register" },
      { src: "/projects/retail-pos/zoropos-financial.webp", alt: "ZOROPOS - Cash Ledger: Sales, Collections & Cash-In Events", badge: "ZOROPOS Cash Ledger" },
      { src: "/projects/retail-pos/zoropos-customers.webp", alt: "ZOROPOS - Customer Receivables & Debt Tracking", badge: "ZOROPOS Customers" },
    ],
    caseStudy: {
      problem:
        "Retail merchants operating across multiple trade verticals in dual-currency environments (USD and Lebanese Pounds) face constant register discrepancies, untracked cash payouts, and shift handover errors, compounded by unstable cloud connectivity and expensive SaaS fees.",
      architecture:
        "Built a modular, offline-resilient POS core using Python (FastAPI + SQLite) / LibSQL and React (Vite + TypeScript), then adapted it into distinct vertical products sharing the same engine. Engineered a dedicated Cash Box & Drawer module: real-time denomination tracking for USD and LBP notes, immutable running cash ledgers recording all sales, refunds, mid-day cash-ins, and paid-out expenses, and an end-of-shift reconciliation system flagging over/short variances. ZOROPOS features a live brand-theme color selector in the sidebar - owners switch the entire UI accent in one tap to match their shop identity. ShoePOS adds a full size x color variant matrix per model with per-SKU pair counts and profit-by-model reports. Hardware barcode scanners and thermal receipt printers are supported across all verticals.",
      outcome:
        "Successfully deployed across active retail shops in multiple verticals. Eliminated cash drawer handover discrepancies, gave store owners real-time profit and cash-in-drawer visibility, and reduced end-of-day register balancing from 30 minutes of manual counting to an instant 1-click audit.",
      highlights: [
        "Dual-currency cash box logic tracking separate USD and LBP balances in real time",
        "Immutable cash ledger recording all sales, refunds, payouts, and cash-in events",
        "Automated shift reconciliation detecting cash drawer discrepancies and variances",
        "Live brand-theme color selector - one-tap accent switch per deployment (ZOROPOS)",
        "Size x color variant inventory matrix with per-SKU stock counts (ShoePOS)",
        "Per-model profit & margin reports plus sales-by-size and sales-by-color breakdowns",
        "Offline-first SQLite/LibSQL core - zero cloud dependency, zero SaaS fees",
        "Direct hardware integration: USB/Bluetooth barcode scanners & thermal receipt printers",
        "Vertical-specific schema: grocery weights & packs, shoe sizes, apparel variants",
      ],
    },
  },
  {
    id: "invoice-maker",
    title: "Invoice Maker",
    blurb:
      "A self-contained, offline-first invoice management tool built for freelancers and small businesses. Bilingual Arabic/English invoice generation with multi-template design selection, client and company profiles, and a full financial overview — all stored locally, no server required.",
    tech: ["React", "Vite", "TypeScript", "PDF Generation", "Local Storage", "Bilingual UI"],
    tag: "Commercial / Web",
    year: "2026",
    featured: true,
    coverImage: "/projects/invoice-maker/01-dashboard.webp",
    screenshotMode: "desktop",
    screenshots: [
      {
        src: "/projects/invoice-maker/01-dashboard.webp",
        alt: "Invoice Maker — Home Dashboard with Quick-Action Navigation",
        badge: "Dashboard",
      },
      {
        src: "/projects/invoice-maker/02-new-invoice.webp",
        alt: "Bilingual Invoice Editor — Line Items, Client, Design Template & PDF Export",
        badge: "Invoice Editor",
      },
    ],
    caseStudy: {
      problem:
        "Freelancers and small-business owners in bilingual markets need professional invoices fast — without paying SaaS subscriptions, without cloud sign-up friction, and with support for both Arabic and English on the same document.",
      architecture:
        "Built as a fully client-side React app with no backend. Invoice data, client profiles, and company seller records are persisted in local storage. The editor is fully bilingual — fields and labels render in both Arabic and English simultaneously. Users can choose from multiple PDF design templates (e.g. Aurora), and the app generates a print-ready PDF in-browser. The financial overview aggregates outstanding, paid, and overdue totals across all issued invoices at a glance.",
      outcome:
        "A zero-friction invoicing tool that runs entirely in the browser, requires no account, and produces professional bilingual PDF invoices in under a minute.",
      highlights: [
        "Fully bilingual Arabic/English invoice layout on the same document",
        "Multiple PDF design templates with live preview (Aurora and more)",
        "Client and company profile management with reusable billing details",
        "Financial dashboard: outstanding, paid, overdue totals at a glance",
        "100% offline — all data stored locally, no server or subscription",
        "In-browser PDF generation and print — no third-party service",
      ],
    },
  },
  {
    id: "parts-intake",
    title: "Spare Parts Digital Intake",
    blurb:
      "A tablet-first parts request portal that replaced physical paper slips in a high-volume aftersales depot. Technicians select parts, quantities, and sign digitally with a screen pen — submission auto-emails a structured TRF report directly into the existing depot registration system.",
    tech: ["React", "Vite", "TypeScript", "EmailJS", "Canvas Signature", "Tablet UI"],
    tag: "Internal / Production",
    year: "2026",
    featured: true,
    coverImage: "/projects/parts-intake/01-intake-form.webp",
    screenshotMode: "tablet",
    aspectRatio: "881/914",
    screenshots: [
      {
        src: "/projects/parts-intake/01-intake-form.webp",
        alt: "Spare Parts Intake Form — Technician Selection, Part Quantities & Signature Pad",
        badge: "Intake Form",
      },
      {
        src: "/projects/parts-intake/02-email-prefs.webp",
        alt: "Email Preferences — Auto-Mail Configuration with Dynamic TRF Subject Pattern",
        badge: "Auto-Mail Config",
      },
      {
        src: "/projects/parts-intake/03-submitted-trfs.webp",
        alt: "Submitted TRFs — Structured Part Requests per Technician with Export Options",
        badge: "Submitted TRFs",
      },
    ],
    caseStudy: {
      problem:
        "Parts requests in a dense aftersales depot were recorded on physical paper slips — technicians filled them by hand, supervisors re-entered them into spreadsheets, and slips routinely got lost or misread. The manual loop created daily bottlenecks, untracked inventory movements, and hours of redundant data entry.",
      architecture:
        "Built as a tablet-optimized React SPA designed for screen-pen and touch input. The intake form surfaces all parts organized by kit group, with large tap targets for quantity adjustments suitable for gloved or stylus use. A Canvas-based signature pad captures technician sign-off directly on-screen. On submission, EmailJS composes and delivers a structured TRF (Transfer Request Form) email — with configurable To/CC recipients and a dynamic subject pattern (TRF [NO] - [DATE]) — directly into the depot's existing mail-based registration workflow, requiring zero backend infrastructure. Submitted TRFs are stored locally and viewable with Excel/PDF export.",
      outcome:
        "Completely eliminated paper slips and manual spreadsheet re-entry. Depot staff submit, sign, and auto-register parts requests in under 60 seconds. Every submission is auditable, timestamped, and delivered instantly to the right inbox.",
      highlights: [
        "Tablet & screen-pen optimized — large touch targets, designed for stylus use",
        "Canvas signature pad for technician digital sign-off on every submission",
        "Auto-email on submit: structured TRF delivered to existing depot registration inbox",
        "Configurable email routing — To, CC, and dynamic subject pattern per deployment",
        "Parts organized by kit group with validated catalog and quantity controls",
        "Submitted TRFs stored locally with Excel & PDF export for records",
        "Zero backend required — runs entirely client-side via EmailJS",
        "Continuous daily production use in live aftersales depot",
      ],
    },
  },
  {
    id: "contracts-portal",
    title: "Maintenance Contract & SLA Portal",
    blurb:
      "An internal subscription and SLA management portal built to centralize machinery service contracts. The system ingests company data from customer invoices and handwritten technician invoice notes using automated text recognition (OCR), organizing recurring service agreements like a subscription model.",
    tech: ["React", "Python", "OCR / Text Recognition", "SLA Engine", "FastAPI", "Subscription Logic"],
    tag: "Internal / Production",
    year: "2026",
    brandNote:
      "Internal enterprise tool — production interface and sensitive client contract records are withheld under internal data protection.",
    caseStudy: {
      problem:
        "Machinery warranty terms, maintenance SLAs, and service agreements were scattered across paper invoices, technician invoice notes, and legacy spreadsheets. Without a centralized subscription-like system, operations had no automated way to track recurring renewals, calculate expiration countdowns, or verify machine coverage before dispatching field technicians.",
      architecture:
        "Engineered a dedicated React management UI powered by a Python service layer. The primary capability is an automated text recognition (OCR) and parsing engine that extracts machinery serials, contract periods, and service notes directly from customer invoices and field documents. The system structures this data into recurring subscription-style profiles with live renewal countdowns, SLA tier categorization, and expiration alerts.",
      outcome:
        "Replaced fragmented paperwork with an organized, subscription-style contract dashboard. Enabled operations to preemptively trigger contract renewals before expiration, eliminated uncovered maintenance dispatches, and established a clear recurring service pipeline.",
      highlights: [
        "Text recognition (OCR) parsing machinery IDs and terms from invoices & invoice notes",
        "Subscription-style contract tracking with automated renewal countdowns and alerts",
        "Centralized customer machinery registry with historical maintenance and SLA records",
        "Streamlined React UI built for operational sorting, filtering, and contract lifecycle status",
        "Python data service normalising unstructured invoice notes into clean relational records",
        "Internal tool — proprietary corporate records and UI protected from external exposure",
      ],
    },
  },
  {
    id: "python-automation",
    title: "Python Automation Suite",
    blurb:
      "Internal scripts that eliminated approximately 10 hours of weekly manual data entry and spreadsheet work. Automated reporting pipelines ingest raw operational data, cross-reference tables, flag anomalies, and publish clean KPI summaries — all on a schedule, without a single human click.",
    tech: ["Python", "Pandas", "Cron Pipelines", "Reporting"],
    tag: "Automation / Data",
    year: "2025",
    caseStudy: {
      problem:
        "Operations staff were losing 10+ hours every week to repetitive manual work: opening raw data exports, copying figures between spreadsheets, recalculating metrics by hand, and typing up the same email updates day after day.",
      architecture:
        "Autonomous Python scripts using Pandas for data ingestion, cleaning, and cross-referencing across multiple source files. Anomaly detection flags out-of-range values before they reach reports. Scheduled cron pipelines run automatically on defined intervals, generating and distributing formatted KPI summaries without any manual trigger.",
      outcome:
        "Recovered approximately 10 hours of manual data entry and spreadsheet labor every week. Eliminated human calculation errors, ensured consistent reporting cadence, and freed operations staff for higher-value work.",
      highlights: [
        "Saves ~10 hours/week of manual data entry and spreadsheet work",
        "Fully automated — cron-scheduled, zero manual trigger required",
        "Pandas data ingestion, cleaning, and cross-table reconciliation",
        "Anomaly detection flags irregular values before they surface in reports",
        "Daily automated KPI summaries distributed on schedule",
      ],
    },
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
