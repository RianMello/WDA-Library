interface InputProps {
  type: string;
}
export const Input = ({ type }: InputProps) => {
  return <input type={type} />;
};
