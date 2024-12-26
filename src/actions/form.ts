"use server";

import prisma from "@/lib/prisma";
import { formSchema, FormSchema } from "@/schemas/form";
import { currentUser } from "@clerk/nextjs/server";
class UserNotFoundError extends Error {
    constructor() {
        super("User not found");
    }
}

export async function GetFormStats() {
    const user = await currentUser();
    if (!user) {
        throw new UserNotFoundError()
    }

    const stats = await prisma.form.aggregate({
        where: {
            userId: user.id,
        },
        _sum: {
            visits: true,
            submissions: true,
        },
    })

    const visits = stats._sum.visits ?? 0;
    const submissions = stats._sum.submissions ?? 0;

    let submissionRate = 0;
    if (visits !== 0) {
        submissionRate = submissions / visits * 100;
    }

    const bounceRate = 100 - submissionRate;

    return {
        visits,
        submissions,
        submissionRate,
        bounceRate,
    }
}

export async function CreateForm(data: FormSchema) {
    const validation = formSchema.safeParse(data);
    if (!validation.success) {
        throw new Error("Invalid form data");
    }

    const user = await currentUser();
    if (!user) {
        throw new UserNotFoundError();
    }

    const form = await prisma.form.create({
        data: {
            userId: user.id,
            ...data,
        },
    });

    if (!form) {
        throw new Error("Failed to create form");
    }

    return form;
}

export async function GetForms() {
    const user = await currentUser();
    if (!user) {
        throw new UserNotFoundError();
    }

    const forms = await prisma.form.findMany({
        where: { userId: user.id },
        orderBy: {createdAt: "desc"}
    });

    return forms;
}

export async function SaveForm(id: string, jsonContent: string) {
    const user = await currentUser();
    if (!user) {
        throw new UserNotFoundError();
    }

    const form = await prisma.form.update({
        where: { userId: user.id, id },
        data: { content: jsonContent },
    })

    return form;
}

export async function PublishForm(id: string) {
    const user = await currentUser();
    if (!user) {
        throw new UserNotFoundError();
    }

    const form = await prisma.form.update({
        where: { userId: user.id, id },
        data: { published: true },
    })

    return form;
}

export async function GetFormById(id: string) {
    return await prisma.form.update({
        select: { content: true },
        data: { visits: { increment: 1 } },
        where: { shareUrl: id },
        });
}

export async function SubmitForm(id: string, content: string) {
    return await prisma.form.update({
        data: {
            submissions: { increment: 1 },
            FormSubmission:{ create: { content }} 
        },
        where: { shareUrl: id, published: true },
    });
}

export async function GetFormSubmission(id: string) {
    const user = await currentUser();
    if (!user) {
        throw new UserNotFoundError();
    }

    return await prisma.form.findUnique({
        where: { id },
        include: { FormSubmission: true },
    })
}