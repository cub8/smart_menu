"use client";

interface LoadingErrorProps {
  loading: boolean;
  error: string | null;
}

export default function LoadingError({ loading, error }: LoadingErrorProps) {
  if (loading) {
    return <p className="text-sm text-gray-600">Ładowanie preferencji...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  return null;
}
