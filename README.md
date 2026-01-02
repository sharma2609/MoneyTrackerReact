# 🖤 Money Tracker

A minimalist personal finance tracker built with React, featuring a **NothingOS-inspired monochromatic design**. Track your income and expenses with a clean, distraction-free interface that focuses on what matters most - your financial data.

## ✨ Features

### 💰 **Financial Management**

- **Transaction Tracking** - Add income and expense transactions with detailed information
- **Real-time Calculations** - Automatic income, expense, and balance calculations
- **Category Organization** - Organize transactions with customizable categories
- **Monthly Overview** - Current month summary with key financial metrics
- **Transaction History** - Complete list of all transactions with sorting and filtering

### 📊 **Analytics & Insights**

- **Financial Analysis** - Monthly and annual financial breakdowns
- **Category Breakdown** - Visual representation of spending by category
- **Statistical Overview** - Transaction counts, totals, and trends
- **Period Filtering** - View data by specific months or years
- **Progress Visualization** - Animated progress bars for category spending

### 📈 **Reporting**

- **CSV Export** - Download financial reports in spreadsheet format
- **Report Preview** - Preview report data before downloading
- **Period Selection** - Generate reports for specific time periods
- **Summary Statistics** - Comprehensive financial summaries included

### ⚙️ **Customization**

- **Theme Switching** - Seamless dark/light mode toggle
- **Category Management** - Add, edit, and delete custom categories
- **Data Management** - Clear transaction history when needed
- **Persistent Storage** - All data saved locally in browser

## 🎨 Design Philosophy

### **NothingOS Aesthetic**

- **Pure Monochromatic** - Black, white, and gray color palette only
- **Minimalist Interface** - Clean lines, purposeful spacing, no visual clutter
- **Typography-focused** - Clear hierarchy using font weights and sizes
- **Geometric Design** - Consistent border radius and spacing grid

### **Smooth Interactions**

- **60fps Animations** - Hardware-accelerated transitions throughout
- **Micro-interactions** - Subtle hover effects and state changes
- **Staggered Animations** - Elegant entry animations for content
- **Responsive Feedback** - Immediate visual response to user actions

## 🚀 Performance

### **Optimized React Architecture**

- **React.memo** - Prevents unnecessary component re-renders
- **useCallback** - Memoized event handlers for stable references
- **useMemo** - Cached expensive calculations and data transformations
- **Efficient State Management** - Optimized state updates and data flow

### **Modern CSS**

- **CSS Variables** - Efficient theme switching and consistent design tokens
- **Hardware Acceleration** - Transform-based animations for smooth performance
- **Responsive Design** - Mobile-first approach with breakpoint optimization
- **Minimal Bundle** - Clean, optimized CSS with no unused styles

## 📱 Responsive Design

### **Desktop (1024px+)**

- Two-column layout with sticky transaction form
- Floating navigation sidebar
- Optimal spacing and typography for large screens

### **Tablet (640px - 1024px)**

- Single column layout for better content flow
- Bottom navigation bar for easy thumb access
- Adjusted grid layouts for medium screens

### **Mobile (< 640px)**

- Compact, touch-friendly interface
- Optimized form layouts for small screens
- Gesture-friendly navigation and interactions

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks and concurrent features
- **Vite** - Fast build tool and development server
- **CSS3** - Modern CSS with variables, grid, and flexbox
- **Local Storage** - Browser-based data persistence
- **ESLint** - Code quality and consistency

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd money-tracker
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 📖 Usage Guide

### **Adding Transactions**

1. Fill in the transaction form on the left panel
2. Select transaction type (Income/Expense)
3. Choose a category (optional)
4. Set the date and amount
5. Click "Add Transaction"

### **Viewing Analytics**

1. Click the Analysis icon in the floating navigation
2. Switch between Monthly and Annual views
3. Select specific time periods using the dropdowns
4. View category breakdowns and spending patterns

### **Generating Reports**

1. Navigate to the Reports section
2. Choose report type (Monthly/Annual)
3. Select the desired time period
4. Preview the report statistics
5. Download as CSV for external analysis

### **Managing Categories**

1. Go to Settings via the floating navigation
2. Add new categories using the input form
3. Delete unwanted categories with the × button
4. Categories are automatically saved

### **Theme Switching**

1. Access Settings from the navigation
2. Toggle the theme switch for dark/light mode
3. Theme preference is automatically saved

## 🎯 Key Benefits

- **Privacy-focused** - All data stays on your device
- **No registration** - Start tracking immediately
- **Offline capable** - Works without internet connection
- **Fast & responsive** - Optimized for smooth performance
- **Clean interface** - Focus on your finances, not the UI
- **Export ready** - Easy data export for external analysis

## 🔒 Data Privacy

Your financial data is completely private and secure:

- **Local storage only** - No data sent to external servers
- **No tracking** - No analytics or user behavior monitoring
- **No registration** - No personal information required
- **Full control** - You own and control all your data

## 🎨 Design Credits

Inspired by the **Nothing OS** design philosophy - clean, minimal, and purposeful interfaces that prioritize functionality over decoration.

---

**Start tracking your finances with style. Simple, clean, effective.** 🖤
