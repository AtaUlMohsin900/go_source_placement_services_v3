import PageBreadcrumb from "@/components/PageBreadcrumb";
import { Metadata } from "next";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import ApplicantStageMix from "./components/ApplicantStageMix";
import { statData } from "./components/data";
import ProgramOverview from "./components/ProgramOverview";
import ServiceStats from "./components/ServiceStats";
import VisaCaseRegister from "./components/VisaCaseRegister";
import VisaProcessing from "./components/VisaProcessing";
import VisaStatusBreakdown from "./components/VisaStatusBreakdown";

export const metadata: Metadata = { title: "Visa Services Dashboard" };

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Visa Operations" subtitle="Dashboard" />

      <Row className="row-cols-xxl-4 row-cols-md-2 row-cols-1">
        {statData.map((item) => (
          <Col key={item.title}>
            <ServiceStats item={item} />
          </Col>
        ))}
      </Row>

      <Row>
        <Col xs={12}>
          <Card>
            <CardBody className="p-0">
              <Row className="g-0">
                <Col xxl={3} xl={6} className="order-xl-1 order-xxl-0">
                  <VisaStatusBreakdown />
                  <hr className="d-xxl-none border-light m-0" />
                </Col>

                <Col xxl={9} className="order-xl-3 order-xxl-1">
                  <VisaProcessing />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="align-items-stretch">
        <Col xxl={5} className="d-flex">
          <div className="d-flex flex-column gap-3 w-100 h-100">
            <ProgramOverview />
            <ApplicantStageMix />
          </div>
        </Col>
        <Col xxl={7} className="d-flex">
          <VisaCaseRegister />
        </Col>
      </Row>
    </>
  );
};

export default Page;
