import { motion } from 'framer-motion';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useState } from 'react';
import hamburgerIcon from './sidebar-icons/icons8-menu.svg';
import './sidebar.css';
export default function SidebarTest(props: any) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <Sidebar
      collapsedWidth="30px"
      collapsed={isCollapsed}
      rootStyles={{ backgroundColor: 'red' }}
      onClick={() => {
        setIsCollapsed(!isCollapsed);
      }}
    >
      <Menu>
        <SubMenu label="Charts">
          <MenuItem>Pie charts</MenuItem>
          <MenuItem> Line charts </MenuItem>
        </SubMenu>
        <MenuItem icon={<img src={hamburgerIcon} alt="Documentation" />}>
          {' '}
        </MenuItem>
        <MenuItem> Calendar </MenuItem>
      </Menu>
    </Sidebar>
  );
}
