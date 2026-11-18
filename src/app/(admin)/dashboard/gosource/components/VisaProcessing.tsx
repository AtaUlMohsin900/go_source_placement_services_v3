"use client";

import ChartJs from "@/components/wrappers/ChartJs";
import { BarController, BarElement } from "chart.js";
import { visaMovementChart } from "./data";

const VisaProcessing = () => {
  return (
    <div id="visa-processing" className="px-4 py-3">
      <div className="d-flex justify-content-between mb-3">
        <div>
          <h4 className="card-title mb-1">Deployments &amp; Ticket Dates</h4>
          <p className="text-muted fs-xs mb-0">
            Monthly counts based on dates recorded in the workbook.
          </p>
        </div>
      </div>

      <div dir="ltr">
        <div className="mt-3">
          <ChartJs
            height={330}
            type="bar"
            getOptions={visaMovementChart}
            plugins={[BarController, BarElement]}
          />
        </div>
      </div>
    </div>
  );
};

export default VisaProcessing;
