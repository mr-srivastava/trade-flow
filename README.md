# TradeFlow

**Syntara** - Transform Your Global Trade Operations

A cutting-edge platform for chemical and pharmaceutical trading that connects manufacturers, suppliers, and buyers across the globe. TradeFlow leverages AI-powered technology to streamline operations, reduce costs, and ensure compliance with international standards.

## 🌟 Overview

TradeFlow (branded as Syntara) is a global trading platform focused on the chemical and pharmaceutical industries. The platform provides:

- **Global Network**: Operations spanning 65+ countries with extensive partner networks
- **AI-Powered Intelligence**: Smart supply chain management, pricing intelligence, and automated deal flow
- **Quality Assurance**: Comprehensive compliance with USP and international standards
- **Real-time Analytics**: Market insights, pricing data, and demand forecasting

## 🚀 Key Features

### 🔬 Product Management
- Comprehensive product catalog with 29+ chemical and pharmaceutical products
- Detailed product specifications including CAS numbers, molecular formulas, and IUPAC names
- Industry-specific categorization (Chemicals, Pharmaceuticals)
- Advanced laboratory testing and purity verification

### 🤖 SynFlow AI Platform
- **Supply Chain Intelligence**: Real-time tracking and procurement insights
- **Smart Deal Flow**: AI-powered supplier matching and automated negotiations
- **Pricing Intelligence**: Real-time pricing with AI forecasting for optimal deals

### 📊 Analytics & Insights
- Real-time market data and trend analysis
- Cost reduction analytics (48% average supply chain cost reduction)
- Process efficiency improvements (99.8% efficiency rate)

### 🏆 Quality & Compliance
- Multiple certifications: GMP, WHO-GMP, ISO 9001:2015, ISO 14001, FSSAI, HACCP, KOSHER, HALAL, REACH
- Comprehensive safety and hazard documentation
- International quality standards compliance

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14.2.21 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint with Next.js configuration
- **Type Checking**: TypeScript 5.x
- **Build Tool**: Next.js built-in bundler
- **Styling**: PostCSS with Tailwind CSS

### Key Dependencies
```json
{
  "next": "14.2.21",
  "react": "^18",
  "typescript": "^5",
  "tailwindcss": "^3.4.1",
  "framer-motion": "^11.15.0",
  "@radix-ui/react-*": "Various components",
  "react-hook-form": "^7.54.2",
  "zod": "^3.24.2"
}
```

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd trade-flow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run lint:fix # Fix ESLint issues automatically
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── products/      # Product-related endpoints
│   ├── products/          # Product pages
│   ├── contact/           # Contact page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Base UI components (Radix UI)
│   ├── Hero/             # Hero section components
│   ├── Products/         # Product-related components
│   ├── Features/         # Feature showcase components
│   ├── ContactForm/      # Contact form components
│   └── [Other features]/ # Various feature components
├── lib/                  # Utilities and configurations
│   ├── data.ts          # Product data and business content
│   ├── types.ts         # TypeScript type definitions
│   ├── content.ts       # Page content and copy
│   ├── api.ts           # API utility functions
│   └── utils.ts         # General utility functions
└── hooks/               # Custom React hooks
    └── useCountUp.tsx   # Animation hook for counters
```

## 🎨 Design System

The application uses a custom design system with:

- **Typography**: Montserrat for headings, Inter for body text
- **Color Palette**: Custom Syntara brand colors with dark theme support
- **Components**: Built on Radix UI primitives for accessibility
- **Animations**: Smooth transitions and micro-interactions with Framer Motion

### Custom Theme Colors
```css
syntara: {
  dark: '#121620',      /* Very dark blue/black */
  darker: '#0b0e14',    /* Almost black */
  primary: '#2563eb',   /* Blue */
  accent: '#6366f1',    /* Indigo */
  light: '#e2e8f0',     /* Light gray with blue hint */
}
```

## 📊 Business Features

### Industries Served
- **Chemicals**: Industrial chemicals, specialty chemicals
- **Pharmaceuticals**: APIs, intermediates, excipients

### Product Categories
- Active Pharmaceutical Ingredients (APIs)
- Chemical intermediates
- Specialty chemicals
- Pharmaceutical excipients

### Key Metrics
- **48%** Cost Reduction in Supply Chain
- **65+** Global Partner Network
- **99.8%** Process Efficiency Improvement
- **29+** Products in catalog

## 🌐 API Endpoints

```
GET /api/products                     # Get all products
GET /api/products/:id                 # Get specific product
GET /api/products/industries/:industry # Get products by industry
GET /api/products/industries/count    # Get product count by industry
```

## 🚀 Deployment

The application is built with Next.js and can be deployed on:

- **Vercel** (Recommended for Next.js)
- **Netlify**
- **AWS**
- **Docker containers**

### Build for Production
```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary to Syntara/TradeFlow.

## 📞 Contact

For more information about the platform or business inquiries, please contact us through the platform's contact form.

---

**Built with ❤️ for global chemical and pharmaceutical trading**
