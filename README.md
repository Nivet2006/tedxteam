# TEDxGCEM — Digital Identity & Team Member Portfolio Platform

A high-end, luxury editorial digital identity and QR badge platform engineered for the **TEDxGCEM 2026** team.

Production Web App URL: [https://tedxteam.nivet2006.in/](https://tedxteam.nivet2006.in/)

---

## 🌟 Features

* **Luxury Editorial Profiles**: Art-directed individual digital identities inspired by high-end fashion magazines and creative agency portfolios.
* **Dynamic QR & Scan Tracking**: Intelligent badge QR code scan counter and source tracking (`?src=qr` vs `?src=direct-link`).
* **Team Theme System**: Tailored visual color accents across 6 official teams (*Leadership, Creative, Curation, Partnerships, Media, Technology*).
* **Admin Management Portal**: Built-in member administration, roster editing, scan analytics dashboards, and dynamic QR generation.
* **Modern Stack**: Built with Next.js 16 (App Router + Turbopack), React 19, Prisma ORM 7, Framer Motion, GSAP, and Tailwind CSS v4.

---

## 🚀 Quick Start

### 1. Local Development Server

Run the development server locally:

```bash
npm run dev
```

Local URL: [http://localhost:3000/](http://localhost:3000/)  
Production URL: [https://tedxteam.nivet2006.in/](https://tedxteam.nivet2006.in/)

### 2. Database & Seeding

Seed or reset the SQLite / PostgreSQL database with official 26 team member roster:

```bash
# Generate Prisma Client
npx prisma generate

# Seed Database Roster
npm run db:seed
```

### 3. Production Build & Verification

```bash
npm run build
npm run start
```

---

## 👥 26 Official Team Member Profiles

Access individual member profile pages at `https://tedxteam.nivet2006.in/team/[slug]`:

### 👑 Leadership Team
* **Bharath M** (Executive Producer): [https://tedxteam.nivet2006.in/team/bharath-m](https://tedxteam.nivet2006.in/team/bharath-m)
* **Bhargav Bhat** (Production Director): [https://tedxteam.nivet2006.in/team/bhargav-bhat](https://tedxteam.nivet2006.in/team/bhargav-bhat)
* **Manoj V** (Event Director): [https://tedxteam.nivet2006.in/team/manoj-v](https://tedxteam.nivet2006.in/team/manoj-v)
* **Vinay S** (Operations Director): [https://tedxteam.nivet2006.in/team/vinay-s](https://tedxteam.nivet2006.in/team/vinay-s)

### 🎨 Creative Team
* **Akhila G** (Design Director): [https://tedxteam.nivet2006.in/team/akhila-g](https://tedxteam.nivet2006.in/team/akhila-g)
* **Thanisashri S S** (Creative Director): [https://tedxteam.nivet2006.in/team/thanisashri-ss](https://tedxteam.nivet2006.in/team/thanisashri-ss)
* **Shruti Sujatha Francis** (Concept Artist): [https://tedxteam.nivet2006.in/team/shruti-sujatha-francis](https://tedxteam.nivet2006.in/team/shruti-sujatha-francis)
* **K Taruni Sri Reddy** (Concept Artist): [https://tedxteam.nivet2006.in/team/taruni-sri-reddy](https://tedxteam.nivet2006.in/team/taruni-sri-reddy)
* **Bushra M** (Creative Manager): [https://tedxteam.nivet2006.in/team/bushra-m](https://tedxteam.nivet2006.in/team/bushra-m)

### 🧠 Curation Team
* **Divyashree RM** (Curation Director): [https://tedxteam.nivet2006.in/team/divyashree-rm](https://tedxteam.nivet2006.in/team/divyashree-rm)
* **Challa Himasree** (Curator): [https://tedxteam.nivet2006.in/team/challa-himasree](https://tedxteam.nivet2006.in/team/challa-himasree)
* **Vyshnavi D** (Curator): [https://tedxteam.nivet2006.in/team/vyshnavi-d](https://tedxteam.nivet2006.in/team/vyshnavi-d)
* **C Charan Kumar Reddy** (Curator): [https://tedxteam.nivet2006.in/team/charan-kumar-reddy](https://tedxteam.nivet2006.in/team/charan-kumar-reddy)
* **Bhuvana M** (Curator): [https://tedxteam.nivet2006.in/team/bhuvana-m](https://tedxteam.nivet2006.in/team/bhuvana-m)
* **Spoorthi N** (Speaker Scout): [https://tedxteam.nivet2006.in/team/spoorthi-n](https://tedxteam.nivet2006.in/team/spoorthi-n)
* **Meghana Mallarapu** (Speaker Scout): [https://tedxteam.nivet2006.in/team/meghana-mallarapu](https://tedxteam.nivet2006.in/team/meghana-mallarapu)

### 🤝 Partnerships Team
* **Divya C** (Partnership Director): [https://tedxteam.nivet2006.in/team/divya-c](https://tedxteam.nivet2006.in/team/divya-c)
* **Vinayaka** (Partnership Director): [https://tedxteam.nivet2006.in/team/vinayaka](https://tedxteam.nivet2006.in/team/vinayaka)
* **Sagar Singh** (Partnership Lead): [https://tedxteam.nivet2006.in/team/sagar-singh](https://tedxteam.nivet2006.in/team/sagar-singh)
* **Shivaprasad Patil** (Partnership Lead): [https://tedxteam.nivet2006.in/team/shivaprasad-patil](https://tedxteam.nivet2006.in/team/shivaprasad-patil)

### 📸 Media Team
* **Kruthin H** (Campaign Director): [https://tedxteam.nivet2006.in/team/kruthin-h](https://tedxteam.nivet2006.in/team/kruthin-h)
* **Anusha** (Digital Media Manager): [https://tedxteam.nivet2006.in/team/anusha](https://tedxteam.nivet2006.in/team/anusha)
* **Riktriti** (Digital Media Manager): [https://tedxteam.nivet2006.in/team/riktriti](https://tedxteam.nivet2006.in/team/riktriti)
* **Mallikarjuna L** (Content Creator): [https://tedxteam.nivet2006.in/team/mallikarjuna-l](https://tedxteam.nivet2006.in/team/mallikarjuna-l)

### ⚡ Technology Team
* **Nived Shaji** (Technical Lead): [https://tedxteam.nivet2006.in/team/nived-shaji](https://tedxteam.nivet2006.in/team/nived-shaji)
* **Yeshwanth** (Technical Lead): [https://tedxteam.nivet2006.in/team/yeshwanth](https://tedxteam.nivet2006.in/team/yeshwanth)

---

## ⚙️ Project Structure

```text
tedxteam/
├── app/
│   ├── admin/            # Admin authentication & roster management
│   ├── api/              # QR generation & scan tracking endpoints
│   ├── team/[slug]/      # Individual dynamic member profile pages
│   ├── globals.css       # Luxury editorial fonts & architectural grid utility
│   ├── layout.tsx        # Google font configuration (Cormorant Garamond + Inter)
│   └── page.tsx          # Main Team directory & 3D hero stage
├── components/
│   ├── ProfileTemplate.tsx # Luxury editorial individual profile component
│   ├── SocialLinks.tsx   # Interactive social channel list
│   └── ThemeProvider.tsx # Team visual accent provider
├── prisma/
│   ├── schema.prisma     # Database models (Member, ScanEvent, AdminUser)
│   └── seed.ts           # Official 26-member roster seed script
└── README.md
```

---

© 2026 TEDxGCEM — Ideas Worth Spreading.
