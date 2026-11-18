import useScrollEvent from '@/hooks/useScrollEvent'
import clsx from 'clsx'
import Link from 'next/link'
import { Container } from 'react-bootstrap'
import AppsDropdownGrid from './components/AppsDropdownGrid'

import CustomizerToggler from './components/CustomizerToggler'
import FullscreenToggler from './components/FullscreenToggler'

import LanguageSelectorRounded from './components/LanguageSelectorRounded'

import MegamenuPages from './components/MegamenuPages'
import MenuToggler from './components/MenuToggler'
import MonochromeToggler from './components/MonochromeToggler'

import VisaNotifications from './components/VisaNotifications'
import VisaOperationsMenu from './components/VisaOperationsMenu'

import SearchBoxRoundedRight from './components/SearchBoxRoundedRight'

import SimpleUserDropdown from './components/SimpleUserDropdown'
import ThemeDropdown from './components/ThemeDropdown'

import Icon from '@/components/wrappers/Icon'

const TopBar = () => {
  const { scrollY } = useScrollEvent()
  return (
    <header className={clsx('app-topbar', { 'topbar-active': scrollY > 50 })}>
      <Container fluid className="topbar-menu">
        <div className="d-flex align-items-center gap-2">
          <div className="logo-topbar">
            <Link href="/dashboard/gosource" className="logo-light text-white fw-bold">
              <span className="logo-lg d-inline-flex align-items-center gap-2">
                <Icon icon="briefcase-business" /> GoSource
              </span>
              <span className="logo-sm">
                <Icon icon="briefcase-business" />
              </span>
            </Link>
            <Link href="/dashboard/gosource" className="logo-dark text-body fw-bold">
              <span className="logo-lg d-inline-flex align-items-center gap-2">
                <Icon icon="briefcase-business" /> GoSource
              </span>
              <span className="logo-sm">
                <Icon icon="briefcase-business" />
              </span>
            </Link>
          </div>

          <MenuToggler />

          <VisaOperationsMenu />

          <MegamenuPages />
        </div>
        <div className="d-flex align-items-center gap-2">
          <SearchBoxRoundedRight />

          <ThemeDropdown />

          <AppsDropdownGrid />

          <VisaNotifications />

          <FullscreenToggler />

          <MonochromeToggler />

          <CustomizerToggler />

          <LanguageSelectorRounded />

          <SimpleUserDropdown />
        </div>
      </Container>
    </header>
  )
}

export default TopBar
