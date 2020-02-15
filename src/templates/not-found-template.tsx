import React from 'react';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';

const NotFoundTemplate: React.FC = () => {
  const { title, subtitle } = useSiteMetadata();

  return (
    <Layout title={`Not Found - ${title}`} description={subtitle}>
      <Sidebar />
      <Page title="Página no existe">
        <p>Acabas de visitar una ruta que no existe. Momento incómodo.</p>
      </Page>
    </Layout>
  );
};

export default NotFoundTemplate;
