import { ChangeEvent } from 'react';
import {
  FormControlProps as MuiFormControlProps,
  FormHelperTextProps as MuiFormHelperTextProps,
  InputLabelProps as MuiInputLabelProps,
  InputProps as MuiInputProps,
  SelectProps as MuiSelectProp,
  OutlinedInputProps,
} from '@mui/material';

export interface SelectProps extends MuiSelectProp {
  helperText?: string;
  FormControlProps?: Partial<MuiFormControlProps>;
  InputLabelProps?: Partial<MuiInputLabelProps>;
  InputProps?:
    | (Partial<OutlinedInputProps> & {
        onChange: (e: ChangeEvent<HTMLInputElement>) => void;
      })
    | (object & Partial<MuiInputProps>);
  SelectProps?: object | Partial<MuiSelectProp>;
  FormHelperTextProps?: Partial<MuiFormHelperTextProps>;
  color?: 'primary' | 'secondary';
  size?: 'medium' | 'small';
  paperMaxHeight?: number | string;
  error?: boolean;
  hasLabel?: boolean;
  hasShrink?: boolean;
  disabled?: boolean;
  className?: string;
  // eslint-disable-next-line
  otherProps?: any;
}
