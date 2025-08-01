"use client";

import { EllipsisIcon, PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";

import LongText from "@/components/long-text";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModalStore } from "@/store/modal-store";

const ProjectList = () => {
  const { openModal } = useModalStore();
  // TODO: Fetch projects
  const projects = [
    {
      name: "toast-canvas-tv",
      description: "Description 1",
    },
    {
      name: "concept-cube",
      description: "Description 2",
    },
    {
      name: "no-mad",
      description: "Description 3",
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button onClick={() => openModal("create-project")}>
          <PlusIcon />
          Add project
        </Button>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {projects.map((project) => (
          <Card key={project.name}>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-lg">
                <Link href={`/projects/${project.name}`}>
                  <LongText className="max-w-[200px]">{project.name}</LongText>
                </Link>
              </CardTitle>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <EllipsisIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => openModal("update-project", { data: project })}>
                    <PencilIcon className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => openModal("delete-project", { data: project })}>
                    <Trash2Icon className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>{project.description}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
