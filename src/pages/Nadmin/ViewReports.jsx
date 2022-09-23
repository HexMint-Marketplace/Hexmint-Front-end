import React from "react";
import CommonHeader from "../../components/ui/CommonHeader/CommonHeader";
import ReportList from "../../components/ui/ReportList/ReportList.jsx";

function ViewReports() {
  return (
    <div>
      <CommonHeader title={"View User Reports"} />
      <ReportList />
    </div>
  );
}

export default ViewReports;
