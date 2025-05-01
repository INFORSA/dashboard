import { Input, Button } from "@material-tailwind/react";
import { useState } from "react";

const columns = ['Nama', 'Email', 'Telepon', 'Alamat'];

export default function Upload() {
  const [formData, setFormData] = useState(
    columns.reduce((acc, column) => {
      acc[column] = "";
      return acc;
    }, {})
  );

  const handleChange = (e, column) => {
    setFormData({
      ...formData,
      [column]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data dikirim:", formData);
    // TODO: kirim ke backend di sini
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 max-w-md mx-auto mt-10">
      {columns.map((col) => (
        <Input
          key={col}
          label={col}
          variant="standard"
          value={formData[col]}
          onChange={(e) => handleChange(e, col)}
          className="text-black"
        />
      ))}
      <Button type="submit" color="green">
        Submit
      </Button>
    </form>
  );
}
