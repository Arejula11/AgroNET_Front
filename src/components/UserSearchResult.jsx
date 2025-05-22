const UserSearchResult = ({ response }) => {
    return (
        <div className="px-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {response.users.map((item) => (
                <div key={item.id} className="w-full max-w-sm bg-white border-primary-green rounded-lg shadow-sm mx-auto hover:bg-primary-green hover:border-darker-green border">
                    <a href={"usuario/" + item._id}>
                        <div className="p-5 h-46 flex flex-col gap-2 justify-center items-center">
                            <img className="w-16 h-16 rounded-full" src={item.profilePicture} alt="User Avatar" />
                            <h5 className="text-xl font-normal ">{item.username}</h5>
                            <h5 className="text-sm font-normal text-gray-500">{item.role}</h5>
                        </div>
                    </a>
                </div>
            ))}
        </div>
    );
};

export default UserSearchResult;