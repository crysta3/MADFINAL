export const validators = {
  required: (value: unknown) => String(value ?? '').trim().length > 0,
  email: (value: string) => /\S+@\S+\.\S+/.test(value),
  numeric: (value: string) => !Number.isNaN(Number(value)) && value.trim() !== '',
};
