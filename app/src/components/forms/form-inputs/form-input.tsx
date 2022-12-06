import { TextField, Select } from "@components";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";

type FormInputProps = {
  control: any;
  id: string;
  name: string;
  label: string;
  measureUnit: string;
  options: any;
  required?: string;
};

const FormInput = ({
  control,
  id,
  required,
  name,
  label,
  measureUnit,
  options,
  ...props
}: FormInputProps): JSX.Element => {
  const _label = required ? `${label} *` : label;
  const labelId = (Math.random() + id).toString();

  let component = ({ value, onChange, error }: any) => {
    if (options) {
      return (
        <FormControl fullWidth>
          <InputLabel
            id={labelId}
            sx={{ right: "1.5rem", left: "auto", fontSize: "small" }}
          >
            {label}
          </InputLabel>
          <Select
            labelId={labelId}
            id={name}
            value={value}
            label={label}
            onChange={onChange}
          >
            {options.map((op: any) => {
              return (
                <MenuItem key={op.id} value={op.value}>
                  {op.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      );
    }
    return (
      <TextField
        id={name}
        label={_label}
        variant="filled"
        value={value}
        onChange={onChange}
        error={!!error}
        helperText={error ? error.message : null}
        sx={{ width: "100%" }}
        {...props}
      />
    );
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Box
          sx={{
            display: "flex",
            placeItems: "center",
            position: "relative",
          }}
        >
          {component({ onChange, value, error })}
          {measureUnit && (
            <Typography
              sx={{ position: "absolute", left: "1rem", opacity: 0.5 }}
            >
              {`(${measureUnit})`}
            </Typography>
          )}
        </Box>
      )}
      rules={{ required }}
    />
  );
};

export default FormInput;
