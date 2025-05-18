import { PencilIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { useState } from "react";

const ITEMS_PER_PAGE = 25;

export function Tables({ columns = [], rows = [], title = "", description = "", onEdit = () => {}, onRemove = () => {}, }) {

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(rows.length / ITEMS_PER_PAGE);
  const paginatedRows = rows.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <Card className="h-full w-full border border-black">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              {title}
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              {description}
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button className="flex items-center gap-3" size="sm">
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll scrollbar-none px-0">
        <table className="min-w-full table-auto text-left">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 ${col.className}`}
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold leading-none opacity-70"
                  >
                    {col.label}
                  </Typography>
                </th>
              ))}
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold leading-none opacity-70"
                  >
                    Action
                  </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((row, index) => {
                const isLast = index === rows.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 whitespace-nowrap border-b border-blue-gray-50";
 
                return (
                  <tr key={index}>
                    {columns.map((col)=>(
                      <td className={classes} key={col.key}>
                        <div className="flex items-center gap-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-base"
                          >
                            {col.key === "no" ? index + 1 : row[col.key]}
                          </Typography>
                        </div>
                      </td>
                    ))}
                    <td className={classes}>
                      <div className="flex gap-2">
                        <Button color="blue" className="flex items-center gap-3 mb-3" size="sm" onClick={() => onEdit(row)}>
                          <PencilSquareIcon strokeWidth={2} className="h-4 w-4" /> Edit
                        </Button>
                        <Button color="red" className="flex items-center gap-3 mb-3" size="sm" onClick={() => onRemove(row)}>
                          <TrashIcon strokeWidth={2} className="h-4 w-4" /> Remove
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button 
          variant="outlined"
          size="sm"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <IconButton
              key={i}
              variant={page === i + 1 ? "outlined" : "text"}
              size="sm"
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </IconButton>
          ))}
        </div>
        <Button 
          variant="outlined"
          size="sm"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}