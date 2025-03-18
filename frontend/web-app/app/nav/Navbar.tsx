
import Logo from './Logo';
import Search from './Search';
import LoginButton from './LogInButton';
import { getCurrentUser } from '../actions/authActions';
import UserActions from './UserAuctions';

export default async function Navbar() {
  const user = await getCurrentUser();
  return (
    <header className='sticky top-0 z-50 flex justify-between bg-white shadow-md py-5 px-5 items-center text-gray-800'>
      <Logo/>
      <Search/>
      {user ? <UserActions/> : <LoginButton/>}
    </header>
  )
}
