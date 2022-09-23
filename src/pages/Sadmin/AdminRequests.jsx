import React from "react";
import CommonHeader from "./../../components/ui/CommonHeader/CommonHeader";
import RequestList from "../../components/ui/RequestList/RequestList";

function AdminRequests() {
  return (
    <div>
      <CommonHeader title={"Admin Details Change Requests"} />
      <RequestList />
    </div>
  );
}

export default AdminRequests;
