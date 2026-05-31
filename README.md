# TradeFlow

**Syntara** - Transform Your Global Trade Operations

A cutting-edge platform for chemical and pharmaceutical trading that connects manufacturers, suppliers, and buyers across the globe. TradeFlow leverages AI-powered technology to streamline operations, reduce costs, and ensure compliance with international standards.

## 🌟 Overview

TradeFlow (branded as Syntara) is a global trading platform focused on the chemical and pharmaceutical industries. The platform provides:

- **Global Network**: Operations spanning 65+ countries with extensive partner networks
- **AI-Powered Intelligence**: Smart supply chain management, pricing intelligence, and automated deal flow
- **Quality Assurance**: Comprehensive compliance with USP and international standards
- **Real-time Analytics**: Market insights, pricing data, and demand forecasting
- **Dynamic Content Management**: MongoDB-powered content system for real-time updates

## 🚀 Key Features

### 🔬 Product Management
- Comprehensive product catalog with 29+ chemical and pharmaceutical products
- Detailed product specifications including CAS numbers, molecular formulas, and IUPAC names
- Industry-specific categorization (Chemicals, Pharmaceuticals)
- Advanced laboratory testing and purity verification
- **Database-driven product management** with CRUD operations

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

### 🗄️ Database & Content Management
- **MongoDB Integration**: Dynamic data storage with Mongoose ODM
- **Admin API**: Secure content management with bearer token authentication
- **Real-time Content Updates**: Dynamic page content without deployments
- **Type-safe Operations**: Full TypeScript support for database operations
- **Migration Support**: Easy data migration from static to dynamic content

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14.2.21 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Theming**: Next Themes for dark/light mode support

### Backend & Database
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Bearer token authentication for admin operations
- **API**: RESTful API endpoints for products and content management
- **Data Validation**: Zod schemas for type safety
- **Environment Management**: Dotenv for configuration

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint with Next.js configuration
- **Type Checking**: TypeScript 5.x
- **Build Tool**: Next.js built-in bundler
- **Styling**: PostCSS with Tailwind CSS
- **Database Tools**: Custom migration and testing scripts

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
  "zod": "^3.24.2",
  "mongoose": "^8.15.1",
  "next-themes": "^0.4.6",
  "dotenv": "^16.5.0",
  "sonner": "^2.0.1"
}
```

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- MongoDB (local installation or MongoDB Atlas account)

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

3. **Set up environment variables**
   ```bash
   # Create .env.local file
   cp .env.example .env.local
   
   # Add your MongoDB connection string and admin token
   MONGODB_URI=mongodb://localhost:27017/trade-flow
   ADMIN_TOKEN=your-admin-token-here
   ```

4. **Set up MongoDB**
   - For detailed MongoDB setup instructions, see [MONGODB_SETUP.md](./MONGODB_SETUP.md)
   - For database configuration and migration, see [DATABASE_SETUP.md](./DATABASE_SETUP.md)

5. **Run database migration (if needed)**
   ```bash
   npm run migrate:mongodb
   ```

6. **Test your setup**
   ```bash
   npm run test:mongodb
   npm run test:content-api
   ```

7. **Run development server**
   ```bash
   npm run dev
   ```

8. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
# Development
npm run dev                        # Start development server
npm run build                      # Build for production
npm run start                      # Start production server
npm run lint                       # Run ESLint
npm run lint:fix                   # Fix ESLint issues automatically

# Database Operations
npm run migrate:mongodb            # Migrate data from JSON to MongoDB
npm run test:mongodb              # Test MongoDB connection
npm run test:content-api          # Test content API endpoints
npm run test:landing-integration  # Test landing page integration
```

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── products/      # Product CRUD endpoints
│   │   │   └── content/       # Content management endpoints
│   │   ├── products/          # Product pages
│   │   ├── product/           # Individual product pages
│   │   ├── contact/           # Contact page
│   │   ├── fonts/             # Custom fonts
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   ├── ui/               # Base UI components (Radix UI)
│   │   ├── Hero/             # Hero section components
│   │   ├── Products/         # Product-related components
│   │   ├── Features/         # Feature showcase components
│   │   ├── ContactForm/      # Contact form components
│   │   └── Landing/          # Landing page components
│   ├── lib/                  # Utilities and configurations
│   │   ├── mongodb.ts        # MongoDB connection setup
│   │   ├── models.ts         # Mongoose data models
│   │   ├── mongodb-db.ts     # Database operations (MongoDB)
│   │   ├── db.ts             # Legacy database operations (JSON)
│   │   ├── data.ts           # Product data and business content
│   │   ├── types.ts          # TypeScript type definitions
│   │   ├── content.ts        # Page content and copy
│   │   ├── api.ts            # API utility functions
│   │   └── utils.ts          # General utility functions
│   └── hooks/                # Custom React hooks
│       └── useCountUp.tsx    # Animation hook for counters
├── scripts/                  # Database and testing scripts
│   ├── migrate-to-mongodb.ts # MongoDB migration script
│   ├── test-mongodb.ts       # MongoDB connection test
│   ├── test-content-api.sh   # Content API testing script
│   └── test-landing-integration.sh # Landing page test script
├── public/                   # Static assets
├── DATABASE_SETUP.md         # Database setup and migration guide
├── MONGODB_SETUP.md         # MongoDB configuration guide
└── package.json             # Dependencies and scripts
```

## 🎨 Design System

The application uses a custom design system with:

- **Typography**: Montserrat for headings, Inter for body text
- **Color Palette**: Custom Syntara brand colors with dark and light theme support
- **Components**: Built on Radix UI primitives for accessibility
- **Animations**: Smooth transitions and micro-interactions with Framer Motion
- **Theme System**: Next Themes for dark/light mode with a theme toggle in the navbar; preference is persisted.

For the full list of semantic and Syntara tokens, usage guidelines, and accessibility notes, see [docs/design-tokens.md](docs/design-tokens.md).

### Custom Theme Colors (summary)
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

### Products API
```
GET /api/products                     # Get all products (public)
POST /api/products                    # Create product (admin only)
GET /api/products/:id                 # Get specific product with related products
PUT /api/products/:id                 # Update product (admin only)
DELETE /api/products/:id              # Delete product (admin only)
GET /api/products/industries/:industry # Get products by industry
GET /api/products/industries/count    # Get product count by industry
```

### Content Management API
```
GET /api/content                      # Get all page content (public)
PUT /api/content                      # Update all content (admin only)
GET /api/content/:section             # Get specific content section
PUT /api/content/:section             # Update specific content section (admin only)
```

Valid content sections: `hero`, `benefits`, `about`, `productCategories`, `synFlowFeatures`, `resourcesData`

### Authentication
Admin endpoints require Bearer token authentication:
```bash
Authorization: Bearer your-admin-token-here
```

## 🗄️ Database Configuration

### MongoDB Setup
The application uses MongoDB for dynamic content management. See setup guides:

- **[MONGODB_SETUP.md](./MONGODB_SETUP.md)** - MongoDB installation and configuration
- **[DATABASE_SETUP.md](./DATABASE_SETUP.md)** - Database schema and migration guide

### Environment Variables
```bash
# Required
MONGODB_URI=mongodb://localhost:27017/trade-flow
ADMIN_TOKEN=your-admin-token-here

# Optional
NEXT_PUBLIC_API_URL=https://your-domain.com  # For production API calls
```

### Data Migration
```bash
# Migrate from static JSON data to MongoDB
npm run migrate:mongodb

# Test database connection
npm run test:mongodb

# Verify API endpoints
npm run test:content-api
```

## 🚀 Deployment

The application is built with Next.js and can be deployed on:

- **Vercel** (Recommended for Next.js)
- **Netlify**
- **AWS**
- **Docker containers**

### Production Environment Setup

1. **Database**: Set up MongoDB Atlas for production
2. **Environment Variables**: Configure production environment variables
3. **Build Optimization**: Run production build and test
4. **Domain Configuration**: Set up custom domain and SSL

### Build for Production
```bash
npm run build
npm run start
```

## 🧪 Testing

### Database Testing
```bash
npm run test:mongodb              # Test MongoDB connection
npm run test:content-api          # Test all content API endpoints
npm run test:landing-integration  # Test landing page with database
```

### Manual API Testing
```bash
# Get all products
curl http://localhost:3000/api/products

# Get page content
curl http://localhost:3000/api/content

# Update content (admin only)
curl -X PUT http://localhost:3000/api/content/hero \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-admin-token" \
  -d '{"heading":"New Heading","description":"Updated description"}'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Set up your development environment (see Installation & Setup)
4. Make your changes and test thoroughly
5. Run linting and tests (`npm run lint && npm run test:content-api`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 📄 License

This project is private and proprietary to Syntara/TradeFlow.

## 📞 Contact

For more information about the platform or business inquiries, please contact us through the platform's contact form.

---

**Built with ❤️ for global chemical and pharmaceutical trading**

