// import Image from "next/image";

import { GetForms, GetFormStats } from "@/actions/form";
import CreateFormButton from "@/components/CreateFormButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Form } from "@prisma/client";
import { formatDistance } from "date-fns";
import Link from "next/link";
import { Suspense } from "react";
import {
  LuFileEdit,
  LuFileSpreadsheet,
  LuFileText,
  LuTrendingDown,
  LuTrendingUp,
  LuView,
} from "react-icons/lu";

export default function Home() {
  return (
    <div className="container min-w-full px-16 py-8">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="mt-8 mb-4" />
      <h1 className="text-3xl font-bold tracking-tight col-span-2 mb-4">
        Your Forms
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CreateFormButton />
        <Suspense
          fallback={[1, 2, 3, 4].map((s) => (
            <FormCardSkeleton key={s} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await GetFormStats();
  return <StatsCards loading={false} data={stats} />;
}

interface StatsCardsProps {
  loading: boolean;
  data?: Awaited<ReturnType<typeof GetFormStats>>;
}

function StatsCards(props: StatsCardsProps) {
  const { loading, data } = props;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Visits"
        icon={<LuView className="text-blue-600 w-5 h-5" />}
        helperText="Total number of visits to your forms"
        value={`${data?.visits || 0}`}
        loading={loading}
        className="shadow-blue-600 hover:shadow-blue-600"
      />
      <StatsCard
        title="Total Submissions"
        icon={<LuFileText className="text-green-600 w-5 h-5" />}
        helperText="Total number of submissions to your forms"
        value={`${data?.submissions || 0}`}
        loading={loading}
        className="shadow-green-600 hover:shadow-green-600"
      />
      <StatsCard
        title="Submission Rate"
        icon={<LuTrendingUp className="text-yellow-600 w-5 h-5" />}
        helperText="Percentage of visitors who submitted"
        value={`${
          data?.submissionRate
            ? Math.round(data?.submissionRate * 100) / 100
            : 0
        }%`}
        loading={loading}
        className="shadow-yellow-600 hover:shadow-yellow-600"
      />
      <StatsCard
        title="Bounce Rate"
        icon={<LuTrendingDown className="text-red-600 w-5 h-5" />}
        helperText="Percentage of visitors left without submitting"
        value={`${
          data?.bounceRate ? Math.round(data?.bounceRate * 100) / 100 : 0
        }%`}
        loading={loading}
        className="shadow-red-600 hover:shadow-red-600"
      />
    </div>
  );
}

export function StatsCard({
  title,
  icon,
  helperText,
  value,
  loading,
  className,
}: {
  title: string;
  icon: React.ReactNode;
  helperText: string;
  value: string;
  loading: boolean;
  className: string;
}) {
  return (
    <Card
      className={`transition-all duration-100 shadow-md w-full hover:shadow-lg ${className}`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          {icon}
        </div>
        <CardDescription>{helperText}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && <Skeleton className="w-full h-8" />}
          {!loading && value}
        </div>
      </CardContent>
    </Card>
  );
}

function FormCardSkeleton() {
  return <Skeleton className="w-full h-48 border border-primary/25" />;
}

async function FormCards() {
  const forms = await GetForms();
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}

function FormCard({ form }: { form: Form }) {
  return (
    <Card className="w-full h-48 border border-primary/25">
      <CardHeader>
        <CardTitle className="min-w-full flex items-center justify-between text-lg font-semibold capitalize">
          <span className="truncate">{form.title}</span>
          {form.published ? (
            <Badge variant="secondary">Published</Badge>
          ) : (
            <Badge variant="destructive">Draft</Badge>
          )}
        </CardTitle>
        <CardDescription className="flex items-center justify-between">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {!form.published && (
            <span className="flex items-center gap-2">
              <LuView />
              <span>{form.visits.toLocaleString()}</span>
              <LuFileText />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-8 truncate text-sm text-muted-foreground font-semibold">
        {form.description || ""}
      </CardContent>
      <CardFooter>
        {form.published ? (
          <Button
            asChild
            variant="default"
            className="w-full flex gap-2 items-center font-semibold"
          >
            <Link href={`/form/${form.id}`}>
              View Submissions <LuFileSpreadsheet />
            </Link>
          </Button>
        ) : (
          <Button
            asChild
            variant="secondary"
            className="w-full flex gap-2 items-center font-semibold"
          >
            <Link href={`/builder/${form.id}`}>
              Edit Form <LuFileEdit />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
