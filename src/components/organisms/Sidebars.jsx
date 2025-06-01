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
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Adwel from '../../assets/dept/ADWEL.png';
import HRD from '../../assets/dept/HRD.png';
import PSD from '../../assets/dept/PSD.png';
import COMINFO from '../../assets/dept/COMINFO.png';
import EDEN from '../../assets/dept/EDEN.png';
import RELACS from '../../assets/dept/RELACS.png';
import inforsa from '../../assets/inforsa.png';
import { NavLink } from "react-router-dom";
import { useGetCurrentUserQuery } from "../../services/login";
 
export default function Sidebars({isOpen}) {
  const [open, setOpen] = React.useState(0);
  const {data} = useGetCurrentUserQuery();
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  return (
    <Card className={`bg-[#282666] hidden lg:block rounded-tl-none rounded-bl-none sticky top-0 z-10 self-start h-[calc(100vh-2rem)] transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0 w-[18rem]' : '-translate-x-full w-0 overflow-hidden'} min-h-screen max-w-[18rem] p-4`}>
      <div className="w-full bg-white bg-opacity-15 rounded-xl mb-2 pb-3">
        <div className="flex justify-center">
          <img src={inforsa} alt="" className="w-36 text-center"/>
        </div>
        <Typography variant="h5" color="white" className="text-center">
          Information System Association
        </Typography>
      </div>
      <div className="overflow-y-auto scrollbar-none h-[calc(100vh-16rem)]">
        <List>
          <ListItem >
              <ListItemPrefix>
                <HomeIcon color="white" className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="white" className="mr-auto font-normal">
                <NavLink to="/">
                  Dashboard
                </NavLink>
              </Typography>
          </ListItem>
          { data && data.role === "superadmin" && 
          <>
          <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                color="white"
                strokeWidth={2.5}
                className={`mx-auto h-auto w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 1}>
              <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                <ListItemPrefix>
                  <FlagIcon color="white" className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="white" className="mr-auto font-normal">
                  Dept/Bureau
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem>
                  <ListItemPrefix>
                    <img src={HRD} className="h-5 w-5 mb-1" />
                  </ListItemPrefix>
                  <NavLink to="/dept/hrd">
                    <Typography color="white" className="mr-auto font-normal">
                      HRD
                    </Typography>
                  </NavLink>
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <img src={RELACS} className="h-5 w-5 mb-1" />
                  </ListItemPrefix>
                  <NavLink to="/dept/relacs">
                    <Typography color="white" className="mr-auto font-normal">
                      RELACS
                    </Typography>
                  </NavLink>
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <img src={PSD} className="h-5 w-5 mb-1" />
                  </ListItemPrefix>
                  <NavLink to="/dept/psd">
                    <Typography color="white" className="mr-auto font-normal">
                      PSD
                    </Typography>
                  </NavLink>
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <img src={Adwel} className="h-5 w-5 mb-2" />
                  </ListItemPrefix>
                  <NavLink to="/dept/adwel">
                    <Typography color="white" className="mr-auto font-normal">
                      ADWEL
                    </Typography>
                  </NavLink>
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <img src={EDEN} className="h-5 w-5 mb-1" />
                  </ListItemPrefix>
                  <NavLink to="/dept/eden">
                    <Typography color="white" className="mr-auto font-normal">
                      EDEN
                    </Typography>
                  </NavLink>
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <img src={COMINFO} className="h-5 w-5 mb-1" />
                  </ListItemPrefix>
                  <NavLink to="/dept/cominfo">
                    <Typography color="white" className="mr-auto font-normal">
                      COMINFO
                    </Typography>
                  </NavLink>
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
          <Accordion
            open={open === 2}
            icon={
              <ChevronDownIcon
                color="white"
                strokeWidth={2.5}
                className={`mx-auto h-auto w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
              />
            }
          >
            <ListItem className="p-0" selected={open===2}>
              <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                <ListItemPrefix>
                  <InboxIcon color="white" className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="white" className="mr-auto font-normal">
                  Permissions
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem>
                  <ListItemPrefix>
                    <UserCircleIcon color="white" className="h-5 w-5"/>
                  </ListItemPrefix>
                    <NavLink to="permission/user">
                      <Typography color="white" className="mr-auto font-normal">
                        Users
                      </Typography>
                    </NavLink>
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <UserGroupIcon color="white" className="h-5 w-5"/>
                  </ListItemPrefix>
                    <NavLink to="permission/role">
                      <Typography color="white" className="mr-auto font-normal">
                        Roles
                      </Typography>
                    </NavLink>
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
          </>
          }
          <ListItem >
              <ListItemPrefix>
                <ChartBarIcon color="white" className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="white" className="mr-auto font-normal">
                <NavLink to="/penilaian">
                  Penilaian
                </NavLink>
              </Typography>
          </ListItem>
        </List>
      </div>
    </Card>
  );
}