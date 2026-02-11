import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Trophy, Target, BarChart3, History, Plus, TrendingUp, RotateCcw } from 'lucide-react';
import { denverGolfCourses, getCourseList, getCourse, getCourseGroupList, courseGroups, getCourseKeyFromSelection } from './golfCourses';

export default function AIGolfCaddy() {
  const [activeTab, setActiveTab] = useState('recommend');

  // Load selected course group and variant from localStorage or use defaults
  const [selectedCourseGroup, setSelectedCourseGroup] = useState(() => {
    try {
      const saved = localStorage.getItem('selectedCourseGroup');
      return saved || 'generic';
    } catch (error) {
      return 'generic';
    }
  });

  const [selectedVariant, setSelectedVariant] = useState(() => {
    try {
      const saved = localStorage.getItem('selectedVariant');
      return saved || 'full';
    } catch (error) {
      return 'full';
    }
  });

  // Compute the actual course key from group + variant
  const selectedCourse = useMemo(() => {
    return getCourseKeyFromSelection(selectedCourseGroup, selectedVariant);
  }, [selectedCourseGroup, selectedVariant]);

  // Load shots from localStorage or use empty array
  const [shots, setShots] = useState(() => {
    try {
      const saved = localStorage.getItem('golfShots');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading shots from localStorage:', error);
      return [];
    }
  });

  const [recommendation, setRecommendation] = useState(null);

  const [targetDistance, setTargetDistance] = useState(150);
  const [windCondition, setWindCondition] = useState('No Wind');
  const [temperature, setTemperature] = useState(70);
  const [lie, setLie] = useState('Fairway');

  const [logClub, setLogClub] = useState('');
  const [logTarget, setLogTarget] = useState(150);
  const [logActual, setLogActual] = useState('');
  const [logResult, setLogResult] = useState('Center');
  const [logWind, setLogWind] = useState('No Wind');
  const [logTemp, setLogTemp] = useState(70);
  const [logLie, setLogLie] = useState('Fairway');

  // Load scorecard from localStorage or initialize from selected course
  const [scorecard, setScorecard] = useState(() => {
    try {
      const saved = localStorage.getItem('golfScorecard');
      const savedCourse = localStorage.getItem('scorecardCourse');
      const currentCourse = localStorage.getItem('selectedCourse') || 'generic';

      // If we have a saved scorecard for the current course, use it
      if (saved && savedCourse === currentCourse) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading scorecard from localStorage:', error);
    }

    // Initialize scorecard from selected course
    const course = getCourse(selectedCourse);
    return course.holes.map(hole => ({
      ...hole,
      strokes: null
    }));
  });

  const [currentHole, setCurrentHole] = useState(() => {
    try {
      const saved = localStorage.getItem('currentHole');
      return saved ? parseInt(saved, 10) : 1;
    } catch (error) {
      return 1;
    }
  });

  const [holeStrokes, setHoleStrokes] = useState('');

  const baseClubs = useMemo(() => [
    { name: 'Driver', baseDistance: 250 },
    { name: '3 Wood', baseDistance: 230 },
    { name: '5 Wood', baseDistance: 210 },
    { name: '4 Iron', baseDistance: 190 },
    { name: '5 Iron', baseDistance: 180 },
    { name: '6 Iron', baseDistance: 170 },
    { name: '7 Iron', baseDistance: 160 },
    { name: '8 Iron', baseDistance: 150 },
    { name: '9 Iron', baseDistance: 140 },
    { name: 'PW', baseDistance: 130 },
    { name: 'GW', baseDistance: 110 },
    { name: 'SW', baseDistance: 90 },
    { name: 'LW', baseDistance: 70 }
  ], []);

  // Save shots to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('golfShots', JSON.stringify(shots));
    } catch (error) {
      console.error('Error saving shots to localStorage:', error);
    }
  }, [shots]);

  // Save scorecard to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('golfScorecard', JSON.stringify(scorecard));
      localStorage.setItem('scorecardCourse', selectedCourse);
    } catch (error) {
      console.error('Error saving scorecard to localStorage:', error);
    }
  }, [scorecard, selectedCourse]);

  // Save current hole to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('currentHole', currentHole.toString());
    } catch (error) {
      console.error('Error saving current hole to localStorage:', error);
    }
  }, [currentHole]);

  // Save selected course group and variant to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('selectedCourseGroup', selectedCourseGroup);
      localStorage.setItem('selectedVariant', selectedVariant);
      localStorage.setItem('selectedCourse', selectedCourse);
    } catch (error) {
      console.error('Error saving selected course to localStorage:', error);
    }
  }, [selectedCourseGroup, selectedVariant, selectedCourse]);

  const getCalibratedDistance = useCallback((clubName) => {
    const clubShots = shots.filter(s => s.club === clubName && s.actualDistance);
    if (clubShots.length === 0) {
      const baseClub = baseClubs.find(c => c.name === clubName);
      return baseClub ? baseClub.baseDistance : 150;
    }

    const avgActual = clubShots.reduce((sum, s) => sum + s.actualDistance, 0) / clubShots.length;
    return Math.round(avgActual);
  }, [shots, baseClubs]);

  const getConditionAdjustment = useCallback((clubName, conditions) => {
    const similarShots = shots.filter(s =>
      s.club === clubName &&
      s.wind === conditions.wind &&
      s.lie === conditions.lie &&
      Math.abs(s.temperature - conditions.temp) < 10
    );

    // Need at least 3 shots in similar conditions for reliable adjustment
    if (similarShots.length < 3) return 0;

    const avgDiff = similarShots.reduce((sum, s) =>
      sum + (s.actualDistance - s.targetDistance), 0
    ) / similarShots.length;

    return Math.round(avgDiff);
  }, [shots]);

  const getClubStats = useCallback((clubName) => {
    const clubShots = shots.filter(s => s.club === clubName);
    if (clubShots.length === 0) return null;

    const totalShots = clubShots.length;
    const avgDistance = Math.round(
      clubShots.reduce((sum, s) => sum + (s.actualDistance || 0), 0) / totalShots
    );
    const centerHits = clubShots.filter(s => s.result === 'Center').length;
    const accuracy = Math.round((centerHits / totalShots) * 100);

    return { totalShots, avgDistance, accuracy };
  }, [shots]);

  const getRecommendation = useCallback(() => {
    let adjustedDistance = targetDistance;

    // Temperature adjustment: ball flies ~2 yards farther per 10°F above 70°F
    const tempDiff = temperature - 70;
    adjustedDistance += tempDiff * 0.2;

    // Wind adjustments
    if (windCondition.includes('headwind')) {
      const match = windCondition.match(/\d+/);
      const windSpeed = match ? parseInt(match[0], 10) : 0;
      adjustedDistance += windSpeed * 2;
    } else if (windCondition.includes('tailwind')) {
      const match = windCondition.match(/\d+/);
      const windSpeed = match ? parseInt(match[0], 10) : 0;
      adjustedDistance -= windSpeed * 1.5;
    }

    // Lie adjustments
    const lieAdjustments = {
      'Fairway': 0,
      'Rough': 10,
      'Tee': -5,
      'Bunker': 15,
      'Uphill': 10,
      'Downhill': -10
    };
    adjustedDistance += lieAdjustments[lie] || 0;

    const clubs = baseClubs.map(club => {
      const calibratedDist = getCalibratedDistance(club.name);
      const conditionAdj = getConditionAdjustment(club.name, {
        wind: windCondition,
        lie: lie,
        temp: temperature
      });

      return {
        name: club.name,
        distance: calibratedDist + conditionAdj,
        isCalibrated: shots.filter(s => s.club === club.name).length > 0,
        diff: Math.abs(calibratedDist + conditionAdj - adjustedDistance)
      };
    });

    const sortedClubs = clubs.sort((a, b) => a.diff - b.diff);
    const primaryClub = sortedClubs[0];
    const alternateClub = sortedClubs[1];

    let strategy = 'Good conditions for normal shot execution.';
    const primaryStats = getClubStats(primaryClub.name);

    if (primaryStats && primaryStats.accuracy < 60) {
      strategy = `Your accuracy with this club is ${primaryStats.accuracy}%. Consider the alternate for more consistency.`;
    } else if (lie === 'Rough' || lie === 'Bunker') {
      strategy = `From ${lie.toLowerCase()}, focus on clean contact. Consider clubbing up.`;
    } else if (windCondition.includes('headwind')) {
      strategy = 'Into the wind - swing smooth and keep ball flight lower.';
    } else if (windCondition.includes('tailwind')) {
      strategy = 'Downwind - let the wind help, no need to force it.';
    }

    if (primaryClub.isCalibrated) {
      strategy = '📊 Personalized recommendation based on your data. ' + strategy;
    }

    setRecommendation({
      club: primaryClub.name,
      alternate: alternateClub.name,
      adjustedDistance: Math.round(adjustedDistance),
      primaryDistance: primaryClub.distance,
      alternateDistance: alternateClub.distance,
      strategy: strategy,
      primaryStats: primaryStats,
      isPersonalized: primaryClub.isCalibrated
    });
  }, [targetDistance, temperature, windCondition, lie, baseClubs, getCalibratedDistance, getConditionAdjustment, getClubStats, shots]);

  const logShot = useCallback(() => {
    if (!logClub || !logActual) return;

    const actualDistance = parseInt(logActual, 10);
    if (isNaN(actualDistance) || actualDistance < 0) {
      alert('Please enter a valid actual distance');
      return;
    }

    const newShot = {
      id: Date.now(),
      club: logClub,
      targetDistance: Math.max(0, logTarget),
      actualDistance: actualDistance,
      result: logResult,
      wind: logWind,
      temperature: logTemp,
      lie: logLie,
      timestamp: new Date().toLocaleString()
    };

    setShots(prevShots => [newShot, ...prevShots]);

    // Reset form
    setLogClub('');
    setLogActual('');
    setLogTarget(150);
    setLogResult('Center');
  }, [logClub, logActual, logTarget, logResult, logWind, logTemp, logLie]);

  const getTotalStats = useMemo(() => {
    if (shots.length === 0) return null;

    const resultCounts = {};
    shots.forEach(shot => {
      resultCounts[shot.result] = (resultCounts[shot.result] || 0) + 1;
    });

    const sortedResults = Object.entries(resultCounts).sort((a, b) => b[1] - a[1]);
    const mostCommon = sortedResults[0] ? sortedResults[0][0] : 'N/A';

    const centerHits = shots.filter(s => s.result === 'Center').length;
    const overallAccuracy = Math.round((centerHits / shots.length) * 100);

    return {
      totalShots: shots.length,
      mostCommon: mostCommon,
      overallAccuracy: overallAccuracy
    };
  }, [shots]);

  const logHoleScore = useCallback(() => {
    if (!holeStrokes) return;

    const strokes = parseInt(holeStrokes, 10);
    if (isNaN(strokes) || strokes < 1) {
      alert('Please enter a valid number of strokes');
      return;
    }

    setScorecard(prevScorecard => {
      const updatedScorecard = [...prevScorecard];
      updatedScorecard[currentHole - 1] = {
        ...updatedScorecard[currentHole - 1],
        strokes: strokes
      };
      return updatedScorecard;
    });

    if (currentHole < 18) {
      setCurrentHole(prevHole => prevHole + 1);
    }
    setHoleStrokes('');
  }, [holeStrokes, currentHole]);

  const getScorecardStats = useMemo(() => {
    const holesPlayed = scorecard.filter(h => h.strokes !== null).length;
    const totalStrokes = scorecard.reduce((sum, h) => sum + (h.strokes || 0), 0);
    const totalPar = scorecard.reduce((sum, h) => sum + h.par, 0);
    const score = totalStrokes - totalPar;

    return { holesPlayed, totalStrokes, totalPar, score };
  }, [scorecard]);

  const resetScorecard = useCallback(() => {
    if (window.confirm('Are you sure you want to reset the scorecard?')) {
      const course = getCourse(selectedCourse);
      const newScorecard = course.holes.map(hole => ({
        ...hole,
        strokes: null
      }));
      setScorecard(newScorecard);
      setCurrentHole(1);
      setHoleStrokes('');
    }
  }, [selectedCourse]);

  const handleCourseGroupChange = useCallback((newCourseGroup) => {
    if (scorecard.some(hole => hole.strokes !== null)) {
      if (!window.confirm('Changing courses will reset your current scorecard. Continue?')) {
        return;
      }
    }

    setSelectedCourseGroup(newCourseGroup);
    // Reset variant to 'full' when changing course groups
    setSelectedVariant('full');
    const newCourseKey = getCourseKeyFromSelection(newCourseGroup, 'full');
    const course = getCourse(newCourseKey);
    const newScorecard = course.holes.map(hole => ({
      ...hole,
      strokes: null
    }));
    setScorecard(newScorecard);
    setCurrentHole(1);
    setHoleStrokes('');
  }, [scorecard]);

  const handleVariantChange = useCallback((newVariant) => {
    if (scorecard.some(hole => hole.strokes !== null)) {
      if (!window.confirm('Changing course variant will reset your current scorecard. Continue?')) {
        return;
      }
    }

    setSelectedVariant(newVariant);
    const newCourseKey = getCourseKeyFromSelection(selectedCourseGroup, newVariant);
    const course = getCourse(newCourseKey);
    const newScorecard = course.holes.map(hole => ({
      ...hole,
      strokes: null
    }));
    setScorecard(newScorecard);
    setCurrentHole(1);
    setHoleStrokes('');
  }, [scorecard, selectedCourseGroup]);

  const clearAllData = useCallback(() => {
    if (window.confirm('Are you sure you want to clear all shot data? This cannot be undone.')) {
      setShots([]);
      localStorage.removeItem('golfShots');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-800">AI Golf Caddy</h1>
            </div>
            {shots.length > 0 && (
              <div className="text-right">
                <p className="text-sm text-gray-600">Shots Logged</p>
                <p className="text-2xl font-bold text-green-600">{shots.length}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="grid grid-cols-5 gap-2 p-2">
            <button
              onClick={() => setActiveTab('recommend')}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'recommend'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Target className="w-5 h-5" />
              <span className="hidden sm:inline">Recommend</span>
            </button>
            <button
              onClick={() => setActiveTab('log')}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'log'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Log Shot</span>
            </button>
            <button
              onClick={() => setActiveTab('scorecard')}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'scorecard'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Trophy className="w-5 h-5" />
              <span className="hidden sm:inline">Scorecard</span>
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'stats'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span className="hidden sm:inline">Stats</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'history'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <History className="w-5 h-5" />
              <span className="hidden sm:inline">History</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {activeTab === 'recommend' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Get Club Recommendation</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Target Distance (yards)</label>
                  <input
                    type="number"
                    value={targetDistance}
                    onChange={(e) => setTargetDistance(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Wind Conditions</label>
                  <select
                    value={windCondition}
                    onChange={(e) => setWindCondition(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option>No Wind</option>
                    <option>5-10 mph headwind</option>
                    <option>10-15 mph headwind</option>
                    <option>15-20 mph headwind</option>
                    <option>5-10 mph tailwind</option>
                    <option>10-15 mph tailwind</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Temperature (°F)</label>
                  <input
                    type="number"
                    value={temperature}
                    onChange={(e) => setTemperature(parseInt(e.target.value) || 70)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Lie</label>
                  <select
                    value={lie}
                    onChange={(e) => setLie(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option>Fairway</option>
                    <option>Rough</option>
                    <option>Tee</option>
                    <option>Bunker</option>
                    <option>Uphill</option>
                    <option>Downhill</option>
                  </select>
                </div>
              </div>

              <button
                onClick={getRecommendation}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium transition-colors"
              >
                Get Recommendations
              </button>

              {recommendation && (
                <div className="mt-6 p-6 bg-green-50 rounded-lg border-2 border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-green-800">Recommendation</h3>
                    {recommendation.isPersonalized && (
                      <span className="px-3 py-1 bg-blue-500 text-white text-xs rounded-full flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Personalized
                      </span>
                    )}
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-lg"><span className="font-medium">Primary Club:</span> {recommendation.club}</p>
                        <p className="text-sm text-gray-600">Expected: {recommendation.primaryDistance} yards</p>
                      </div>
                      {recommendation.primaryStats && (
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{recommendation.primaryStats.totalShots} shots logged</p>
                          <p className="text-sm font-medium text-green-600">{recommendation.primaryStats.accuracy}% accuracy</p>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-lg"><span className="font-medium">Alternate:</span> {recommendation.alternate}</p>
                      <p className="text-sm text-gray-600">Expected: {recommendation.alternateDistance} yards</p>
                    </div>
                    <p className="text-sm text-green-700 mt-4 p-3 bg-white rounded">{recommendation.strategy}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'log' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Log Shot</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Club *</label>
                  <select
                    value={logClub}
                    onChange={(e) => setLogClub(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select club</option>
                    {baseClubs.map(club => (
                      <option key={club.name} value={club.name}>{club.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Result</label>
                  <select
                    value={logResult}
                    onChange={(e) => setLogResult(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option>Center</option>
                    <option>Long</option>
                    <option>Short</option>
                    <option>Left</option>
                    <option>Right</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Target Distance (yards)</label>
                  <input
                    type="number"
                    value={logTarget}
                    onChange={(e) => setLogTarget(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Actual Distance (yards) *</label>
                  <input
                    type="number"
                    value={logActual}
                    onChange={(e) => setLogActual(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Required"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Wind Conditions</label>
                  <select
                    value={logWind}
                    onChange={(e) => setLogWind(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option>No Wind</option>
                    <option>5-10 mph headwind</option>
                    <option>10-15 mph headwind</option>
                    <option>15-20 mph headwind</option>
                    <option>5-10 mph tailwind</option>
                    <option>10-15 mph tailwind</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Temperature (°F)</label>
                  <input
                    type="number"
                    value={logTemp}
                    onChange={(e) => setLogTemp(parseInt(e.target.value) || 70)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Lie</label>
                  <select
                    value={logLie}
                    onChange={(e) => setLogLie(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option>Fairway</option>
                    <option>Rough</option>
                    <option>Tee</option>
                    <option>Bunker</option>
                    <option>Uphill</option>
                    <option>Downhill</option>
                  </select>
                </div>
              </div>

              <button
                onClick={logShot}
                disabled={!logClub || !logActual}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Log Shot
              </button>
            </div>
          )}

          {activeTab === 'scorecard' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Scorecard</h2>
                <button
                  onClick={resetScorecard}
                  className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>

              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border-2 border-blue-200">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Golf Course</label>
                    <select
                      value={selectedCourseGroup}
                      onChange={(e) => handleCourseGroupChange(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      {getCourseGroupList().map((group) => (
                        <option key={group.key} value={group.key}>
                          {group.name} - {group.location}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Course Option</label>
                    <select
                      value={selectedVariant}
                      onChange={(e) => handleVariantChange(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      disabled={!courseGroups[selectedCourseGroup]?.hasVariants}
                    >
                      <option value="full">
                        {courseGroups[selectedCourseGroup]?.variantLabels?.full ||
                         (courseGroups[selectedCourseGroup]?.hasVariants ? 'Full 18 Holes' : 'Full Course')}
                      </option>
                      {courseGroups[selectedCourseGroup]?.hasVariants && courseGroups[selectedCourseGroup]?.courses.front9 && (
                        <option value="front9">
                          {courseGroups[selectedCourseGroup]?.variantLabels?.front9 || 'Front 9'}
                        </option>
                      )}
                      {courseGroups[selectedCourseGroup]?.hasVariants && courseGroups[selectedCourseGroup]?.courses.back9 && (
                        <option value="back9">
                          {courseGroups[selectedCourseGroup]?.variantLabels?.back9 || 'Back 9'}
                        </option>
                      )}
                    </select>
                  </div>
                </div>
                {denverGolfCourses[selectedCourse]?.description && (
                  <p className="text-sm text-gray-600 mt-3">
                    {denverGolfCourses[selectedCourse].description}
                  </p>
                )}
              </div>

              {getScorecardStats.holesPlayed > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Holes Played</p>
                    <p className="text-2xl font-bold">{getScorecardStats.holesPlayed}/18</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Strokes</p>
                    <p className="text-2xl font-bold">{getScorecardStats.totalStrokes}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">Par</p>
                    <p className="text-2xl font-bold">{getScorecardStats.totalPar}</p>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    getScorecardStats.score === 0 ? 'bg-yellow-50' :
                    getScorecardStats.score < 0 ? 'bg-green-100' : 'bg-orange-50'
                  }`}>
                    <p className="text-sm text-gray-600">Score</p>
                    <p className="text-2xl font-bold">
                      {getScorecardStats.score > 0 ? '+' : ''}{getScorecardStats.score}
                    </p>
                  </div>
                </div>
              )}

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-4">Current Hole: {currentHole}</h3>
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-2">
                      Strokes for Hole {currentHole} (Par {scorecard[currentHole - 1].par})
                    </label>
                    <input
                      type="number"
                      value={holeStrokes}
                      onChange={(e) => setHoleStrokes(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter strokes"
                      min="1"
                    />
                  </div>
                  <button
                    onClick={logHoleScore}
                    disabled={!holeStrokes}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Log Score
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {scorecard.map((hole) => (
                  <div
                    key={hole.hole}
                    className={`p-4 rounded-lg border-2 ${
                      hole.hole === currentHole
                        ? 'border-green-500 bg-green-50'
                        : hole.strokes !== null
                        ? 'border-gray-300 bg-white'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-lg font-bold">Hole {hole.hole}</p>
                        <p className="text-sm text-gray-600">Par {hole.par}</p>
                      </div>
                      {hole.strokes !== null && (
                        <div className="text-right">
                          <p className="text-2xl font-bold">{hole.strokes}</p>
                          <p className={`text-xs font-medium ${
                            hole.strokes === hole.par ? 'text-yellow-600' :
                            hole.strokes < hole.par ? 'text-green-600' :
                            hole.strokes === hole.par + 1 ? 'text-orange-600' : 'text-red-600'
                          }`}>
                            {hole.strokes === hole.par - 2 ? 'Eagle' :
                             hole.strokes === hole.par - 1 ? 'Birdie' :
                             hole.strokes === hole.par ? 'Par' :
                             hole.strokes === hole.par + 1 ? 'Bogey' :
                             hole.strokes === hole.par + 2 ? 'Double' :
                             `+${hole.strokes - hole.par}`}
                          </p>
                        </div>
                      )}
                    </div>
                    {hole.hole === currentHole && (
                      <p className="text-xs text-green-600 font-medium mt-2">Current hole</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Your Stats</h2>
                {shots.length > 0 && (
                  <button
                    onClick={clearAllData}
                    className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Clear All Data
                  </button>
                )}
              </div>

              {getTotalStats ? (
                <div>
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="p-6 bg-blue-50 rounded-lg">
                      <h3 className="font-medium mb-2">Total Shots</h3>
                      <p className="text-3xl font-bold">{getTotalStats.totalShots}</p>
                    </div>

                    <div className="p-6 bg-orange-50 rounded-lg">
                      <h3 className="font-medium mb-2">Overall Accuracy</h3>
                      <p className="text-3xl font-bold">{getTotalStats.overallAccuracy}%</p>
                    </div>

                    <div className="p-6 bg-purple-50 rounded-lg">
                      <h3 className="font-medium mb-2">Most Common Result</h3>
                      <p className="text-3xl font-bold">{getTotalStats.mostCommon}</p>
                    </div>
                  </div>

                  <h3 className="font-bold text-xl mb-4">Club Performance</h3>
                  <div className="space-y-3">
                    {baseClubs.map(club => {
                      const clubStats = getClubStats(club.name);
                      if (!clubStats) return null;

                      return (
                        <div key={club.name} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{club.name}</p>
                              <p className="text-sm text-gray-600">Avg: {clubStats.avgDistance} yards • {clubStats.totalShots} shots</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-green-600">{clubStats.accuracy}%</p>
                              <p className="text-xs text-gray-600">accuracy</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No shots logged yet. Start logging to see your personalized stats!</p>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Shot History</h2>

              {shots.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No shots logged yet</p>
              ) : (
                <div className="space-y-3">
                  {shots.map(shot => (
                    <div key={shot.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-lg">{shot.club}</p>
                          <p className="text-sm text-gray-600">Target: {shot.targetDistance}y → Actual: {shot.actualDistance}y</p>
                        </div>
                        <span className="px-3 py-1 bg-black text-white text-xs rounded">{shot.result}</span>
                      </div>
                      <div className="text-xs text-gray-500 space-y-1">
                        <p>Wind: {shot.wind} • Temp: {shot.temperature}°F • Lie: {shot.lie}</p>
                        <p>{shot.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
