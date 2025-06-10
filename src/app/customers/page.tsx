import { ComingSoon } from "@/components/comingsoon";
import AddCustomerModal from "@/components/Customer/CreateCustomer/create-customer-modal";
import CustomerList from "@/components/Customer/CustomerListing";

export default function CustomerPage() {
  return (
    <div className="container mx-auto p-6">
      {/* <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Customers</h1>
        <AddCustomerModal />
      </div> */}

      <CustomerList />
    </div>
  );
}
