import Sidebar from "@/components/Sidebar";
import FormUser from "@/components/form/FormUser";
const formUsers = () => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <div className="p-4">
          <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
            <FormUser />
          </div>
        </div>
      </div>
    </>
  );
};

export default formUsers;

formUsers.getLayout = function getLayout(page) {
  return <Sidebar>{page}</Sidebar>;
};
