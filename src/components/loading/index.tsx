import { NextPage } from 'next';

import Styles from '@/components/loading/style';

const Loading: NextPage = () => (
  <Styles.Container>
    <div id="clock" aria-label="Loading">
      <div id="hour-hand" />
      <div id="minute-hand" />
    </div>
  </Styles.Container>
);

export default Loading;
