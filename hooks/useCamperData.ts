import { useQuery } from "@tanstack/react-query";
import { getCamperById, getCamperReviews } from "@/lib/api";

export const useCamperData = (id: string) => {
  const camperQuery = useQuery({
    queryKey: ["camper", id],
    queryFn: () => getCamperById(id),
    enabled: !!id,
  });

  const reviewsQuery = useQuery({
    queryKey: ["camper-reviews", id],
    queryFn: () => getCamperReviews(id),
    enabled: !!id,
  });

  return { camperQuery, reviewsQuery };
};