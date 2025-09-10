function The808Page({ platform, handle808Page }) {
    const platformImageMap = {
        twitter: "https://cdn.simpleicons.org/x/000000",
        bilibili: "https://cdn.simpleicons.org/bilibili/00A1D6",
        youtube: "https://cdn.simpleicons.org/youtube/FF0000",
    };

    const platformImage = platformImageMap[platform] || "https://via.placeholder.com/150";

    const bottomIcons = [
        { url: "https://github.com/Mikalasa", img: "https://cdn.simpleicons.org/github/ffffff" },
        { url: "https://medium.com/@xingyi-posts", img: "https://cdn.simpleicons.org/medium/ffffff" },
        { url: "https://www.behance.net/xingyixxx", img: "https://cdn.simpleicons.org/behance/1769FF" },
        { url: "https://mikalasa.github.io/my-blog/", img: `${process.env.PUBLIC_URL}/blog-1.png` },
    ];

    return (
        <div
            className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-opacity-70 z-50"
            style={{ backgroundColor: "rgba(20, 20, 20, 0.9)" }}
        >
            {/* Card */}
            <div className="relative bg-[#2a2a2a] text-center rounded-2xl p-8 shadow-xl w-full max-w-lg">
                {/* Close Button */}
                <button
                    onClick={() => handle808Page("")}
                    className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-red-500 hover:scale-110 transition duration-300"
                >
                    ✖
                </button>

                {/* Error Code */}
                <h1 className="text-[144px] font-extrabold text-gray-100 leading-none mb-4">
                    808
                </h1>
                <p className="text-lg font-medium text-gray-400 mb-4">Uh-oh! Something went wrong.</p>

                {/* Platform Content */}
                <div className="flex flex-col items-center mb-8">
                    <img
                        src={platformImage}
                        alt={platform}
                        className="w-24 h-24 object-cover rounded-10 shadow-lg mb-4"
                    />
                    <p className="text-gray-300 text-base">
                        My <span className="font-bold text-yellow-400">{platform}</span> channel is coming soon 🎉
                    </p>
                </div>

                {/* Other Platforms */}
                <p className="text-gray-400 text-sm mb-4">
                    Meanwhile, you can check out my other platforms:
                </p>
                <div className="flex justify-center gap-6">
                    {bottomIcons.map((icon, index) => (
                        <a
                            key={index}
                            href={icon.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-transform transform hover:scale-110"
                        >
                            <div className="bg-[#3b3b3b] rounded-full p-3 shadow-lg hover:bg-opacity-80 transition duration-300">
                                <img
                                    src={icon.img}
                                    alt={`icon-${index}`}
                                    className="w-10 h-10 object-cover"
                                />
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Fade-in Animation */}
            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .bg-opacity-70 {
                    backdrop-filter: blur(10px);
                }
            `}</style>
        </div>
    );
}

export default The808Page;
