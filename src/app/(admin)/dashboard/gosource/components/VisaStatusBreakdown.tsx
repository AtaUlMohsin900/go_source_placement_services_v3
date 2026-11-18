"use client";

import ChartJs from "@/components/wrappers/ChartJs";
import { ArcElement, DoughnutController, PointElement } from "chart.js";
import { visaStageCounts, visaStatusChart } from "./data";

const VisaStatusBreakdown = () => {
  return (
    <div id="visa-status-breakdown" className="p-3 border-end border-dashed">
      <h4 className="card-title mb-0">Application Pipeline</h4>
      <p className="text-muted fs-xs">
        {visaStageCounts["Visa / travel"]} applicants have a stamped visa or
        ticket status.
      </p>

      <div className="row mt-4">
        <div className="col-lg-12">
          <ChartJs
            type="doughnut"
            getOptions={visaStatusChart}
            plugins={[DoughnutController, PointElement, ArcElement]}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default VisaStatusBreakdown;
