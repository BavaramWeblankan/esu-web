// componenets/MembersLanding/MembersLanding.tsx
export type StaffMember = {
  title: string;
  slug: string;
  staffAcf?: {
    academicQualifications: string;
    careerSummary: string;
    designation: string;
    message: string;
    myPublications: string;
    qualifications: string;
  };
  featuredImage?: {
    node?: {
      sourceUrl?: string;
      altText?: string;
    };
  };
};

// app/faculties/page.tsx
export type Faculty = {
  id: string;
  name: string;
  slug: string;
  description: string;
  schoolTypesColorFontFields: {
    color: string;
    courseFontFamily: string[]; // It's an array as there are 6 values in cms
    facultyName: string; // we need to get this as only the faculty should change color
    facultyDesktop?: {
      node: {
        sourceUrl: string;
        altText?: string;
      };
    } | null; // default assign null
  };
};

// app/faculties/[slug]/page.tsx
export type FacultyInner = {
  schoolTypesColorFontFields: {
    schoolOverview: string;
    schoolOverviewTitle: string;
    color: string;
    courseFontFamily: string;
    facultyName: string;
    schoolOverviewImage: {
      node: {
        id: string;
        link: string;
        altText: string;
        title: string;
      };
    };
    facultyDesktop: {
      node: {
        id: string;
        link: string;
        altText: string;
        title: string;
      };
    };
    facultyMobile: {
      node: {
        id: string;
        link: string;
        altText: string;
        title: string;
      };
    };
  };
};

// app/faculties/[slug]/page.tsx
export type StaffMemberDetails = {
  title: string;
  staffAcf: {
    designation: string;
    message: string;
    qualifications?: string;
  };
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  schoolTypes?: {
    nodes: {
      slug: string;
      name: string;
      schoolTypesColorFontFields?: {
        facultyName?: string;
        color?: string;
        courseFontFamily?: string;
        schoolOverview?: string;
        schoolOverviewTitle?: string;
        schoolOverviewImage?: {
          node: {
            id?: string;
            link?: string;
            altText?: string;
            title?: string;
          };
        };
        facultyDesktop?: {
          node: {
            id?: string;
            link?: string;
            altText?: string;
            title?: string;
          };
        };
        facultyMobile?: {
          node: {
            id?: string;
            link?: string;
            altText?: string;
            title?: string;
          };
        };
      };
    }[];
  };
};

export type ViceChancellor = {
  title: string;
  staffAcf: {
    designation: string;
    message: string;
    viceChancellorMessage: string;
  };
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
};

// app/courses/page.tsx
export type CourseType = {
  id: string;
  name: string;
  slug: string;
};

// app/courses/page.tsx
export type BranchType = {
  id: string;
  name: string;
  slug: string;
};

// app/courses/page.tsx
export type SchoolType = {
  id: string;
  name: string;
  slug: string;
};

// app/courses/page.tsx
export type DeliveryModeTypes = {
  id: string;
  name: string;
  slug: string;
};

// app/courses/page.tsx
// app/courses/[slug]/page.tsx
export type Courses = {
  id: string;
  slug: string;
  title: string;
  content?: string;
  tag?: string;
  image?: string;
  partner?: string;
  school?: string;
  type?: string;
  duration?: string;

  featuredImage?: {
    node?: {
      id?: string;
      slug?: string;
      uri?: string;
      mediaItemUrl?: string;
    };
  } | null;

  courses: {
    courseId: string;
    courseCode?: string | null;
    hideCount: boolean;
    studentsCount?: string | number | null;
    partnerUniversity: {
      node: {
        id: string;
      };
    } | null;
    title: string | null;
    subTitle: string | null;
    description: string | null;
    overview: string | null;
    entryRequirements: string | null;
    documents: string | null;
    lecturePanelDescription: string | null;
    yearTitle: {
      fieldGroupName: string;
      modules: string;
    } | null;
  };

  courseTypes?: { nodes: { slug: string; name: string }[] };
  schoolTypes?: {
    nodes: {
      slug: string;
      name: string;
      schoolTypesColorFontFields?: {
        color?: string;
        courseFontFamily?: string;
      };
    }[];
  };
  deliveryModeTypes?: { nodes: { slug: string }[] };
  branchTypes?: { nodes: { slug: string }[] };
};

// app/courses/[slug]/page.tsx
export type RelatedCourses = {
  id: string;
  title: string;
  slug: string;
  content: string;
  featuredImage: {
    node?: {
      id?: string;
      slug?: string;
      uri?: string;
      mediaItemUrl?: string;
    };
  } | null;
  courses: {
    courseId: string;
    courseCode: string;
    hideCount: boolean;
    studentsCount: string | null;
    partnerUniversity: {
      node: {
        id: string;
      };
    } | null;
    title: string | null;
    subTitle: string | null;
    description: string | null;
    overview: string | null;
    yearTitle: {
      fieldGroupName: string;
      modules: string;
    } | null;
    entryRequirements: string | null;
    documents: string | null;
    lecturePanelDescription: string | null;
  };
  schoolTypes?: { nodes: { slug: string; name: string }[] };
  courseTypes?: { nodes: { slug: string; name: string }[] };
  deliveryModeTypes?: { nodes: { slug: string }[] };
  branchTypes?: { nodes: { slug: string }[] };
};

export type Staffs = {
  id: string;
  title: string;
  content?: string;
  slug: string;
  staffAcf: {
    academicQualifications: string;
    careerSummary: string;
    designation: string;
    message: string;
    myPublications: string;
    qualifications: string;
  };
  featuredImage: {
    node: {
      altText: string;
      sourceUrl: string;
    };
  };
  schoolTypes?: {
    nodes?: {
      slug: string;
      name: string;
    }[];
  };
};

export type Testimonial = {
  id: string;
  title: string;
  slug: string;
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  testimonials: {
    testimonialType: string[];
    testimonialVideo?: string;
    thumbnailImage?: {
      node: {
        sourceUrl: string;
      };
    };
    testimonialText?: string;
  };
};

export type AcademicStaff = {
  title?: string;
  staffAcf: {
    designation?: string;
    academicTitle?: string;
    message?: string;
    careerSummary?: string;
    googleScholarUrl?: {
      url?: string;
      title?: string;
      target?: string;
    };
    researchGateUrl?: {
      url?: string;
      title?: string;
      target?: string;
    };
    academicPublications?: {
      text?: string;
      publicationLinks?: string;
    }[];
    academicQualification?: {
      text?: string;
      publicationLinks?: string;
    }[];
    academicResearchInterest?: {
      text?: string;
    }[];
    academicResearch?: {
      research?: string;
      researchDescription?: string;
    }[];
    academicAwards?: {
      text?: string;
      publicationLinks?: string;
    }[];
    academicHonors?: {
      text?: string;
      publicationLinks?: string;
    }[];
    academicMembership?: {
      text?: string;
      publicationLinks?: string;
    }[];
  };
  featuredImage?: {
    node?: {
      sourceUrl?: string;
      altText?: string;
    };
  };
  schoolTypes?: {
    nodes: {
      name?: string;
      slug?: string;
      schoolTypesColorFontFields?: {
        color?: string;
        courseFontFamily?: string;
      };
    }[];
  };
};

export type CoursesInquire = {
  courses: any;
  title: any;
  slug: any;
  branchTypes: {
    nodes: {
      name: string;
      courses: {
        nodes: {
          title: string;
          slug: string;
          courses: {
            courseCode: string;
          };
        };
      };
    };
  };
};
