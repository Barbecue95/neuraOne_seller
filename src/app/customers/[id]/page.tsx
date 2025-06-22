import CustomerDetailsPage from "@/components/Customer/CustomerDetail"

interface CustomerDetailPageProps {
  params: {
    id: string
  }
}

export default function CustomerDetailPage({ params }: CustomerDetailPageProps) {
  return <CustomerDetailsPage customerId={params.id} />
}
