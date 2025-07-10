import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useGetUserByNamaQuery } from "../../services/user";
import Loading from "../loading/Loading";

export default function Settings({nama}) {
  const { data: personalData, isLoading: personalLoading, isError: personalError } = useGetUserByNamaQuery(nama);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [editForm, setEditForm] = useState({
    username: "",
    password: "",
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUser({
      ...user,
      username: editForm.username,
      password: "********", // don't show actual password
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({ username: user.username, password: "" });
    setIsEditing(false);
  };
  const getUserInitials = (name) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  useEffect(() => {
    if (personalData && personalData.length > 0) {
        const fetchedUser = personalData[0];
        setUser({
        username: fetchedUser.username,
        password: "********",
        });
        setEditForm({
        username: fetchedUser.username,
        password: "",
        });
    }
    }, [personalData]);

  if(personalLoading) return <Loading/>;
  if(personalError) return <Error/>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Typography variant="h4" className="mb-6">Account Settings</Typography>
      <Card shadow={true} className="p-6">
        <CardBody>
          <div className="flex items-center gap-6 mb-8">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                {getUserInitials(user?.username)}
            </div>
            <div>
              <Typography variant="h6">{user?.username}</Typography>
              <Typography variant="small" color="gray">Profile Picture</Typography>
            </div>
          </div>

          <div className="grid gap-6">
            <div>
              <Typography variant="small" color="blue-gray" className="mb-1">Username</Typography>
              {isEditing ? (
                <Input
                  name="username"
                  value={editForm?.username}
                  onChange={handleChange}
                  placeholder="Enter new username"
                />
              ) : (
                <Typography variant="paragraph">{user?.username}</Typography>
              )}
            </div>

            <div>
              <Typography variant="small" color="blue-gray" className="mb-1">Password</Typography>
              {isEditing ? (
                <Input
                  name="password"
                  type="password"
                  value={editForm?.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                />
              ) : (
                <Typography variant="paragraph">********</Typography>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6 gap-3">
            {isEditing ? (
              <>
                <Button variant="outlined" color="gray" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button color="blue" onClick={handleSave}>
                  Save
                </Button>
              </>
            ) : (
              <Button color="blue" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}