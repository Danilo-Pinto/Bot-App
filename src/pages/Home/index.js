import React from 'react';

import BotControll from '../../components/BotControll';
import OrdemControll from '../../components/OrdemControll';
import './styles.css';

function Home() {
  return(
    <div className="Home">
      <BotControll/>
      <OrdemControll/>
    </div>
  );
}

export default Home;