import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import {
  Masthead,
  MastheadBrand,
  MastheadContent,
  MastheadLogo,
  MastheadMain,
  Nav,
  NavItem,
  NavList,
  Page,
  SkipToContent,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from '@patternfly/react-core'
import styles from './AppLayout.module.css'

export function AppLayout() {
  const { pathname } = useLocation()
  const previousPath = useRef(pathname)

  useEffect(() => {
    const main = document.getElementById('main-content')
    const title = main?.querySelector('h1')?.textContent ?? 'Experiment'
    document.title = `${title} | PatternFly playground`

    if (previousPath.current !== pathname) {
      main?.focus()
      main?.scrollTo(0, 0)
      previousPath.current = pathname
    }
  }, [pathname])

  return (
    <Page
      className={styles.page}
      mainContainerId="main-content"
      mainAriaLabel="Playground content"
      skipToContent={
        <SkipToContent
          href="#main-content"
          onClick={(event) => {
            event.preventDefault()
            document.getElementById('main-content')?.focus()
          }}
        >
          Skip to content
        </SkipToContent>
      }
      masthead={
        <Masthead display={{ default: 'stack', md: 'inline' }}>
          <MastheadMain>
            <MastheadBrand>
              <MastheadLogo href="#/" className={styles.brand}>
                PatternFly playground
              </MastheadLogo>
            </MastheadBrand>
          </MastheadMain>
          <MastheadContent>
            <Toolbar>
              <ToolbarContent>
                <ToolbarItem>
                  <Nav variant="horizontal" aria-label="Main navigation">
                    <NavList>
                      <NavItem
                        to="#/"
                        isActive={pathname === '/' || pathname.startsWith('/experiments/')}
                      >
                        Experiments
                      </NavItem>
                      <NavItem to="#/about" isActive={pathname === '/about'}>
                        About
                      </NavItem>
                    </NavList>
                  </Nav>
                </ToolbarItem>
              </ToolbarContent>
            </Toolbar>
          </MastheadContent>
        </Masthead>
      }
    >
      <Outlet />
    </Page>
  )
}
