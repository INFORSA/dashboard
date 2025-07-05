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
  Square2StackIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import HRD from '../../assets/dept/HRD-black.png';
import PSD from '../../assets/dept/PSD-black.png';
import COMINFO from '../../assets/dept/COMINFO-black.png';
import EDEN from '../../assets/dept/EDEN-black.png';
import RELACS from '../../assets/dept/RELACS-black.png';
import Adwel from '../../assets/dept/ADWEL-black.png';
import inforsa from '../../assets/inforsa.png';
import { NavLink, useLocation } from "react-router-dom";
import { useGetCurrentUserQuery } from "../../services/login";
 
export default function Sidebars({isOpen}) {
  const [open, setOpen] = React.useState(0);
  const {data} = useGetCurrentUserQuery();
  const location = useLocation();
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  return (
    <Card className={`bg-gradient-to-br from-[#dfe3ec] via-[#f3f4f6] to-[#e2e8f0] 
                      hidden lg:block sticky top-0 z-10 rounded-none
                      self-start transition-all duration-300 
                      ease-in-out border border-black
                      ${isOpen ? 'translate-x-0 w-[18rem]' : '-translate-x-full w-0 overflow-hidden'} 
                      min-h-screen max-w-[18rem] p-4`}>
      <div className="w-full flex justify-start items-center gap-4 mb-2 pb-3 border-b-2 border-gray-400">
        <div className="flex justify-center">
          <img src={inforsa} alt="" className="w-20 text-center"/>
        </div>
        <Typography variant="h5" color="black" className="text-center">
          SIMK INFORSA
        </Typography>
      </div>
      <div className="overflow-y-auto scrollbar-none h-[calc(100vh-8rem)]">
        <List className="pb-3 border-b-2 border-gray-400">
          <ListItem>
              <ListItemPrefix>
                <HomeIcon color="black" className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="black" className={`mr-auto font-normal ${location.pathname === "/" && "text-[#2647AC]"}`}>
                <NavLink to="/">
                  Dashboard
                </NavLink>
              </Typography>
          </ListItem>
          { data && (data.role === "superadmin" || data.role === "dosen") && 
          <>
            {/* Departemen */}
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  color="black"
                  strokeWidth={2.5}
                  className={`mx-auto h-auto w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                  <ListItemPrefix>
                    <FlagIcon color="black" className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="black" className="mr-auto font-normal">
                    Dept/Bureau
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem className="pl-7">
                    <ListItemPrefix>
                      <img src={HRD} className="h-5 w-5 mb-1" />
                    </ListItemPrefix>
                    <NavLink to="/dept/hrd">
                      <Typography color="black" className={`mr-auto font-normal ${location.pathname === "/dept/hrd" && "text-[#2647AC]"}`}>
                        HRD
                      </Typography>
                    </NavLink>
                  </ListItem>
                  <ListItem className="pl-7">
                    <ListItemPrefix>
                      <img src={RELACS} className="h-5 w-5 mb-1" />
                    </ListItemPrefix>
                    <NavLink to="/dept/relacs">
                      <Typography color="black" className={`mr-auto font-normal ${location.pathname === "/dept/relacs" && "text-[#2647AC]"}`}>
                        RELACS
                      </Typography>
                    </NavLink>
                  </ListItem>
                  <ListItem className="pl-7">
                    <ListItemPrefix>
                      <img src={PSD} className="h-5 w-5 mb-1" />
                    </ListItemPrefix>
                    <NavLink to="/dept/psd">
                      <Typography color="black" className={`mr-auto font-normal ${location.pathname === "/dept/psd" && "text-[#2647AC]"}`}>
                        PSD
                      </Typography>
                    </NavLink>
                  </ListItem>
                  <ListItem className="pl-7">
                    <ListItemPrefix>
                      <img src={Adwel} className="h-5 w-5 mb-2" />
                    </ListItemPrefix>
                    <NavLink to="/dept/adwel">
                      <Typography color="black" className={`mr-auto font-normal ${location.pathname === "/dept/adwel" && "text-[#2647AC]"}`}>
                        ADWEL
                      </Typography>
                    </NavLink>
                  </ListItem>
                  <ListItem className="pl-7">
                    <ListItemPrefix>
                      <img src={EDEN} className="h-5 w-5 mb-1" />
                    </ListItemPrefix>
                    <NavLink to="/dept/eden">
                      <Typography color="black" className={`mr-auto font-normal ${location.pathname === "/dept/eden" && "text-[#2647AC]"}`}>
                        EDEN
                      </Typography>
                    </NavLink>
                  </ListItem>
                  <ListItem className="pl-7">
                    <ListItemPrefix>
                      <img src={COMINFO} className="h-5 w-5 mb-1" />
                    </ListItemPrefix>
                    <NavLink to="/dept/cominfo">
                      <Typography color="black" className={`mr-auto font-normal ${location.pathname === "/dept/cominfo" && "text-[#2647AC]"}`}>
                        COMINFO
                      </Typography>
                    </NavLink>
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            {/* Permission */}
            {data.role === "superadmin" && 
              <Accordion
                open={open === 2}
                icon={
                  <ChevronDownIcon
                    color="black"
                    strokeWidth={2.5}
                    className={`mx-auto h-auto w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                  />
                }
              >
                <ListItem className="p-0" selected={open===2}>
                  <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                    <ListItemPrefix>
                      <InboxIcon color="black" className="h-5 w-5" />
                    </ListItemPrefix>
                    <Typography color="black" className="mr-auto font-normal">
                      Permissions
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1">
                  <List className="p-0">
                    <ListItem className="pl-7">
                      <ListItemPrefix>
                        <UserCircleIcon color="black" className="h-5 w-5"/>
                      </ListItemPrefix>
                        <NavLink to="permission/user">
                          <Typography color="black" className={`mr-auto font-normal ${location.pathname === "/permission/user" && "text-[#2647AC]"}`}>
                            Users
                          </Typography>
                        </NavLink>
                    </ListItem>
                    <ListItem className="pl-7">
                      <ListItemPrefix>
                        <UserGroupIcon color="black" className="h-5 w-5"/>
                      </ListItemPrefix>
                        <NavLink to="permission/role">
                          <Typography color="black" className={`mr-auto font-normal ${location.pathname === "/permission/role" && "text-[#2647AC]"}`}>
                            Roles
                          </Typography>
                        </NavLink>
                    </ListItem>
                  </List>
                </AccordionBody>
              </Accordion>
            }
            {/* Performance */}
            <Accordion
              open={open === 3}
              icon={
                <ChevronDownIcon
                  color="black"
                  strokeWidth={2.5}
                  className={`mx-auto h-auto w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                />
              }
            >
              <ListItem className="p-0" selected={open===3}>
                <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
                  <ListItemPrefix>
                    <ChartBarIcon color="black" className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="black" className="mr-auto font-normal">
                      Performance
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  {data.role === "superadmin" && 
                    <ListItem className="pl-7">
                      <ListItemPrefix>
                        <Square2StackIcon color="black" className="h-5 w-5"/>
                      </ListItemPrefix>
                        <NavLink to="/matriks-penilaian">
                          <Typography color="black" className={`mr-auto font-normal ${location.pathname === "/matriks-penilaian" && "text-[#2647AC]"}`}>
                            Matriks Penilaian 
                          </Typography>
                        </NavLink>
                    </ListItem>
                  }
                  <ListItem className="pl-7">
                    <ListItemPrefix>
                      <ClipboardDocumentIcon color="black" className="h-5 w-5"/>
                    </ListItemPrefix>
                      <NavLink to="/hasil-penilaian">
                        <Typography color="black" className={`mr-auto font-normal ${location.pathname === "/hasil-penilaian" && "text-[#2647AC]"}`}>
                          Hasil Penilaian
                        </Typography>
                      </NavLink>
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
          </>
          }
        </List>
      </div>
    </Card>
  );
}