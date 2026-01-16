# AI Golf Caddy

An intelligent golf companion app that provides personalized club recommendations based on your performance data, environmental conditions, and shot history.

## Features

### 1. Club Recommendations
- Get personalized club suggestions based on target distance
- Adjustments for wind conditions (headwind/tailwind)
- Temperature compensation
- Lie adjustments (fairway, rough, tee, bunker, uphill, downhill)
- AI-powered strategy tips based on your historical accuracy

### 2. Shot Logging
- Track every shot with detailed metadata
- Record club used, target distance, actual distance
- Log environmental conditions (wind, temperature, lie)
- Track shot results (center, long, short, left, right)
- Data persists in browser localStorage

### 3. Scorecard
- Full 18-hole scorecard tracking
- Realistic par distribution (4 par 3s, 10 par 4s, 4 par 5s)
- Real-time score calculation (relative to par)
- Hole-by-hole performance tracking
- Visual indicators for birdies, pars, bogeys, etc.
- Persistent storage across sessions

### 4. Statistics Dashboard
- Overall shot accuracy tracking
- Club-by-club performance metrics
- Average distances per club
- Most common shot results
- Personalized insights

### 5. Shot History
- Complete log of all shots taken
- Detailed metadata for each shot
- Chronological ordering

## Technical Improvements

### Bug Fixes
1. **Fixed Scorecard Par Calculation**: Improved the par distribution logic to create a realistic golf course layout
2. **Added Input Validation**: Prevents negative numbers in distance and stroke inputs
3. **Error Handling**: Added try-catch blocks for localStorage operations
4. **Missing Scorecard UI**: Implemented the complete scorecard tab that was referenced but not rendered

### Optimizations
1. **Performance Enhancements**:
   - Added `useMemo` for expensive calculations (stats, scorecard stats, base clubs)
   - Added `useCallback` for functions to prevent unnecessary re-renders
   - Memoized computed values that don't need to recalculate on every render

2. **Data Persistence**:
   - Implemented localStorage for shots data
   - Persistent scorecard across sessions
   - Current hole tracking survives page refreshes

3. **Code Quality**:
   - Better state management with functional updates
   - Improved validation and error messages
   - More efficient state updates using callback forms
   - Added confirmation dialogs for destructive actions

4. **User Experience**:
   - Added visual feedback for current hole on scorecard
   - Color-coded score performance (eagle, birdie, par, bogey, etc.)
   - Reset functionality for scorecard and shot data
   - Better loading from localStorage with error recovery
   - Focus states for all inputs
   - Transition animations for tab switching

### Refactoring
1. **Component Structure**: Organized imports and state initialization
2. **Realistic Defaults**: Better default scorecard with proper par distribution
3. **Accessibility**: Added min/max constraints on number inputs
4. **Consistency**: Unified styling patterns across all tabs

## Setup Instructions

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Ai-golf-caddy
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage Guide

### Getting Club Recommendations

1. Navigate to the "Recommend" tab
2. Enter your target distance in yards
3. Select current wind conditions
4. Set the temperature
5. Choose your lie (fairway, rough, etc.)
6. Click "Get Recommendations"
7. Review the primary and alternate club suggestions
8. Read the personalized strategy tip

**Pro Tip**: The more shots you log, the more accurate your recommendations become!

### Logging Shots

1. Go to the "Log Shot" tab
2. Select the club you used
3. Enter the target distance
4. Enter the actual distance achieved
5. Select the shot result (center, long, short, left, right)
6. Record environmental conditions
7. Click "Log Shot"

All shots are automatically saved to your browser's local storage.

### Using the Scorecard

1. Open the "Scorecard" tab
2. For each hole, enter the number of strokes
3. Click "Log Score" to move to the next hole
4. View your cumulative score relative to par
5. See hole-by-hole performance with color coding
6. Reset the scorecard when starting a new round

### Viewing Statistics

1. Click the "Stats" tab
2. Review your overall accuracy percentage
3. Check club-by-club performance metrics
4. Identify which clubs you're most accurate with
5. See average distances for each club

### Reviewing History

1. Navigate to the "History" tab
2. Scroll through all logged shots
3. Review detailed metadata for each shot
4. Analyze patterns in your performance

## Technology Stack

- **React 18.2** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **LocalStorage** - Client-side data persistence

## Data Privacy

All data is stored locally in your browser's localStorage. No data is sent to external servers. Your golf performance data stays completely private on your device.

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Any modern browser with localStorage support

## Future Enhancement Ideas

- Export data to CSV/JSON
- Import previous rounds
- Graph visualization of performance trends
- Course management features
- Multi-user support
- GPS integration for automatic distance calculation
- Weather API integration

## License

MIT License - feel free to use and modify as needed

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

---

**Enjoy your improved golf game with AI Golf Caddy!** 🏌️‍♂️⛳
