import SettingsScreen from '../screens/Settings';
import HomeScreen from '../screens/Home';
import StatisticsScreen from '../screens/Statistics';
import Profile from '../screens/Profile';
import SignUp from '../screens/SignUp';
import ImageScreen from '../components/ImageScreen';
import PasswordReset from '../screens/PasswordReset';
import ArtistScreen from '../components/ArtistScreens';
import Upload from '../screens/Upload';
import Login from '../screens/Login';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryView from '../screens/CategoryView';
import AccountTypeScreen from '../screens/AccountType';

export const UserNavigation = [
  {
    name: 'Home',
    component: HomeScreen,
  },
  {
    name: 'Statisctics',
    component: StatisticsScreen,
  },
  {
    name: 'Profile',
    component: Profile,
  },
  {
    name: 'Settings',
    component: SettingsScreen,
  },
  {
    name: 'SignUp',
    component: SignUp,
  },
  {
    name: 'ImageScreen',
    component: ImageScreen,
  },
  {
    name: 'PasswordReset',
    component: PasswordReset,
  },
  {
    name: 'ArtistScreens',
    component: ArtistScreen,
  },
  {
    name: 'Upload',
    component: Upload,
  },
  {
    name: 'Categories',
    component: CategoriesScreen,
  },
  {
    name: 'Category',
    component: CategoryView,
  },
  {
    name: 'AccountType',
    component: AccountTypeScreen,
  },
];

export const GuestNavigation = [
  {
    name: 'Login',
    component: Login,
  },
  {
    name: 'SignUp',
    component: SignUp,
  },
  {
    name: 'PasswordReset',
    component: PasswordReset,
  },
  {
    name: 'AccountType',
    component: AccountTypeScreen,
  },
];
