"use client";

import { EllipsisIcon, PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";

import LongText from "@/components/long-text";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModalStore } from "@/store/modal-store";

const Categories = () => {
  const { openModal } = useModalStore();
  const categories = [
    {
      id: "1",
      name: "Category-1",
    },
    {
      id: "2",
      name: "Category-2",
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button onClick={() => openModal("create-category")}>
          <PlusIcon />
          Add category
        </Button>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {categories.map((category) => (
          <Card key={category.name}>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-lg">
                <Link href={`/categories/${category.name}`}>
                  <LongText className="max-w-[200px]">{category.name}</LongText>
                </Link>
              </CardTitle>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <EllipsisIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => openModal("update-category", { data: category })}
                  >
                    <PencilIcon className="mr-2 size-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => openModal("delete-category", { data: category })}
                  >
                    <Trash2Icon className="mr-2 size-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Categories;
