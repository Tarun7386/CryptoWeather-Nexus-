import { notFound } from "next/navigation";
import CryptoDetails from "@/components/crypto/CryptoDetails";

export default function CryptoPage({ params }: { params: { id?: string } }) {
  if (!params?.id) return notFound(); // ✅ Ensure `params.id` exists

  return <CryptoDetails cryptoId={params.id} />;
}



