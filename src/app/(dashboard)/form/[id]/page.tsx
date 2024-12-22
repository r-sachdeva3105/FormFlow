import React from "react";
import prisma from "@/lib/prisma";
import VisitButton from "@/components/VisitButton";
import FormShare from "@/components/FormShare";
import { StatsCard } from "../../page";
import {
  LuFileText,
  LuTrendingDown,
  LuTrendingUp,
  LuView,
} from "react-icons/lu";
const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const form = await prisma.form.findUnique({
    where: {
      id,
    },
  });
  if (!form) {
    throw new Error("Form not found");
  }

  const { visits, submissions } = form;

  let submissionRate = 0;
  if (visits !== 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return (
    <>
      <div className="border-b border-muted px-8">
        <div className="border-b border-muted py-4">
          <VisitButton shareURL={form.shareUrl} title={form.title} />
        </div>
        <div className="border-b border-muted py-4">
          <FormShare shareURL={form.shareUrl} />
        </div>
        <div className="border-b border-muted py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Total Visits"
              icon={<LuView className="text-blue-600 w-5 h-5" />}
              helperText="Total number of visits to your form"
              value={`${visits || 0}`}
              loading={false}
              className="shadow-blue-600 hover:shadow-blue-600"
            />
            <StatsCard
              title="Total Submissions"
              icon={<LuFileText className="text-green-600 w-5 h-5" />}
              helperText="Total number of submissions to your form"
              value={`${submissions || 0}`}
              loading={false}
              className="shadow-green-600 hover:shadow-green-600"
            />
            <StatsCard
              title="Submission Rate"
              icon={<LuTrendingUp className="text-yellow-600 w-5 h-5" />}
              helperText="Percentage of visitors who submitted"
              value={`${submissionRate || 0}%`}
              loading={false}
              className="shadow-yellow-600 hover:shadow-yellow-600"
            />
            <StatsCard
              title="Bounce Rate"
              icon={<LuTrendingDown className="text-red-600 w-5 h-5" />}
              helperText="Percentage of visitors left without submitting"
              value={`${bounceRate || 0}%`}
              loading={false}
              className="shadow-red-600 hover:shadow-red-600"
            />
          </div>
        </div>
        <div className="py-8">
          <SubmissionsTable id={form.id} />
        </div>
      </div>
    </>
  );
};

export default page;

function SubmissionsTable({ id }: { id: string }) {
  return (
    <>
      <h1 className="text-xl font-semibold">Submissions</h1>
    </>
  );
}
