import { AiFillEdit, AiFillFileAdd } from 'react-icons/ai';
import { FaBorderAll } from 'react-icons/fa';

export const SidebarData = [
    {
        title: 'Manage Product',
        icon: <FaBorderAll/>,
        link: "/manageProduct"
    },
    {
        title: 'Add Product',
        icon: <AiFillFileAdd/>,
        link: "/addProduct"
    },
    {
        title: 'Edit Product',
        icon: <AiFillEdit/>,
        link: "/manageProduct"
    },
]