import axios from "axios";

const config = {
  baseURL: "https://campers-api.goit.study",
  timeout: 5000,
};

export const api = axios.create(config);

import type {
  BookingRequest,
  BookingReuestResponse,
  CamperDetailsEntity,
  FiltersResponse,
  ReviewEntity,
  CampersQueryParams,
  CamperListResponse,
} from "@/types/campers";

export const getCampers = async (params: CampersQueryParams = {}) => {
  const { data } = await api.get<CamperListResponse>("/campers", { params });
  return data;
};

export const getCamperById = async (id: string) => {
  const { data } = await api.get<CamperDetailsEntity>(`/campers/${id}`);
  return data;
};

export const getCamperReviews = async (id: string) => {
  const { data } = await api.get<ReviewEntity[]>(`/campers/${id}/reviews`);
  return data;
};

export const getCamperFilters = async () => {
  const { data } = await api.get<FiltersResponse>("/campers/filters");
  return data;
};

export const createBookingRequest = async (id: string, payload: BookingRequest) => {
  const { data } = await api.post<BookingReuestResponse>(
    `/campers/${id}/booking-requests`, 
    payload
  );
  return data;
};