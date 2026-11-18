import Icon from "@/components/wrappers/Icon";
import {
  Dropdown as DropdownButton,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";

const VisaOperationsMenu = () => {
  return (
    <div id="visa-operations-menu" className="topbar-item">
      <DropdownButton>
        <DropdownToggle className="topbar-link btn shadow-none btn-link drop-arrow-none">
          Visa Operations <Icon icon="chevron-down" className="ms-1" />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href="/dashboard/gosource#visa-case-register">
            <Icon icon="files" className="me-1 fs-lg align-middle" />
            <span className="align-middle">Applicant Register</span>
          </DropdownItem>
          <DropdownItem href="/dashboard/gosource#program-overview">
            <Icon
              icon="briefcase-business"
              className="me-1 fs-lg align-middle"
            />
            <span className="align-middle">Program Overview</span>
          </DropdownItem>
          <DropdownItem href="/dashboard/gosource#visa-processing">
            <Icon icon="plane" className="me-1 fs-lg align-middle" />
            <span className="align-middle">Deployment Schedule</span>
          </DropdownItem>
        </DropdownMenu>
      </DropdownButton>
    </div>
  );
};

export default VisaOperationsMenu;
