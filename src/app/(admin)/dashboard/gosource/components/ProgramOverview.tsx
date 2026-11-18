"use client";

import { Card, CardBody, CardHeader, CardTitle, Table } from "react-bootstrap";
import { programSummary, visaCases } from "./data";

const ProgramOverview = () => {
  return (
    <Card id="program-overview" className="mb-0">
      <CardHeader className="border-dashed">
        <CardTitle as="h4" className="mb-0">
          Program Overview
        </CardTitle>
        <p className="text-muted fs-xs mb-0 mt-1">
          {visaCases.length} applicant records imported from the workbook.
        </p>
      </CardHeader>
      <CardBody className="p-0">
        <Table
          responsive
          hover
          className="table table-custom table-centered mb-0"
        >
          <thead className="bg-light bg-opacity-25">
            <tr className="text-uppercase fs-xxs">
              <th>Program</th>
              <th>Applicants</th>
              <th>Deployed</th>
              <th>In progress</th>
              <th>Attention</th>
            </tr>
          </thead>
          <tbody>
            {programSummary.map((program) => (
              <tr key={program.program}>
                <td className="fw-medium">{program.program}</td>
                <td>{program.applicants}</td>
                <td>{program.deployed}</td>
                <td>{program.inProgress}</td>
                <td>{program.needsAttention}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default ProgramOverview;
