import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between">
                <h1 className="text-lg font-bold">Job Match</h1>
                <ul className="flex space-x-4">
                    <li><Link href="/">Home</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
