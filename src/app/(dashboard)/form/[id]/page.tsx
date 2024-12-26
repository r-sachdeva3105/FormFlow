import React, { ReactNode } from "react";
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
import { GetFormSubmission } from "@/actions/form";
import {
  ElementType,
  FormElementInstance,
  FormElements,
} from "@/components/FormElements";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistance } from "date-fns";

type CustomInstance = FormElementInstance & {
  extraAttributes: {
    label: string;
    required: boolean;
  };
};

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
              value={`${Math.round(submissionRate * 100) / 100 || 0}%`}
              loading={false}
              className="shadow-yellow-600 hover:shadow-yellow-600"
            />
            <StatsCard
              title="Bounce Rate"
              icon={<LuTrendingDown className="text-red-600 w-5 h-5" />}
              helperText="Percentage of visitors left without submitting"
              value={`${Math.round(bounceRate * 100) / 100 || 0}%`}
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

type Row = { [key: string]: string } & { submittedAt: Date };

const SubmissionsTable = async ({ id }: { id: string }) => {
  const form = await GetFormSubmission(id);

  if (!form) {
    throw new Error("Form not found");
  }

  const formElements = JSON.parse(form.content) as FormElementInstance[];
  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementType;
  }[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case "TextField":
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
        });
        break;
      default:
        break;
    }
  });

  const rows: Row[] = [];
  form.FormSubmission.forEach((submission) => {
    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submittedAt: submission.createdAt,
    });
  });

  return (
    <>
      <h1 className="text-xl font-semibold mb-2">Submissions</h1>
      <div className="rounded-lg border px-2">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id} className="uppercase">
                  {column.label}
                </TableHead>
              ))}
              <TableHead className="text-muted-foreground uppercase text-right">
                submitted at
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <RowCell
                    key={column.id}
                    type={column.type}
                    value={row[column.id]}
                  ></RowCell>
                ))}
                <TableCell className="text-muted-foreground text-right">
                  {formatDistance(row.submittedAt, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

function RowCell({ type, value }: { type: ElementType; value: string }) {
  let node: ReactNode = value;
  return <TableCell>{node}</TableCell>;
}
