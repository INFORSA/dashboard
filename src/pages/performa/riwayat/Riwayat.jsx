import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Tables } from "../../../components/atoms/Tables";
import { useGetTrackingPenilaianQuery } from "../../../services/tracking";
import { 
  Button, 
  Card, 
  CardBody, 
  Dialog, 
  DialogBody, 
  DialogHeader, 
  Input, 
  Option, 
  Select, 
  Typography,
  Chip
} from "@material-tailwind/react";
import { HelmetProvider } from "@dr.pogodin/react-helmet";
import { useState } from "react";
import Loading from "../../loading/Loading";

export default function Riwayat() {
  const [filters, setFilters] = useState({
    tabel: '',
    startDate: '',
    endDate: '',
    limit: 50,
    offset: 0
  });

  const { data, isLoading } = useGetTrackingPenilaianQuery(filters, {
    refetchOnMountOrArgChange: true,
  });

  const [openDetail, setOpenDetail] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleCloseDetail = () => {
    setOpenDetail(false);
    setSelectedRow(null);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value, offset: 0 }));
  };

  const handleReset = () => {
    setFilters({
      tabel: '',
      startDate: '',
      endDate: '',
      limit: 50,
      offset: 0
    });
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const getAksiColor = (aksi) => {
    switch (aksi) {
      case 'CREATE': return 'green';
      case 'UPDATE': return 'blue';
      case 'DELETE': return 'red';
      default: return 'gray';
    }
  };

  const formattedData = data?.data.map((row) => {
    const dataBaru = row.data_baru_parsed;
    const dataLama = row.data_lama_parsed;
    const aksi = row.aksi;
    let info_penilaian = "-";

    // CREATE: Informasi pembuatan penilaian baru
    if (aksi === "CREATE" && dataBaru) {
      const parts = [];

      // Untuk penilaian departemen
      if ("departemen_id" in dataBaru) {
        parts.push(`Membuat penilaian departemen ${dataBaru.departemen_id}`);
      }
      if ("penilaianDepartemenId" in dataBaru) {
        parts.push(`pada penilaian #${dataBaru.penilaianDepartemenId}`);
      }

      // Untuk penilaian anggota
      if ("anggota_id" in dataBaru) {
        parts.push(`Membuat penilaian anggota ${dataBaru.anggota_id}`);
      }
      if ("penilaianId" in dataBaru) {
        parts.push(`pada penilaian #${dataBaru.penilaianId}`);
      }

      info_penilaian = parts.length > 0 ? parts.join(" ") : "-";
    }

    // UPDATE: Informasi perubahan nilai matriks
    else if (aksi === "UPDATE" && dataBaru && dataLama) {
      const parts = [];

      // Cek apakah ada perubahan matriks_id dan nilai
      if (dataBaru.matriks_id && dataBaru.nilai !== undefined) {
        parts.push(`Mengubah matriks ${dataBaru.matriks_id} dengan nilai `);
        
        if (dataLama.nilai !== undefined) {
          parts.push(`${dataLama.nilai} menjadi ${dataBaru.nilai}`);
        } else {
          parts.push(`nilai ${dataBaru.nilai}`);
        }
      }

      // Informasi penilaian ID
      if (dataBaru.penilaianId) {
        parts.push(`pada penilaian ${dataBaru.penilaianId}`);
      }
      if (dataBaru.penilaianDepartemenId) {
        parts.push(`pada penilaian #${dataBaru.penilaianDepartemenId}`);
      }

      // Informasi anggota/departemen
      if (dataBaru.anggota_id) {
        parts.push(`- Anggota ${dataBaru.anggota_id}`);
      }
      if (dataBaru.departemen_id) {
        parts.push(`- Departemen ${dataBaru.departemen_id}`);
      }

      info_penilaian = parts.length > 0 ? parts.join(" ") : "-";
    }

    // DELETE: Informasi penghapusan penilaian
    else if (aksi === "DELETE" && dataLama) {
      const parts = [];

      // Untuk penilaian departemen
      if ("penilaianDepartemenId" in dataLama) {
        parts.push(`Penilaian departemen #${dataLama.penilaianDepartemenId} dihapus`);
        if (dataLama.departemen_id) {
          parts.push(`(Departemen ${dataLama.departemen_id})`);
        }
      }

      // Untuk penilaian anggota
      if ("penilaianId" in dataLama) {
        parts.push(`Penilaian anggota #${dataLama.penilaianId} dihapus`);
        if (dataLama.anggota_id) {
          parts.push(`(Anggota ${dataLama.anggota_id})`);
        }
      }

      info_penilaian = parts.length > 0 ? parts.join(" ") : "-";
    }

    return {
      ...row,
      info_penilaian,
    };
  }) || [];

  
  const columnsTracking = [
    { key: "no", label: "No" },
    { key: "nama_user", label: "User" },
    { key: "aksi", label: "Aksi" },
    { key: "tabel", label: "Jenis" },
    {
      key: "info_penilaian",
      label: "Info Penilaian",
      render: (row) => {
        const data = row.data_baru || row.data_lama;
        if (!data) return "-";

        return (
          <div className="text-[11px] bg-gray-50 p-2 rounded">
            {("penilai_id" in data || "pengurus_id" in data) && (
              <div>
                {/* <span className="font-semibold">Penilai ID:</span>{" "} */}
                <span>{data.penilai_id || data.pengurus_id}</span>
              </div>
            )}
            {("departemen_id" in data || "anggota_id" in data) && (
              <div>
                {/* <span className="font-semibold">Departemen ID:</span>{" "} */}
                <span>{data.departemen_id || data.anggota_id}</span>
              </div>
            )}
            {("penilaianDepartemenId" in data || "penilaianId" in data) && (
              <div>
                {/* <span className="font-semibold">Penilaian ID:</span>{" "} */}
                <span>{data.penilaianDepartemenId || data.penilaianId}</span>
              </div>
            )}
          </div>
        );
      },
    },
    { key: "waktu_tracking", label: "Waktu" },
  ];

  return (
    <div>
      <HelmetProvider>
        <title>Tracking Penilaian</title>
      </HelmetProvider>

      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {/* Filter Section */}
          <Card className="mb-4">
            <CardBody>
              <Typography variant="h6" className="mb-4">Filter Tracking</Typography>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select
                  label="Tipe Penilaian"
                  value={filters.tabel}
                  onChange={(val) => handleFilterChange('tabel', val)}
                >
                  <Option value="">Semua</Option>
                  <Option value="penilaian_anggota">Penilaian Anggota</Option>
                  <Option value="penilaian_departemen">Penilaian Departemen</Option>
                  <Option value="detail_penilaian">Update Penilaian Anggota</Option>
                  <Option value="detail_penilaian_departemen">Update Penilaian Departemen</Option>
                </Select>

                <Input
                  type="date"
                  label="Tanggal Mulai"
                  value={filters.startDate}
                  onChange={(e) => handleFilterChange('startDate', e.target.value)}
                />

                <Input
                  type="date"
                  label="Tanggal Akhir"
                  value={filters.endDate}
                  onChange={(e) => handleFilterChange('endDate', e.target.value)}
                />

                <div className="flex gap-2">
                  <Button 
                    onClick={handleReset} 
                    color="gray" 
                    size="sm"
                    variant="outlined"
                    className="flex-1"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Table Section */}
          <Tables
            title="Tracking Penilaian"
            description="Histori pembuatan dan perubahan penilaian"
            columns={columnsTracking}
            rows={formattedData || []}
            actionHidden={true}
          />

          {/* Detail Dialog */}
          <Dialog open={openDetail} handler={handleCloseDetail} size="lg">
            <DialogHeader>Detail Tracking</DialogHeader>
            <DialogBody className="max-h-[70vh] overflow-y-auto">
              {selectedRow && (
                <div className="space-y-4">
                  <div>
                    <Typography variant="small" className="font-semibold mb-1">
                      Waktu
                    </Typography>
                    <Typography variant="small">
                      {formatDate(selectedRow.waktu)}
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="small" className="font-semibold mb-1">
                      Tabel & Aksi
                    </Typography>
                    <div className="flex gap-2">
                      <Chip value={selectedRow.tabel} size="sm" />
                      <Chip value={selectedRow.aksi} color={getAksiColor(selectedRow.aksi)} size="sm" />
                    </div>
                  </div>

                  <div>
                    <Typography variant="small" className="font-semibold mb-1">
                      User
                    </Typography>
                    <Typography variant="small">
                      {selectedRow.nama_user} ({selectedRow.user_id})
                    </Typography>
                    <Typography variant="small" className="text-gray-600">
                      {selectedRow.jabatan_user}
                    </Typography>
                  </div>

                  {selectedRow.data_baru_parsed && (
                    <div>
                      <Typography variant="small" className="font-semibold mb-2">
                        Detail Data
                      </Typography>
                      <Card className="bg-gray-50">
                        <CardBody>
                          <pre className="text-xs overflow-auto">
                            {JSON.stringify(selectedRow.data_baru_parsed, null, 2)}
                          </pre>
                        </CardBody>
                      </Card>
                    </div>
                  )}

                  {selectedRow.referensi_id && (
                    <div>
                      <Typography variant="small" className="font-semibold mb-1">
                        Referensi ID
                      </Typography>
                      <Typography variant="small">
                        {selectedRow.referensi_id}
                      </Typography>
                    </div>
                  )}
                </div>
              )}
            </DialogBody>
          </Dialog>
        </div>
      )}
    </div>
  );
}