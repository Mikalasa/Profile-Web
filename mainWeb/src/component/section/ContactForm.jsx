import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';

const ContactForm = () => {
    const formRef = useRef();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null

    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true);

        emailjs.sendForm(
            process.env.REACT_APP_EMAILJS_SERVICE_ID,
            process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
            formRef.current,
            process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        ).then(() => {
            setStatus('success');
            formRef.current.reset();
        }).catch(() => {
            setStatus('error');
        }).finally(() => {
            setLoading(false);
        });
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
            <h2 className="text-2xl font-semibold text-center mb-4">Contact Me</h2>

            {status === 'success' && (
                <div className="bg-green-100 text-green-700 px-4 py-2 mb-4 rounded text-sm">
                    ✅ Your message has been sent successfully!
                </div>
            )}
            {status === 'error' && (
                <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded text-sm">
                    ❌ Something went wrong. Please try again.
                </div>
            )}

            <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="p-2 border rounded"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="p-2 border rounded"
                />
                <textarea
                    name="message"
                    placeholder="Your Message"
                    required
                    className="p-2 border rounded h-32"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className={`bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {loading ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
