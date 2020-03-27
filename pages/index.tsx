import Master from '../components/Master';

const isServer = () => typeof window !== 'undefined';

const Home = () => {
  return <>{isServer() && <Master />}</>;
};

export default Home;
