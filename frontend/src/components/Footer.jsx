import { Link } from "react-router-dom";

 function Footer() {
    return (
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 w-full">
            <div className="flex flex-col md:flex-row items-start justify-center gap-10 py-10 border-b border-gray-500/30">
                
                <div className="max-w-96">
                    <h1 className="text-xl font-bold">
        <Link to="/home">Ecommerce</Link>
      </h1>
                    <p className="mt-6 text-sm text-gray-500">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                        <a href="#">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            </svg>
                        </a>
                        <a href="#">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            </svg>
                        </a>
                        <a href="#">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            </svg>
                        </a>
                    </div>
                </div>
        
                <div className="w-1/2 flex flex-wrap md:flex-nowrap justify-between">
                    <div>
                        <h2 className="font-semibold text-gray-900 mb-5">RESOURCES</h2>
                        <ul className="text-sm text-gray-500 space-y-2 list-none">
                            <li><a href="#">Documentation</a></li>
                            <li><a href="#">Tutorials</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Community</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-900 mb-5">COMPANY</h2>
                        <div className="text-sm text-gray-500 space-y-2 list-none">
                            <li><a href="#">About</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Privacy</a></li>
                            <li><a href="#">Terms</a></li>
                        </div>
                    </div>
                </div>
        
            </div>
            <p className="py-4 text-center text-xs md:text-sm text-gray-500">
                Copyright 2024 ©  All Right Reserved.
            </p>
        </footer>
    );
};

export default Footer;