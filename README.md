# SpaceX Launch Dashboard

A comprehensive, responsive web application built with React and TypeScript that displays SpaceX launch data with advanced filtering, pagination, and detailed views.

![SpaceX Launch Dashboard](https://upload.wikimedia.org/wikipedia/commons/d/de/SpaceX-Logo.svg)

## 🚀 Features

- **Real-time Data**: Fetches live data from the official SpaceX API
- **Advanced Filtering**: Filter launches by date range, status, and search terms
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Detailed Views**: Click on any launch to see comprehensive mission details
- **Pagination**: Navigate through large datasets efficiently
- **TypeScript**: Fully typed for better development experience and reliability
- **Accessibility**: Keyboard navigation and screen reader support
- **Modern UI**: Clean, professional design with smooth animations

## 🛠️ Technologies Used

- **Frontend**: React 18 with TypeScript
- **Styling**: CSS3 with modern layout techniques
- **HTTP Client**: Axios for API requests
- **Build Tool**: Create React App with TypeScript template
- **API**: SpaceX-API v5 (https://api.spacexdata.com/v5)

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/spacex-launch-dashboard.git
cd spacex-launch-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm start
```

The application will open in your browser at `http://localhost:3000`.

### 4. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🏗️ Project Structure

```
spacex-launch-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.tsx          # Header with logo and title
│   │   ├── Filter.tsx          # Filtering controls
│   │   ├── Table.tsx           # Launch data table
│   │   ├── Pagination.tsx      # Pagination controls
│   │   └── Modal.tsx           # Detailed launch view modal
│   ├── pages/
│   │   └── Dashboard.tsx       # Main dashboard page
│   ├── services/
│   │   └── spacexApi.ts        # API service layer
│   ├── styles/
│   │   └── App.css             # Application styles
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   ├── App.tsx                 # Main app component
│   ├── index.tsx               # Application entry point
│   └── react-app-env.d.ts      # React TypeScript declarations
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Configuration

### Environment Variables

The application uses the public SpaceX API, so no API keys are required. However, you can create a `.env` file for any custom configurations:

```env
REACT_APP_API_BASE_URL=https://api.spacexdata.com/v5
```

### TypeScript Configuration

The project uses strict TypeScript configuration for better type safety. See `tsconfig.json` for details.

## 📱 Features in Detail

### Filtering System
- **Date Range**: Past 6 Months, Past Year, Past 3 Years, All Launches
- **Launch Status**: Success, Failed, Upcoming, All
- **Search**: Search by mission name, rocket, or launch site

### Launch Table
- **Sortable Columns**: Flight number, date, location, mission, status, rocket
- **Status Indicators**: Color-coded badges for easy status identification
- **Responsive Layout**: Adapts to different screen sizes
- **Click to View Details**: Click any row to see detailed information

### Detailed Modal View
- **Comprehensive Information**: Flight number, date, rocket, launch site, status
- **Mission Details**: Full mission description when available
- **Core Information**: Reusability status and landing information
- **External Links**: YouTube videos, articles, Wikipedia pages

### Pagination
- **Smart Navigation**: Shows relevant page numbers with ellipsis
- **Page Info**: Current page and total pages display
- **Keyboard Accessible**: Navigate with keyboard

## 🎨 Design Philosophy

The dashboard follows modern web design principles:

- **Clean Interface**: Minimal clutter, focus on data
- **Consistent Styling**: Unified color scheme and typography
- **Intuitive Navigation**: Clear visual hierarchy
- **Professional Appearance**: Suitable for both casual and professional use

## 🔍 API Integration

The application integrates with the SpaceX API v5:

- **Launches Endpoint**: `/v5/launches/query` with pagination support
- **Rockets Endpoint**: `/v5/rockets` for rocket information
- **Launchpads Endpoint**: `/v5/launchpads` for launch site details

### Data Processing
- Combines launch data with rocket and launchpad information
- Formats dates for user-friendly display
- Handles edge cases like missing data gracefully

## 🧪 Testing

Run the test suite:

```bash
npm test
```

The project includes:
- Component unit tests
- API service tests
- Integration tests for user workflows

## 📦 Deployment

### Netlify Deployment

1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the React app
3. Deploy with default settings

### Manual Deployment

1. Build the project: `npm run build`
2. Upload the `build` folder contents to your web server
3. Configure your server to serve `index.html` for all routes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **SpaceX** for providing the public API
- **React Team** for the excellent framework
- **TypeScript Team** for type safety
- **Open Source Community** for inspiration and tools

## 📞 Support

If you have any questions or run into issues:

1. Check the [Issues](https://github.com/your-username/spacex-launch-dashboard/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

## 🔮 Future Enhancements

- [ ] Real-time launch countdown timers
- [ ] Launch notifications system
- [ ] Advanced data visualization charts
- [ ] Crew information integration
- [ ] Landing video integration
- [ ] Export functionality (CSV, PDF)
- [ ] Dark/Light theme toggle
- [ ] Offline support with caching
- [ ] Launch calendar view
- [ ] Comparison tool for launches

---

**Made with ❤️ for space enthusiasts and developers**
