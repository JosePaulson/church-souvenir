import { Outlet, ScrollRestoration } from 'react-router-dom'
import { useCallback, useState } from 'react'
import Header from './components/Header'
import SideDrawer from './components/SideDrawer'

const App = () => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = useCallback(() => {
    setVisible(visible => !visible);
  }, []);

  return (
    <>
      <Header toggleVisible={toggleVisible} />
      <SideDrawer visible={visible} toggleVisible={toggleVisible} />
      <main className='mx-auto max-w-[1300px] px-6 mt-[70px]'>
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  )
}

export default App