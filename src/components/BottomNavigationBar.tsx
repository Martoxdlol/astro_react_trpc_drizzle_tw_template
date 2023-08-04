import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom';


export default function BottomNavigationBar() {
    return (
        <div className='z-10'>
            <div className='h-[76px] w-full'>

            </div>
            <div className='fixed bottom-0 left-0 right-0 flex justify-center'>
                <LabelBottomNavigation />
            </div>
        </div>
    );
}

const options = [
    {
        label: 'Home',
        value: '',
        icon: <HomeIcon />
    },
    {
        label: 'Favorites',
        value: 'favorites',
        icon: <FavoriteIcon />
    },
    {
        label: 'Create',
        value: 'create',
        icon: <AddIcon />
    },
    {
        label: 'Library',
        value: 'library',
        icon: <FolderIcon />
    },
]

export function LabelBottomNavigation() {
    const location = useLocation()

    const value = location.pathname.split('/')[2] || ''

    const navigate = useNavigate()

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        if (newValue === '') {
            return navigate('/app')
        }

        navigate(newValue)
    };

    // useOutletContext()

    return (<>
        <BottomNavigation sx={{ width: { xs: 600, sm: 500 }, borderRadius: { xs: 0, sm: 2 }, overflow: 'hidden', marginBottom: { xs: 0, sm: 1 }, }} value={value} onChange={handleChange}>
            {options.map((option) => (
                <BottomNavigationAction
                    key={option.value}
                    icon={option.icon}
                    label={option.label}
                    value={option.value}
                />
            ))}
        </BottomNavigation></>
    );
}