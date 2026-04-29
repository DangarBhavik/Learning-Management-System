import { RiLoader4Fill } from 'react-icons/ri';

const Pending = ({ classes = '' }: { classes?: string }) => {
  return <RiLoader4Fill className={`animate-spin ${classes}`} />;
};

export default Pending;
