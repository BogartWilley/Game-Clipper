// Refer to https://mui.com/joy-ui/react-drawer/

// Importing Icons
import ArrowForward from '@mui/icons-material/DoubleArrowTwoTone';
import KOF_ICON from '../../assets/icons/KOF_XIII.png';

// Importing Stles
import './sidebar.css';

import * as React from 'react';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Drawer from '@mui/joy/Drawer';
import Input from '@mui/joy/Input';
import List from '@mui/joy/List';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import ModalClose from '@mui/joy/ModalClose';
import { motion, AnimatePresence, color } from 'framer-motion';
import {
  Card,
  CardContent,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/joy';
export default function Sidebar(props: any) {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState('Guesthouse');
  return (
    <React.Fragment>
      <AnimatePresence>
        {!open && (
          <motion.div
            className="sidebar-toggle"
            id="sidebarToggle"
            key={props.key}
            initial={{ x: -150, y: -0 }}
            animate={{ x: 0, y: 0 }}
            transition={{
              duration: 0.3,
              type: 'spring',
              stiffness: '80',
            }}
            exit={{
              x: -150,
              y: -0,
            }}
            style={{
              display: 'flex',
              position: 'fixed',
              margin: 'auto',
              bottom: 20,
              left: 20,
            }}
          >
            <IconButton
              variant="outlined"
              color="neutral"
              style={{
                width: '65px',
                height: '40px',
                backgroundColor: 'gray',
                borderColor: 'black',
                borderWidth: '2px',
                opacity: 0.95,
              }}
              onClick={() => setOpen(true)}
            >
              <ArrowForward />
            </IconButton>
          </motion.div>
        )}
      </AnimatePresence>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        style={{ opacity: 0.95 }}
        size="md"
        invertedColors={true}
      >
        {' '}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            ml: 'auto',
            mt: 1,
            mr: 2,
          }}
        >
          <Typography
            component="label"
            htmlFor="close-icon"
            fontSize="sm"
            fontWeight="lg"
            sx={{ cursor: 'pointer' }}
          >
            Close
          </Typography>
          <ModalClose id="close-icon" sx={{ position: 'initial' }} />
        </Box>
        <FormControl>
          <FormLabel sx={{ typography: 'title-md', fontWeight: 'bold' }}>
            Property type
          </FormLabel>
          <RadioGroup
            value={type || ''}
            onChange={(event) => {
              setType(event.target.value);
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 2fr))', // Modify minmax to change the boxes size
                gap: 1.5,
              }}
            >
              {[
                {
                  name: '                 House',
                  icon: (
                    <img
                      src={KOF_ICON}
                      width="50px"
                      style={{ margin: 'auto' }}
                    ></img>
                  ),
                },
                {
                  name: 'Apartment',
                  icon: <ArrowForward />,
                },
                {
                  name: 'Guesthouse',
                  icon: <ArrowForward />,
                },
                {
                  name: 'Hotel',
                  icon: <ArrowForward />,
                },
              ].map((item) => (
                <Card
                  key={item.name}
                  sx={{
                    boxShadow: 'none',
                    '&:hover': { bgcolor: 'background.level1' },
                  }}
                >
                  <CardContent>
                    {item.icon}
                    <Typography level="title-md">{item.name}</Typography>
                  </CardContent>
                  <Radio
                    disableIcon
                    overlay
                    checked={type === item.name}
                    variant="outlined"
                    color="neutral"
                    value={item.name}
                    sx={{ mt: -2 }}
                    slotProps={{
                      action: {
                        sx: {
                          ...(type === item.name && {
                            borderWidth: 2,
                            borderColor:
                              'var(--joy-palette-primary-outlinedBorder)',
                          }),
                          '&:hover': {
                            bgcolor: 'transparent',
                          },
                        },
                      },
                    }}
                  />
                </Card>
              ))}
            </Box>
          </RadioGroup>
        </FormControl>{' '}
        <List
          size="lg"
          component="nav"
          sx={{
            flex: 'none',
            fontSize: 'xl',
            '& > div': { justifyContent: 'center' },
          }}
        >
          <ListItemButton>Available Games</ListItemButton>
          <ListItemButton>Studio</ListItemButton>
          <ListItemButton>Contact</ListItemButton>
        </List>
      </Drawer>
    </React.Fragment>
  );
}
