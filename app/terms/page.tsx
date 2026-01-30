import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen py-24 px-6 max-w-3xl mx-auto">
      <h1 className="font-display text-3xl font-bold text-light mb-8">Terms & Conditions</h1>
      <p className="text-muted leading-relaxed mb-6">
        Terms and conditions for using Social Route services. Full terms will be published here.
      </p>
      <Link href="/" className="text-accent hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
}
