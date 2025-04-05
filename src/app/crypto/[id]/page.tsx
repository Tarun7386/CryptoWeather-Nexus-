// import { notFound } from "next/navigation";
// import CryptoDetails from "@/components/crypto/CryptoDetails";

// export default function CryptoPage({ params }: { params: { id?: string } }) {
//   if (!params?.id) return notFound(); // ✅ Ensure `params.id` exists

//   return <CryptoDetails cryptoId={params.id} />;
// }




import { notFound } from "next/navigation";
import { Metadata } from "next";
import cryptoApi from "@/lib/cryptoApi";
import CryptoDetails from "@/components/crypto/CryptoDetails";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const coinId = decodeURIComponent(resolvedParams.id);
  
  try {
    const details = await cryptoApi.getCryptoDetails(coinId);
    return {
      title: `${details.name} (${details.symbol.toUpperCase()}) Price | CryptoWeather`,
      description: `Live ${details.name} price, market cap, volume, and market statistics`,
      openGraph: {
        title: `${details.name} Price Chart and Market Data`,
        description: `Live ${details.name} cryptocurrency price, market cap, volume, and detailed statistics`,
        images: [{ url: details.image.large }],
      },
    };
  } catch {
    return {
      title: 'Cryptocurrency Details | CryptoWeather',
      description: 'Live cryptocurrency price and market data',
    };
  }
}

export default async function CryptoPage({ params }: PageProps) {
  const resolvedParams = await params;
  
  if (!resolvedParams?.id) {
    notFound();
  }

  const coinId = decodeURIComponent(resolvedParams.id);
  const details = await cryptoApi.getCryptoDetails(coinId);

  if (!details) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CryptoDetails cryptoId={coinId} />
    </div>
  );
}

// Static params for common cryptocurrencies
export function generateStaticParams() {
  return [
    { id: 'bitcoin' },
    { id: 'ethereum' },
    { id: 'solana' },
  ];
}