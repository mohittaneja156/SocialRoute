import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-24 px-6 max-w-3xl mx-auto">
      <h1 className="font-display text-3xl font-bold text-light mb-8">Privacy Policy</h1>
      <p className="text-muted leading-relaxed mb-6">
        Social Route respects your privacy. This page will be updated with our full privacy policy.
      </p>
      <Link href="/" className="text-accent hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
}
