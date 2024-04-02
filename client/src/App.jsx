import { Outlet, ScrollRestoration } from 'react-router-dom'
import { useCallback, useState } from 'react'
import Header from './components/Header'
import SideDrawer from './components/SideDrawer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from './slices/authSlice'

const App = () => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = useCallback(() => {
    setVisible(visible => !visible);
  }, []);

  const { userInfo } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  //clear auth info from localStorage as token expires - 15minutes
  if ('userInfo' in localStorage && userInfo !== null) {
    let expiry = Number(userInfo.authTime) + (15 * 60 * 1000)
    if (Date.now() > expiry) {
      dispatch(setCredentials(null))
    }
  }


  return (
    <>
      <Header toggleVisible={toggleVisible} />
      <SideDrawer visible={visible} toggleVisible={toggleVisible} />
      <main className='mx-auto max-w-[1300px] px-6 mt-[70px]'>
        <Outlet />
      </main>
      <ToastContainer position='top-right' autoClose={5000} theme='dark' toastStyle={{ background: '#000e' }} bodyClassName={'text-gray-400 font-semibold italic'} progressStyle={{ background: 'conic-gradient(at center top, #d8b4fe, #86198f)' }} />
      <ScrollRestoration />
    </>
  )
}

export default App