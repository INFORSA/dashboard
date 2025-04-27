import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  InboxIcon,
  UserGroupIcon,
  FlagIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import inforsa from '../../assets/inforsa.png';
import { NavLink } from "react-router-dom";
 
export default function Sidebars({isOpen}) {
  const [open, setOpen] = React.useState(0);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  return (
    <Card className={`sticky top-0 z-10 self-start h-[calc(100vh-2rem)] ${isOpen ? 'w-full' : 'w-0 hidden'} min-h-screen h-auto max-w-[18rem] p-4 border border-xl`}>
      <div className="w-full mb-2 p-4">
        <div className="flex justify-center">
          <img src={inforsa} alt="" className="w-36 text-center"/>
        </div>
        <Typography variant="h5" color="blue-gray" className="text-center">
          Information System Association
        </Typography>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-16rem)]">
        <List>
          <ListItem >
              <ListItemPrefix>
                <HomeIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                <NavLink to="/">
                  Dashboard
                </NavLink>
              </Typography>
          </ListItem>
          <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-auto w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 1}>
              <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                <ListItemPrefix>
                  <FlagIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Departement/Bureau
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem>
                  <ListItemPrefix>
                    <UserCircleIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <NavLink to="/dept/hrd">
                    HRD
                  </NavLink>
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <UserCircleIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <NavLink to="/dept/relacs">
                    RELACS
                  </NavLink>
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <UserCircleIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <NavLink to="/dept/psd">
                    PSD
                  </NavLink>
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <UserCircleIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <NavLink to="/dept/adwel">
                    ADWEL
                  </NavLink>
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <UserCircleIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <NavLink to="/dept/eden">
                    EDEN
                  </NavLink>
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <UserCircleIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <NavLink to="/dept/cominfo">
                    COMINFO
                  </NavLink>
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
          <Accordion
            open={open === 2}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-auto w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
              />
            }
          >
            <ListItem className="p-0" selected={open===2}>
              <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                <ListItemPrefix>
                  <InboxIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Permissions
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem>
                  <ListItemPrefix>
                    <UserCircleIcon className="h-5 w-5"/>
                  </ListItemPrefix>
                  Users
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <UserGroupIcon className="h-5 w-5"/>
                  </ListItemPrefix>
                  Roles
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
        </List>
      </div>
    </Card>
  );
}