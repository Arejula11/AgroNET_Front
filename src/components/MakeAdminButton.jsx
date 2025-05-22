import makeAdmin from "@/utils/makeAdmin.ts";


const MakeAdminButton = ({ userId, token }) => {
    
    const handleClick = async () => {
        await makeAdmin({id: userId, token: token});  
        window.location.reload();
    };

    return (
        <button id="makeAdmin" onClick={handleClick} className="bg-primary-green text-white px-4 py-2 rounded-lg shadow-md transition hover:scale-105 hover:shadow-lg">
            Hacer Administrador
        </button>
    );
};

export default MakeAdminButton;