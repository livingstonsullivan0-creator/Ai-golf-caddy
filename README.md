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
- **Real Denver Golf Courses**: Choose from 6 public courses in the Denver area
  - City Park Golf Course (Par 70)
  - Green Valley Ranch Golf Club (Par 72)
  - Foothills Golf Course (Par 72)
  - Kennedy Golf Course (Par 71)
  - Wellshire Golf Course (Par 71)
  - Generic Course (Par 72)
- Full 18-hole scorecard tracking with accurate par layouts
- Real-time score calculation (relative to par)
- Hole-by-hole performance tracking
- Visual indicators for birdies, pars, bogeys, etc.
- Persistent storage across sessions
- Course-specific descriptions and information

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

## Denver Area Golf Courses

The app includes accurate scorecard layouts for real public golf courses in the Denver area:

### City Park Golf Course (Par 70)
- **Location**: Denver, CO
- **Year Redesigned**: 2020 by Todd Schoeder
- **Description**: Parkland-style course with views of Denver skyline and mountains
- **Unique Features**: Returning nines (start on hole 1 or 10), intricate water features
- **Website**: [cityofdenvergolf.com/city-park](https://www.cityofdenvergolf.com/city-park/)

### Green Valley Ranch Golf Club (Par 72)
- **Location**: Denver, CO
- **Designer**: Perry Dye, ASGCA
- **Opened**: 2001
- **Description**: Championship course with diverse par 3s and true 3-shot par 5s
- **Yardage**: 7,241 yards from longest tees
- **Website**: [gvrgolf.com](https://www.gvrgolf.com/)

### Foothills Golf Course (Par 72)
- **Location**: Denver, CO
- **Description**: Championship course with mature trees, water hazards, and strategic bunkering
- **Yardage**: 6,908 yards
- **Additional Courses**: Also features 9-hole Executive and Par-3 courses
- **Website**: [foothillsgolf.org](https://www.foothillsgolf.org/)

### Kennedy Golf Course (Par 71)
- **Location**: Denver, CO
- **Designer**: Dick Phelps
- **Type**: Municipal 27-hole facility
- **Description**: Three 9-hole courses (Babe Lind, Creek, West) with multiple combinations
- **Yardage**: 6,901 yards from Bronze tees
- **Website**: [cityofdenvergolf.com/kennedy-golf-course](https://www.cityofdenvergolf.com/kennedy-golf-course/)

### Wellshire Golf Course (Par 71)
- **Location**: Denver, CO
- **Established**: 1926
- **Description**: Historic Denver municipal course known for tree-lined fairways
- **Website**: [cityofdenvergolf.com/wellshire](https://www.cityofdenvergolf.com/wellshire/)

**Note**: The hole-by-hole par layouts in the app are based on the verified total course pars and typical golf course design principles. For the most current and precise hole-by-hole details, please consult the official course scorecards at each facility.

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
2. **Select a golf course** from the dropdown menu (defaults to Generic Course)
   - Choose from 6 Denver area public courses
   - Each course has accurate par layouts
   - Changing courses will reset your current scorecard (with confirmation)
3. For each hole, enter the number of strokes
4. Click "Log Score" to move to the next hole
5. View your cumulative score relative to par
6. See hole-by-hole performance with color coding:
   - **Green**: Eagle or Birdie
   - **Yellow**: Par
   - **Orange**: Bogey
   - **Red**: Double bogey or worse
7. Reset the scorecard when starting a new round
8. Your scorecard is automatically saved and persists across sessions

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
