import {
  Button,
  ClickAwayListener,
  Grow,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import router from 'next/router';
import { useRef, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: '5em',
    padding: 15,
  },
}));

export function CreateGroupButton(props) {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const options = [
    {
      label: 'Create a New Group',
      onClick: () => {
        handleClose();
        props.createGroup();
      },
    },
    {
      label: 'Join an Existing Group',
      onClick: () => {
        handleClose();
        props.joinGroup();
      },
    },
  ];

  return (
    <div>
      <Button
        color="primary"
        size="large"
        ref={anchorRef}
        onClick={handleToggle}
        className={styles.button}
      >
        <AddIcon fontSize="large" />
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.map((option) => (
                    <MenuItem key={option.label} onClick={option.onClick}>
                      {option.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
