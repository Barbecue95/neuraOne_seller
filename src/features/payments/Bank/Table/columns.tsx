import { z } from "zod";
import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DeleteIcon, EditIcon, EyeIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

// Optional: define the schema from the API response
export const bankColumnsSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const columnHelper = createColumnHelper<z.infer<typeof bankColumnsSchema>>();

export const bankColumns = [
  columnHelper.display({
    id: "id_select",
    header: () => <Checkbox />,
    cell: ({ row }) => <Checkbox name={String(row.id)} id={String(row.id)} />,
  }),
  columnHelper.accessor("id", {
    header: "ID",
  }),
  columnHelper.accessor("name", {
    header: "Bank Name",
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex flex-row gap-2">
        <Button
          variant="default"
          className="rounded-full"
          size="icon"
          onClick={() => {
            window.location.href = `/banks/${row.id}`;
          }}
        >
          <EyeIcon className="h-4 w-4" />
        </Button>
        <Button variant="default" className="rounded-full" size="icon">
          <EditIcon className="h-4 w-4" />
        </Button>
        <Button variant="default" className="rounded-full" size="icon">
          <DeleteIcon className="h-4 w-4" />
        </Button>
      </div>
    ),
  }),
];
