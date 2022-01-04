import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NotFoundView from './components/views/NotFoundView';
import PhenoView, { url as urlPheno } from './components/views/PhenoView';
import PhenoCompareView, { url as urlPhenoCompare } from './components/views/PhenoCompareView';
import PopulationView, { url as urlPopulation } from './components/popuview/PopulationView';
import TrioView, { url as urlTrio } from './components/views/TrioView';
import WelcomeView, { url as urlWelcome } from './components/welcome/WelcomeView';

const AppRouter: React.FC = () => {
  // TODO: ask server if files are ready
  const isReady = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            isReady ? <Navigate replace to={urlPopulation} /> : <Navigate replace to={urlWelcome} />
          }
        />
        <Route element={<WelcomeView />} path={urlWelcome} />
        <Route element={<PopulationView />} path={urlPopulation} />
        <Route element={<PhenoView />} path={urlPheno} />
        <Route element={<PhenoCompareView />} path={urlPhenoCompare} />
        <Route element={<TrioView />} path={urlTrio} />
        <Route element={<NotFoundView />} path='*' />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
