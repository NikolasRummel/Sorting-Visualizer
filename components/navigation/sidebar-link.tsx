import {LucideIcon} from "lucide-react";
import {usePathname} from "next/navigation";
import Link from "next/link";

interface ActiveLinkProps {
    link: string;
    label: string;
    lucidIcon: LucideIcon;
}

const SidebarLink: React.FC<ActiveLinkProps> = ({link, label, lucidIcon: IconComponent}) => {
    let pathname = usePathname() || "/";
    let activeName = pathname == link ?
        "bg-blue-100 rounded-lg text-blue-500 dark:bg-blue-800/40 dark:text-blue-300" :
        "hover:bg-blue-100 hover:rounded-lg hover:text-blue-500 dark:hover:bg-blue-800/40 dark:hover:text-blue-300";
    return (
        <li className={`flex space-x-2 py-2 mb-2 ${activeName}`}>
            <IconComponent className="p-0.5 ml-2 text-gray-500"/>
            <Link href={link} passHref legacyBehavior>
                <a className="text-sm pt-0.5">{label}</a>
            </Link>
        </li>
    );
};

export default SidebarLink;