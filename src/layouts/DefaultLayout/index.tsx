import { Outlet } from 'react-router-dom'
import { Sidebar } from '../../components/Sidebar'

import { LayoutContainer } from './styles'
import { useState } from 'react';

export function DefaultLayout() {
  const [menuShown, setMenuShown] = useState(false);

  return (
    <LayoutContainer
      menuShown={menuShown}
    >
      <Sidebar
        menuShown={menuShown}
        onMenuShown={setMenuShown}
      />
      <Outlet />
    </LayoutContainer>
  )
}
