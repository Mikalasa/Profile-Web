import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';

const ContactForm = () => {
    const formRef = useRef();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null

    // ✅ 添加时间字符串（例如：2025/07/05 20:23:41）
    const currentTime = new Date().toLocaleString('en-NZ', {
        timeZone: 'Pacific/Auckland',
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

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
        <div className="w-full max-w-2xl mx-auto px-6 py-10 bg-[#1e1e1e] bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg">
            {status === 'success' && (
                <div className="bg-green-600 bg-opacity-20 text-green-400 px-4 py-2 mb-4 rounded text-sm text-center">
                    ✅ Your message has been sent successfully!
                </div>
            )}
            {status === 'error' && (
                <div className="bg-red-600 bg-opacity-20 text-red-400 px-4 py-2 mb-4 rounded text-sm text-center">
                    ❌ Something went wrong. Please try again.
                </div>
            )}

            <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="bg-[#2a2a2a] text-white placeholder-gray-400 p-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="bg-[#2a2a2a] text-white placeholder-gray-400 p-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    name="message"
                    placeholder="Your Message"
                    required
                    className="bg-[#2a2a2a] text-white placeholder-gray-400 p-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                />

                {/* ✅ 隐藏字段：自动生成时间 */}
                <input type="hidden" name="time" value={currentTime} />

                <button
                    type="submit"
                    disabled={loading}
                    className={`text-white font-semibold py-3 rounded-md bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition ${
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
