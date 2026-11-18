import Link from 'next/link'
import Icon from '@/components/wrappers/Icon'

const AppLogo = () => {
  return (
    <Link href="/dashboard/gosource" className="logo" aria-label="GoSource Visa Services dashboard">
      <span className="logo logo-light text-white">
        <span className="logo-lg">
          <span className="d-inline-flex align-items-center gap-2">
            <span className="avatar avatar-sm"><span className="avatar-title rounded-circle bg-primary"><Icon icon="briefcase-business" /></span></span>
            <span className="fw-bold">GoSource</span>
          </span>
        </span>
        <span className="logo-sm">
          <span className="avatar avatar-sm"><span className="avatar-title rounded-circle bg-primary"><Icon icon="briefcase-business" /></span></span>
        </span>
      </span>
      <span className="logo logo-dark text-body">
        <span className="logo-lg">
          <span className="d-inline-flex align-items-center gap-2">
            <span className="avatar avatar-sm"><span className="avatar-title rounded-circle bg-primary text-white"><Icon icon="briefcase-business" /></span></span>
            <span className="fw-bold">GoSource</span>
          </span>
        </span>
        <span className="logo-sm">
          <span className="avatar avatar-sm"><span className="avatar-title rounded-circle bg-primary text-white"><Icon icon="briefcase-business" /></span></span>
        </span>
      </span>
    </Link>
  )
}

export default AppLogo
