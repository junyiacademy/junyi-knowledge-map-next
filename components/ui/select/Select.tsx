import React from 'react';
import { SelectProps as ISelectProps } from '@/interfaces/ui/Select';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select as MuiSelect,
  OutlinedInput,
} from '@mui/material';
import { formHelperTextClasses } from '@mui/material/FormHelperText';

// self-defined-components

export const Select: React.FC<ISelectProps> = ({
  label,
  helperText,
  FormControlProps = {},
  InputLabelProps = {},
  InputProps = {},
  SelectProps = {},
  FormHelperTextProps = {},
  className,
  children,
  color = 'primary',
  size = 'small',
  paperMaxHeight = 'auto',
  error = false,
  hasLabel = true,
  hasShrink = false,
  value = '',
  disabled = false,
}) => {
  const hasHelperText = !!helperText;
  const { sx: formControlSx = [], ...otherFormControlProps } = FormControlProps;
  const { sx: formHelperTextSx = [], ...otherFormHelperTextProps } =
    FormHelperTextProps;

  return (
    <FormControl
      sx={[...(Array.isArray(formControlSx) ? formControlSx : [formControlSx])]}
      size={size}
      disabled={disabled}
      error={error}
      color={color}
      className={className}
      {...otherFormControlProps}
    >
      {hasLabel && (
        <InputLabel
          color={color}
          shrink={hasShrink ? true : undefined}
          {...InputLabelProps}
        >
          {label}
        </InputLabel>
      )}
      <MuiSelect
        value={value}
        label={hasLabel ? label : undefined}
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: paperMaxHeight,
            },
          },
          disableAutoFocusItem: true,
          anchorOrigin: {
            vertical: 2,
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
        }}
        input={
          <OutlinedInput
            color={color}
            label={hasLabel ? label : undefined}
            disabled={disabled}
            {...InputProps}
          />
        }
        {...SelectProps}
      >
        {children}
      </MuiSelect>
      {hasHelperText && (
        <FormHelperText
          sx={[
            {
              [`&.${formHelperTextClasses.root}`]: {
                marginLeft: 0,
              },
            },
            ...(Array.isArray(formHelperTextSx)
              ? formHelperTextSx
              : [formHelperTextSx]),
          ]}
          {...otherFormHelperTextProps}
        >
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default Select;
