import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFoundView from './components/NotFoundView';
import PhenoTableView, { url as urlPhenoTable } from './views/PhenoTableView';
import PhenoGraphView, { url as urlPhenoGraph } from './views/PhenoGraphView';
import PopulationView, { url as urlPopulation } from './views/PopulationView';
import TrioView, { url as urlTrio } from './components/TrioView';
import WelcomeView, { url as urlWelcome } from './views/WelcomeView';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<WelcomeView />} path='/' />
        <Route element={<WelcomeView />} path={urlWelcome} />
        <Route element={<PopulationView />} path={urlPopulation} />
        <Route element={<PhenoTableView />} path={urlPhenoTable} />
        <Route element={<PhenoGraphView />} path={urlPhenoGraph} />
        <Route element={<TrioView />} path={urlTrio} />
        <Route element={<NotFoundView />} path='*' />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
