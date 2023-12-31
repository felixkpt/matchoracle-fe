import Admin from '@/Pages/Admin/Index';
import settings from './settings';
import posts from './posts';
import continents from './continents';
import countries from './countries';
import competitions from './competitions';
import seasons from './seasons';
import predictions from './predictions';
import matches from './matches';
import teams from './teams';
import AuthenticatedLayout from '@/Layouts/Authenicated/AuthenticatedLayout';
import Error404 from '@/Pages/ErrorPages/Error404';

const adminRoutes = [
  {
    path: '',
    element: <AuthenticatedLayout uri='admin' permission={null} Component={Admin} />,
  },
  {
    path: 'posts',
    children: posts,
  },
  {
    path: 'competitions',
    children: competitions,
  },
  {
    path: 'continents',
    children: continents,
  },
  {
    path: 'countries',
    children: countries,
  },
  {
    path: 'matches',
    children: matches,
  },
  {
    path: 'teams',
    children: teams,
  },
  {
    path: 'predictions',
    children: predictions,
  },
  {
    path: 'seasons',
    children: seasons,
  },
  {
    path: 'settings',
    children: settings,
  },
  {
    path: '*',
    element: <AuthenticatedLayout uri='error-404' permission={null} Component={Error404} />,
  },
];

export default adminRoutes;
