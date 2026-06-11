import { useEffect, useState } from "react";

interface TotalCommitsResponse {
  username: string;
  totalCommits: number;
}

interface UseTotalCommitsReturn {
  totalCommits: number;
  isLoading: boolean;
  error: string | null;
  isFallback: boolean;
}

const FALLBACK_TOTAL_COMMITS = 0;

export function useTotalCommits(): UseTotalCommitsReturn {
  const [totalCommits, setTotalCommits] = useState<number>(
    FALLBACK_TOTAL_COMMITS,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchTotalCommits() {
      try {
        setIsLoading(true);
        setError(null);
        setIsFallback(false);

        const response = await fetch("/api/github/total-commits", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `API error: ${response.status} ${response.statusText}`,
          );
        }

        const data: TotalCommitsResponse = await response.json();

        if (mounted) {
          setTotalCommits(data.totalCommits);
          setError(null);
          setIsFallback(false);
        }
      } catch (err) {
        if (mounted) {
          setTotalCommits(FALLBACK_TOTAL_COMMITS);
          setIsFallback(true);
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load total commits.",
          );
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    fetchTotalCommits();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    totalCommits,
    isLoading,
    error,
    isFallback,
  };
}
