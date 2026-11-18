"use client";

import ChartJs from "@/components/wrappers/ChartJs";
import { Filler, LineController, LineElement, PointElement } from "chart.js";
import { Card, CardBody, CardHeader, CardTitle } from "react-bootstrap";
import { programStagesChart } from "./data";

const ApplicantStageMix = () => {
  return (
    <Card id="applicant-stage-mix" className="mb-0 flex-grow-1">
      <CardHeader className="border-dashed">
        <CardTitle as="h4" className="mb-0">
          Applicant Stage Mix
        </CardTitle>
        <p className="text-muted fs-xs mb-0 mt-1">
          Current visa stages across each program.
        </p>
      </CardHeader>
      <CardBody className="pt-0">
        <ChartJs
          type="line"
          height={220}
          getOptions={programStagesChart}
          plugins={[LineController, LineElement, PointElement, Filler]}
        />
      </CardBody>
    </Card>
  );
};

export default ApplicantStageMix;
