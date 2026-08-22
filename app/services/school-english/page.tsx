import type { Metadata } from "next"
import { ServiceDetail } from "@/components/marketing/ServiceDetail"
import { getService } from "@/lib/services-content"

const service = getService("school-english")!

export const metadata: Metadata = {
  title: `${service.navTitle} | Aulawell English Tuition`,
  description: service.intro,
}

export default function Page() {
  return <ServiceDetail service={service} />
}
