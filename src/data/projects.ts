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
  tag:
    | "Commercial / AI"
    | "Enterprise Operations"
    | "Internal / Production"
    | "Commercial POS"
    | "Automation / Data"
    | "Commercial / Web";
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
    id: "field-dispatch",
    title: "Power Generator Fleet Operations & Field Dispatch Command Center",
    blurb:
      "A mission-critical fleet operations and dispatch platform built specifically for industrial diesel power generators (gensets) and standby energy infrastructure. Inspired by the operational ergonomics of the Toters Driver app, it bridges office administration with on-the-ground technicians through algorithmic route optimization, multi-division schedule boards, GPS-tagged mobile field reporting, and automated SLA overdue tracking — designed to fully digitalize physical paper work orders.",
    tech: [
      "React 19",
      "Vite",
      "Supabase",
      "Leaflet / Geospatial",
      "Gemini AI (@google/genai)",
      "Postgres (RLS)",
      "Route Optimization",
      "ExcelJS",
    ],
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
        "Engineered as a full-stack operational hub connecting administrative coordinators with mobile field technicians, built with React 19, Vite, Leaflet, and Supabase Postgres with strict Row-Level Security (RLS). Inspired by how on-demand logistics apps like Toters Driver handle live dispatching, order states, and waypoint guidance, the platform translates courier-grade dispatch ergonomics into heavy industrial service operations:\n\n1. Administrative Command Center: Live regional map tracking fleet distribution across Greater Beirut and Mount Lebanon, daily completion metrics, 111+ overdue SLA alerts, and real-time crew availability.\n2. Intelligent Dispatch & Load Balancing: Division-partitioned scheduling (Mechanical, Electrical, Welders) with daily backlog staging, drag-and-drop timeline reordering, and 1-click Auto-Assign / Re-Sequence algorithms factoring technician skills and locations.\n3. Geospatial Route Optimization: Calculates Haversine distance matrices and applies time-of-day traffic heuristics (morning/evening rush hour multipliers) to optimize multi-stop routes with return-to-HQ logic.\n4. Toters Driver–Inspired Field Bridge: Field technicians receive sequenced stops with clear status transitions (En Route, On Site, Completed) and capture on-site generator photos with GPS coordinates; dispatchers can 1-click merge them into customer profiles or instantly spin up new service jobs.\n5. Genset Asset Registry & Digital Work Orders: Per-customer machinery records tracking KVA ratings, engine serials, alternator specs, and multi-point maintenance checklists (lubrication, cooling, electrical, ATS) to systematically replace paper slips with structured digital exports.\n\nIntegrated with Google Gemini AI (@google/genai) to analyze daily schedule summaries and provide automated workload balancing suggestions.",
      outcome:
        "Bridged the office-to-field communication divide with a unified live operations platform. Slashed technician travel hours and fuel waste through sequenced routing, gave administration instant oversight across 111+ overdue maintenance alerts before catastrophic equipment downtime, and established the architecture for completely paperless field operations.",
      highlights: [
        "Toters Driver–inspired technician UX: intuitive stop progression, quick status transitions, and frictionless on-site job completion",
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
    title: "Multi-Line Loss Adjusting & Claims Intelligence Hub",
    blurb:
      "An enterprise loss adjusting and forensic insurance audit platform purpose-built for high-stakes multi-line claims—spanning commercial property, industrial casualty, cargo & transit (air, land, sea), fidelity, and complex liability investigations. Integrates a 4-stage autonomous adjuster agent streaming over SSE, a self-refining Loss Adjuster Brain with historical rubric memory, deterministic quantum arithmetic separation, and client-side DOCX/PDF export engines. All proprietary client trademarks sanitized under NDA.",
    tech: [
      "React 18",
      "Node.js 20 (ESM)",
      "PostgreSQL 18",
      "Claude Sonnet 5",
      "Gemini 3.7 Flash",
      "Multi-Agent SSE",
      "Loss Adjuster Brain",
      "Zod Validation",
      "Client-Side DOCX/PDF",
    ],
    tag: "Enterprise Operations",
    year: "2026",
    featured: true,
    coverImage: "/projects/ula/01-management-dashboard.webp",
    screenshotMode: "desktop",
    brandNote:
      "Strict NDA protection: Client name, company trademark, and surveyor identities sanitized throughout all interface views. Conforms to formal Loss Adjusting Report Specifications (including the 7 September 2026 Provisional Drafts Amendment) producing certified, court- and underwriter-ready Microsoft Word (.docx) and Adobe PDF (.pdf) deliverables.",
    screenshots: [
      {
        src: "/projects/ula/01-management-dashboard.webp",
        alt: "Management Dashboard — Portfolio Release Control, Director Sign-Off & 5 Verification Gates",
        badge: "Director Release Control",
      },
      {
        src: "/projects/ula/02-ai-autonomous-agent.webp",
        alt: "Autonomous Adjuster Agent — 4-Stage Streaming Pipeline (Ingestion, Coverage Audit, Quantum Reconciliation & Draft Synthesis)",
        badge: "Autonomous Adjuster Agent",
      },
      {
        src: "/projects/ula/03-fact-extraction-billing.webp",
        alt: "Evidence Extraction & Quantum Readiness — Page-Coordinate Grounding & Structured Zod Observations",
        badge: "Evidence & Quantum Audit",
      },
      {
        src: "/projects/ula/04-annual-leave-control.webp",
        alt: "Operations Calendar & Staff Scheduling — Team Availability, Surveyor Roster & Automated Email Alerts",
        badge: "Operations & Leave Roster",
      },
    ],
    caseStudy: {
      problem:
        "Professional loss adjusters handling high-stakes multi-line insurance claims—spanning commercial property damage, industrial casualty, transit cargo (air, land, sea), fidelity, and liability disputes—face immense friction reviewing complex heterogeneous evidence dossiers (engineering estimates, survey certificates, bills of lading, salvage bids, repair tenders, and policy conditions). Traditional adjusting workflows suffer from manual quantum reconciliation errors, foreign currency conversion disputes, and audit failures caused by AI hallucinations that fabricate claim numbers or invent unverified quantities.",
      architecture:
        "Engineered as a full-stack enterprise claims intelligence platform with React 18, Vite 6, Node.js 20 ESM Express, and PostgreSQL 18 with connection pooling and Argon2id security:\n\n1. Multi-LLM Provider Architecture: Integrates Anthropic Direct (Claude Sonnet 5 with 128k output tokens), Google Gemini Direct (Gemini 3.7 Flash & 2.5 Pro Vision for damage photos), and OpenRouter with unified token preflight budget guards (AITokenWatch) to prevent cost overruns.\n2. Autonomous Adjuster Agent: A 4-stage pipeline streaming over Server-Sent Events (SSE) that executes: (1) Ingestion & Triangulation, (2) Policy & Coverage Audit, (3) Quantum Reconciliation, and (4) Report Synthesis.\n3. Loss Adjuster Brain: Embeddings and institutional memory learned from past certified reports, codifying cause standards (e.g. reefer defrost failure signatures, yacht mooring line chafing) and conducting adversarial audits against AI drafts before director sign-off.\n4. Zero-Hallucination & Mathematical Separation: Strict architectural separation where LLMs extract structured facts and rates with source document coordinate citations validated via Zod, while the deterministic Node.js engine computes all quantum arithmetic (claim = quantity x rate - depreciation - salvage - deductible).\n5. Provisional Drafts Governance (7 Sept 2026 Amendment): Allows adjusters to redline preliminary drafts in-app while non-blocking evidence is pending, but enforces a strict 5-gate director verification blocker before certified DOCX/PDF export.",
      outcome:
        "Accelerated claim assessment turnaround from multiple days to minutes with zero arithmetic errors. Established an immutable digital audit trail connecting every quantum figure to exact document citations, backed by 175/175 passing automated tests and automated Microsoft Word (.docx) and Adobe PDF export engines.",
      highlights: [
        "Multi-model LLM architecture: Claude Sonnet 5 (128k output), Gemini 3.7 Flash / Pro Vision, and OpenRouter",
        "Autonomous 4-stage adjuster agent streaming live progress via Server-Sent Events (SSE)",
        "Loss Adjuster Brain codifying institutional memory, cause standards, and adversarial draft audits",
        "Deterministic mathematical separation: zero-hallucination source coordinate citations validated with Zod",
        "Client-side export engines generating certified underwriter-ready DOCX (docx.js) and high-res PDF (pdf-lib)",
        "Provisional Drafts Gate (7 Sept 2026 Amendment) blocking final issuance until all 5 director gates clear",
        "AITokenWatch preflight budget guard preventing unexpected model API spend overruns",
        "Enterprise PostgreSQL 18 architecture, Argon2id password security, strict RBAC, and 175/175 passing automated tests",
        "Strict NDA: all client names, underwriter logos, and surveyor identities sanitized throughout",
      ],
    },
  },
  {
    id: "fragrance-storefront",
    title: "Luxury Fragrance Direct-to-Consumer Storefront",
    blurb:
      "A mobile-first direct-to-consumer fragrance boutique purveying 100% authentic perfumes. Crafted with an intentional minimalist black-and-white luxury design that puts verified flacons and olfactory craftsmanship at center stage, backed by tactile touch ergonomics and a direct WhatsApp checkout engine.",
    tech: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Editorial Minimalist UI",
      "WhatsApp Handoff",
    ],
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
    brandNote:
      "Custom palette tailored to the company's brand identity: deep charcoal backdrop paired with warm gold and amber accents (#D4AF37 / #C5A059), delivering a premium supermarket feel.",
    screenshots: [
      { src: "/projects/market-dash/01-home-produce.webp", alt: "Storefront", badge: "Storefront" },
      { src: "/projects/market-dash/02-meat-seafood.webp", alt: "Storefront", badge: "Storefront" },
      {
        src: "/projects/market-dash/03-my-orders.webp",
        alt: "Orders History",
        badge: "Orders History",
      },
      {
        src: "/projects/market-dash/04-cart-drawer.webp",
        alt: "Cart Drawer",
        badge: "Cart Drawer",
      },
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
    brandNote:
      "Project was discontinued due to high risk. Case identity and subject name sanitized under confidentiality.",
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
    title: "Offline-First Multi-Vertical Retail POS & Inventory Engine",
    blurb:
      "A high-throughput, offline-native point-of-sale and store accounting engine adapted across distinct retail trade verticals, led by Dukanji (grocery & supermarket), ShoePOS (footwear matrix), ZOROPOS (menswear), and specialized trade verticals under NDA. Features dual-currency (USD/LBP) cash ledgers with cash rounding steps, automated 13-rule mathematical integrity audits, sub-15ms checkout latency, and hardware barcode wedge interception.",
    tech: [
      "React 18 (Strict)",
      "TypeScript",
      "Python (FastAPI)",
      "SQLite (WAL Mode)",
      "Hardware Barcode Wedge",
      "Automated 13-Rule Auditor",
      "Dual-Currency Ledgers",
      "PyInstaller Standalone",
    ],
    tag: "Commercial POS",
    year: "2026",
    featured: true,
    coverImage: "/projects/retail-pos/01-store-dashboard.webp",
    screenshotMode: "desktop",
    brandNote:
      "Client brand names (including Dukanji, ShoePOS, ZOROPOS, and Khalifa) sanitized under confidentiality. Engineered in 'Operate Mode' with tabular numerals, zero cloud dependence, and sub-15ms local checkout latency.",
    screenshots: [
      {
        src: "/projects/retail-pos/01-store-dashboard.webp",
        alt: "Dukanji — Live Store Register & Profit Analytics Dashboard with 14-Day Trailing Trends & Hourly Heatmaps",
        badge: "Store Analytics",
      },
      {
        src: "/projects/retail-pos/02-financial-cash-box.webp",
        alt: "Dukanji — Dual-Currency Cash Box Ledger, Denomination Tracking & Continuous 13-Rule Audit",
        badge: "Cash Box & 13-Rule Audit",
      },
      {
        src: "/projects/retail-pos/03-point-of-sale.webp",
        alt: "Dukanji — High-Speed POS Terminal with Hardware Barcode Wedge, Retail/Wholesale Toggle & Dual Currency",
        badge: "POS Register Terminal",
      },
      {
        src: "/projects/shopepos/dashboard.webp",
        alt: "ShoePOS — Owner Dashboard: Revenue, Cash Box, Receivables & Top Models",
        badge: "ShoePOS Dashboard",
      },
      {
        src: "/projects/shopepos/stock-screen.webp",
        alt: "ShoePOS — Size & Color Variant Matrix per Model",
        badge: "ShoePOS Stock Matrix",
      },
      {
        src: "/projects/shopepos/reports.webp",
        alt: "ShoePOS — Profit by Model, Sales by Size & Color",
        badge: "ShoePOS Reports",
      },
      {
        src: "/projects/retail-pos/zoropos-pos.webp",
        alt: "ZOROPOS — Menswear POS Register with Live-Switchable Brand Theme",
        badge: "ZOROPOS Register",
      },
      {
        src: "/projects/retail-pos/zoropos-financial.webp",
        alt: "ZOROPOS — Cash Ledger: Sales, Collections & Cash-In Events",
        badge: "ZOROPOS Cash Ledger",
      },
      {
        src: "/projects/retail-pos/zoropos-customers.webp",
        alt: "ZOROPOS — Customer Receivables & Debt Tracking",
        badge: "ZOROPOS Customers",
      },
    ],
    caseStudy: {
      problem:
        "Small and medium retail establishments—especially supermarkets and bodegas in emerging or volatile markets—suffer constant disruption from intermittent internet and power cuts that freeze cloud POS registers. Traditional POS systems struggle with dual-currency economies (USD base accounting with volatile floating companion currencies like Lebanese Pounds), leading to cashier rounding disputes, untracked cash drawer handovers, manual debt notebook errors (دفتر الحسابات), and catastrophic inventory discrepancies caused by blind multi-master sync.",
      architecture:
        "Engineered an offline-first POS and store accounting engine using React 18, TypeScript, Python (FastAPI), and SQLite 3 in WAL mode, packaged as both a local network server and a portable Windows onedir desktop executable:\n\n1. Synchronous Threadpool Serialization & BEGIN IMMEDIATE: To eliminate SQLite lock contention and race conditions in concurrent multi-terminal environments, FastAPI route handlers are strictly synchronous (enforced on boot by _assert_sync_handlers), wrapped in a global threading.Lock() mutex executing BEGIN IMMEDIATE transactions.\n2. Bootstrap State-Swap & Offline Reconnect Sync: Every mutation returns a complete atomic store snapshot (build_bootstrap) that updates React state in a single render pass and mirrors to localStorage. An optimistic offline FIFO sales queue assigns client-side UUIDs; when an 8-second reachability poll detects connection restore, sales replay idempotently.\n3. Continuous 13-Rule Mathematical Auditor: Executes on every bootstrap to validate 13 mathematical invariants—confirming stock ledger double-entry sums (variant.stock_qty == sum(movements)), sales total formulas, settlement parity, unreviewed oversell flags, and void purity.\n4. Hardware Barcode Wedge Disambiguation: A global capture-phase listener captures hardware USB/Bluetooth barcode streams via a 50ms character-gap buffer outside text inputs. Unregistered barcodes immediately launch a sub-5s quick-registration modal pre-filled with the scanned code.\n5. Dual-Currency Hyperinflation Accounting: Real-time dual display in base USD and floating companion currency (LBP). When sales complete, the exact exchange rate is permanently frozen into the transaction (tender_rate), with customizable cash rounding steps (1,000 to 10,000 LBP) preventing cash drawer discrepancies.\n6. Multi-Vertical Adaptations: Extensible core powering Dukanji (grocery UOMs & GS1 EAN-13 modulo-10 in-store barcode generation), ShoePOS (size x color matrix and per-SKU pair tracking), and ZOROPOS (live 1-tap brand-theme color switching).",
      outcome:
        "Deployed across active retail shops in multiple trade verticals with 100% offline uptime through power cuts. Reduced transaction checkout latency to < 15ms, cut end-of-day register balancing from 30 minutes of manual counting to an instant 1-click audit, and eliminated lost customer credit with automated FIFO receivables tracking.",
      highlights: [
        "100% offline-native: zero cloud dependency, zero SaaS subscriptions, sub-15ms local checkout latency",
        "Synchronous threadpool mutex with BEGIN IMMEDIATE eliminating database lock contention under SQLite WAL",
        "Continuous 13-rule mathematical auditor validating stock double-entry sums and settlement parity on every state swap",
        "Hardware barcode wedge scanner listener (< 50ms buffer) with sub-5s on-the-fly unknown item registration",
        "Dual-currency hyperinflation engine freezing transaction-time exchange rates (tender_rate) with commercial cash rounding",
        "Automated in-store GS1 EAN-13 modulo-10 barcode generator for weighed produce and bulk groceries",
        "Optimistic offline sales queue with client UUID idempotency and automatic 8s reconnection replay",
        "Automated customer receivables (CRM) with FIFO oldest-first debt settlement and store credit",
        "Portable standalone Windows onedir distribution (~65MB) with automated local data path routing",
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
    tech: [
      "React",
      "Python",
      "OCR / Text Recognition",
      "SLA Engine",
      "FastAPI",
      "Subscription Logic",
    ],
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
