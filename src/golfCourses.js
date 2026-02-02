// Denver & Aurora Area Public Golf Courses
// Course data based on official course information and typical layouts

export const denverGolfCourses = {
  generic: {
    name: "Generic Course",
    location: "Default",
    par: 72,
    holes: [
      { hole: 1, par: 4 }, { hole: 2, par: 4 }, { hole: 3, par: 3 }, { hole: 4, par: 4 },
      { hole: 5, par: 5 }, { hole: 6, par: 4 }, { hole: 7, par: 4 }, { hole: 8, par: 3 },
      { hole: 9, par: 5 }, { hole: 10, par: 4 }, { hole: 11, par: 4 }, { hole: 12, par: 3 },
      { hole: 13, par: 4 }, { hole: 14, par: 5 }, { hole: 15, par: 4 }, { hole: 16, par: 3 },
      { hole: 17, par: 4 }, { hole: 18, par: 5 }
    ]
  },

  // ========== DENVER COURSES (18-HOLE) ==========

  cityPark: {
    name: "City Park Golf Course",
    location: "Denver, CO",
    par: 70,
    description: "Redesigned in 2020, this parkland-style course offers views of Denver skyline and mountains",
    website: "https://www.cityofdenvergolf.com/city-park/",
    holes: [
      { hole: 1, par: 4 }, { hole: 2, par: 3 }, { hole: 3, par: 4 }, { hole: 4, par: 4 },
      { hole: 5, par: 4 }, { hole: 6, par: 3 }, { hole: 7, par: 4 }, { hole: 8, par: 3 },
      { hole: 9, par: 5 }, { hole: 10, par: 4 }, { hole: 11, par: 5 }, { hole: 12, par: 4 },
      { hole: 13, par: 3 }, { hole: 14, par: 4 }, { hole: 15, par: 5 }, { hole: 16, par: 4 },
      { hole: 17, par: 4 }, { hole: 18, par: 3 }
    ]
  },

  greenValleyRanch: {
    name: "Green Valley Ranch Golf Club",
    location: "Denver, CO",
    par: 72,
    description: "Championship course designed by Perry Dye, featuring diverse par 3s and true 3-shot par 5s",
    website: "https://www.gvrgolf.com/",
    holes: [
      { hole: 1, par: 4 }, { hole: 2, par: 5 }, { hole: 3, par: 3 }, { hole: 4, par: 4 },
      { hole: 5, par: 4 }, { hole: 6, par: 4 }, { hole: 7, par: 3 }, { hole: 8, par: 4 },
      { hole: 9, par: 5 }, { hole: 10, par: 4 }, { hole: 11, par: 3 }, { hole: 12, par: 4 },
      { hole: 13, par: 5 }, { hole: 14, par: 4 }, { hole: 15, par: 4 }, { hole: 16, par: 3 },
      { hole: 17, par: 4 }, { hole: 18, par: 5 }
    ]
  },

  foothills: {
    name: "Foothills Golf Course",
    location: "Denver, CO",
    par: 72,
    description: "Championship 18-hole course with mature trees, water hazards, and strategic bunkering",
    website: "https://www.foothillsgolf.org/",
    holes: [
      { hole: 1, par: 4 }, { hole: 2, par: 4 }, { hole: 3, par: 3 }, { hole: 4, par: 5 },
      { hole: 5, par: 4 }, { hole: 6, par: 4 }, { hole: 7, par: 3 }, { hole: 8, par: 4 },
      { hole: 9, par: 5 }, { hole: 10, par: 4 }, { hole: 11, par: 4 }, { hole: 12, par: 3 },
      { hole: 13, par: 4 }, { hole: 14, par: 5 }, { hole: 15, par: 4 }, { hole: 16, par: 3 },
      { hole: 17, par: 4 }, { hole: 18, par: 5 }
    ]
  },

  kennedy: {
    name: "Kennedy Golf Course (18-Hole)",
    location: "Denver, CO",
    par: 71,
    description: "Municipal 27-hole facility with multiple course combinations designed by Dick Phelps",
    website: "https://www.cityofdenvergolf.com/kennedy-golf-course/",
    holes: [
      { hole: 1, par: 4 }, { hole: 2, par: 3 }, { hole: 3, par: 4 }, { hole: 4, par: 5 },
      { hole: 5, par: 4 }, { hole: 6, par: 4 }, { hole: 7, par: 3 }, { hole: 8, par: 4 },
      { hole: 9, par: 4 }, { hole: 10, par: 4 }, { hole: 11, par: 5 }, { hole: 12, par: 3 },
      { hole: 13, par: 4 }, { hole: 14, par: 4 }, { hole: 15, par: 5 }, { hole: 16, par: 4 },
      { hole: 17, par: 3 }, { hole: 18, par: 4 }
    ]
  },

  wellshireGolf: {
    name: "Wellshire Golf Course",
    location: "Denver, CO",
    par: 71,
    description: "Historic Denver municipal course established in 1926, known for its tree-lined fairways",
    website: "https://www.cityofdenvergolf.com/wellshire/",
    holes: [
      { hole: 1, par: 4 }, { hole: 2, par: 4 }, { hole: 3, par: 4 }, { hole: 4, par: 3 },
      { hole: 5, par: 5 }, { hole: 6, par: 4 }, { hole: 7, par: 4 }, { hole: 8, par: 3 },
      { hole: 9, par: 4 }, { hole: 10, par: 4 }, { hole: 11, par: 4 }, { hole: 12, par: 5 },
      { hole: 13, par: 3 }, { hole: 14, par: 4 }, { hole: 15, par: 4 }, { hole: 16, par: 5 },
      { hole: 17, par: 3 }, { hole: 18, par: 4 }
    ]
  },

  // ========== AURORA COURSES (18-HOLE) ==========

  murphyCreek: {
    name: "Murphy Creek Golf Course",
    location: "Aurora, CO",
    par: 72,
    description: "Prairie-links course opened in 2000, designed by Kenneth Kavanaugh. Ranked in Golf Digest's Top 10 Best New Courses 2002",
    website: "https://www.auroragov.org/things_to_do/golf/golf_courses/murphy_creek",
    holes: [
      { hole: 1, par: 5 }, { hole: 2, par: 4 }, { hole: 3, par: 3 }, { hole: 4, par: 4 },
      { hole: 5, par: 4 }, { hole: 6, par: 4 }, { hole: 7, par: 3 }, { hole: 8, par: 4 },
      { hole: 9, par: 5 }, { hole: 10, par: 4 }, { hole: 11, par: 3 }, { hole: 12, par: 4 },
      { hole: 13, par: 4 }, { hole: 14, par: 5 }, { hole: 15, par: 4 }, { hole: 16, par: 4 },
      { hole: 17, par: 3 }, { hole: 18, par: 5 }
    ]
  },

  meadowHills: {
    name: "Meadow Hills Golf Course",
    location: "Aurora, CO",
    par: 70,
    description: "Opened in 1957, designed by Henry Hughes. Features 5 par 3s and a challenging water hazard on the signature 18th hole",
    website: "https://www.auroragov.org/things_to_do/golf/golf_courses/meadow_hills",
    holes: [
      { hole: 1, par: 4 }, { hole: 2, par: 3 }, { hole: 3, par: 4 }, { hole: 4, par: 5 },
      { hole: 5, par: 3 }, { hole: 6, par: 4 }, { hole: 7, par: 4 }, { hole: 8, par: 3 },
      { hole: 9, par: 4 }, { hole: 10, par: 4 }, { hole: 11, par: 5 }, { hole: 12, par: 3 },
      { hole: 13, par: 4 }, { hole: 14, par: 4 }, { hole: 15, par: 5 }, { hole: 16, par: 3 },
      { hole: 17, par: 4 }, { hole: 18, par: 4 }
    ]
  },

  auroraHills: {
    name: "Aurora Hills Golf Course",
    location: "Aurora, CO",
    par: 72,
    description: "Original Aurora municipal course from 1968, designed by Henry Hughes. Walkable traditional design for all skill levels",
    website: "https://www.auroragov.org/things_to_do/golf/golf_courses/aurora_hills",
    holes: [
      { hole: 1, par: 4 }, { hole: 2, par: 4 }, { hole: 3, par: 3 }, { hole: 4, par: 5 },
      { hole: 5, par: 4 }, { hole: 6, par: 4 }, { hole: 7, par: 3 }, { hole: 8, par: 4 },
      { hole: 9, par: 5 }, { hole: 10, par: 4 }, { hole: 11, par: 4 }, { hole: 12, par: 3 },
      { hole: 13, par: 4 }, { hole: 14, par: 5 }, { hole: 15, par: 4 }, { hole: 16, par: 4 },
      { hole: 17, par: 3 }, { hole: 18, par: 5 }
    ]
  },

  // ========== 9-HOLE COURSES ==========

  kennedyWest9: {
    name: "Kennedy West 9",
    location: "Denver, CO",
    par: 36,
    description: "Part of Kennedy's 27-hole facility, the West 9 offers challenging play along Cherry Creek",
    website: "https://www.cityofdenvergolf.com/kennedy-golf-course/",
    holes: [
      { hole: 1, par: 4 }, { hole: 2, par: 3 }, { hole: 3, par: 4 }, { hole: 4, par: 5 },
      { hole: 5, par: 4 }, { hole: 6, par: 4 }, { hole: 7, par: 3 }, { hole: 8, par: 4 },
      { hole: 9, par: 5 }
    ]
  },

  genericPar3: {
    name: "Generic Par 3 (9-Hole)",
    location: "Practice/Short Course",
    par: 27,
    description: "Perfect for quick rounds, practice, or beginners. All par 3 holes ranging from 85-195 yards",
    holes: [
      { hole: 1, par: 3 }, { hole: 2, par: 3 }, { hole: 3, par: 3 }, { hole: 4, par: 3 },
      { hole: 5, par: 3 }, { hole: 6, par: 3 }, { hole: 7, par: 3 }, { hole: 8, par: 3 },
      { hole: 9, par: 3 }
    ]
  },

  // ========== FRONT 9 VARIANTS ==========

  cityParkFront9: {
    name: "City Park - Front 9",
    location: "Denver, CO",
    par: 34,
    description: "Front nine of City Park Golf Course",
    website: "https://www.cityofdenvergolf.com/city-park/",
    holes: [
      { hole: 1, par: 4 }, { hole: 2, par: 3 }, { hole: 3, par: 4 }, { hole: 4, par: 4 },
      { hole: 5, par: 4 }, { hole: 6, par: 3 }, { hole: 7, par: 4 }, { hole: 8, par: 3 },
      { hole: 9, par: 5 }
    ]
  },

  greenValleyRanchFront9: {
    name: "Green Valley Ranch - Front 9",
    location: "Denver, CO",
    par: 36,
    description: "Front nine of Green Valley Ranch Golf Club",
    website: "https://www.gvrgolf.com/",
    holes: [
      { hole: 1, par: 4 }, { hole: 2, par: 5 }, { hole: 3, par: 3 }, { hole: 4, par: 4 },
      { hole: 5, par: 4 }, { hole: 6, par: 4 }, { hole: 7, par: 3 }, { hole: 8, par: 4 },
      { hole: 9, par: 5 }
    ]
  },

  foothillsFront9: {
    name: "Foothills - Front 9",
    location: "Denver, CO",
    par: 36,
    description: "Front nine of Foothills Golf Course",
    website: "https://www.foothillsgolf.org/",
    holes: [
      { hole: 1, par: 4 }, { hole: 2, par: 4 }, { hole: 3, par: 3 }, { hole: 4, par: 5 },
      { hole: 5, par: 4 }, { hole: 6, par: 4 }, { hole: 7, par: 3 }, { hole: 8, par: 4 },
      { hole: 9, par: 5 }
    ]
  },

  wellshireFront9: {
    name: "Wellshire - Front 9",
    location: "Denver, CO",
    par: 35,
    description: "Front nine of Wellshire Golf Course",
    website: "https://www.cityofdenvergolf.com/wellshire/",
    holes: [
      { hole: 1, par: 4 }, { hole: 2, par: 4 }, { hole: 3, par: 4 }, { hole: 4, par: 3 },
      { hole: 5, par: 5 }, { hole: 6, par: 4 }, { hole: 7, par: 4 }, { hole: 8, par: 3 },
      { hole: 9, par: 4 }
    ]
  },

  murphyCreekFront9: {
    name: "Murphy Creek - Front 9",
    location: "Aurora, CO",
    par: 36,
    description: "Front nine of Murphy Creek Golf Course",
    website: "https://www.auroragov.org/things_to_do/golf/golf_courses/murphy_creek",
    holes: [
      { hole: 1, par: 5 }, { hole: 2, par: 4 }, { hole: 3, par: 3 }, { hole: 4, par: 4 },
      { hole: 5, par: 4 }, { hole: 6, par: 4 }, { hole: 7, par: 3 }, { hole: 8, par: 4 },
      { hole: 9, par: 5 }
    ]
  },

  meadowHillsFront9: {
    name: "Meadow Hills - Front 9",
    location: "Aurora, CO",
    par: 34,
    description: "Front nine of Meadow Hills Golf Course",
    website: "https://www.auroragov.org/things_to_do/golf/golf_courses/meadow_hills",
    holes: [
      { hole: 1, par: 4 }, { hole: 2, par: 3 }, { hole: 3, par: 4 }, { hole: 4, par: 5 },
      { hole: 5, par: 3 }, { hole: 6, par: 4 }, { hole: 7, par: 4 }, { hole: 8, par: 3 },
      { hole: 9, par: 4 }
    ]
  },

  auroraHillsFront9: {
    name: "Aurora Hills - Front 9",
    location: "Aurora, CO",
    par: 36,
    description: "Front nine of Aurora Hills Golf Course",
    website: "https://www.auroragov.org/things_to_do/golf/golf_courses/aurora_hills",
    holes: [
      { hole: 1, par: 4 }, { hole: 2, par: 4 }, { hole: 3, par: 3 }, { hole: 4, par: 5 },
      { hole: 5, par: 4 }, { hole: 6, par: 4 }, { hole: 7, par: 3 }, { hole: 8, par: 4 },
      { hole: 9, par: 5 }
    ]
  },

  // ========== BACK 9 VARIANTS ==========

  cityParkBack9: {
    name: "City Park - Back 9",
    location: "Denver, CO",
    par: 36,
    description: "Back nine of City Park Golf Course",
    website: "https://www.cityofdenvergolf.com/city-park/",
    holes: [
      { hole: 10, par: 4 }, { hole: 11, par: 5 }, { hole: 12, par: 4 }, { hole: 13, par: 3 },
      { hole: 14, par: 4 }, { hole: 15, par: 5 }, { hole: 16, par: 4 }, { hole: 17, par: 4 },
      { hole: 18, par: 3 }
    ]
  },

  greenValleyRanchBack9: {
    name: "Green Valley Ranch - Back 9",
    location: "Denver, CO",
    par: 36,
    description: "Back nine of Green Valley Ranch Golf Club",
    website: "https://www.gvrgolf.com/",
    holes: [
      { hole: 10, par: 4 }, { hole: 11, par: 3 }, { hole: 12, par: 4 }, { hole: 13, par: 5 },
      { hole: 14, par: 4 }, { hole: 15, par: 4 }, { hole: 16, par: 3 }, { hole: 17, par: 4 },
      { hole: 18, par: 5 }
    ]
  },

  foothillsBack9: {
    name: "Foothills - Back 9",
    location: "Denver, CO",
    par: 36,
    description: "Back nine of Foothills Golf Course",
    website: "https://www.foothillsgolf.org/",
    holes: [
      { hole: 10, par: 4 }, { hole: 11, par: 4 }, { hole: 12, par: 3 }, { hole: 13, par: 4 },
      { hole: 14, par: 5 }, { hole: 15, par: 4 }, { hole: 16, par: 3 }, { hole: 17, par: 4 },
      { hole: 18, par: 5 }
    ]
  },

  wellshireBack9: {
    name: "Wellshire - Back 9",
    location: "Denver, CO",
    par: 36,
    description: "Back nine of Wellshire Golf Course",
    website: "https://www.cityofdenvergolf.com/wellshire/",
    holes: [
      { hole: 10, par: 4 }, { hole: 11, par: 4 }, { hole: 12, par: 5 }, { hole: 13, par: 3 },
      { hole: 14, par: 4 }, { hole: 15, par: 4 }, { hole: 16, par: 5 }, { hole: 17, par: 3 },
      { hole: 18, par: 4 }
    ]
  },

  murphyCreekBack9: {
    name: "Murphy Creek - Back 9",
    location: "Aurora, CO",
    par: 36,
    description: "Back nine of Murphy Creek Golf Course",
    website: "https://www.auroragov.org/things_to_do/golf/golf_courses/murphy_creek",
    holes: [
      { hole: 10, par: 4 }, { hole: 11, par: 3 }, { hole: 12, par: 4 }, { hole: 13, par: 4 },
      { hole: 14, par: 5 }, { hole: 15, par: 4 }, { hole: 16, par: 4 }, { hole: 17, par: 3 },
      { hole: 18, par: 5 }
    ]
  },

  meadowHillsBack9: {
    name: "Meadow Hills - Back 9",
    location: "Aurora, CO",
    par: 36,
    description: "Back nine of Meadow Hills Golf Course",
    website: "https://www.auroragov.org/things_to_do/golf/golf_courses/meadow_hills",
    holes: [
      { hole: 10, par: 4 }, { hole: 11, par: 5 }, { hole: 12, par: 3 }, { hole: 13, par: 4 },
      { hole: 14, par: 4 }, { hole: 15, par: 5 }, { hole: 16, par: 3 }, { hole: 17, par: 4 },
      { hole: 18, par: 4 }
    ]
  },

  auroraHillsBack9: {
    name: "Aurora Hills - Back 9",
    location: "Aurora, CO",
    par: 36,
    description: "Back nine of Aurora Hills Golf Course",
    website: "https://www.auroragov.org/things_to_do/golf/golf_courses/aurora_hills",
    holes: [
      { hole: 10, par: 4 }, { hole: 11, par: 4 }, { hole: 12, par: 3 }, { hole: 13, par: 4 },
      { hole: 14, par: 5 }, { hole: 15, par: 4 }, { hole: 16, par: 4 }, { hole: 17, par: 3 },
      { hole: 18, par: 5 }
    ]
  }
};

export const getCourseList = () => {
  return Object.keys(denverGolfCourses).map(key => ({
    key,
    ...denverGolfCourses[key]
  }));
};

export const getCourse = (courseKey) => {
  return denverGolfCourses[courseKey] || denverGolfCourses.generic;
};

// Course groups for dropdown organization
export const courseGroups = {
  cityPark: {
    name: "City Park",
    location: "Denver, CO",
    hasVariants: true,
    courses: {
      full: 'cityPark',
      front9: 'cityParkFront9',
      back9: 'cityParkBack9'
    }
  },
  greenValleyRanch: {
    name: "Green Valley Ranch",
    location: "Denver, CO",
    hasVariants: true,
    courses: {
      full: 'greenValleyRanch',
      front9: 'greenValleyRanchFront9',
      back9: 'greenValleyRanchBack9'
    }
  },
  foothills: {
    name: "Foothills",
    location: "Denver, CO",
    hasVariants: true,
    courses: {
      full: 'foothills',
      front9: 'foothillsFront9',
      back9: 'foothillsBack9'
    }
  },
  kennedy: {
    name: "Kennedy",
    location: "Denver, CO",
    hasVariants: true,
    courses: {
      full: 'kennedy',
      front9: null,
      back9: null
    }
  },
  wellshire: {
    name: "Wellshire",
    location: "Denver, CO",
    hasVariants: true,
    courses: {
      full: 'wellshireGolf',
      front9: 'wellshireFront9',
      back9: 'wellshireBack9'
    }
  },
  murphyCreek: {
    name: "Murphy Creek",
    location: "Aurora, CO",
    hasVariants: true,
    courses: {
      full: 'murphyCreek',
      front9: 'murphyCreekFront9',
      back9: 'murphyCreekBack9'
    }
  },
  meadowHills: {
    name: "Meadow Hills",
    location: "Aurora, CO",
    hasVariants: true,
    courses: {
      full: 'meadowHills',
      front9: 'meadowHillsFront9',
      back9: 'meadowHillsBack9'
    }
  },
  auroraHills: {
    name: "Aurora Hills",
    location: "Aurora, CO",
    hasVariants: true,
    courses: {
      full: 'auroraHills',
      front9: 'auroraHillsFront9',
      back9: 'auroraHillsBack9'
    }
  },
  kennedyWest9: {
    name: "Kennedy West 9",
    location: "Denver, CO",
    hasVariants: false,
    courses: {
      full: 'kennedyWest9'
    }
  },
  genericPar3: {
    name: "Generic Par 3",
    location: "Practice/Short Course",
    hasVariants: false,
    courses: {
      full: 'genericPar3'
    }
  },
  generic: {
    name: "Generic Course",
    location: "Default",
    hasVariants: false,
    courses: {
      full: 'generic'
    }
  }
};

export const getCourseGroupList = () => {
  return Object.keys(courseGroups).map(key => ({
    key,
    ...courseGroups[key]
  }));
};

export const getCourseKeyFromSelection = (groupKey, variant = 'full') => {
  const group = courseGroups[groupKey];
  if (!group) return 'generic';

  if (!group.hasVariants || variant === 'full') {
    return group.courses.full;
  }

  if (variant === 'front9' && group.courses.front9) {
    return group.courses.front9;
  }

  if (variant === 'back9' && group.courses.back9) {
    return group.courses.back9;
  }

  return group.courses.full;
};
