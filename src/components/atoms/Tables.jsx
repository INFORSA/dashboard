import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
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
import { useEffect, useState } from "react";
import { useEditNilaiDeptMutation, useEditNilaiMutation } from "../../services/penilaian";
import { toast } from "react-toastify";

export function Tables({ maxRow, columns = [], rows = [], title = "", description = "", 
                        onEdit = () => {}, onRemove = () => {}, actionHidden, inlineEdit, onRefetch, 
                        removeHidden, type }) {
  const ITEMS_PER_PAGE = maxRow ?? 25;
  const [page, setPage] = useState(1);
  
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredRows = rows.filter((row) =>
    columns.some((col) => {
      const cellValue = row[col.key];
      return (
        typeof cellValue === "string" &&
        cellValue.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  );
  const totalPages = Math.ceil(filteredRows.length / ITEMS_PER_PAGE);
  const paginatedRows = filteredRows.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const [editNilai] = useEditNilaiMutation();
  const [editNilaiDept] = useEditNilaiDeptMutation();

  const handleEdit = (rowId, colKey, value) => {
    setEditingCell({ rowId, colKey });
    setEditValue(value);
  };

  const handleSave = async (rowId, colKey, value) => {
    try {
      const data = {
        id: rowId,
        nilai: value,
      };
      type === "staff" ? await editNilai(data).unwrap() : await editNilaiDept(data).unwrap();
      onRefetch();
      setEditingCell(null);
      toast.success("Nilai berhasil diperbarui!");
    } catch (error) {
      console.error("Update gagal", error);
      toast.error("Nilai gagal diperbarui!");
    }
  };

  const handleFieldChange = (value) => {
    setEditValue(value);
  };

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  return (
    <Card className="h-full w-full border border-black bg-white/30 backdrop-blur-md hover:bg-white">
      <CardHeader floated={false} shadow={false} className="rounded-none bg-transparent">
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-x-auto px-0">
        <div className="overflow-x-auto">
          <table className="w-full table-auto whitespace-nowrap text-left">
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
                <th hidden={actionHidden} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
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
                const classes = isLast ? "p-4" : "p-4 whitespace-nowrap border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    {columns.map((col) => {
                      const idKey = col.idKey;
                      const value = row[col.key];
                      const detailId = idKey ? row[idKey] : null;
                      const isEditing = editingCell?.rowId === detailId && editingCell?.colKey === col.key;
                      return (
                        <td className={classes} key={col.key} 
                            onClick={() => {
                              if (!inlineEdit) return; // ✅ Kalau inlineEdit false, klik tidak ngapa-ngapain
                              if (detailId) {
                                handleEdit(detailId, col.key, value);
                              } else {
                                console.warn("❗ Tidak untuk diedit", col.key);
                              }
                            }}
                          >
                          {isEditing ? (
                            <input
                              className="border rounded px-2 py-1 w-8"
                              value={editValue}
                              onChange={(e) => handleFieldChange(e.target.value)}
                              onBlur={() => handleSave(detailId, col.key, editValue)}
                              onKeyDown={(e) => e.key === "Enter" && handleSave(detailId, col.key, editValue)}
                              autoFocus
                            />
                          ) : (
                            <div className="flex items-center gap-3">
                              <Typography variant="small" color="blue-gray" className="font-base">
                                {col.key === "no" ? index + 1 : row[col.key]}
                              </Typography>
                            </div>
                          )}
                        </td>
                      );
                    })}
                    <td className={classes} hidden={actionHidden}>
                      <div className="flex gap-2">
                        <Button color="blue" className="flex items-center gap-3 mb-3" size="sm" onClick={() => onEdit(row)}>
                          <PencilSquareIcon strokeWidth={2} className="h-4 w-4" /> Edit
                        </Button>
                        <div hidden={removeHidden}>
                          <Button color="red" className="flex items-center gap-3 mb-3" size="sm" onClick={() => onRemove(row)}>
                            <TrashIcon strokeWidth={2} className="h-4 w-4" /> Remove
                          </Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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