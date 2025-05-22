import { unblock } from "@utils/blockUnblock.ts"

const BlockedUserSearchResult = ({ response, token }) => {


    const handleUnblock = async (e, userId) => {

        try {
            
            await unblock({ id: userId, token: token });
            e.target.classList.add("hidden");
            e.target.nextElementSibling.classList.remove("hidden");
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr className="grid grid-cols-11 gap-2">
                        <th scope="col" className=" px-6 py-3 col-span-2 w-max">
                            <span className="text-sm w-max font-medium text-gray-900 ">Usuario</span>
                        </th>
                        <th scope="col" className=" py-3 col-span-4 w-max">
                            <span className="text-sm font-medium text-gray-900">Motivo de bloqueo</span>
                        </th>
                        <th scope="col" className=" py-3 col-span-4 w-max">
                            <span className="text-sm font-medium text-gray-900 ">Mensaje de petición de desbloqueo</span>
                        </th>
                        <th scope="col" className=" py-3 col-span-1 w-max   ">
                            <span className="text-sm font-medium text-gray-900 ">Acciones</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                    { response.users.length === 0 && 
                        <tr className="grid grid-cols-11 gap-2 text-center">
                            <td className="px-6 py-4 whitespace-nowrap col-span-11 flex justify-center">
                                <span className="text-sm font-normal text-gray-500 ">No hay usuarios bloqueados que hayan apelado</span>
                            </td>
                        </tr>

                    }
                    {response.users.length > 0 && response.users.map((item) => (
                        <tr key={item._id} className="hover:bg-gray-100 grid grid-cols-11 gap-2">
                            <td className="px-6 py-4 whitespace-nowrap w-1/4 col-span-2 flex items-center">
                                <div className="flex items-center gap-4 w-max">
                                    <img className="w-10 h-10 rounded-full" src={item.profilePicture} alt="User Avatar" />
                                    <div>
                                        <a href={"/admin/usuario/" + item._id} className="text-sm font-medium text-gray-900 hover:underline">{item.username}</a>
                                        <h5 className="text-xs font-normal text-gray-500 ">{item.role}</h5>
                                    </div>
                                </div>
                            </td>
                            <td className="col-span-4 flex items-center">
                                <span className="text-sm font-normal text-gray-500">{item.unblockAppeal.content}</span>
                            </td>
                            <td className="col-span-4 flex items-center">
                                <span className="text-sm font-normal text-gray-500 ">{item.blockReason}</span>
                            </td>
                            <td className="col-span-1 flex items-center">
                                <button className="bg-primary-green rounded-md p-2 text-white hover:bg-secondary-green hover:cursor-pointer" onClick={(e) => handleUnblock(e, item._id)}>Desbloquear</button>
                                <i className="hidden">Desbloqueado</i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BlockedUserSearchResult;