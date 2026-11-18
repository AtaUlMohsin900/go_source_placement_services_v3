"use client";

import { Icon as IconifyIcon } from "@iconify/react";
import clsx from "clsx";
import { Card, CardBody } from "react-bootstrap";
import { statData } from "./data";

const ServiceStats = ({ item }: { item: (typeof statData)[number] }) => {
  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between align-items-center">
          <div className="avatar fs-60 avatar-img-size flex-shrink-0">
            <span
              className={clsx(
                "avatar-title rounded-circle fs-24",
                item.className,
              )}
            >
              <IconifyIcon icon={`lucide:${item.icon}`} />
            </span>
          </div>
          <div className="text-end">
            <h3 className="mb-2 fw-normal">{item.value.toLocaleString()}</h3>
            <p className="mb-0 text-muted">{item.title}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ServiceStats;
