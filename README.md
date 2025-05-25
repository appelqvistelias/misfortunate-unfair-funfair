# Unfair Funfair 🎪

A dark-themed gaming platform featuring two immersive carnival games with integrated payment processing and authentication. Built with Next.js and designed to provide an eerie, atmospheric gaming experience.

## 🎮 Games

### Madame Misfortune

A mystical tarot card reading experience where players select three cards to discover their "misfortune." Features:

- Interactive tarot card selection
- Atmospheric animations and transitions
- Dark carnival theming with custom styling
- JWT-based authentication and payment integration

### Curse of Calculus

A memory matching game with a mathematical twist. Players match mathematical expressions with their solutions:

- 9 pairs of math problems and solutions
- Memory-based gameplay mechanics
- Responsive grid layout adapting from 3x6 to 6x3 on larger screens
- Victory celebration upon completion

## 🏗️ Architecture

### Frontend

- **Framework**: Next.js 14 with App Router
- **Styling**: CSS Modules with custom theming
- **Typography**: Google Fonts (Josefin Sans, Offside, Parisienne)
- **State Management**: React hooks (useState, useEffect)

### Backend Integration

- **Authentication**: JWT token-based system
- **Payment Processing**: Integrated with Laravel backend (yrgobanken.vip)
- **Transaction API**: Proxy endpoint for secure payment handling
- **Stamp Rewards**: Automated reward system upon game completion

### Key Components

- **JwtListener**: Handles authentication token management
- **Navbar**: Responsive navigation with hamburger menu
- **Game Components**: Modular card and board components
- **Transaction System**: Secure payment and reward processing

## 🎨 Design Features

- **Dark Theme**: Atmospheric carnival/gothic aesthetic
- **Responsive Design**: Mobile-first approach with desktop optimizations
- **Custom Animations**: Smooth transitions and hover effects
- **Background Integration**: Dynamic background images and overlays
- **Typography Hierarchy**: Multiple font families for thematic consistency

## 🔧 Technical Stack

### Dependencies

- Next.js 14
- React 18
- TypeScript
- CSS Modules

### Configuration

- Environment variables for API keys
- Game-specific configuration files
- Modular data structure (JSON-based card data)

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone [repository-url]
cd unfair-funfair
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
# Create .env.local
API_KEY=your_api_key_here
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── api/transactions/         # Payment API proxy
│   ├── curse-of-calculus/        # Math game page
│   ├── madame-misfortune/        # Tarot game page
│   └── globals.css              # Global styles
├── components/                   # Reusable UI components
│   ├── MadameMisfortune/        # Tarot game components
│   ├── curse-of-calculus/       # Math game components
│   └── Navbar/                  # Navigation component
├── games/                       # Game logic and main components
│   ├── curse-of-calculus/       # Math game implementation
│   └── madame/                  # Tarot game implementation
├── config/                      # Game configuration files
├── data/                        # JSON data files
└── lib/                         # Utility functions
```

## 🎯 Game Configuration

Each game has its own configuration file in `src/config/` containing:

- Amusement ID
- Group ID
- Cost and currency
- Stamp rewards
- Payout information (where applicable)

## 🔐 Security Features

- JWT token validation
- API key authentication
- Secure transaction proxy
- Input sanitization
- Error handling and user feedback

## 🎨 Styling Approach

- **CSS Modules**: Scoped component styling
- **Responsive Design**: Mobile-first with breakpoint adaptations
- **Custom Properties**: Consistent spacing and typography
- **Animation System**: Smooth transitions and interactive feedback

## 🏆 Reward System

Players earn stamps upon game completion, integrated with the backend reward system. The transaction flow includes:

1. Payment processing for game entry
2. Game completion detection
3. Automatic stamp reward distribution

## 🔄 Development Workflow

The project follows modern React development practices:

- Component-based architecture
- TypeScript for type safety
- Modular CSS organization
- Responsive design principles
- Performance optimization

## 📱 Browser Compatibility

Optimized for modern browsers with support for:

- CSS Grid and Flexbox
- ES6+ features
- Modern animation APIs
- Responsive design queries

---

_Experience the darker side of carnival entertainment with Unfair Funfair - where every game comes with a price, and fortune favors the bold._
