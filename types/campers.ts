export interface CamperList {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  description: string;
  consumption: string;
  transmission: string;
  engine: string;
  amenities: string[];
  coverImage: string;
  totalReviews: number;
}

export type CamperListResponse = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: CamperList[];
};

export type FiltersResponse = {
  forms: string[];
  transmissions: string[];
  engines: string[];
};

export type CamperImageEntity = {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
};

export type CamperDetailsEntity = {
  id: string;
  name: string;
  price: number;
  rating: number;
  totalReviews: number;
  location: string;
  description: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  amenities: string[];
  gallery: CamperImageEntity[];
  createdAt: string;
  updatedAt: string;
};

export type ReviewEntity = {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
};

export type CampersQueryParams = {
  page?: number;
  perPage?: number;
  location?: string;
  form?: string;
  engine?: string;
  transmission?: string;
};

export type BookingRequest = {
  name: string;
  email: string;
};

export type BookingReuestResponse = {
  message: string;
};
