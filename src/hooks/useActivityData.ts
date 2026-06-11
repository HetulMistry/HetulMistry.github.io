import { useEffect, useState } from "react";
import {
  fallbackActivityData,
  type ActivityData,
} from "@/data/fallback-commits";

export type { ActivityCommit, ActivityData } from "@/data/fallback-commits";

export function useActivityData() {
  const [data, setData] = useState<ActivityData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchActivity() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/github/commits", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok)
          throw new Error(
            `API error: ${response.status} ${response.statusText}`,
          );

        const activityData: ActivityData = await response.json();

        if (mounted) {
          setData(activityData);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setData(fallbackActivityData);
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load activity data.",
          );
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    fetchActivity();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    data: data ?? fallbackActivityData,
    isLoading,
    error,
    isFallback: data === null,
  };
}
