import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12">
      <Loader2 className="animate-spin text-primary" size={32} />
    </div>
  );
}
