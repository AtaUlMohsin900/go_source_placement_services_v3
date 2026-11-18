"use client";

import Icon from "@/components/wrappers/Icon";
import { visaStageCounts } from "@/app/(admin)/dashboard/gosource/components/data";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";

const summaries = [
  {
    stage: "Deployed",
    count: visaStageCounts.Deployed,
    icon: "plane",
    color: "success",
  },
  {
    stage: "Visa / travel",
    count: visaStageCounts["Visa / travel"],
    icon: "stamp",
    color: "primary",
  },
  {
    stage: "In progress",
    count: visaStageCounts["In progress"],
    icon: "clipboard-list",
    color: "info",
  },
  {
    stage: "Needs attention",
    count: visaStageCounts["Needs attention"],
    icon: "triangle-alert",
    color: "warning",
  },
];

const VisaNotifications = () => {
  return (
    <div id="visa-status-dropdown" className="topbar-item">
      <Dropdown align="end">
        <DropdownToggle
          className="topbar-link drop-arrow-none"
          as="button"
          aria-label="Visa status summary"
        >
          <span className="topbar-link-icon">
            <Icon icon="bell" />
          </span>
          <span className="badge text-bg-primary badge-circle topbar-badge">
            {summaries.length}
          </span>
        </DropdownToggle>

        <DropdownMenu className="p-0 dropdown-menu-end dropdown-menu-lg">
          <div className="px-3 py-2 border-bottom">
            <h6 className="m-0 fs-md fw-semibold">Visa Status Summary</h6>
          </div>
          {summaries.map((summary) => (
            <DropdownItem
              key={summary.stage}
              href="/dashboard/gosource#visa-case-register"
              className="d-flex align-items-center gap-2 py-2"
            >
              <span
                className={`avatar-xs rounded-circle bg-${summary.color}-subtle text-${summary.color} d-flex align-items-center justify-content-center`}
              >
                <Icon icon={summary.icon} />
              </span>
              <span className="flex-grow-1">{summary.stage}</span>
              <span className="fw-semibold">{summary.count}</span>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default VisaNotifications;
