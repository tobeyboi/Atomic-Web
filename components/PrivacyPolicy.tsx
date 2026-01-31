import React from 'react';

export const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen bg-offWhite">
            {/* Header */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 md:px-12 bg-offWhite/80 backdrop-blur-md border-b border-themeBase/10">
                <a href="/" className="text-2xl font-serif italic text-charcoal tracking-wide hover:text-themeBase transition-colors">
                    Atomic.
                </a>
                <a
                    href="/"
                    className="text-sm font-sans tracking-widest text-charcoal/60 uppercase hover:text-themeBase transition-colors"
                >
                    ← Back to Home
                </a>
            </nav>

            {/* Content */}
            <main className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
                {/* Title Section */}
                <div className="text-center mb-16 space-y-6">
                    <h2 className="text-sm uppercase tracking-[0.4em] text-themeBase/60 font-sans">Legal</h2>
                    <h1 className="text-5xl md:text-6xl font-serif italic text-charcoal leading-tight">
                        Privacy Policy
                    </h1>
                    <p className="text-charcoal/50 font-sans text-sm">
                        Last updated: January 31, 2026
                    </p>
                    <div className="h-px w-20 bg-sage/30 mx-auto"></div>
                </div>

                {/* Introduction */}
                <section className="mb-16 space-y-6">
                    <blockquote className="font-serif text-xl md:text-2xl text-charcoal/70 leading-relaxed italic border-l-2 border-themeBase/30 pl-6">
                        "Your journey of growth is personal. We honor that by protecting your privacy with the same care you bring to your daily practice."
                    </blockquote>
                </section>

                {/* Policy Sections */}
                <div className="space-y-12 font-sans text-charcoal/80 leading-relaxed">

                    {/* Section 1 */}
                    <section className="space-y-4">
                        <h3 className="text-2xl font-serif italic text-charcoal">1. Our Philosophy on Privacy</h3>
                        <p>
                            At Atomic, we believe that mindful living extends to how we handle your data. Just as the Wabi-Sabi philosophy teaches us to find beauty in simplicity, we keep our data practices simple, transparent, and purposeful.
                        </p>
                        <p>
                            We collect only what's necessary to support your habit journey, and we never sell your personal information to third parties.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section className="space-y-4">
                        <h3 className="text-2xl font-serif italic text-charcoal">2. Information We Collect</h3>
                        <p>To help you build meaningful habits, we may collect:</p>
                        <div className="bg-white rounded-2xl p-6 border border-charcoal/5 space-y-3">
                            <div className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-themeBase mt-2 flex-shrink-0"></span>
                                <div>
                                    <span className="font-medium text-charcoal">Account Information</span>
                                    <span className="text-charcoal/60"> — Email address and profile details you choose to provide</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-themeBase mt-2 flex-shrink-0"></span>
                                <div>
                                    <span className="font-medium text-charcoal">Habit Data</span>
                                    <span className="text-charcoal/60"> — Your habits, completions, streaks, and growth profile</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-themeBase mt-2 flex-shrink-0"></span>
                                <div>
                                    <span className="font-medium text-charcoal">Journal Entries</span>
                                    <span className="text-charcoal/60"> — Reflections and notes you create within the app</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-themeBase mt-2 flex-shrink-0"></span>
                                <div>
                                    <span className="font-medium text-charcoal">Usage Analytics</span>
                                    <span className="text-charcoal/60"> — Anonymous data to improve app performance</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className="space-y-4">
                        <h3 className="text-2xl font-serif italic text-charcoal">3. How We Use Your Data</h3>
                        <p>Your information helps us:</p>
                        <ul className="space-y-2 ml-4">
                            <li className="flex items-center gap-3">
                                <span className="text-themeBase">✦</span>
                                Personalize your habit recommendations and Anchor suggestions
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-themeBase">✦</span>
                                Track your progress across the six growth pillars
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-themeBase">✦</span>
                                Sync your data securely across your devices
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-themeBase">✦</span>
                                Send gentle reminders to support your daily practice (if enabled)
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-themeBase">✦</span>
                                Improve the Atomic experience through anonymous analytics
                            </li>
                        </ul>
                    </section>

                    {/* Section 4 */}
                    <section className="space-y-4">
                        <h3 className="text-2xl font-serif italic text-charcoal">4. Data Security</h3>
                        <p>
                            We implement industry-standard security measures to protect your personal information. Your data is encrypted both in transit and at rest. We use Firebase, a Google Cloud service, to securely store and manage your information.
                        </p>
                        <div className="bg-sage/10 rounded-2xl p-6 border border-sage/20">
                            <p className="text-charcoal/70 italic">
                                "Like a well-tended garden, we nurture and protect what you entrust to us."
                            </p>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section className="space-y-4">
                        <h3 className="text-2xl font-serif italic text-charcoal">5. Third-Party Services</h3>
                        <p>Atomic integrates with trusted third-party services:</p>
                        <ul className="space-y-2 ml-4">
                            <li className="flex items-center gap-3">
                                <span className="text-themeBase">✦</span>
                                <strong>Firebase</strong> — For authentication and data storage
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-themeBase">✦</span>
                                <strong>Google/Apple Sign-In</strong> — For secure authentication options
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-themeBase">✦</span>
                                <strong>AI Services</strong> — To power personalized habit suggestions (data is not stored by AI providers)
                            </li>
                        </ul>
                        <p className="text-charcoal/60 text-sm">
                            Each third-party service has its own privacy policy, which we encourage you to review.
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section className="space-y-4">
                        <h3 className="text-2xl font-serif italic text-charcoal">6. Your Rights</h3>
                        <p>You have full control over your data:</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white rounded-2xl p-5 border border-charcoal/5">
                                <h4 className="font-serif text-lg text-charcoal mb-2">Access</h4>
                                <p className="text-sm text-charcoal/60">Request a copy of all data we have about you</p>
                            </div>
                            <div className="bg-white rounded-2xl p-5 border border-charcoal/5">
                                <h4 className="font-serif text-lg text-charcoal mb-2">Correction</h4>
                                <p className="text-sm text-charcoal/60">Update or correct any inaccurate information</p>
                            </div>
                            <div className="bg-white rounded-2xl p-5 border border-charcoal/5">
                                <h4 className="font-serif text-lg text-charcoal mb-2">Deletion</h4>
                                <p className="text-sm text-charcoal/60">Request complete deletion of your account and data</p>
                            </div>
                            <div className="bg-white rounded-2xl p-5 border border-charcoal/5">
                                <h4 className="font-serif text-lg text-charcoal mb-2">Export</h4>
                                <p className="text-sm text-charcoal/60">Download your habit data in a portable format</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 7 */}
                    <section className="space-y-4">
                        <h3 className="text-2xl font-serif italic text-charcoal">7. Children's Privacy</h3>
                        <p>
                            Atomic is not intended for children under 13 years of age. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.
                        </p>
                    </section>

                    {/* Section 8 */}
                    <section className="space-y-4">
                        <h3 className="text-2xl font-serif italic text-charcoal">8. Changes to This Policy</h3>
                        <p>
                            We may update this privacy policy from time to time. When we make significant changes, we will notify you through the app or via email. We encourage you to review this policy periodically.
                        </p>
                    </section>

                    {/* Contact Section */}
                    <section className="space-y-4 pt-8 border-t border-charcoal/10">
                        <h3 className="text-2xl font-serif italic text-charcoal">Contact Us</h3>
                        <p>
                            If you have any questions about this Privacy Policy or how we handle your data, we'd love to hear from you:
                        </p>
                        <div className="bg-white rounded-2xl p-6 border border-charcoal/5">
                            <p className="text-charcoal">
                                <span className="text-charcoal/50">Email:</span>{' '}
                                <a href="mailto:privacy@atomicapp.com" className="text-themeBase hover:underline">
                                    privacy@atomicapp.com
                                </a>
                            </p>
                        </div>
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-charcoal text-offWhite py-12 px-6 text-center">
                <div className="text-2xl font-serif italic tracking-wider mb-4">Atomic.</div>
                <p className="text-xs text-offWhite/40">
                    © {new Date().getFullYear()} Atomic App. All rights reserved.
                </p>
            </footer>
        </div>
    );
};
