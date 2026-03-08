import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Calendar,
  Inbox,
  Mail,
  RefreshCw,
  User,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useActor } from "./hooks/useActor";

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────
interface Inquiry {
  name: string;
  email: string;
  message: string;
  timestamp: bigint;
}

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────
function formatTimestamp(ns: bigint): string {
  // Motoko Time is nanoseconds since epoch
  const ms = Number(ns / BigInt(1_000_000));
  if (ms === 0 || Number.isNaN(ms)) return "—";
  const date = new Date(ms);
  return date.toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

// ──────────────────────────────────────────────
// Skeleton row
// ──────────────────────────────────────────────
function SkeletonRow() {
  return (
    <TableRow className="border-border">
      <TableCell>
        <Skeleton className="h-4 w-28 bg-surface-3 rounded" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-44 bg-surface-3 rounded" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-64 bg-surface-3 rounded" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-32 bg-surface-3 rounded" />
      </TableCell>
    </TableRow>
  );
}

// ──────────────────────────────────────────────
// AdminPage
// ──────────────────────────────────────────────
export default function AdminPage() {
  const { actor, isFetching: actorFetching } = useActor();

  const {
    data: inquiries,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery<Inquiry[]>({
    queryKey: ["admin-inquiries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInquiries();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 30_000,
  });

  const handleBack = () => {
    window.location.hash = "";
    // Small delay to ensure hash clears before reload
    setTimeout(() => {
      window.scrollTo({ top: 0 });
    }, 50);
  };

  const loading = isLoading || actorFetching;
  const isEmpty = !loading && (!inquiries || inquiries.length === 0);
  const hasData = !loading && inquiries && inquiries.length > 0;

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* Header */}
      <header className="glass-nav sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center gap-4">
              {/* Logo mark */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-sm bg-violet flex items-center justify-center glow-violet-sm">
                  <Zap size={16} className="text-background" />
                </div>
                <span className="font-heading font-bold text-lg tracking-tight">
                  Ankit <span className="text-violet">Sharma</span>
                </span>
              </div>
              {/* Separator */}
              <div className="hidden sm:block w-px h-5 bg-border" />
              {/* Page label */}
              <span className="hidden sm:inline text-sm text-muted-foreground font-medium">
                Contact Submissions
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Refresh */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => refetch()}
                disabled={isFetching}
                data-ocid="admin.secondary_button"
                className="text-muted-foreground hover:text-violet hover:bg-surface-2 gap-1.5"
              >
                <RefreshCw
                  size={14}
                  className={isFetching ? "animate-spin" : ""}
                />
                <span className="hidden sm:inline">Refresh</span>
              </Button>

              {/* Back to portfolio */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleBack}
                data-ocid="admin.primary_button"
                className="border-border text-foreground/80 hover:text-violet hover:border-violet/30 gap-1.5"
              >
                <ArrowLeft size={14} />
                <span>Portfolio</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="text-violet text-sm font-semibold uppercase tracking-widest mb-2">
            Admin Panel
          </div>
          <h1 className="section-heading text-3xl sm:text-4xl mb-3">
            Contact Form Submissions
          </h1>
          <p className="text-muted-foreground">
            All messages sent through the contact form on your portfolio.
          </p>
          {/* Count badge */}
          {hasData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4"
            >
              <Badge className="bg-violet/10 text-violet border-violet/30 px-3 py-1 text-sm">
                {inquiries!.length}{" "}
                {inquiries!.length === 1 ? "submission" : "submissions"}
              </Badge>
            </motion.div>
          )}
        </motion.div>

        {/* Loading state */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              data-ocid="admin.loading_state"
              className="card-surface rounded-2xl overflow-hidden"
            >
              <div className="p-4 border-b border-border flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-violet animate-pulse" />
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
                  Loading submissions…
                </span>
              </div>
              <Table data-ocid="admin.table">
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-widest w-40">
                      Name
                    </TableHead>
                    <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-widest w-52">
                      Email
                    </TableHead>
                    <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-widest">
                      Message
                    </TableHead>
                    <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-widest w-44">
                      Date
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 5 }).map((_, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
                    <SkeletonRow key={i} />
                  ))}
                </TableBody>
              </Table>
            </motion.div>
          )}

          {/* Empty state */}
          {isEmpty && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              data-ocid="admin.empty_state"
              className="card-surface rounded-2xl p-16 flex flex-col items-center justify-center text-center gap-5"
            >
              <div className="w-16 h-16 rounded-2xl icon-container-violet flex items-center justify-center">
                <Inbox size={28} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl mb-2">
                  No submissions yet
                </h3>
                <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
                  When someone fills out the contact form on your portfolio,
                  their message will appear here.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                className="border-violet/30 text-violet hover:bg-violet/5 gap-1.5"
              >
                <RefreshCw size={14} />
                Check again
              </Button>
            </motion.div>
          )}

          {/* Error state */}
          {error && !loading && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              data-ocid="admin.error_state"
              className="card-surface rounded-2xl p-12 flex flex-col items-center justify-center text-center gap-4 border-destructive/20"
            >
              <div className="w-12 h-12 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center justify-center text-destructive">
                <Mail size={22} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg mb-1.5">
                  Failed to load submissions
                </h3>
                <p className="text-muted-foreground text-sm">
                  There was a problem fetching your contact form data.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                className="border-destructive/30 text-destructive hover:bg-destructive/5 gap-1.5"
              >
                <RefreshCw size={14} />
                Try again
              </Button>
            </motion.div>
          )}

          {/* Data table */}
          {hasData && (
            <motion.div
              key="table"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="card-surface rounded-2xl overflow-hidden"
            >
              {/* Table toolbar */}
              <div className="px-6 py-4 border-b border-border flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet" />
                  <span className="text-sm font-semibold text-foreground">
                    All Messages
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar size={12} />
                  <span>Sorted by latest first</span>
                </div>
              </div>

              {/* Scrollable table container */}
              <div className="overflow-x-auto">
                <Table data-ocid="admin.table">
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-widest py-4 pl-6 w-40">
                        <div className="flex items-center gap-1.5">
                          <User size={12} />
                          Name
                        </div>
                      </TableHead>
                      <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-widest py-4 w-56">
                        <div className="flex items-center gap-1.5">
                          <Mail size={12} />
                          Email
                        </div>
                      </TableHead>
                      <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-widest py-4">
                        Message / Goal
                      </TableHead>
                      <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-widest py-4 pr-6 w-44">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={12} />
                          Date
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Sort newest-first (highest timestamp first) */}
                    {[...inquiries!]
                      .sort((a, b) =>
                        b.timestamp > a.timestamp
                          ? 1
                          : b.timestamp < a.timestamp
                            ? -1
                            : 0,
                      )
                      .map((inquiry, index) => (
                        <motion.tr
                          key={`${inquiry.email}-${index}`}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.04, duration: 0.3 }}
                          data-ocid={`admin.row.${index + 1}`}
                          className="border-border hover:bg-surface-2/50 transition-colors group"
                        >
                          {/* Name */}
                          <TableCell className="py-4 pl-6 align-top">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-violet/15 border border-violet/25 flex items-center justify-center flex-shrink-0">
                                <span className="text-violet text-xs font-bold leading-none">
                                  {inquiry.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <span className="font-semibold text-sm text-foreground whitespace-nowrap">
                                {inquiry.name}
                              </span>
                            </div>
                          </TableCell>

                          {/* Email */}
                          <TableCell className="py-4 align-top">
                            <a
                              href={`mailto:${inquiry.email}`}
                              className="text-sm text-violet/80 hover:text-violet transition-colors hover:underline underline-offset-2 font-mono"
                            >
                              {inquiry.email}
                            </a>
                          </TableCell>

                          {/* Message */}
                          <TableCell className="py-4 align-top pr-8">
                            <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3 max-w-xl">
                              {inquiry.message}
                            </p>
                          </TableCell>

                          {/* Date */}
                          <TableCell className="py-4 pr-6 align-top">
                            <span className="text-xs text-muted-foreground whitespace-nowrap tabular-nums">
                              {formatTimestamp(inquiry.timestamp)}
                            </span>
                          </TableCell>
                        </motion.tr>
                      ))}
                  </TableBody>
                </Table>
              </div>

              {/* Table footer */}
              <div className="px-6 py-3 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  {inquiries!.length}{" "}
                  {inquiries!.length === 1 ? "submission" : "total submissions"}{" "}
                  — click an email to compose a reply
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Ankit Sharma · Admin Panel
          </p>
          <button
            type="button"
            onClick={handleBack}
            className="text-xs text-muted-foreground hover:text-violet transition-colors"
          >
            ← Back to Portfolio
          </button>
        </div>
      </footer>
    </div>
  );
}
