import React from 'react';
import  MuiButton, {type ButtonProps as MuiButtonProps} from '@mui/material/Button';

interface ButtonProps extends Omit<MuiButtonProps, 'children'> {
    label: string;
}

export const Button = ({
    label, ...props
}: ButtonProps) => {
  return (
    <MuiButton
      {...props}
    >
      {label}
    </MuiButton>
  );
};
