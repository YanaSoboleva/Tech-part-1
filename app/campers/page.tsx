"use client";

import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import CamperCard from "@/components/CamperCard/CamperCard";
import Loading from "@/app/loading";
import { getCampers } from "@/lib/api";
import { useFilters } from "@/app/context/FilterContext";
import Sidebar from "@/components/Sidebar/Sidebar";
import styles from "../page.module.css";

const DEFAULT_PAGE_SIZE = 4;

export default function CampersPage() {
  const { queryFilters } = useFilters();

  const {
    data,
    isLoading,
    isError,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["campers", queryFilters],
    queryFn: ({ pageParam }) =>
      getCampers({ page: pageParam, perPage: DEFAULT_PAGE_SIZE, ...queryFilters }),
    initialPageParam: 1,
    placeholderData: (lastData) => lastData,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });
  const campers = useMemo(() => 
    data?.pages.flatMap((page) => page.campers) ?? [], 
    [data?.pages]
  );

  if (isLoading) return <Loading />;
  if (isError) return <main className={styles.error}>Something went wrong.</main>;

  return (
    <main className={styles.catalogPage}>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <Sidebar />
        </aside>

        <section className={styles.listWrapper}>
          {isFetching && !isFetchingNextPage && <Loading />}
          
          {campers.length === 0 ? (
            <div className={styles.noResults}><h2>No campers found</h2></div>
          ) : (
            <>
              <ul className={styles.campersList}>
                {campers.map((camper) => (
                  <li key={camper.id}>
                    <CamperCard camper={camper} />
                  </li>
                ))}
              </ul>

              {hasNextPage && (
                <button
                  className={styles.loadMoreButton}
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                Load more
                </button>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}