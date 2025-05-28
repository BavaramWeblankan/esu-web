import { JSX } from "react";

export interface FeeInterface {
  currency: string;
  price: string;
  fee_name: string;
}

export interface InstallmentInterface {
  installment_id: number;
  fee_type_id: number;
  fee_name: string;
  currency: string;
  price: string;
}

export interface InstallmentPlanInterface {
  id: number;
  name: string;
  installment_count: number;
  installments: InstallmentInterface[][];
}

export interface FeePlanInterface {
  id: number;
  origin: string;
  name: string;
  delivery_mode: { id: number; name: string };
  registration_fee: { currency: string; price: string };
  approximate_total: { currency: string; total: number };
  fees: FeeInterface[];
  installment_plans: InstallmentPlanInterface[];
}

export interface TitleInterface {
  title: string;
  subtitle: string;
}

export interface Publication {
  title: string;
  slug: string;
  content: string;
  date: string;
  research: {
    pdf: {
      node: {
        file: string;
        filePath: string;
        sourceUrl: string;
      };
    };
  };
  featuredImage: {
    node: {
      altText: string;
      sourceUrl: string;
    };
  };
  blogs: {
    gallery: {
      nodes: {
        altText: string;
        sourceUrl: string;
      }[];
    };
  };
  publicationType: {
    nodes: {
      name: string;
      slug: string;
      count: number;
    }[];
  };
}

export interface NewsEvents {
  title: string;
  slug: string;
  date: string;
  content: string;
  featuredImage: {
    node: {
      altText: string;
      sourceUrl: string;
    };
  };
  news: {
    date: string;
    gallery: {
      nodes: {
        altText: string;
        sourceUrl: string;
      }[];
    };
  };
}

export interface InterfaceBlogs {
  title: string;
  slug: string;
  date: string;
  content: string;
  featuredImage: {
    node: {
      altText: string;
      sourceUrl: string;
    };
  };
  blogs?: {
    gallery: {
      nodes: {
        altText: string;
        sourceUrl: string;
      }[];
    };
  };
}

export interface CoursesMenu {
  name: string;
  title: string;
  slug: string;
  courses: {
    nodes: {
      title: string;
      slug: string;
      courses: {
        enableCourseInTheMenu: boolean;
      };
    };
  };
}

export interface CourseNode {
  title: string;
  slug: string;
  courses: {
    enableCourseInTheMenu: boolean;
  };
}

export interface CourseMenuResponse {
  schoolType: {
    name: string;
    courses: {
      nodes: CourseNode[];
    };
  };
}

export interface EventNode {
  eventId: number;
  date: string;
  slug: string;
  title: string;
  events: {
    color: string;
    date: string;
    isUpcommingEvent: boolean;
  };
  link: string;
}

export interface Events {
  events: {
    nodes: EventNode[];
  };
}
