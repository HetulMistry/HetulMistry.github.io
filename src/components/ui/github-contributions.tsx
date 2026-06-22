"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import type { Activity } from "@/components/ui/contribution-graph"
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/components/ui/contribution-graph"

interface GitHubContributionsProps {
  username: string
  githubProfileUrl: string
  className?: string
}

const CACHE_KEY_PREFIX = "github-contributions-"
const CACHE_TIME_MS = 24 * 60 * 60 * 1000 // 24 hours

export function GitHubContributions({
  username,
  githubProfileUrl,
  className,
}: GitHubContributionsProps) {
  const [data, setData] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function fetchData() {
      const cacheKey = `${CACHE_KEY_PREFIX}${username}`
      const cached = localStorage.getItem(cacheKey)

      if (cached) {
        try {
          const { timestamp, contributions } = JSON.parse(cached)
          if (Date.now() - timestamp < CACHE_TIME_MS && contributions && contributions.length > 0) {
            if (active) {
              setData(contributions)
              setLoading(false)
              return
            }
          }
        } catch (e) {
          // ignore cache errors, re-fetch
        }
      }

      try {
        setLoading(true)
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`)
        if (!res.ok) {
          throw new Error("Failed to fetch contribution data")
        }
        const json = await res.json()
        const contributions = json.contributions || []

        if (active) {
          setData(contributions)
          setError(null)
          // save cache
          localStorage.setItem(cacheKey, JSON.stringify({
            timestamp: Date.now(),
            contributions,
          }))
        }
      } catch (err: any) {
        if (active) {
          console.error(err)
          setError(err.message || "Something went wrong")
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      active = false
    }
  }, [username])

  if (loading) {
    return <GitHubContributionsFallback />
  }

  if (error || data.length === 0) {
    return (
      <div className="flex h-40 w-full items-center justify-center rounded-lg border border-white/5 bg-slate-900/20 text-sm text-slate-400">
        Could not load GitHub contributions. You can view them directly on{" "}
        <a
          href={githubProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 text-sky-400 hover:underline"
        >
          GitHub
        </a>
        .
      </div>
    )
  }

  // Fast string comparison since dates are in YYYY-MM-DD format
  const sortedData = [...data].sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
  const lastYearContributions = sortedData.slice(-371); // roughly 53 weeks

  return (
    <TooltipProvider delayDuration={0}>
      <ContributionGraph
        className={cn("mx-auto py-2", className)}
        data={lastYearContributions}
        blockMargin={3}
        blockSize={10}
        blockRadius={1.5}
      >
        <ContributionGraphCalendar
          className="no-scrollbar px-2"
          title="GitHub Contributions"
        >
          {({ activity, dayIndex, weekIndex }) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <ContributionGraphBlock
                  activity={activity}
                  dayIndex={dayIndex}
                  weekIndex={weekIndex}
                  className="hover:stroke-white/30 transition-all cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent className="font-sans">
                <p>
                  {activity.count} contribution{activity.count !== 1 ? "s" : ""}{" "}
                  on {format(new Date(activity.date), "MMM d, yyyy")}
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </ContributionGraphCalendar>

        <ContributionGraphFooter className="px-2 mt-2 text-xs">
          <ContributionGraphTotalCount>
            {({ totalCount }) => (
              <div className="text-slate-400">
                {totalCount.toLocaleString("en")} contributions in the last year on{" "}
                <a
                  className="text-slate-200 underline decoration-white/20 underline-offset-4 hover:text-white transition-colors"
                  href={githubProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                .
              </div>
            )}
          </ContributionGraphTotalCount>

          <ContributionGraphLegend />
        </ContributionGraphFooter>
      </ContributionGraph>
    </TooltipProvider>
  )
}

export function GitHubContributionsFallback() {
  return (
    <div className="flex h-40 w-full items-center justify-center rounded-lg border border-white/5 bg-slate-900/10">
      <Spinner className="h-6 w-6 text-slate-500" />
    </div>
  )
}
