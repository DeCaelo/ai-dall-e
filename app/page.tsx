import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h1 className="font-semibold text-7xl text-center">
        AI <span className="text-green-400 font-bold">note talking</span>{' '}
        assistant.
      </h1>
      <div className="mt-4"></div>
      <h2 className="font-semibold text-3xl text-center">
        🚀 Supercharged Productivity.
      </h2>
      <div className="mt-8"></div>

      <div className="flex justify-center">
        <Link href="/dashboard">
          <Button size="xl">
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" strokeWidth={3} />
          </Button>
        </Link>
      </div>
    </div>
  );
}
