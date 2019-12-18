import React from 'react';
import { render } from 'react-dom';

import './index.scss';

import Application from './components/Application';
import PostsProviders from './providers/PostProvider';

render(
  <PostsProviders>
      <Application />
  </PostsProviders>,
  document.getElementById('root')
);
