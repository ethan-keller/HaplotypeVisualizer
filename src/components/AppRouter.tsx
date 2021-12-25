import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NotFoundView from './views/NotFoundView';
import PhenoView, { url as urlPheno } from './views/PhenoView';
import PhenoCompareView, { url as urlPhenoCompare } from './views/PhenoCompareView';
import PopulationView, { url as urlPopulation } from './views/PopulationView';
import TrioView, { url as urlTrio } from './views/TrioView';
import WelcomeView, { url as urlWelcome } from './views/WelcomeView';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* {TODO: change 'false' to a variable that checks if the required files are uploaded} */}
        <Route
          path='/'
          element={
            false ? <Navigate replace to={urlPopulation} /> : <Navigate replace to={urlWelcome} />
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
