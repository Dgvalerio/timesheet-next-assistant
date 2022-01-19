import type { NextPage } from 'next';

import useHomeController from './controller';
import Styles from './style';

const Home: NextPage = () => {
  const { entered, setEntered } = useHomeController();

  return (
    <Styles.Container>
      <h1>To Timesheet</h1>
      <input
        type="text"
        value={entered}
        onChange={({ target: { value } }) => setEntered(value)}
      />
    </Styles.Container>
  );
};

export default Home;