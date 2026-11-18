import Link from 'next/link'
import Icon from '@/components/wrappers/Icon'

const AuthLogo = () => {
  return (
    <>
      <Link href="/dashboard/gosource" className="logo-dark">
        <span className="d-inline-flex align-items-center gap-2 text-body">
          <span className="avatar avatar-sm"><span className="avatar-title rounded-circle bg-primary text-white"><Icon icon="briefcase-business" /></span></span>
          <span className="fw-bold fs-4">GoSource <small className="fs-xs fw-normal text-muted">Visa Services</small></span>
        </span>
      </Link>
      <Link href="/dashboard/gosource" className="logo-light">
        <span className="d-inline-flex align-items-center gap-2 text-white">
          <span className="avatar avatar-sm"><span className="avatar-title rounded-circle bg-primary"><Icon icon="briefcase-business" /></span></span>
          <span className="fw-bold fs-4">GoSource <small className="fs-xs fw-normal">Visa Services</small></span>
        </span>
      </Link>
    </>
  )
}

export default AuthLogo
