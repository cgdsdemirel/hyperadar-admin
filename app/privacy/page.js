export const metadata = {
  title:       'Privacy Policy — HypeRadar',
  description: 'Privacy policy for the HypeRadar mobile application.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-14">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="mt-2 text-sm text-gray-500">Last updated: April 2026</p>
        </div>

        <div className="space-y-8 text-gray-700 leading-7">

          {/* 1. Introduction */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Introduction</h2>
            <p>
              Welcome to <strong>HypeRadar</strong>. We are committed to protecting your personal
              information and your right to privacy. This policy explains what data we collect,
              how we use it, and your rights regarding that data.
            </p>
          </section>

          {/* 2. Data We Collect */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">2. Data We Collect</h2>
            <p>We collect the following data when you use HypeRadar:</p>
            <ul className="mt-3 list-disc list-inside space-y-1">
              <li>
                <strong>Email address</strong> — used to create and manage your account.
              </li>
              <li>
                <strong>Usage data</strong> — screens visited, features used, session duration,
                and crash reports, collected to improve app performance.
              </li>
              <li>
                <strong>Trend queries</strong> — the regions and categories you select when
                running queries, stored to provide your query history and improve recommendations.
              </li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong> collect your name, phone number, precise location, or
              any payment card details.
            </p>
          </section>

          {/* 3. How We Use Your Data */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">3. How We Use Your Data</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>To provide and maintain the HypeRadar service.</li>
              <li>To authenticate your account and enforce plan limits.</li>
              <li>To display relevant trend results based on your query history.</li>
              <li>To send transactional emails (e.g. account confirmation).</li>
              <li>To diagnose technical issues and improve app stability.</li>
            </ul>
          </section>

          {/* 4. Data Sharing */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">4. Data Sharing</h2>
            <p>
              We do <strong>not</strong> sell, rent, or trade your personal data to third parties.
              Data is shared only with the service providers listed below, solely to operate
              HypeRadar on your behalf.
            </p>
          </section>

          {/* 5. Third-Party Services */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">5. Third-Party Services</h2>

            <div className="space-y-4">
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-5 py-4">
                <p className="font-medium text-gray-900">Google AdMob</p>
                <p className="mt-1 text-sm">
                  HypeRadar uses Google AdMob to display ads to free-plan users. AdMob may
                  collect device identifiers and usage data to serve personalised advertisements.
                  You can review Google&apos;s data practices at{' '}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 underline hover:text-indigo-800"
                  >
                    policies.google.com/privacy
                  </a>
                  .
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 px-5 py-4">
                <p className="font-medium text-gray-900">RevenueCat</p>
                <p className="mt-1 text-sm">
                  HypeRadar uses RevenueCat to manage in-app purchases and subscription status.
                  RevenueCat receives your app user ID and purchase receipts to verify your
                  plan. No payment card data passes through RevenueCat — all billing is handled
                  directly by the App Store or Google Play.
                </p>
              </div>
            </div>
          </section>

          {/* 6. Data Retention */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">6. Data Retention</h2>
            <p>
              We retain your account data for as long as your account is active. If you delete
              your account, your personal data is removed within 30 days. Anonymised aggregate
              statistics may be retained indefinitely.
            </p>
          </section>

          {/* 7. Security */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">7. Security</h2>
            <p>
              All data in transit is encrypted via HTTPS/TLS. Passwords are never stored in
              plain text. While we take reasonable precautions, no internet transmission is
              100% secure.
            </p>
          </section>

          {/* 8. Children's Privacy */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">8. Children&apos;s Privacy</h2>
            <p>
              HypeRadar is not directed at children under 13. We do not knowingly collect
              personal data from children. If you believe a child has provided us with data,
              please contact us and we will delete it promptly.
            </p>
          </section>

          {/* 9. Your Rights */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">9. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your account and associated data.</li>
              <li>Opt out of personalised advertising (via your device settings).</li>
            </ul>
          </section>

          {/* 10. Changes */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">10. Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. When we do, we will update the
              &ldquo;Last updated&rdquo; date at the top of this page. Continued use of HypeRadar
              after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* 11. Contact */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">11. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or your data, please contact
              us at{' '}
              <a
                href="mailto:privacy@hyperadar.app"
                className="text-indigo-600 underline hover:text-indigo-800"
              >
                privacy@hyperadar.app
              </a>
              .
            </p>
          </section>

        </div>

        {/* Footer */}
        <div className="mt-14 border-t border-gray-200 pt-6 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} HypeRadar. All rights reserved.
        </div>

      </div>
    </main>
  );
}
