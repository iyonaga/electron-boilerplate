import * as React from 'react';
import styles from './Hello.scss';

const Hello = () => (
  <>
    <h1 className={styles.heading}>Hello World!</h1>
    <p>
      We are using Node.js {process.versions.node}, Chromium{' '}
      {process.versions.chrome}, and Electron {process.versions.electron}.
    </p>
  </>
);

export default Hello;
