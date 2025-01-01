type Props = {
  children: React.ReactNode;
};
const Container: React.FC<Props> = ({ children }) => {
  return (
    <div className="rounded-md shadow-xl bg-white p-2 h-full">{children}</div>
  );
};
export default Container;
